// js/main.js — Entry point: imports and initialises all modules
import { initNavbar }        from './navbar.js';
import { initHeroParticles } from './hero.js';
import { initStats }         from './stats.js';
import { initScrollReveal }  from './scrollReveal.js';
import { initMembership }    from './membership.js';
import { initTestimonials }  from './testimonials.js';
import { initGallery }       from './gallery.js';
import { initContactForm }   from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroParticles();
  initStats();
  initScrollReveal();
  initMembership();
  initTestimonials();
  initGallery();
  initContactForm();

  console.log('%c💪 BTB Health Club — Be The Best!', 'color: #e8321e; font-size: 16px; font-weight: bold;');
});
