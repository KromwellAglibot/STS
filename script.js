// Progress Indicator
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.progress-indicator').style.width = scrolled + '%';
});

// Show Navigation on Scroll
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        mainNav.classList.add('visible');
    } else {
        mainNav.classList.remove('visible');
    }
});

// Smooth Scroll for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards and elements with reveal classes
document.querySelectorAll('.card-reveal, .understanding-card, .reveal').forEach(el => {
    observer.observe(el);
});

// Stagger Animation Delays for Cards
document.querySelectorAll('.understanding-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.app-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.challenge-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Active Nav Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 200;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Enhanced Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.7;
    }
});

// Animate Numbers on Scroll
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe stat numbers and animate when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const finalValue = entry.target.textContent;
            const numMatch = finalValue.match(/[\d.]+/);
            if (numMatch) {
                const num = parseFloat(numMatch[0]);
                const suffix = finalValue.replace(numMatch[0], '');
                entry.target.textContent = '0' + suffix;
                animateValue(entry.target, 0, num, 2000);
                setTimeout(() => {
                    entry.target.textContent = finalValue;
                }, 2000);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value, .stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// Timeline smooth reveal
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-block').forEach((block, index) => {
    block.style.opacity = '0';
    block.style.transition = 'all 0.8s ease';
    block.style.transitionDelay = `${index * 0.1}s`;
    
    if (block.classList.contains('timeline-left')) {
        block.style.transform = 'translateX(-100px)';
    } else {
        block.style.transform = 'translateX(100px)';
    }
    
    timelineObserver.observe(block);
});

// ========================================
// ENHANCED EFFECTS
// ========================================

// Mouse-Follow Spotlight
const spotlight = document.createElement('div');
spotlight.className = 'mouse-spotlight';
document.body.appendChild(spotlight);

document.addEventListener('mousemove', (e) => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
});

// Create Floating Particles
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create Twinkling Stars
function createStars() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    heroSection.appendChild(starsContainer);

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Create Wave Animations
function createWaves() {
    const sections = document.querySelectorAll('.hero-section, .global-section');
    sections.forEach(section => {
        const waveContainer = document.createElement('div');
        waveContainer.className = 'wave-container';
        waveContainer.innerHTML = `
            <div class="wave"></div>
            <div class="wave"></div>
        `;
        section.appendChild(waveContainer);
    });
}

// Add Ripple Effect to Buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.classList.add('ripple');
});

// Add Glass Effect to Cards
document.querySelectorAll('.understanding-card, .app-card, .global-card').forEach(card => {
    card.classList.add('glass-effect');
});

// Mobile Swipe Indicator
if (window.innerWidth <= 768) {
    const swipeIndicator = document.createElement('div');
    swipeIndicator.className = 'swipe-indicator';
    swipeIndicator.innerHTML = '← Swipe to navigate →';
    document.body.appendChild(swipeIndicator);

    setTimeout(() => {
        swipeIndicator.style.display = 'none';
    }, 5000);
}

// Initialize Enhanced Effects
window.addEventListener('load', () => {
    createParticles();
    createStars();
    createWaves();
});

// Parallax Scrolling for Multiple Layers
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for different sections
    document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
        const speed = (index + 1) * 0.5;
        layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add Animated Border to Featured Cards
document.querySelectorAll('.solution-item:nth-child(1), .solution-item:nth-child(3), .solution-item:nth-child(5)').forEach(item => {
    item.classList.add('animated-border');
    const inner = item.querySelector('.solution-body');
    if (inner) {
        inner.classList.add('animated-border-inner');
    }
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 100, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
});

// Console Artistic Welcome
console.log('%c🤖 AI COMPREHENSIVE RESEARCH PROJECT', 'font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #00d4ff, #ff6b5a); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%c✨ Now with ENHANCED animations and effects!', 'font-size: 14px; color: #00d4ff;');
console.log('%cExploring the past, present, and future of Artificial Intelligence', 'font-size: 12px; color: #ff6b5a;');
console.log('%cSTS Final Project 2025', 'font-size: 10px; color: #6b7280;');
console.log('%c\nEffects Active:', 'font-weight: bold; color: #00d4ff;');
console.log('✓ Particle System');
console.log('✓ Twinkling Stars');
console.log('✓ Wave Animations');
console.log('✓ Lightning Effects');
console.log('✓ Color-Shifting Gradients');
console.log('✓ Mouse Spotlight');
console.log('✓ Glassmorphism');
console.log('✓ Rainbow Hover');
console.log('✓ Enhanced Parallax');