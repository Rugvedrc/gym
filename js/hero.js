// js/hero.js — Animated particle system for the hero section
export function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const COUNT = 40;

    for (let i = 0; i < COUNT; i++) {
        spawnParticle(container, i * (10000 / COUNT));
    }
}

function spawnParticle(container, delay) {
    const el = document.createElement('div');
    el.className = 'particle';

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 6000 + 4000;
    const opacity = Math.random() * 0.6 + 0.2;

    el.style.cssText = `
    width:  ${size}px;
    height: ${size}px;
    left:   ${left}%;
    bottom: ${Math.random() * 30}%;
    animation-duration:  ${duration}ms;
    animation-delay:     ${delay}ms;
    opacity: ${opacity};
  `;

    // Randomise colour between primary, secondary and accent
    const colours = ['#e8321e', '#ff6b35', '#ffa726', '#fff'];
    el.style.background = colours[Math.floor(Math.random() * colours.length)];

    container.appendChild(el);
}
