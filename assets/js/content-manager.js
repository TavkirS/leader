/**
 * Content Manager for Multi-lingual Political Campaign Website
 * Handles loading JSON content and language switching
 */

class ContentManager {
    constructor() {
        this.currentLanguage = 'mr'; // Default to Marathi
        this.content = null;
        this.isLoading = false;

        // Content selectors mapping
        this.contentSelectors = {
            // Meta content
            'meta-title': 'meta.title',
            'meta-description': 'meta.description',

            // Hero section
            '.hero-headline': 'hero.headline',
            '.hero-subheadline': 'hero.subheadline',
            '.hero-ctas .btn-primary': 'hero.primary_cta',
            '.hero-ctas .btn-secondary': 'hero.secondary_cta',

            // Navigation
            '[data-section="home"]': 'navigation.home',
            '[data-section="about"]': 'navigation.about',
            '[data-section="manifesto"]': 'navigation.manifesto',
            '[data-section="issues"]': 'navigation.issues',
            '[data-section="events"]': 'navigation.events',
            '[data-section="volunteer"]': 'navigation.volunteer',
            '[data-section="gallery"]': 'navigation.gallery',
            '[data-section="news"]': 'navigation.news',
            '[data-section="contact"]': 'navigation.contact',

            // CTAs
            '.header-ctas .btn-secondary': 'ctas.volunteer',
            '.header-ctas .btn-primary': 'ctas.contact',
            '.sticky-cta .cta-text': 'ctas.volunteer',

            // About section
            '#about h2': 'about.title',
            '#about .about-text p': 'about.content',
            '#about .quick-facts h3': 'about.quick_facts',

            // Manifesto section
            '#manifesto h2': 'manifesto.title',
            '#manifesto h3': 'manifesto.priorities_title',

            // Issues section
            '#issues h2': 'issues.title',

            // Events section
            '#events h2': 'events.title',
            '#events h3': 'events.upcoming_title',

            // Volunteer section
            '#volunteer h2': 'volunteer.title',
            '#volunteer .volunteer-intro h3': 'volunteer.headline',
            '#volunteer .volunteer-intro p': 'volunteer.content',
            '#volunteer .btn-primary': 'volunteer.cta',

            // Gallery section
            '#gallery h2': 'gallery.title',
            '#gallery h3': 'gallery.photos_title',

            // News section
            '#news h2': 'news.title',

            // Contact section
            '#contact h2': 'contact.title',
            '#contact .contact-info h3': 'contact.headline',
            '#contact .contact-info p': 'contact.blurb',

            // Footer
            '.footer-section:first-child h4': 'footer.quick_links',
            '.footer-bottom p': 'footer.legal'
        };

        this.init();
    }

    async init() {
        try {
            await this.loadContent();
            this.setupLanguageToggle();
            this.updateContent();
            this.bindContentEvents();
        } catch (error) {
            console.error('Failed to initialize content manager:', error);
        }
    }

    async loadContent() {
        this.isLoading = true;
        try {
            const response = await fetch('content/site-content.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.content = await response.json();
        } catch (error) {
            console.error('Failed to load content:', error);
            // Fallback content in case of error
            this.content = this.getFallbackContent();
        } finally {
            this.isLoading = false;
        }
    }

    getFallbackContent() {
        return {
            "mr": {
                "site": {
                    "name": "फय्याज भाऊ शेख — नगरसेवक उमेदवार",
                    "tagline": "प्रभाग क्र. 13 साठी आपल्या सेवेत"
                },
                "hero": {
                    "headline": "फय्याज भाऊ शेख — प्रभाग क्र. 13 साठी आपल्या सेवेत",
                    "subheadline": "पारदर्शक नेतृत्व, जलद निर्णय, आणि विकासावर वचनबद्ध.",
                    "primary_cta": "आता सहभागी व्हा",
                    "secondary_cta": "आमचा घोषणापत्र डाउनलोड करा"
                }
            },
            "en": {
                "site": {
                    "name": "Fayyaz Shaikh — Municipal Council Candidate",
                    "tagline": "Serving Ward No. 4"
                },
                "hero": {
                    "headline": "Fayyaz Shaikh — Serving Ward No. 4",
                    "subheadline": "Committed to transparent leadership, quick decisions, and development.",
                    "primary_cta": "Join Now",
                    "secondary_cta": "Download Our Manifesto"
                }
            }
        };
    }

    setupLanguageToggle() {
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });

