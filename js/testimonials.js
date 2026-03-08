// js/testimonials.js — Auto-advancing testimonial carousel with dots and controls
export function initTestimonials() {
    const track = document.getElementById('testimonials-track');
    const dotsWrap = document.getElementById('t-dots');
    const prevBtn = document.getElementById('t-prev');
    const nextBtn = document.getElementById('t-next');

    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    let current = 0;
    let autoTimer = null;
    let perView = getPerView();

    // ---- Build dots ----
    const dots = [];
    const dotCount = total - perView + 1;

    function buildDots() {
        dotsWrap.innerHTML = '';
        dots.length = 0;
        const pv = getPerView();
        const cnt = Math.max(1, total - pv + 1);
        for (let i = 0; i < cnt; i++) {
            const d = document.createElement('button');
            d.className = 't-dot' + (i === current ? ' active' : '');
            d.setAttribute('aria-label', `Testimonial ${i + 1}`);
            d.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(d);
            dots.push(d);
        }
    }

    function getPerView() {
        if (window.innerWidth >= 900) return 3;
        if (window.innerWidth >= 600) return 2;
        return 1;
    }

    function goTo(index) {
        perView = getPerView();
        const maxIdx = Math.max(0, total - perView);
        current = Math.min(Math.max(index, 0), maxIdx);

        // Calculate card width including gap
        const cardEl = cards[0];
        const cardWidth = cardEl.offsetWidth;
        const gap = 24; // var(--sp-lg) equivalent
        const offset = current * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        // Update active dot
        dots.forEach((d, i) => d.classList.toggle('active', i === current));

        // Update active card highlight
        cards.forEach((c, i) => c.classList.toggle('active', i === current));
    }

    function next() {
        perView = getPerView();
        const maxIdx = Math.max(0, total - perView);
        goTo(current < maxIdx ? current + 1 : 0);
    }

    function prev() {
        perView = getPerView();
        const maxIdx = Math.max(0, total - perView);
        goTo(current > 0 ? current - 1 : maxIdx);
    }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(next, 5000);
    }

    function stopAuto() {
        if (autoTimer) clearInterval(autoTimer);
    }

    // ---- Event listeners ----
    prevBtn?.addEventListener('click', () => { prev(); startAuto(); });
    nextBtn?.addEventListener('click', () => { next(); startAuto(); });

    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);

    // Touch / swipe support
    let touchStartX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].clientX;
        stopAuto();
    }, { passive: true });

    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
        }
        startAuto();
    }, { passive: true });

    window.addEventListener('resize', () => {
        buildDots();
        goTo(0);
    });

    // ---- Init ----
    buildDots();
    goTo(0);
    startAuto();
}
