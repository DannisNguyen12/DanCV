const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your CV website)
app.use(express.static(path.join(__dirname)));

// Data directories
const dataDir = path.join(__dirname, 'data');
const pendingDir = path.join(dataDir, 'pending');
const approvedDir = path.join(dataDir, 'approved');

// Ensure data directories exist
fs.ensureDirSync(pendingDir);
fs.ensureDirSync(approvedDir);

// Initialize data files if they don't exist
const pendingFile = path.join(dataDir, 'pending-testimonials.json');
const approvedFile = path.join(dataDir, 'approved-testimonials.json');

if (!fs.existsSync(pendingFile)) {
    fs.writeJsonSync(pendingFile, []);
}
if (!fs.existsSync(approvedFile)) {
    fs.writeJsonSync(approvedFile, []);
}

// Helper functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function loadTestimonials(filePath) {
    try {
        return fs.readJsonSync(filePath);
    } catch (error) {
        console.error(`Error loading testimonials from ${filePath}:`, error);
        return [];
    }
}

function saveTestimonials(filePath, testimonials) {
    try {
        fs.writeJsonSync(filePath, testimonials, { spaces: 2 });
        return true;
    } catch (error) {
        console.error(`Error saving testimonials to ${filePath}:`, error);
        return false;
    }
}

// Routes

// Get approved testimonials for public display
app.get('/api/testimonials', (req, res) => {
    try {
        const approvedTestimonials = loadTestimonials(approvedFile);
        res.json({
            success: true,
            testimonials: approvedTestimonials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error loading testimonials'
        });
    }
});

// Submit new testimonial
app.post('/api/testimonials/submit', (req, res) => {
    try {
        const {
            submitterName,
            submitterTitle,
            submitterEmail,
            relationship,
            testimonialText,
            rating
        } = req.body;

        // Validate required fields
        if (!submitterName || !submitterTitle || !submitterEmail || 
            !relationship || !testimonialText || !rating) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(submitterEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Validate rating
        const ratingNum = parseInt(rating);
        if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Create new testimonial object
        const newTestimonial = {
            id: generateId(),
            submitterName: submitterName.trim(),
            submitterTitle: submitterTitle.trim(),
            submitterEmail: submitterEmail.trim().toLowerCase(),
            relationship: relationship.trim(),
            testimonialText: testimonialText.trim(),
            rating: ratingNum,
            submittedAt: new Date().toISOString(),
            status: 'pending',
            ipAddress: req.ip || req.connection.remoteAddress
        };

        // Load existing pending testimonials
        const pendingTestimonials = loadTestimonials(pendingFile);

        // Check for duplicate submissions (same email in last 24 hours)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recentSubmission = pendingTestimonials.find(t => 
            t.submitterEmail === newTestimonial.submitterEmail && 
            new Date(t.submittedAt) > oneDayAgo
        );

        if (recentSubmission) {
            return res.status(429).json({
                success: false,
                message: 'You have already submitted a testimonial recently. Please wait 24 hours before submitting again.'
            });
        }

        // Add new testimonial to pending list
        pendingTestimonials.push(newTestimonial);

        // Save to file
        if (saveTestimonials(pendingFile, pendingTestimonials)) {
            res.json({
                success: true,
                message: 'Thank you for your testimonial! It has been submitted for review and will be published once approved.',
                testimonialId: newTestimonial.id
            });

            // Log submission for admin notification
            console.log(`New testimonial submitted by ${submitterName} (${submitterEmail}) at ${new Date().toISOString()}`);
        } else {
            res.status(500).json({
                success: false,
                message: 'Error saving testimonial. Please try again.'
            });
        }

    } catch (error) {
        console.error('Error submitting testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

// Admin routes (protected - in a real app, you'd add authentication)

// Get pending testimonials for admin review
app.get('/api/admin/testimonials/pending', (req, res) => {
    try {
        const pendingTestimonials = loadTestimonials(pendingFile);
        res.json({
            success: true,
            testimonials: pendingTestimonials.sort((a, b) => 
                new Date(b.submittedAt) - new Date(a.submittedAt)
            )
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error loading pending testimonials'
        });
    }
});

// Approve testimonial
app.post('/api/admin/testimonials/:id/approve', (req, res) => {
    try {
        const testimonialId = req.params.id;
        
        // Load pending and approved testimonials
        const pendingTestimonials = loadTestimonials(pendingFile);
        const approvedTestimonials = loadTestimonials(approvedFile);

        // Find testimonial in pending list
        const testimonialIndex = pendingTestimonials.findIndex(t => t.id === testimonialId);
        
        if (testimonialIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        // Move testimonial from pending to approved
        const [testimonial] = pendingTestimonials.splice(testimonialIndex, 1);
        testimonial.status = 'approved';
        testimonial.approvedAt = new Date().toISOString();
        
        approvedTestimonials.push(testimonial);

        // Save both files
        if (saveTestimonials(pendingFile, pendingTestimonials) && 
            saveTestimonials(approvedFile, approvedTestimonials)) {
            res.json({
                success: true,
                message: 'Testimonial approved successfully'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error updating testimonials'
            });
        }

    } catch (error) {
        console.error('Error approving testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Reject testimonial
app.post('/api/admin/testimonials/:id/reject', (req, res) => {
    try {
        const testimonialId = req.params.id;
        
        // Load pending testimonials
        const pendingTestimonials = loadTestimonials(pendingFile);

        // Find testimonial in pending list
        const testimonialIndex = pendingTestimonials.findIndex(t => t.id === testimonialId);
        
        if (testimonialIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }

        // Remove testimonial from pending list
        pendingTestimonials.splice(testimonialIndex, 1);

        // Save updated pending list
        if (saveTestimonials(pendingFile, pendingTestimonials)) {
            res.json({
                success: true,
                message: 'Testimonial rejected successfully'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error updating testimonials'
            });
        }

    } catch (error) {
        console.error('Error rejecting testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Serve admin interface
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Admin interface available at http://localhost:${PORT}/admin`);
});

module.exports = app;
