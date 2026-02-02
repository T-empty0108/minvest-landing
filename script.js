/* ==========================================
   mInvest Smart Trading - JavaScript
   Animations, Particles, Interactions
   COLOR SCHEME: Blue Gradient (#0072ff - #00a2ff - #52ebfd)
========================================== */

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('js-ready');
    
    initScrollAnimations();
    initGlobalParticles();
    initButtonEffects();
    initNumberCounter();
    initTypewriter();
    initScrollProgressBar();
    initMouseGlowEffect();
    initLightbox();
});

/* ==========================================
   SCROLL ANIMATIONS
========================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
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
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* ==========================================
   GLOBAL FLOATING PARTICLES - BLUE
========================================== */
function initGlobalParticles() {
    const globalParticles = document.createElement('div');
    globalParticles.id = 'global-particles';
    globalParticles.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.prepend(globalParticles);
    
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        createGlobalParticle(globalParticles);
    }
    
    const heroParticles = document.getElementById('particles');
    if (heroParticles) {
        for (let i = 0; i < 20; i++) {
            createParticle(heroParticles);
        }
    }
}

function createGlobalParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 15;
    
    // BLUE COLOR PALETTE
    const colors = [
        'rgba(0, 114, 255, 0.4)',
        'rgba(0, 162, 255, 0.4)',
        'rgba(82, 235, 253, 0.3)',
        'rgba(255, 255, 255, 0.2)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: -10px;
        background: ${color};
        border-radius: 50%;
        opacity: 0;
        box-shadow: 0 0 ${size * 3}px ${color};
        animation: global-particle-float ${duration}s linear ${delay}s infinite;
    `;
    
    container.appendChild(particle);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.3;
    
    // BLUE COLOR PALETTE
    const colors = [
        'rgba(0, 114, 255, 0.6)',
        'rgba(0, 162, 255, 0.6)',
        'rgba(82, 235, 253, 0.6)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: ${color};
        opacity: ${opacity};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        box-shadow: 0 0 ${size * 2}px ${color};
    `;
    
    container.appendChild(particle);
}

/* ==========================================
   NUMBER COUNTER ANIMATION - YÊU CẦU 5: +2000 màu xanh dương
========================================== */
function initNumberCounter() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = { threshold: 0.3 };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseFloat(element.dataset.count);
                const prefix = element.dataset.prefix || '';
                const suffix = element.dataset.suffix || '';
                const decimals = parseInt(element.dataset.decimals) || 0;
                const duration = 2500;
                
                animateCounter(element, target, prefix, suffix, decimals, duration);
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        // Set initial value
        const prefix = counter.dataset.prefix || '';
        counter.textContent = prefix + '0';
        observer.observe(counter);
    });
}

function animateCounter(element, target, prefix, suffix, decimals, duration) {
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (target - startValue) * easeOut;
        
        element.textContent = prefix + currentValue.toFixed(decimals) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/* ==========================================
   TYPEWRITER EFFECT
========================================== */
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.dataset.typewriter || element.textContent;
        const speed = parseInt(element.dataset.speed) || 50;
        
        element.textContent = '';
        element.style.borderRight = '2px solid #0072ff';
        
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(type, 500);
                observer.unobserve(element);
            }
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

