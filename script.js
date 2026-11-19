/* =====================================================
   SACHIN P - PORTFOLIO | JAVASCRIPT (OPTIMIZED)
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
        clearInterval(fakeLoadInterval);
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
        }, 500);
    }, 400);
});

// ── Typing Animation ─────────────────────────────────
const typingStrings = [
    'Full-Stack Developer',
    'MERN Stack Engineer',
    'Problem Solver (200+ LeetCode)',
    'React.js Developer',
    'Open to Work'
];
let typeIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
    if (!typingEl) return;
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

// ── Floating Particles (Batch Appended & Mobile Optimized) ───
function createParticles() {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 8 : 16;
    const colors = ['rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(16,185,129,', 'rgba(245,158,11,'];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3.5 + 1.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = (Math.random() * 0.35 + 0.1).toFixed(2);
        const dur = (Math.random() * 18 + 12).toFixed(1);
        const delay = (Math.random() * 14).toFixed(1);
        const left = Math.floor(Math.random() * 100);

        p.style.cssText = `
            width:${size}px; height:${size}px;
            left:${left}vw;
            background:${color}${opacity});
            animation-duration:${dur}s;
            animation-delay:-${delay}s;
        `;
        fragment.appendChild(p);
    }
    document.body.appendChild(fragment);
}
createParticles();

// ── Navbar Scroll (RAF Throttled) ─────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNavOnScroll() {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 60);
    if (backToTop) backToTop.classList.toggle('visible', y > 400);

    let current = '';
    sections.forEach(sec => {
        if (y >= sec.offsetTop - 130) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', isActive);
    });
}

let isScrollTicking = false;
window.addEventListener('scroll', () => {
    if (!isScrollTicking) {
        window.requestAnimationFrame(() => {
            updateNavOnScroll();
            isScrollTicking = false;
        });
        isScrollTicking = true;
    }
}, { passive: true });

// ── Back To Top ───────────────────────────────────────
if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Hamburger Menu & Mobile Drawer ───────────────────
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

function toggleMobileMenu(forceState) {
    if (!navLinksMenu) return;
    const shouldOpen = forceState !== undefined ? forceState : !navLinksMenu.classList.contains('open');
    navLinksMenu.classList.toggle('open', shouldOpen);
    if (hamburger) hamburger.classList.toggle('active', shouldOpen);
    if (navBackdrop) navBackdrop.classList.toggle('active', shouldOpen);
    document.body.classList.toggle('menu-locked', shouldOpen);
}

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
}

if (navBackdrop) {
    navBackdrop.addEventListener('click', () => toggleMobileMenu(false));
}

document.querySelectorAll('.nav-link, .mobile-cta-btn').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
});

// ── Unified Intersection Observer (Reveal + Skills & LeetCode Bars) ──
const revealEls = document.querySelectorAll('.reveal');
const tbFills = document.querySelectorAll('.tb-fill');
const lcBar = document.querySelector('.lc-bar');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        target.classList.add('visible');

        // Animate tech progress bars when tech section enters view
        if (target.classList.contains('tech-bars-wrap') || target.querySelector('.tech-bars-wrap')) {
            tbFills.forEach(bar => {
                if (bar.dataset.width) bar.style.width = bar.dataset.width;
            });
        }

        // Animate LeetCode milestone bar when spotlight enters view
        if (lcBar && (target.classList.contains('leetcode-spotlight') || target.contains(lcBar))) {
            if (lcBar.dataset.width) lcBar.style.width = lcBar.dataset.width;
        }

        revealObserver.unobserve(target);
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Staggered reveal delays ───────────────────────────
document.querySelectorAll('.about-grid .reveal, .skills-grid .reveal, .projects-grid .reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.08}s`;
});

// ── Smooth Scroll for anchor links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const hash = a.getAttribute('href');
        if (hash.length > 1) {
            const target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ── Contact Section Interactions (Executive Suite) ───
const form = document.getElementById('contactForm');
const contactStatusCard = document.getElementById('contactStatusCard');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const copyTooltip = document.getElementById('copyTooltip');
const topicChips = document.getElementById('topicChips');
const contactSubject = document.getElementById('contactSubject');

const EMAILJS_CONFIG = {
    publicKey: 'Hc3qm5pkpS9zH-iI-',
    serviceId: 'service_9thpqyl',
    templateId: 'template_kgvsdxh'
};

// Safe initialization
if (typeof emailjs !== 'undefined') {
    try {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    } catch (e) {
        console.warn('EmailJS init note:', e);
    }
}

// 1. Toast Notification Helper
function showToast(msg, success = true) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    const icon = toast.querySelector('i');
    if (icon) {
        icon.className = success ? 'fas fa-check-circle' : 'fas fa-info-circle';
    }
    toast.style.color = success ? 'var(--secondary)' : '#38bdf8';
    toast.style.borderColor = success ? 'rgba(16,185,129,0.4)' : 'rgba(56,189,248,0.4)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3800);
}

// 2. Click-to-Copy Email with Tooltip Feedback
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
        const email = 'sachinabi67@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            copyEmailBtn.classList.add('copied');
            if (copyTooltip) copyTooltip.textContent = 'Copied! ✓';
            showToast('Email copied to clipboard! (sachinabi67@gmail.com)', true);
            setTimeout(() => {
                copyEmailBtn.classList.remove('copied');
                if (copyTooltip) copyTooltip.textContent = 'Copy';
            }, 2500);
        }).catch(() => {
            showToast('sachinabi67@gmail.com', true);
        });
    });
}

// 3. Interactive Topic Chips
if (topicChips && contactSubject) {
    topicChips.querySelectorAll('.topic-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            topicChips.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            contactSubject.value = chip.dataset.subject;
            contactSubject.focus();
        });
    });
}

// Helper: Escape HTML for safe rendering in status cards
function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

// 4. Render Success State
function showSuccessCard(name) {
    if (!form || !contactStatusCard) return;
    form.style.display = 'none';
    contactStatusCard.style.display = 'block';
    contactStatusCard.innerHTML = `
        <div class="status-icon-circle success">
            <i class="fas fa-check"></i>
        </div>
        <h3 class="status-title">Message Delivered Successfully!</h3>
        <p class="status-desc">
            Thank you, <strong>${escapeHtml(name)}</strong>! Your note has been delivered directly to my inbox (<strong>sachinabi67@gmail.com</strong>). I typically respond within 24 hours.
        </p>
        <button type="button" class="btn btn-ghost" id="resetContactFormBtn" style="margin: 0 auto;">
            <i class="fas fa-redo"></i> Send Another Message
        </button>
    `;

    document.getElementById('resetContactFormBtn')?.addEventListener('click', () => {
        form.reset();
        contactStatusCard.style.display = 'none';
        form.style.display = 'block';
    });
}

// 5. Render Direct Delivery Hub (Seamless Fail-Safe)
function showDirectDeliveryHub(name, email, subject, message) {
    if (!form || !contactStatusCard) return;
    form.style.display = 'none';
    contactStatusCard.style.display = 'block';

    const safeSubject = subject || 'Portfolio Inquiry for Sachin P';
    const emailBody = `Hi Sachin,\n\n${message}\n\nBest regards,\n${name}\n${email}`;

    // Gmail Web Composer URL (works 100% on any browser without OS mail client)
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sachinabi67@gmail.com&su=${encodeURIComponent(safeSubject)}&body=${encodeURIComponent(emailBody)}`;

    // WhatsApp Direct Chat URL
    const waText = `Hi Sachin, I saw your portfolio!\n*Subject:* ${safeSubject}\n*From:* ${name} (${email})\n\n${message}`;
    const waUrl = `https://wa.me/919342423515?text=${encodeURIComponent(waText)}`;

    // Standard Desktop Mailto
    const mailtoUrl = `mailto:sachinabi67@gmail.com?subject=${encodeURIComponent(safeSubject)}&body=${encodeURIComponent(emailBody)}`;

    contactStatusCard.innerHTML = `
        <div class="status-icon-circle dispatch">
            <i class="fas fa-paper-plane"></i>
        </div>
        <h3 class="status-title">Your Message is Ready to Send!</h3>
        <p class="status-desc">
            Hi <strong>${escapeHtml(name)}</strong>, select your preferred way to deliver this message directly to Sachin:
        </p>
        <div class="dispatch-options">
            <a href="${gmailWebUrl}" target="_blank" class="dispatch-opt-btn primary-dispatch" rel="noopener noreferrer">
                <span class="dispatch-opt-left">
                    <i class="fas fa-envelope-open-text" style="color: #ef4444;"></i>
                    <span>Send via Gmail Web</span>
                </span>
                <span class="dispatch-opt-badge">1-Click · Recommended</span>
            </a>

            <a href="${waUrl}" target="_blank" class="dispatch-opt-btn wa-dispatch" rel="noopener noreferrer">
                <span class="dispatch-opt-left">
                    <i class="fab fa-whatsapp" style="color: #25D366;"></i>
                    <span>Send via WhatsApp</span>
                </span>
                <span class="dispatch-opt-badge">Instant Chat</span>
            </a>

            <button type="button" class="dispatch-opt-btn" id="copyFullMsgBtn">
                <span class="dispatch-opt-left">
                    <i class="fas fa-copy" style="color: var(--primary-light);"></i>
                    <span id="copyFullMsgText">Copy Full Message</span>
                </span>
                <span class="dispatch-opt-badge">Clipboard</span>
            </button>

            <a href="${mailtoUrl}" class="dispatch-opt-btn">
                <span class="dispatch-opt-left">
                    <i class="fas fa-desktop" style="color: var(--text-muted);"></i>
                    <span>Open Default Mail App</span>
                </span>
                <span class="dispatch-opt-badge">Desktop</span>
            </a>
        </div>
        <button type="button" class="dispatch-back-btn" id="backToEditBtn">
            <i class="fas fa-arrow-left"></i> Edit Message
        </button>
    `;

    // Copy formatted message button handler
    const copyFullBtn = document.getElementById('copyFullMsgBtn');
    const copyFullText = document.getElementById('copyFullMsgText');
    if (copyFullBtn) {
        copyFullBtn.addEventListener('click', () => {
            const fullContent = `To: sachinabi67@gmail.com\nSubject: ${safeSubject}\n\n${emailBody}`;
            navigator.clipboard.writeText(fullContent).then(() => {
                if (copyFullText) copyFullText.textContent = 'Copied to Clipboard! ✓';
                showToast('Message copied! You can paste and send anywhere.', true);
                setTimeout(() => {
                    if (copyFullText) copyFullText.textContent = 'Copy Full Message';
                }, 3000);
            });
        });
    }

    // Back to edit handler
    document.getElementById('backToEditBtn')?.addEventListener('click', () => {
        contactStatusCard.style.display = 'none';
        form.style.display = 'block';
    });
}

// 6. Form Submission Controller
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('contactSubmitBtn');
        const origHTML = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
        }

        const nameVal = (form.name && form.name.value) ? form.name.value.trim() : '';
        const emailVal = (form.email && form.email.value) ? form.email.value.trim() : '';
        const titleVal = (form.title && form.title.value) ? form.title.value.trim() : 'Portfolio Contact';
        const messageVal = (form.message && form.message.value) ? form.message.value.trim() : '';

        // Synchronize hidden template variables
        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
        setVal('hiddenFromName', nameVal);
        setVal('hiddenFromEmail', emailVal);
        setVal('hiddenReplyTo', emailVal);
        setVal('hiddenSubject', titleVal);

        // If EmailJS library not loaded, transition to delivery hub immediately
        if (typeof emailjs === 'undefined') {
            if (submitBtn) {
                submitBtn.innerHTML = origHTML;
                submitBtn.disabled = false;
            }
            showDirectDeliveryHub(nameVal, emailVal, titleVal, messageVal);
            return;
        }

        // Try EmailJS background dispatch
        emailjs.sendForm(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            form,
            EMAILJS_CONFIG.publicKey
        ).then(() => {
            if (submitBtn) {
                submitBtn.innerHTML = origHTML;
                submitBtn.disabled = false;
            }
            showSuccessCard(nameVal);
            showToast('Message sent successfully! I will reply soon.', true);
        }).catch((err) => {
            console.warn('[EmailJS Notice] Background send returned:', err);
            console.warn('[Admin Notice] If using Gmail service, reconnect Gmail in https://dashboard.emailjs.com/admin/services');
            if (submitBtn) {
                submitBtn.innerHTML = origHTML;
                submitBtn.disabled = false;
            }
            // Seamlessly display the 1-Click Delivery Hub
            showDirectDeliveryHub(nameVal, emailVal, titleVal, messageVal);
        });
    });
}

// ── Desktop-Only Pointer Micro-Interactions (Fine Pointer Guard) ───
if (window.matchMedia('(pointer: fine)').matches) {
    // 1. Ambient cursor glow
    const glow = document.createElement('div');
    glow.style.cssText = `
        position:fixed; pointer-events:none; z-index:0; width:280px; height:280px;
        border-radius:50%; background:radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
        transform:translate(-50%,-50%); transition:left 0.12s ease,top 0.12s ease;
        will-change:left,top;
    `;
    document.body.appendChild(glow);

    window.addEventListener('mousemove', e => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    }, { passive: true });

    // 2. Glass Card Dynamic Spotlight Tracking
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
        });
    });

    // 3. Project Cards 3D Tilt
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `translateY(-4px) rotateX(${-y / 22}deg) rotateY(${x / 22}deg)`;
            card.style.transition = 'transform 0.08s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.3s cubic-bezier(0.4,0,0.2,1)';
        });
    });
}

// ── Stat Counter Animation ────────────────────────────
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const step = target / 55;
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
        if (current >= target) clearInterval(timer);
    }, 16);
}

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            heroStats.querySelectorAll('.stat-num').forEach(el => {
                const val = parseFloat(el.textContent.replace('+', ''));
                const suffix = el.textContent.includes('+') ? '+' : '';
                el.textContent = '0' + suffix;
                animateCounter(el, val, suffix);
            });
            statsObserver.disconnect();
        }
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
}
