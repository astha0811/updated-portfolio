/* ---- 1. Preloader: hide once page is ready ---- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader.classList.add('hidden'), 400);
});

/* ---- 2. Theme toggle with localStorage persistence ---- */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('astha-theme');

if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
} else {
  // Default to user's OS preference if no saved choice
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  body.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
}

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  localStorage.setItem('astha-theme', next);
});

/* ---- 3. Navbar scroll state ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---- 4. Mobile nav toggle ---- */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav after clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---- 5. Scroll progress bar ---- */
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = progress + '%';
});

/* ---- 6. Back-to-top button ---- */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- 7. Scroll reveal animations (Intersection Observer) ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ---- 8. Typing effect for hero roles ---- */
const roles = [
  "Computer Science Student",
  "Frontend Web Developer",
  "Aspiring Software Engineer",
  "Problem Solver & Builder"
];
const typedEl = document.getElementById('typed-role');
let roleIndex = 0;
let charIndex = roles[0].length;
let isDeleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
    typedEl.textContent = currentRole.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 40);
  } else {
    charIndex++;
    typedEl.textContent = currentRole.substring(0, charIndex);
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 70);
  }
}
// Start the loop after the initial role has displayed for a moment
setTimeout(() => {
  isDeleting = true;
  typeLoop();
}, 2000);

/* ---- 9. Animated stat counters (trigger on scroll into view) ---- */
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

statNumbers.forEach(el => statObserver.observe(el));

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1200;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(update);
}

/* ---- 10. Contact form validation (front-end only) ---- */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');

  // Reset previous errors
  errorName.textContent = '';
  errorEmail.textContent = '';
  errorMessage.textContent = '';
  formStatus.classList.remove('show', 'success');

  let isValid = true;

  if (name.value.trim().length < 2) {
    errorName.textContent = 'Please enter your name.';
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    errorEmail.textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    errorMessage.textContent = 'Message should be at least 10 characters.';
    isValid = false;
  }

  if (isValid) {
    // Front-end only: show success state. Hook up to a backend / form service as needed.
    formStatus.textContent = "Thanks for reaching out! I'll get back to you soon.";
    formStatus.classList.add('show', 'success');
    contactForm.reset();
  }
});

/* ---- 11. Footer year ---- */
document.getElementById('footer-year').textContent = new Date().getFullYear();

/* ---- 12. Resume button placeholder ---- */
document.getElementById('resume-btn').addEventListener('click', (e) => {
  // Replace '#' with an actual resume file path (e.g. 'assets/resume.pdf') when available.
  if (e.currentTarget.getAttribute('href') === '#') {
    e.preventDefault();
    alert('Add your resume PDF and update the Download Resume button link.');
  }
});