/* ==========================================
   SCROLL PROGRESS BAR - BLUE
========================================== */
function initScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #0072ff, #00a2ff, #52ebfd);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(0, 114, 255, 0.5);
    `;
    document.body.prepend(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ==========================================
   MOUSE GLOW EFFECT
========================================== */
function initMouseGlowEffect() {
    const glowElements = document.querySelectorAll('.timeline-image-wrapper, .benefit-card, .proof-card, .week-card, .schedule-card');
    
    glowElements.forEach(element => {
        element.classList.add('mouse-glow-card');
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            element.style.setProperty('--mouse-x', `${x}px`);
            element.style.setProperty('--mouse-y', `${y}px`);
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.setProperty('--mouse-x', '50%');
            element.style.setProperty('--mouse-y', '50%');
        });
    });
    
    const buttons = document.querySelectorAll('.cta-button-wrapper');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ==========================================
   BUTTON EFFECTS
========================================== */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button-wrapper');
    
    buttons.forEach(button => {
        button.classList.add('pulse-animation');
        
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

/* ==========================================
   SMOOTH SCROLL
========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ==========================================
   PARALLAX EFFECT
========================================== */
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
}

/* ==========================================
   ICON HOVER ANIMATIONS
========================================== */
document.querySelectorAll('.icon-animate').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

/* ==========================================
   LAZY LOADING FOR IMAGES
========================================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ==========================================
   INJECT ADDITIONAL CSS - BLUE THEME
========================================== */
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Ripple Animation */
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    /* Global Particle Float */
    @keyframes global-particle-float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    /* Button Pulse Animation - BLUE */
    .pulse-animation {
        animation: button-pulse 2s ease-in-out infinite;
    }
    
    @keyframes button-pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 114, 255, 0.4);
        }
        50% {
            box-shadow: 0 0 0 15px rgba(0, 114, 255, 0);
        }
    }
    
    /* Text Gradient Animation - BLUE */
    .gradient-text-animated {
        background: linear-gradient(90deg, #0072ff, #00a2ff, #52ebfd, #0072ff);
        background-size: 300% 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradient-flow 4s ease infinite;
    }
    
    @keyframes gradient-flow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    /* Mouse Glow Effect - BLUE */
    .mouse-glow-card {
        position: relative;
        overflow: hidden;
    }
    
    .mouse-glow-card::after {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(0, 114, 255, 0.25) 0%, rgba(0, 162, 255, 0.1) 40%, transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
        border-radius: inherit;
    }
    
    .mouse-glow-card:hover::after {
        opacity: 1;
    }
    
    .mouse-glow-card > * {
        position: relative;
        z-index: 2;
    }
    
    .week-card.mouse-glow-card::after {
        width: 200px;
        height: 200px;
    }
    
    .schedule-card.mouse-glow-card::after {
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(0, 114, 255, 0.15) 0%, rgba(0, 162, 255, 0.05) 40%, transparent 70%);
    }
    
    /* Typewriter cursor - BLUE */
    [data-typewriter] {
        display: inline-block;
    }
`;
document.head.appendChild(additionalStyles);

/* ==========================================
   CONSOLE EASTER EGG
========================================== */
console.log('%c✦ mInvest Smart Trading', 'font-size: 24px; font-weight: bold; color: #0072ff;');
console.log('%cKhóa học Trading Forex 5 Tuần - mInvest', 'font-size: 14px; color: #00a2ff;');

/* ==========================================
   LIGHTBOX FUNCTIONALITY - 2 cột với Card nổi
========================================== */
function initLightbox() {
    // Lightbox chính cho Timeline (với text)
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.getElementById('lightbox-close');
    const imageWrappers = document.querySelectorAll('[data-lightbox]');
    
    if (lightbox && lightboxImage) {
        // Open lightbox when clicking on timeline image
        imageWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', function() {
                const img = this.querySelector('img');
                
                // Tìm timeline-item-zigzag cha
                const timelineItem = this.closest('.timeline-item-zigzag');
                
                if (img && timelineItem) {
                    // Lấy ảnh
                    lightboxImage.src = img.src;
                    lightboxImage.alt = img.alt;
                    
                    // Lấy title và description
                    const titleEl = timelineItem.querySelector('.timeline-title-zigzag');
                    const descEl = timelineItem.querySelector('.timeline-text-zigzag');
                    
                    if (titleEl) {
                        lightboxTitle.textContent = titleEl.textContent;
                    }
                    if (descEl) {
                        lightboxDescription.textContent = descEl.textContent;
                    }
                    
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close lightbox when clicking close button
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeLightbox();
            });
        }
        
        // Close lightbox when clicking overlay (not content)
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Lightbox Simple cho Benefits (chỉ ảnh)
    const lightboxSimple = document.getElementById('lightbox-simple');
    const lightboxSimpleImage = document.getElementById('lightbox-simple-image');
    const lightboxSimpleClose = document.getElementById('lightbox-simple-close');
    const benefitImages = document.querySelectorAll('[data-lightbox-simple]');
    
    if (lightboxSimple && lightboxSimpleImage) {
        benefitImages.forEach(wrapper => {
            wrapper.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    lightboxSimpleImage.src = img.src;
                    lightboxSimpleImage.alt = img.alt;
                    lightboxSimple.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        if (lightboxSimpleClose) {
            lightboxSimpleClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeLightboxSimple();
            });
        }
        
        lightboxSimple.addEventListener('click', function(e) {
            if (e.target === lightboxSimple) {
                closeLightboxSimple();
            }
        });
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (lightbox && lightbox.classList.contains('active')) {
                closeLightbox();
            }
            if (lightboxSimple && lightboxSimple.classList.contains('active')) {
                closeLightboxSimple();
            }
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function closeLightboxSimple() {
        lightboxSimple.classList.remove('active');
        document.body.style.overflow = '';
    }
}
