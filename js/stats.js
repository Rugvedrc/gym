// js/stats.js — Animated number counter triggered by scroll into view
export function initStats() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    let triggered = false;

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !triggered) {
            triggered = true;
            runCounters();
            observer.disconnect();
        }
    }, { threshold: 0.4 });

    observer.observe(statsSection);
}

function runCounters() {
    const counters = document.querySelectorAll('.stat-num[data-target]');

    counters.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000; // ms
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                return;
            }
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    });
}