            // Handle keyboard navigation
            languageToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleLanguage();
                }
            });
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'mr' ? 'en' : 'mr';
        this.updateContent();
        this.updateLanguageToggleButton();
        this.saveLanguagePreference();

        // Announce language change for screen readers
        this.announceLanguageChange();
    }

    updateLanguageToggleButton() {
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            const nextLang = this.currentLanguage === 'mr' ? 'en' : 'mr';
            languageToggle.textContent = this.getNestedValue(`navigation.language${nextLang === 'en' ? '' : '_en'}`) || (nextLang === 'en' ? 'English' : 'मराठी');
        }
    }

    updateContent() {
        if (!this.content) return;

        // Update document language
        document.documentElement.lang = this.currentLanguage;

        // Update meta tags
        this.updateMetaTags();

        // Update content based on selectors
        Object.entries(this.contentSelectors).forEach(([selector, path]) => {
            const element = document.querySelector(selector);
            if (element) {
                const content = this.getNestedValue(path);
                if (content) {
                    if (selector.startsWith('[data-section=') && selector.includes(']')) {
                        // Navigation items
                        element.textContent = content;
                    } else if (selector.includes('meta-')) {
                        // Meta content is handled separately
                        return;
                    } else {
                        element.textContent = content;
                    }
                }
            }
        });

        // Update dynamic content sections
        this.updateManifestoList();
        this.updateIssuesList();
        this.updateEventsList();
        this.updateFormLabels();
        this.updateFooterLinks();

        // Update HTML direction for RTL languages if needed
        document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    }

    updateMetaTags() {
        const title = this.getNestedValue('meta.title');
        const description = this.getNestedValue('meta.description');

        if (title) {
            document.title = title;
            const titleMeta = document.querySelector('meta[name="title"]') ||
                             document.querySelector('meta[property="og:title"]');
            if (titleMeta) titleMeta.content = title;
        }

        if (description) {
            const descMeta = document.querySelector('meta[name="description"]');
            const ogDescMeta = document.querySelector('meta[property="og:description"]');
            if (descMeta) descMeta.content = description;
            if (ogDescMeta) ogDescMeta.content = description;
        }
    }

    updateManifestoList() {
        const manifestoList = document.querySelector('.manifesto-list');
        if (!manifestoList) return;

        const priorities = this.getNestedValue('manifesto.priorities');
        if (!priorities) return;

        manifestoList.innerHTML = priorities.map((priority, index) => `
            <li>
                <span class="icon">${this.getIconForPriority(index)}</span>
                ${priority}
            </li>
        `).join('');
    }

    getIconForPriority(index) {
        const icons = ['💧', '🛣️', '♻️', '🏥', '📚', '💼'];
        return icons[index] || '⭐';
    }

    updateIssuesList() {
        const issuesGrid = document.querySelector('.issues-grid');
        if (!issuesGrid) return;

        const issues = this.getNestedValue('issues.items');
        if (!issues) return;

        issuesGrid.innerHTML = issues.map(issue => `
            <article class="issue-card">
                <h3>${issue.title}</h3>
                <p>${issue.description}</p>
                <ul class="action-list">
                    ${issue.actions.map(action => `<li>${action}</li>`).join('')}
                </ul>
            </article>
        `).join('');
    }

    updateEventsList() {
        const eventsList = document.querySelector('.events-list');
        if (!eventsList) return;

        const events = this.getNestedValue('events.items');
        if (!events) return;

        eventsList.innerHTML = events.map(event => `
            <article class="event-card">
                <div class="event-header">
                    <h4>${event.title}</h4>
                    <div class="event-meta">
                        <time datetime="${this.formatDateForDatetime(event.date)}">${this.formatEventDate(event.date)}</time>
                        <span>${this.getNestedValue('events.time_prefix') || 'वेळ:'} ${event.time}</span>
                        <span>${this.getNestedValue('events.location_prefix') || 'स्थळ:'} ${event.location}</span>
                    </div>
                </div>
                <p>${event.description}</p>
                <a href="#contact" class="btn btn-secondary">${this.getNestedValue('events.rsvp_text')}</a>
            </article>
        `).join('');
    }

    formatDateForDatetime(dateStr) {
        // Convert DD/MM/YYYY to YYYY-MM-DD
        const parts = dateStr.split('/');
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }

    formatEventDate(dateStr) {
        // Keep the display format as DD/MM/YYYY for now
        return `दिनांक: ${dateStr}`;
    }

    updateFormLabels() {
        const forms = ['volunteer-form', 'contact-form'];
        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (!form) return;

            const formLabels = this.getNestedValue(`contact.form`);
            if (!formLabels) return;

            // Update form labels
            Object.entries(formLabels).forEach(([key, value]) => {
                const label = form.querySelector(`label[for="${formId.replace('-form', '')}-${key}"]`);
                if (label) {
                    label.textContent = value;
                }

                const input = form.querySelector(`#${formId.replace('-form', '')}-${key}`);
                if (input && input.type === 'submit') {
                    input.value = value;
                }
            });
        });
    }

    updateFooterLinks() {
        // Update social links with proper URLs
        const socialLinks = this.getNestedValue('social');
        if (socialLinks) {
            Object.entries(socialLinks).forEach(([platform, url]) => {
                const link = document.querySelector(`a[href*="${platform}"]`);
                if (link) {
                    link.href = url;
                }
            });
        }
    }

    getNestedValue(path) {
        if (!this.content || !this.content[this.currentLanguage]) return null;

        return path.split('.').reduce((obj, key) => {
            return obj && obj[key] !== undefined ? obj[key] : null;
        }, this.content[this.currentLanguage]);
    }

    saveLanguagePreference() {
        try {
            localStorage.setItem('preferred-language', this.currentLanguage);
        } catch (error) {
            console.warn('Failed to save language preference:', error);
        }
    }

    loadLanguagePreference() {
        try {
            const saved = localStorage.getItem('preferred-language');
            if (saved && (saved === 'mr' || saved === 'en')) {
                this.currentLanguage = saved;
            }
        } catch (error) {
            console.warn('Failed to load language preference:', error);
        }
    }

    announceLanguageChange() {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Language changed to ${this.currentLanguage === 'mr' ? 'Marathi' : 'English'}`;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    bindContentEvents() {
        // Add any dynamic content event bindings here
        document.addEventListener('DOMContentLoaded', () => {
            this.loadLanguagePreference();
            this.updateLanguageToggleButton();
        });
    }
}

// Initialize content manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.contentManager = new ContentManager();
    });
} else {
    window.contentManager = new ContentManager();
}


