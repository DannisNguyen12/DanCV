// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-theme', savedTheme === 'dark');
        updateThemeIcon();
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon();
    });
    
    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const closeLightbox = document.querySelector('.close-lightbox');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            lightboxContent.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeLightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Quotes Carousel
    const quoteSlides = document.querySelectorAll('.quote-slide');
    const quoteDots = document.querySelectorAll('.quote-dot');
    const prevBtn = document.querySelector('.prev-quote');
    const nextBtn = document.querySelector('.next-quote');
    let currentQuote = 0;
    
    function showQuote(index) {
        // Hide all slides
        quoteSlides.forEach(slide => slide.classList.remove('active'));
        quoteDots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        quoteSlides[index].classList.add('active');
        quoteDots[index].classList.add('active');
    }
    
    function nextQuote() {
        currentQuote = (currentQuote + 1) % quoteSlides.length;
        showQuote(currentQuote);
    }
    
    function prevQuote() {
        currentQuote = (currentQuote - 1 + quoteSlides.length) % quoteSlides.length;
        showQuote(currentQuote);
    }
    
    nextBtn.addEventListener('click', nextQuote);
    prevBtn.addEventListener('click', prevQuote);
    
    quoteDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentQuote = index;
            showQuote(currentQuote);
        });
    });
    
    // Auto-rotate quotes every 5 seconds
    setInterval(nextQuote, 5000);
    
    // Testimonials animation on scroll
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Project detail modal functionality
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const project = this.getAttribute('data-project');
            // You can add modal functionality here to show more project details
            console.log('Viewing project:', project);
            // For now, just scroll to the project section
            const projectSection = document.getElementById('projects');
            if (projectSection) {
                projectSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Smooth scrolling for contact links
    const contactLinks = document.querySelectorAll('.contact-details a[href^="#"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add enhanced scroll animations for new sections
    const newAnimatedElements = document.querySelectorAll('.skill-category, .project-item, .contact-item, .testimonial-slide');
    newAnimatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add typing effect for skills tags (optional enhancement)
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
            tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, index * 100);
    });
    
    // Enhanced header behavior for longer content
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.portfolio-item, .technique, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add loading animation for portfolio images
    const portfolioImages = document.querySelectorAll('.portfolio-item img');
    portfolioImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Error handling for missing images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with a placeholder if image fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            this.style.opacity = '0.7';
        });
    });
    
    // Add typing effect to hero text (optional enhancement)
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    
    function typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Uncomment the lines below if you want typing animation
    setTimeout(() => typeWriter(heroTitle, 'Trey Ratcliff', 150), 500);
    setTimeout(() => typeWriter(heroSubtitle, 'Pioneer of HDR Photography', 100), 2000);
    
    // Simple Tech Pills Interactions
    const techPills = document.querySelectorAll('.tech-pill');
    
    // Add simple click effects for tech pills
    techPills.forEach((pill, index) => {
        // Simple entrance animation
        pill.style.opacity = '0';
        pill.style.transform = 'translateY(10px)';
        pill.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            pill.style.opacity = '1';
            pill.style.transform = 'translateY(0)';
        }, index * 30);
        
        // Simple click effect
        pill.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
        
        // Keyboard accessibility
        pill.setAttribute('tabindex', '0');
        pill.setAttribute('role', 'button');
        pill.setAttribute('aria-label', `Technology: ${pill.textContent}`);
        
        pill.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Testimonial Form Handling
    const testimonialForm = document.getElementById('testimonialForm');
    const submissionMessage = document.getElementById('submissionMessage');
    
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            try {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                hideMessage();
                
                // Collect form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                // Basic client-side validation
                if (!validateForm(data)) {
                    throw new Error('Please fill in all required fields correctly.');
                }
                
                // Submit to server
                const response = await fetch('/api/testimonials/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showMessage(result.message, 'success');
                    this.reset();
                    clearRating();
                } else {
                    showMessage(result.message || 'Submission failed. Please try again.', 'error');
                }
                
            } catch (error) {
                console.error('Testimonial submission error:', error);
                showMessage(error.message || 'Network error. Please check your connection and try again.', 'error');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
    
    function validateForm(data) {
        // Required fields
        const required = ['submitterName', 'submitterTitle', 'submitterEmail', 'relationship', 'testimonialText', 'rating'];
        for (const field of required) {
            if (!data[field] || data[field].trim() === '') {
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.submitterEmail)) {
            return false;
        }
        
        // Rating validation
        const rating = parseInt(data.rating);
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return false;
        }
        
        return true;
    }
    
    function showMessage(text, type) {
        submissionMessage.textContent = text;
        submissionMessage.className = `submission-message ${type} show`;
        
        // Scroll message into view
        submissionMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(hideMessage, 5000);
        }
    }
    
    function hideMessage() {
        submissionMessage.classList.remove('show');
    }
    
    function clearRating() {
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        ratingInputs.forEach(input => input.checked = false);
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Arrow keys for quote navigation
    const prevQuote = document.querySelector('.prev-quote');
    const nextQuote = document.querySelector('.next-quote');
    
    if (e.key === 'ArrowLeft' && prevQuote) {
        prevQuote.click();
    } else if (e.key === 'ArrowRight' && nextQuote) {
        nextQuote.click();
    }
});
