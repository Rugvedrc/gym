// js/scrollReveal.js — Intersection Observer-based scroll reveal animations
export function initScrollReveal() {
    // Add .reveal class to key elements
    const targets = [
        { selector: '.section-header', modifier: '' },
        { selector: '.about-visual', modifier: 'reveal-left' },
        { selector: '.about-content', modifier: 'reveal-right' },
        { selector: '.service-card', modifier: '' },
        { selector: '.class-card', modifier: '' },
        { selector: '.trainer-card', modifier: '' },
        { selector: '.plan-card', modifier: '' },
        { selector: '.gallery-item', modifier: 'reveal-scale' },
        { selector: '.testimonial-card', modifier: '' },
        { selector: '.contact-card', modifier: 'reveal-left' },
        { selector: '.contact-form', modifier: 'reveal-right' },
        { selector: '.timetable-wrapper', modifier: '' },
        { selector: '.stat-item', modifier: '' },
    ];

    targets.forEach(({ selector, modifier }) => {
        document.querySelectorAll(selector).forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
                if (modifier) el.classList.add(modifier);
            }
        });
    });

    // Special: grids get staggered children
    const staggerParents = [
        '.services-grid',
        '.classes-grid',
        '.trainers-grid',
        '.plans-grid',
        '.stats-container',
    ];
    staggerParents.forEach(sel => {
        const el = document.querySelector(sel);
        if (el && !el.classList.contains('reveal-children')) {
            el.classList.add('reveal-children');
        }
    });

    // Observe all .reveal and .reveal-children
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .reveal-children').forEach(el => {
        observer.observe(el);
    });
}
