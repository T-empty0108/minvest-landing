/* ==========================================
   mInvest Smart Trading - JavaScript v5
   Cursor Glow inside schedule-card
========================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing v5...');
    document.body.classList.add('js-ready');
    
    initScrollAnimations();
    initGlobalParticles();
    initButtonEffects();
    initNumberCounter();
    initScrollProgressBar();
    initLightbox();
    initTypingEffect();
    initParallax();
    initMagneticButtons();
    initCursorGlow();
    
    console.log('All v5 functions initialized');
});

/* ==========================================
   SCROLL ANIMATIONS
========================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                setTimeout(() => {
                    element.classList.add('visible');
                }, delay);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
}

/* ==========================================
   GLOBAL PARTICLES
========================================== */
function initGlobalParticles() {
    const globalParticles = document.createElement('div');
    globalParticles.id = 'global-particles';
    globalParticles.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        pointer-events: none; z-index: 1; overflow: hidden;
    `;
    document.body.prepend(globalParticles);
    
    for (let i = 0; i < 30; i++) {
        createGlobalParticle(globalParticles);
    }
}

function createGlobalParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const colors = ['rgba(0, 114, 255, 0.4)', 'rgba(0, 162, 255, 0.4)', 'rgba(82, 235, 253, 0.3)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%;
        bottom: -10px;
        background: ${color};
        border-radius: 50%;
        opacity: 0;
        box-shadow: 0 0 ${size * 3}px ${color};
        animation: global-particle-float ${Math.random() * 20 + 15}s linear ${Math.random() * 15}s infinite;
    `;
    container.appendChild(particle);
}

/* ==========================================
   NUMBER COUNTER - +2000
========================================== */
function initNumberCounter() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseFloat(element.dataset.count);
                const prefix = element.dataset.prefix || '';
                const suffix = element.dataset.suffix || '';
                const decimals = parseInt(element.dataset.decimals) || 0;
                
                animateCounter(element, target, prefix, suffix, decimals, 2500);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.2 });
    
    counters.forEach(counter => {
        const prefix = counter.dataset.prefix || '';
        counter.textContent = prefix + '0';
        observer.observe(counter);
    });
}

function animateCounter(element, target, prefix, suffix, decimals, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = target * easeOut;
        
        element.textContent = prefix + Math.floor(currentValue).toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */
function initScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 3px;
        background: linear-gradient(90deg, #0072ff, #00a2ff, #52ebfd);
        width: 0%; z-index: 9999;
        box-shadow: 0 0 10px rgba(0, 114, 255, 0.5);
    `;
    document.body.prepend(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ==========================================
   BUTTON EFFECTS
========================================== */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button-wrapper');
    buttons.forEach(button => {
        button.classList.add('pulse-animation');
    });
}

/* ==========================================
   TYPING EFFECT
========================================== */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const fullText = 'Sau 10 năm giao dịch trên thị trường và đào tạo thực chiến';
    let currentIndex = 0;
    let isTyping = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTyping) {
                isTyping = true;
                typeText();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(typingElement.parentElement);
    
    function typeText() {
        if (currentIndex < fullText.length) {
            let displayText = fullText.substring(0, currentIndex + 1);
            
            // Highlight "10 năm"
            displayText = displayText.replace('10 năm', '<span class="neon-text">10 năm</span>');
            // Highlight "đào tạo thực chiến"
            displayText = displayText.replace('đào tạo thực chiến', '<span class="gradient-text">đào tạo thực chiến</span>');
            
            typingElement.innerHTML = displayText;
            currentIndex++;
            setTimeout(typeText, 50);
        }
    }
}

/* ==========================================
   PARALLAX SCROLLING
========================================== */
function initParallax() {
    const heroImage = document.getElementById('parallax-hero');
    if (!heroImage) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroSection = document.getElementById('hero');
                
                if (heroSection) {
                    const heroHeight = heroSection.offsetHeight;
                    
                    if (scrolled <= heroHeight) {
                        const parallaxSpeed = 0.5;
                        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                    }
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

/* ==========================================
   MAGNETIC BUTTONS
========================================== */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const maxMove = 10;
            const moveX = (x / rect.width) * maxMove * 2;
            const moveY = (y / rect.height) * maxMove * 2;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

/* ==========================================
   CURSOR GLOW EFFECT (Inside Schedule Card)
========================================== */
function initCursorGlow() {
    const scheduleCard = document.getElementById('schedule-card');
    const cursorGlow = document.getElementById('cursor-glow');
    
    if (!scheduleCard || !cursorGlow) return;
    
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    scheduleCard.addEventListener('mousemove', (e) => {
        const rect = scheduleCard.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // Smooth follow
    function animateCursor() {
        const ease = 0.1;
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;
        
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

/* ==========================================
   LIGHTBOX
========================================== */
function initLightbox() {
    // === LIGHTBOX SIMPLE (Benefits) ===
    const lightboxSimple = document.getElementById('lightbox-simple');
    const lightboxSimpleImage = document.getElementById('lightbox-simple-image');
    const lightboxSimpleClose = document.getElementById('lightbox-simple-close');
    const benefitImages = document.querySelectorAll('[data-lightbox-simple]');
    
    if (lightboxSimple && lightboxSimpleImage) {
        benefitImages.forEach((wrapper) => {
            wrapper.style.cursor = 'pointer';
            wrapper.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const img = this.querySelector('img');
                if (img && img.src) {
                    lightboxSimpleImage.src = img.src;
                    lightboxSimpleImage.alt = img.alt || 'Image';
                    lightboxSimple.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        lightboxSimpleClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeLightboxSimple();
        });
        
        lightboxSimple.addEventListener('click', function(e) {
            if (e.target === lightboxSimple) {
                closeLightboxSimple();
            }
        });
    }
    
    function closeLightboxSimple() {
        lightboxSimple.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // === LIGHTBOX FULL (Timeline) ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.getElementById('lightbox-close');
    const timelineImages = document.querySelectorAll('[data-lightbox]');
    
    if (lightbox && lightboxImage) {
        timelineImages.forEach((wrapper) => {
            wrapper.style.cursor = 'pointer';
            wrapper.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const img = this.querySelector('img');
                const timelineItem = this.closest('.timeline-item-zigzag');
                
                if (img && img.src && timelineItem) {
                    const titleEl = timelineItem.querySelector('.timeline-title-zigzag');
                    const descEl = timelineItem.querySelector('.timeline-text-zigzag');
                    
                    lightboxImage.src = img.src;
                    lightboxImage.alt = img.alt || 'Image';
                    
                    if (titleEl) lightboxTitle.textContent = titleEl.textContent;
                    if (descEl) lightboxDescription.textContent = descEl.textContent;
                    
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        lightboxClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeLightbox();
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // === ESCAPE KEY ===
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (lightboxSimple && lightboxSimple.classList.contains('active')) {
                closeLightboxSimple();
            }
            if (lightbox && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        }
    });
}

/* ==========================================
   INJECT CSS ANIMATIONS
========================================== */
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes global-particle-float {
        0% { transform: translateY(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh); opacity: 0; }
    }
    
    .pulse-animation {
        animation: button-pulse 2s ease-in-out infinite;
    }
    
    @keyframes button-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(0, 114, 255, 0.4); }
        50% { box-shadow: 0 0 0 15px rgba(0, 114, 255, 0); }
    }
`;
document.head.appendChild(additionalStyles);

console.log('Script v5 loaded');
