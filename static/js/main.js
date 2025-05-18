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
    
    // Scroll Spy feature
    const sections = document.querySelectorAll('section'); // Assuming sections are wrapped in <section> tags with IDs
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function activateNavLink() {
        let current = '';
        const scrollPos = window.scrollY + navbar.offsetHeight + 1; // Add navbar height to account for fixed header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const triggerPoint = sectionTop - window.innerHeight / 3;

            if (scrollPos >= triggerPoint && scrollPos < sectionTop + sectionHeight) {
                // If this section belongs to a group (e.g., "benefits"), assign that ID
                if (section.classList.contains('benefit-section')) {
                    current = 'benefits';
                } 
                else if (section.classList.contains('for-clients-section')) {
                    current = 'who-for';
                }
                else {
                    current = section.getAttribute('id');
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Call on load
    activateNavLink();

    // Listen for scroll events
    window.addEventListener('scroll', activateNavLink);

    // Also update on resize to account for height changes
    window.addEventListener('resize', activateNavLink);


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
    
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function () {
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.innerHTML = `
                    <div class="video-embed">
                        <iframe 
                            src="https://www.youtube.com/embed/uxbs4SPJGTI?autoplay=1"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                `;
            }
        });
    }
    
    // Check on load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // EmailJS initialization
    emailjs.init("jkLAd8X0aWHM4emed");

    
    // Contact form submission with EmailJS
    const contactForm = document.querySelector('.contact-form');
    const countryCodeInput = contactForm ? contactForm.querySelector('#countryCode') : null;
    const phoneInput = contactForm ? contactForm.querySelector('#phone') : null;
    
    // Add input restriction and auto '+' to country code field
    if (countryCodeInput) {
        countryCodeInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, ''); // Remove non-digits
            if (value) {
                this.value = '+' + value;
            } else {
                this.value = ''; // Keep empty if no digits
            }
        });

        // Prevent non-numeric and non-plus keys
        countryCodeInput.addEventListener('keydown', function(e) {
            // Allow: backspace, delete, tab, escape, enter
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number or the plus key (for the first character)
            // Plus key is keycode 187 shifted or keycode 107 on numpad
            if ((e.shiftKey && e.keyCode === 187) || e.keyCode === 107) {
                 // Allow '+' only if the field is empty
                 if (this.value.length === 0) {
                    return;
                 }
            }
            // Ensure it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }

    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from submitting to server
            
            // Update UI to show loading state
            const submitButton = this.querySelector('button[type="submit"]');

            // Get form data
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            let countryCode = countryCodeInput ? countryCodeInput.value.trim() : '';
            // Make sure country code starts with +
            if (countryCode && !countryCode.startsWith('+')) {
                countryCode = '+' + countryCode;
            };
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const prefix = countryCode
            const message = this.querySelector('#message').value
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                prefix: prefix,
                phone: phone,
                message: message,
            };

            // Validation: Country code mandatory if phone is filled
            if (phone && !countryCode) {
                showEmailStatus('error', 'Please enter the country code if you provide a phone number.');
                return; // Prevent form submission
            }

            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Send email using EmailJS
            emailjs.send('service_8etewic', 'template_4aychwg', templateParams)
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
