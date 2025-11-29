/**
 * Main JavaScript for Political Campaign Website
 * Handles navigation, forms, gallery, and other interactive features
 */

class CampaignWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupFormValidation();
        this.setupGalleryLightbox();
        this.setupIntersectionObserver();
        this.setupKeyboardNavigation();
        this.setupPerformanceOptimizations();
    }

    setupNavigation() {
        // Add active class to navigation items based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
                mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('show');

                // Animate hamburger icon
                this.animateHamburgerIcon(mobileMenuToggle, !isExpanded);
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('show');
                    this.animateHamburgerIcon(mobileMenuToggle, false);
                }
            });

            // Close mobile menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('show')) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('show');
                    this.animateHamburgerIcon(mobileMenuToggle, false);
                }
            });
        }
    }

    animateHamburgerIcon(toggle, isOpen) {
        const lines = toggle.querySelectorAll('.hamburger-line');
        if (lines.length === 3) {
            if (isOpen) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        }
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const headerOffset = 100;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu after navigation
                    const navMenu = document.querySelector('.nav-menu');
                    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                    if (navMenu && navMenu.classList.contains('show')) {
                        navMenu.classList.remove('show');
                        if (mobileMenuToggle) {
                            mobileMenuToggle.setAttribute('aria-expanded', 'false');
                            this.animateHamburgerIcon(mobileMenuToggle, false);
                        }
                    }
                }
            });
        });
    }

    setupFormValidation() {
        // Volunteer form validation
        const volunteerForm = document.querySelector('.volunteer-form');
        if (volunteerForm) {
            volunteerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateVolunteerForm(volunteerForm)) {
                    this.submitVolunteerForm(volunteerForm);
                }
            });
        }

        // Contact form validation
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateContactForm(contactForm)) {
                    this.submitContactForm(contactForm);
                }
            });
        }

        // Real-time validation
        document.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });

            field.addEventListener('input', () => {
                // Clear previous error messages
                this.clearFieldError(field);
            });
        });
    }

    validateVolunteerForm(form) {
        const requiredFields = ['volunteer-name', 'volunteer-phone'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = form.querySelector(`#${fieldId}`);
            if (!field || !field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Phone validation
        const phoneField = form.querySelector('#volunteer-phone');
        if (phoneField && phoneField.value.trim()) {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phoneField.value.trim())) {
                this.showFieldError(phoneField, 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
        }

        return isValid;
    }

    validateContactForm(form) {
        const requiredFields = ['contact-name', 'contact-phone', 'contact-message'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = form.querySelector(`#${fieldId}`);
            if (!field || !field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Phone validation
        const phoneField = form.querySelector('#contact-phone');
        if (phoneField && phoneField.value.trim()) {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phoneField.value.trim())) {
                this.showFieldError(phoneField, 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
        }

        // Email validation if provided
        const emailField = form.querySelector('#contact-email');
        if (emailField && emailField.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                this.showFieldError(emailField, 'Please enter a valid email address');
                isValid = false;
            }
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid 10-digit phone number');
                return false;
            }
        }

        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);

        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');

        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');

        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');

        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    async submitVolunteerForm(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');

        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        try {
            // Since we can't actually send emails from frontend, we'll show a success message
            // In a real implementation, this would send to a backend API
            await this.delay(1000); // Simulate API call

            this.showFormSuccess(form, 'Thank you for your interest! We will contact you soon.');
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError(form, 'There was an error submitting the form. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Register';
        }
    }

    async submitContactForm(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');

        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Simulate form submission
            await this.delay(1000);

            this.showFormSuccess(form, 'Thank you for your message! We will get back to you soon.');
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError(form, 'There was an error sending your message. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send';
        }
    }

    showFormSuccess(form, message) {
        this.showFormMessage(form, message, 'success');
    }

    showFormError(form, message) {
        this.showFormMessage(form, message, 'error');
    }

    showFormMessage(form, message, type) {
        // Remove existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        messageElement.setAttribute('role', 'alert');

        form.insertBefore(messageElement, form.firstChild);

        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 5000);
        }
    }

    setupGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item img');

        galleryItems.forEach(img => {
            img.addEventListener('click', () => {
                this.openLightbox(img.src, img.alt);
            });

            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openLightbox(img.src, img.alt);
                }
            });
        });
    }

    openLightbox(src, alt) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-labelledby', 'lightbox-title');

        lightbox.innerHTML = `
            <div class="lightbox-overlay" aria-hidden="true"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img src="${src}" alt="${alt}" id="lightbox-title">
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Focus management
        const closeButton = lightbox.querySelector('.lightbox-close');
        closeButton.focus();

        // Event listeners
        const closeLightbox = () => {
            lightbox.remove();
            document.body.style.overflow = '';
        };

        closeButton.addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });

        // Prevent background scrolling
        lightbox.addEventListener('wheel', (e) => e.preventDefault());
    }

    setupIntersectionObserver() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Animate elements on scroll
        const animatedElements = document.querySelectorAll('.issue-card, .event-card, .role-card, .news-card');
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation for custom components
        document.addEventListener('keydown', (e) => {
            // Skip to main content with Ctrl+Home
            if (e.ctrlKey && e.key === 'Home') {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.focus();
                    mainContent.scrollIntoView();
                }
            }
        });
    }

    setupPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();

        // Defer non-critical JavaScript
        this.deferNonCriticalJS();

        // Optimize scroll performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Handle scroll-based updates here
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    preloadCriticalResources() {
        // Preload hero image
        const heroImage = document.querySelector('.candidate-portrait img');
        if (heroImage) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = heroImage.src;
            document.head.appendChild(link);
        }
    }

    deferNonCriticalJS() {
        // Move non-critical scripts to the end of body
        const scripts = document.querySelectorAll('script[data-defer]');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            newScript.defer = true;
            document.body.appendChild(newScript);
            script.remove();
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the website when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.campaignWebsite = new CampaignWebsite();
    });
} else {
    window.campaignWebsite = new CampaignWebsite();
}



