# Danny Nguyen - Personal CV Website

A modern, responsive personal portfolio website showcasing my journey as an aspiring software developer, now featuring an integrated testimonial submission and approval system.

## 🌟 Live Demo

Open `CV.html` in your browser to view the live website.
For the complete experience with testimonial functionality, run the Node.js server.

## 📖 About

This website tells the story of my transformation from a student in Vietnam to an aspiring software developer in Australia. It showcases my academic achievements, diverse work experience, technical skills, and the projects I've built along the way.

## ✨ Features

### 🎨 Design & User Experience
- **Apple Store-Inspired Design**: Clean, professional, and creative aesthetic
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistent preference storage
- **Smooth Animations**: Professional transitions and scroll-triggered effects
- **Modern Typography**: System fonts for optimal readability
- **Interactive Elements**: Technology pills with hover effects and animations

### 📝 Testimonial System (NEW!)
- **Public Submission Form**: Visitors can submit testimonials about working with you
- **Admin Review Panel**: Review and approve/reject testimonials before they go live
- **Professional Display**: Approved testimonials are beautifully integrated into your CV
- **Spam Protection**: Rate limiting and duplicate submission prevention
- **Real-time Updates**: Admin panel updates automatically with new submissions

### 📱 Interactive Elements
- **Navigation**: Active section highlighting with smooth scroll
- **Testimonials Carousel**: Auto-rotating quotes with manual controls
- **Project Showcase**: Hover effects and detailed project information
- **Contact Integration**: Direct links to email, LinkedIn, and GitHub
- **Resume Download**: One-click PDF download functionality

### 🛠️ Technical Implementation
- **Pure HTML/CSS/JavaScript**: No external frameworks required
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: Consistent theming system
- **Local Storage**: Theme preference persistence
- **Accessibility**: ARIA labels and keyboard navigation support

## 🏗️ Structure

```
DanCV/
├── CV.html          # Main HTML file
├── styles.css       # Comprehensive styling
├── script.js        # Interactive functionality
├── README.md        # Project documentation
├── images/          # Portfolio images (placeholder references)
└── assets/          # Resume and other downloadable assets
```

## 📋 Sections

1. **Hero Section**: Introduction with name, title, and key skills
2. **About Me**: Personal story from Vietnam to Australia
3. **Skills**: Technical and soft skills organized by category
4. **Projects**: Featured project (EcoExchange) with detailed information
5. **Timeline**: Visual journey from 2018 to 2025
6. **Testimonials**: Rotating quotes from mentors and colleagues
7. **Contact**: Professional contact information and resume download

## 🛠️ Skills Showcased

### Programming Languages
- Java
- JavaScript
- TypeScript
- C++
- R

### Tools & Frameworks
- Node.js
- Express
- PostgreSQL
- Docker
- Git
- JWT

### Soft Skills
- Leadership
- Critical Thinking
- Communication
- Problem Solving
- Empathy
- Mentoring

## 💼 Featured Project: EcoExchange

A full-stack web application built for students to trade books and gadgets sustainably. The project demonstrates:

- **Full-stack development** with Node.js and Express
- **Database design** with PostgreSQL
- **Containerization** with Docker
- **User authentication** and profile management
- **Real-time messaging** system
- **Responsive design** principles

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download the repository
2. Open `CV.html` in your preferred web browser
3. That's it! The website is fully functional

### Customization
- **Images**: Replace placeholder image references in `images/` folder
- **Resume**: Add your actual resume PDF to `assets/Danny_Nguyen_Resume.pdf`
- **Content**: Modify text content in `CV.html`
- **Styling**: Customize colors and layout in `styles.css`
- **Functionality**: Extend interactions in `script.js`

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎯 Performance Features

- **Optimized Images**: Efficient loading with proper sizing
- **Minimal Dependencies**: Fast loading with no external libraries
- **CSS Animations**: Hardware-accelerated transforms
- **Lazy Loading**: Images load as needed
- **Local Storage**: Reduced server requests for theme preferences

## 🔧 Technical Highlights

### CSS Features
- CSS Grid for complex layouts
- Flexbox for component alignment
- CSS Custom Properties for theming
- CSS Animations and Transitions
- Media queries for responsive design
- CSS Gradients and modern effects

### JavaScript Features
- ES6+ syntax and features
- DOM manipulation and event handling
- Local Storage API for persistence
- Intersection Observer for scroll animations
- Keyboard navigation support
- Smooth scrolling implementation

## � Getting Started with Testimonial System

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Quick Setup

1. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access your website:**
   - Main website: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`

### Manual Setup (Alternative)

```bash
# Install dependencies
npm install

# Create data directories
mkdir -p data/pending data/approved

# Initialize data files
echo "[]" > data/pending-testimonials.json
echo "[]" > data/approved-testimonials.json

# Start the server
npm start
```

## 📝 How the Testimonial System Works

### For Visitors (Submitting Testimonials)
1. Visit your CV website
2. Scroll to "What Others Say" section
3. Fill out the submission form
4. Receive confirmation of submission

### For You (Admin Review)
1. Visit `/admin` to access the admin panel
2. Review pending testimonials
3. Approve or reject each submission
4. Approved testimonials appear on your CV immediately

## 🔧 API Endpoints

### Public
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials/submit` - Submit new testimonial

### Admin
- `GET /api/admin/testimonials/pending` - Get pending testimonials  
- `POST /api/admin/testimonials/:id/approve` - Approve testimonial
- `POST /api/admin/testimonials/:id/reject` - Reject testimonial

## ⚠️ Security Notes

**Important**: The admin panel is currently unprotected. For production:

1. Add authentication to the admin panel
2. Use HTTPS for all traffic
3. Implement proper input validation
4. Consider using a database instead of JSON files
5. Set up proper CORS policies

## 📞 Contact Information

- **Email**: long.nm187254@gmail.com
- **LinkedIn**: [linkedin.com/in/dannynguyen](https://linkedin.com/in/dannynguyen)
- **GitHub**: [github.com/dannynguyen](https://github.com/dannynguyen)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Design Inspiration**: Apple Store design principles
- **Icons**: Font Awesome icons
- **Fonts**: System fonts for optimal performance
- **Color Palette**: Professional gradients and modern tones

## 📝 Future Enhancements

- [x] ~~Add testimonial submission and approval system~~
- [ ] Add authentication to admin panel
- [ ] Implement email notifications for new testimonials
- [ ] Add testimonial categories/tags
- [ ] Create database migration from JSON files
- [ ] Create project detail modals
- [ ] Add loading animations
- [ ] Implement PWA features
- [ ] Add analytics integration

---

**Built with passion and precision by Danny Nguyen** 🚀
