/* ================================================
   THE HEAVENS BANQUET LAWN — main.js
   ================================================ */

'use strict';

/* -----------------------------------------------
   1. GALLERY SLIDESHOW
   Probe-pattern: tries resources/1.webp, 2.webp…
   stops on first 404. Drop a new numbered .webp
   in resources/ and it auto-discovers on reload.
   ----------------------------------------------- */
const GALLERY_DIR       = 'resources/';
const GALLERY_EXT       = '.webp';
const AUTOPLAY_INTERVAL = 4000; // ms
const SWIPE_THRESHOLD   = 50;   // px

const slidesTrack  = document.getElementById('slidesTrack');
const dotsWrap     = document.getElementById('slideDots');
const counterEl    = document.getElementById('slideCounter');
const loadingEl    = document.getElementById('slideshowLoading');
const btnPrev      = document.getElementById('btnPrev');
const btnNext      = document.getElementById('btnNext');

let images   = [];   // array of loaded image paths
let current  = 0;
let timer    = null;
let isDragging = false;
let touchStartX = 0;

function probeImages(index, done) {
  const img = new Image();
  img.src = GALLERY_DIR + index + GALLERY_EXT;
  img.onload  = () => { images.push(img.src); probeImages(index + 1, done); };
  img.onerror = () => done(images);
}

function buildSlideshow(paths) {
  if (!slidesTrack) return;

  // Hide loader
  if (loadingEl) loadingEl.style.display = 'none';

  paths.forEach((src, i) => {
    // Slide
    const slide = document.createElement('div');
    slide.className = 'slide';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'The Heavens Banquet Lawn — image ' + (i + 1);
    img.loading = i < 2 ? 'eager' : 'lazy'; // first two eager, rest lazy
    slide.appendChild(img);
    slidesTrack.appendChild(slide);

    // Dot
    if (dotsWrap) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  });

  updateCounter();
  startAutoplay();
}

function goTo(index) {
  const total = images.length;
  if (!total) return;
  current = ((index % total) + total) % total; // wrap around
  slidesTrack.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
  updateCounter();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

function updateDots() {
  const dots = dotsWrap ? dotsWrap.querySelectorAll('.dot') : [];
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function updateCounter() {
  if (counterEl && images.length) {
    counterEl.textContent = `${current + 1} / ${images.length}`;
  }
}

function startAutoplay() {
  clearInterval(timer);
  timer = setInterval(next, AUTOPLAY_INTERVAL);
}

function pauseAutoplay() {
  clearInterval(timer);
}

// Button listeners
if (btnPrev) btnPrev.addEventListener('click', () => { prev(); startAutoplay(); });
if (btnNext) btnNext.addEventListener('click', () => { next(); startAutoplay(); });

// Keyboard navigation (only when gallery in viewport)
const gallerySection = document.getElementById('gallery');
let galleryInView = false;

if (gallerySection) {
  const galleryObserver = new IntersectionObserver(
    entries => { galleryInView = entries[0].isIntersecting; },
    { threshold: 0.3 }
  );
  galleryObserver.observe(gallerySection);
}

document.addEventListener('keydown', e => {
  if (!galleryInView) return;
  if (e.key === 'ArrowLeft')  { prev(); startAutoplay(); }
  if (e.key === 'ArrowRight') { next(); startAutoplay(); }
});

// Touch / Swipe
if (slidesTrack) {
  // Pause on hover (desktop)
  slidesTrack.parentElement.addEventListener('mouseenter', pauseAutoplay);
  slidesTrack.parentElement.addEventListener('mouseleave', startAutoplay);

  // Touch swipe
  slidesTrack.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
    isDragging = true;
    pauseAutoplay();
  }, { passive: true });

  slidesTrack.addEventListener('touchend', e => {
    if (!isDragging) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      deltaX < 0 ? next() : prev();
    }
    isDragging = false;
    startAutoplay();
  }, { passive: true });
}

// Boot: probe images starting at 1
probeImages(1, paths => {
  if (paths.length === 0) {
    if (loadingEl) loadingEl.textContent = 'No images found.';
    return;
  }
  buildSlideshow(paths);
});

/* -----------------------------------------------
   2. NAVBAR — scroll class toggle
   ----------------------------------------------- */
const navbar = document.querySelector('.navbar');
const heroSection = document.getElementById('home');

if (navbar && heroSection) {
  const navObserver = new IntersectionObserver(
    entries => {
      // Add .scrolled when hero leaves viewport
      navbar.classList.toggle('scrolled', !entries[0].isIntersecting);
    },
    { rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-h').trim()} 0px 0px 0px` }
  );
  navObserver.observe(heroSection);
}

/* -----------------------------------------------
   3. HAMBURGER MENU — close on nav link click
   ----------------------------------------------- */
const hamburgerCheckbox = document.getElementById('hamburgerToggle');
if (hamburgerCheckbox) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerCheckbox.checked = false;
    });
  });
}

/* -----------------------------------------------
   4. SCROLL REVEAL — IntersectionObserver
   ----------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // once only
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => revealObserver.observe(el));
}

/* -----------------------------------------------
   5. CONTACT FORM — Formspree submission
   ----------------------------------------------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const data = new FormData(contactForm);
      const res  = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#25D366';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      btn.textContent = 'Error — Try Again';
      btn.style.background = '#c0392b';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  });
}

/* -----------------------------------------------
   6. ACTIVE NAV LINK — highlight based on scroll
   ----------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'nav-active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));
