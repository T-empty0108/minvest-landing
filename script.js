/* ==========================================
   AI Income Workshop - JavaScript
   Animations, Particles, Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Add js-ready class to enable animations
    document.body.classList.add('js-ready');
    
    // Initialize all features
    initScrollAnimations();
    initGlobalParticles();
    initFormHandler();
    initButtonEffects();
    initNumberCounter();
    initTypewriter();
    initScrollProgressBar();
    init3DTilt();
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
   GLOBAL FLOATING PARTICLES (All Sections)
   ========================================== */
function initGlobalParticles() {
    // Create global particles container
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
    
    // Create particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        createGlobalParticle(globalParticles);
    }
    
    // Also init hero particles if exists
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
    
    // Colors: purple, pink, green, cyan
    const colors = [
        'rgba(139, 92, 246, 0.4)',
        'rgba(236, 72, 153, 0.4)',
        'rgba(34, 197, 94, 0.3)',
        'rgba(6, 182, 212, 0.3)',
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
    
    const colors = [
        'rgba(139, 92, 246, 0.6)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(168, 85, 247, 0.6)',
        'rgba(34, 197, 94, 0.4)'
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
   NUMBER COUNTER ANIMATION
   ========================================== */
function initNumberCounter() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseFloat(element.dataset.count);
                const prefix = element.dataset.prefix || '';
                const suffix = element.dataset.suffix || '';
                const decimals = element.dataset.decimals || 0;
                const duration = 2000;
                
                animateCounter(element, target, prefix, suffix, decimals, duration);
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // Auto-detect $8.9M text and make it countable
    document.querySelectorAll('.highlight-green, .neon-text-green').forEach(el => {
        if (el.textContent.includes('$8.9M') && !el.dataset.count) {
            el.dataset.count = '8.9';
            el.dataset.prefix = '$';
            el.dataset.suffix = 'M';
            el.dataset.decimals = '1';
            el.textContent = '$0M';
            observer.observe(el);
        }
    });
}

function animateCounter(element, target, prefix, suffix, decimals, duration) {
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
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
        element.style.borderRight = '2px solid #8b5cf6';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing when visible
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
   SCROLL PROGRESS BAR
   ========================================== */
function initScrollProgressBar() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #8b5cf6, #ec4899, #22c55e);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
    `;
    document.body.prepend(progressBar);
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ==========================================
   3D TILT EFFECT ON IMAGES
   ========================================== */
function init3DTilt() {
    const tiltElements = document.querySelectorAll('.timeline-image-wrapper, .benefit-card, .proof-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* ==========================================
   FORM HANDLER
   ========================================== */
function initFormHandler() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const button = form.querySelector('.cta-button-wrapper');
        const originalText = button.querySelector('.cta-button-text').textContent;
        
        button.querySelector('.cta-button-text').textContent = 'REGISTERING...';
        button.style.pointerEvents = 'none';
        
        setTimeout(() => {
            button.querySelector('.cta-button-text').textContent = '✓ REGISTERED!';
            button.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
            
            showNotification('Success! Check your email for confirmation.', 'success');
            
            setTimeout(() => {
                button.querySelector('.cta-button-text').textContent = originalText;
                button.style.pointerEvents = 'auto';
                button.style.background = '';
                form.reset();
            }, 3000);
        }, 1500);
    });
}

/* ==========================================
   NOTIFICATION
   ========================================== */
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
        <span class="notification-message">${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        font-weight: 600;
        z-index: 9999;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : '#8b5cf6'};
        color: white;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* ==========================================
   BUTTON EFFECTS (with Pulse)
   ========================================== */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button-wrapper');
    
    buttons.forEach(button => {
        // Add pulse class
        button.classList.add('pulse-animation');
        
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            if (this.tagName === 'BUTTON' || this.getAttribute('href') === '#register') {
                createRipple(e, this);
            }
        });
        
        // Mouse move effect for glow
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
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
   SMOOTH SCROLL FOR ANCHOR LINKS
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
   PARALLAX EFFECT ON SCROLL
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
   INJECT ADDITIONAL CSS FOR NEW EFFECTS
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
    
    /* Button Pulse Animation */
    .pulse-animation {
        animation: button-pulse 2s ease-in-out infinite;
    }
    
    @keyframes button-pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
        }
        50% {
            box-shadow: 0 0 0 15px rgba(34, 197, 94, 0);
        }
    }
    
    /* Text Gradient Animation */
    .gradient-text-animated {
        background: linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6);
        background-size: 300% 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradient-flow 4s ease infinite;
    }
    
    @keyframes gradient-flow {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    
    /* 3D Tilt transition */
    .timeline-image-wrapper,
    .benefit-card,
    .proof-card {
        transition: transform 0.3s ease;
    }
    
    /* Typewriter cursor */
    [data-typewriter] {
        display: inline-block;
    }
`;
document.head.appendChild(additionalStyles);

/* ==========================================
   CONSOLE EASTER EGG
   ========================================== */
console.log('%c✦ AI Income Workshop', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%cJoin 5 Days to Copy My AI System!', 'font-size: 14px; color: #22c55e;');
