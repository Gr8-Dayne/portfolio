// Modernized main.js - Vanilla JS only
// Handles navigation, smooth scrolling, and preload removal
// Prepares for dark mode and scroll animations

// Remove is-preload class after page load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.remove('is-preload');
  }, 100);
});

// Smooth scroll for nav links and highlight active section
const nav = document.getElementById('nav');
if (nav) {
  const navLinks = nav.querySelectorAll('a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(targetId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
        // Remove active from all, add to clicked
        navLinks.forEach(l => l.classList.remove('active', 'active-locked'));
        link.classList.add('active', 'active-locked');
      }
    });
  });

  // Highlight nav link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
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

// Prepare for dark mode and scroll animations (to be added)

// --- Dark Mode Toggle ---
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeIcon = document.getElementById('dark-mode-icon');
const htmlEl = document.documentElement;

function setDarkMode(enabled) {
  if (enabled) {
    htmlEl.setAttribute('data-theme', 'dark');
    if (darkModeIcon) darkModeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    htmlEl.removeAttribute('data-theme');
    if (darkModeIcon) darkModeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    setDarkMode(!isDark);
  });
}

// Restore theme on load
(function restoreTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') setDarkMode(true);
  else setDarkMode(false);
})();

// --- Scroll Reveal Animations ---
const revealEls = document.querySelectorAll('section, .reveal-on-scroll');
const revealClass = 'revealed';
if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(revealClass);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

// --- Scroll-to-Top Button ---
const scrollBtn = document.createElement('button');
scrollBtn.id = 'scroll-to-top';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
scrollBtn.innerHTML = '⬆️';
scrollBtn.style.display = 'none';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});