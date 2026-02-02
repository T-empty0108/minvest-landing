/* ==========================================
   mInvest Smart Trading - JavaScript
   COLOR SCHEME: Blue Gradient (#0072ff - #00a2ff - #52ebfd)
========================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing...');
    document.body.classList.add('js-ready');
    
    initScrollAnimations();
    initGlobalParticles();
    initButtonEffects();
    initNumberCounter();
    initScrollProgressBar();
    initLightbox();
    
    console.log('All functions initialized');
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
    console.log('Found counters:', counters.length);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseFloat(element.dataset.count);
                const prefix = element.dataset.prefix || '';
                const suffix = element.dataset.suffix || '';
                const decimals = parseInt(element.dataset.decimals) || 0;
                
                console.log('Starting counter animation to:', target);
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
   LIGHTBOX - MAIN FUNCTION
========================================== */
function initLightbox() {
    console.log('Initializing lightbox...');
    
    // === LIGHTBOX SIMPLE (Benefits - chỉ ảnh) ===
    const lightboxSimple = document.getElementById('lightbox-simple');
    const lightboxSimpleImage = document.getElementById('lightbox-simple-image');
    const lightboxSimpleClose = document.getElementById('lightbox-simple-close');
    const benefitImages = document.querySelectorAll('[data-lightbox-simple]');
    
    console.log('Lightbox Simple elements:', {
        overlay: !!lightboxSimple,
        image: !!lightboxSimpleImage,
        close: !!lightboxSimpleClose,
        triggers: benefitImages.length
    });
    
    if (lightboxSimple && lightboxSimpleImage) {
        benefitImages.forEach((wrapper, index) => {
            wrapper.style.cursor = 'pointer';
            wrapper.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Benefit image clicked:', index);
                
                const img = this.querySelector('img');
                if (img && img.src) {
                    console.log('Opening lightbox simple with:', img.src);
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
        console.log('Closing lightbox simple');
        lightboxSimple.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // === LIGHTBOX FULL (Timeline - ảnh + text) ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.getElementById('lightbox-close');
    const timelineImages = document.querySelectorAll('[data-lightbox]');
    
    console.log('Lightbox Full elements:', {
        overlay: !!lightbox,
        image: !!lightboxImage,
        title: !!lightboxTitle,
        desc: !!lightboxDescription,
        close: !!lightboxClose,
        triggers: timelineImages.length
    });
    
    if (lightbox && lightboxImage) {
        timelineImages.forEach((wrapper, index) => {
            wrapper.style.cursor = 'pointer';
            wrapper.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Timeline image clicked:', index);
                
                const img = this.querySelector('img');
                const timelineItem = this.closest('.timeline-item-zigzag');
                
                if (img && img.src && timelineItem) {
                    const titleEl = timelineItem.querySelector('.timeline-title-zigzag');
                    const descEl = timelineItem.querySelector('.timeline-text-zigzag');
                    
                    console.log('Opening lightbox full with:', img.src);
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
        console.log('Closing lightbox full');
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
    
    console.log('Lightbox initialization complete');
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

console.log('Script loaded');
