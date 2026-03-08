// js/membership.js — Monthly/Annual plan toggle with price animation
export function initMembership() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const priceEls = document.querySelectorAll('.price-amount');

    if (!toggleBtns.length) return;

    let currentPeriod = 'monthly';

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const period = btn.dataset.period;
            if (period === currentPeriod) return;
            currentPeriod = period;

            // Update toggle active state
            toggleBtns.forEach(b => b.classList.toggle('active', b.dataset.period === period));

            // Animate and update prices
            priceEls.forEach(el => {
                el.style.transform = 'scale(0.85)';
                el.style.opacity = '0';

                setTimeout(() => {
                    const newPrice = el.dataset[period];
                    if (newPrice) {
                        el.textContent = newPrice;
                        el.style.transform = 'scale(1)';
                        el.style.opacity = '1';
                    }
                }, 200);
            });
        });
    });

    // Smooth price element transitions
    priceEls.forEach(el => {
        el.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
    });
}
