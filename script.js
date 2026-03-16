/* =====================================================
   SACHIN P - PORTFOLIO | JAVASCRIPT
   ===================================================== */

'use strict';

// ── Preloader ─────────────────────────────────────────
const loaderProgressBar = document.getElementById('loaderProgressBar');
const loaderPercentage = document.getElementById('loaderPercentage');
const preloader = document.getElementById('preloader');

let loadProgress = 0;
const fakeLoadInterval = setInterval(() => {
    loadProgress += Math.random() * 8 + 2;
    if (loadProgress >= 90) {
        loadProgress = 90;
    }
    updateLoader(loadProgress);
}, 60);

function updateLoader(val) {
    if (loaderProgressBar) loaderProgressBar.style.width = `${val}%`;
    if (loaderPercentage) loaderPercentage.textContent = `${Math.floor(val)}%`;
}

window.addEventListener('load', () => {
    clearInterval(fakeLoadInterval);
    if (!preloader) return;
    
    updateLoader(100);
    preloader.classList.add('loading-complete');
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 600);
    }, 450);
});

// ── Typing Animation ─────────────────────────────────
const typingStrings = [
    'Full-Stack Developer',
    'MERN Stack Enthusiast',
    'Problem Solver (200+ LeetCode)',
    'React.js Developer',
    'Open to Internships'
];
let typeIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
    const current = typingStrings[typeIdx];
    if (isDeleting) {
        typingEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
    } else {
        typingEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
    }
    if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
    }
    if (isDeleting && charIdx === 0) {
        isDeleting = false;
        typeIdx = (typeIdx + 1) % typingStrings.length;
        setTimeout(typeLoop, 400);
        return;
    }
    setTimeout(typeLoop, isDeleting ? 40 : 75);
}
typeLoop();

// ── Floating Particles ────────────────────────────────
function createParticles() {
    const colors = ['rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(16,185,129,', 'rgba(245,158,11,'];
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.4 + 0.1;
        const dur = Math.random() * 20 + 12;
        const delay = Math.random() * 15;
        const left = Math.random() * 100;
        p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}vw;
      background:${color}${opacity});
      animation-duration:${dur}s;
      animation-delay:-${delay}s;
    `;
        document.body.appendChild(p);
    }
}
createParticles();

// ── Navbar Scroll ─────────────────────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
    const y = window.scrollY;
    // Navbar glass effect
    navbar.classList.toggle('scrolled', y > 60);
    // Back to top
    backToTop.classList.toggle('visible', y > 400);
    // Active nav link
    let current = '';
    sections.forEach(sec => {
        if (y >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}
window.addEventListener('scroll', onScroll, { passive: true });

// ── Back To Top ───────────────────────────────────────
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Hamburger Menu ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinksMenu.classList.toggle('open');
    hamburger.querySelector('span:nth-child(1)').style.transform =
        navLinksMenu.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
    hamburger.querySelector('span:nth-child(2)').style.opacity =
        navLinksMenu.classList.contains('open') ? '0' : '1';
    hamburger.querySelector('span:nth-child(3)').style.transform =
        navLinksMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});
document.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => navLinksMenu.classList.remove('open'))
);

// ── Intersection Observer (Reveal + Bars) ─────────────
const revealEls = document.querySelectorAll('.reveal');
const tbFills = document.querySelectorAll('.tb-fill');
const lcBar = document.querySelector('.lc-bar');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        // Animate tech progress bars
        tbFills.forEach(bar => {
            if (entry.target.contains(bar) || entry.target === bar.closest('.tech-bars-wrap')) {
                bar.style.width = bar.dataset.width;
            }
        });
        // Animate lc bar
        if (lcBar && (entry.target.contains(lcBar) || entry.target === lcBar.closest('.about-card'))) {
            lcBar.style.width = lcBar.dataset.width;
        }
        observer.unobserve(entry.target);
    });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// Observe tech-bars-wrap separately for bar animation
const techWrap = document.querySelector('.tech-bars-wrap');
if (techWrap) {
    const barObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            tbFills.forEach(bar => { bar.style.width = bar.dataset.width; });
            barObs.disconnect();
        }
    }, { threshold: 0.2 });
    barObs.observe(techWrap);
}

// Observe about card for lc bar
const aboutCards = document.querySelectorAll('.about-card');
aboutCards.forEach(card => {
    const lcBarInCard = card.querySelector('.lc-bar');
    if (lcBarInCard) {
        const lcObs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                lcBarInCard.style.width = lcBarInCard.dataset.width;
                lcObs.disconnect();
            }
        }, { threshold: 0.3 });
        lcObs.observe(card);
    }
});

// ── Staggered reveal delays ───────────────────────────
document.querySelectorAll('.about-grid .reveal, .skills-grid .reveal, .projects-grid .reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
});

// ── Smooth Scroll for anchor links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Contact Form ──────────────────────────────────────
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

function showToast(msg, success = true) {
    toastMsg.textContent = msg;
    toast.querySelector('i').className = success ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    toast.style.color = success ? 'var(--secondary)' : '#f43f5e';
    toast.style.borderColor = success ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.4)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // 📧 EmailJS — sends the form to your Gmail
    emailjs.sendForm(
        'service_9thpqyl',   // ✅ Service ID
        'template_kgvsdxh',  // ✅ Template ID
        form
    ).then(() => {
        btn.innerHTML = origHTML;
        btn.disabled = false;
        form.reset();
        showToast('Message sent! I\'ll get back to you soon.', true);
    }).catch((err) => {
        console.error('EmailJS error:', err);
        btn.innerHTML = origHTML;
        btn.disabled = false;
        showToast('Oops! Something went wrong. Try emailing directly.', false);
    });
});

// ── Cursor Glow Effect ────────────────────────────────
const glow = document.createElement('div');
glow.style.cssText = `
  position:fixed; pointer-events:none; z-index:0; width:280px; height:280px;
  border-radius:50%; background:radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
  transform:translate(-50%,-50%); transition:left 0.15s ease,top 0.15s ease;
  will-change:left,top;
`;
document.body.appendChild(glow);
window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
}, { passive: true });

// ── Project Cards Tilt ────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `translateY(-4px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
        card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.3s cubic-bezier(0.4,0,0.2,1)';
    });
});

// ── Stat Counter Animation ────────────────────────────
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
        if (current >= target) clearInterval(timer);
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(el => {
            const val = parseFloat(el.textContent.replace('+', ''));
            const suffix = el.textContent.includes('+') ? '+' : '';
            el.textContent = '0' + suffix;
            animateCounter(el, val, suffix);
        });
        statsObserver.disconnect();
    }
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
