// js/navbar.js — Sticky navbar with scroll detection, active links, and mobile menu
export function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');
    const allLinks = navLinks.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], div[id="home"]');

    // ---- Scroll: add .scrolled class ----
    const onScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on init

    // ---- Hamburger toggle ----
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // ---- Close menu on link click ----
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // ---- Active link via IntersectionObserver ----
    function updateActiveLink() {
        const scrollY = window.scrollY + 100;

        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            if (section.offsetTop <= scrollY) {
                current = section.getAttribute('id');
            }
        });

        allLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            link.classList.toggle('active', href === current);
        });
    }

    // ---- Smooth scroll offset correction ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = navbar.offsetHeight + 20;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}
