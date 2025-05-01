/**
 * CodeBay - Software Solutions Agency
 * Main JavaScript file for interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const hero = document.querySelector('#hero');
    
    // Function to update navbar appearance on scroll
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(36, 36, 52, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'rgba(36, 36, 52, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Call on load
    updateNavbar();
    
    // Listen for scroll
    window.addEventListener('scroll', updateNavbar);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
            
            // Scroll to target
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio website preview hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const preview = item.querySelector('.website-preview');
        
        item.addEventListener('mouseenter', () => {
            preview.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            preview.style.transform = 'scale(1)';
        });
    });
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.service-card, .audience-card, .portfolio-item, .accordion-item, .portfolio-card, .testimonial-container, .about-image-container, .video-container');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize elements for reveal
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Video placeholder interaction
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, this would play the video
            // For demo purposes, we'll just show an animation
            this.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i><span>Loading video...</span>';
            
            setTimeout(() => {
                const videoContainer = this.closest('.video-container');
                videoContainer.innerHTML = `
                    <div class="video-message">
                        <i class="fas fa-video"></i>
                        <p>Video would play here in production</p>
                    </div>
                `;
            }, 1500);
        });
    }
    
    // Check on load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // EmailJS initialization
    if (window.emailjs) {
        emailjs.init({
            publicKey: "jkLAd8X0aWHM4emed",
        });
    }
    
    // Contact form submission with EmailJS
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from submitting to server
            
            // Update UI to show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Get form data
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const subject = this.querySelector('#subject').value || 'Contact Form Submission';
            const message = this.querySelector('#message').value;
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                to_email: 'codebay.agency@gmail.com' // The recipient email
            };
            
            // Send email using EmailJS
            emailjs.send('default_service', 'template_contact', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    
                    // Show success message
                    showEmailStatus('success', 'Thank you for your message! We will get back to you soon.');
                    
                    // Reset form
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Email failed to send:', error);
                    
                    // Show error message
                    showEmailStatus('error', 'There was a problem sending your message. Please try again later.');
                })
                .finally(function() {
                    // Reset button state
                    submitButton.innerHTML = 'Send Message';
                    submitButton.disabled = false;
                });
        });
    }
    
    // Function to show email status message
    function showEmailStatus(type, message) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show mt-3`;
        alertDiv.role = 'alert';
        
        // Add message content
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Find the contact form container and insert message after the form
        const formContainer = document.querySelector('.contact-form-container');
        formContainer.appendChild(alertDiv);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => {
                alertDiv.remove();
            }, 300);
        }, 5000);
    }
    
    // Flash message auto-dismiss
    const flashMessages = document.querySelectorAll('.alert');
    
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000);
    });
});
