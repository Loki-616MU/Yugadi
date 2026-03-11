/* ═══════════════════════════════════════════════════════════════
   UGADI — THE DAWN OF CREATION
   GSAP ScrollTrigger Animations & Interactive Logic
   ═══════════════════════════════════════════════════════════════ */

// ── Wait for DOM + GSAP ──
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Invitation Splash ──
    const splash = document.getElementById('invitation-splash');
    const beginBtn = document.getElementById('begin-journey');
    const loader = document.getElementById('loader');

    beginBtn.addEventListener('click', () => {
        // Slide up the invitation
        splash.classList.add('slide-up');
        // After slide animation, hide it completely and start loader
        setTimeout(() => {
            splash.classList.add('hidden');
            // Show loader briefly, then start the story
            setTimeout(() => {
                loader.classList.add('hidden');
                document.getElementById('floating-nav').classList.add('visible');
                initAnimations();
            }, 2000);
        }, 1000);
    });
});

function initAnimations() {
    initStarField();
    initScrollProgress();
    initNavHighlight();
    initCosmicSection();
    initDangerSection();
    initOceanSection();
    initCreationSection();
    initCosmicWheelSection();
    initYugasSection();
    initMeaningSection();
    initNatureSection();
    initPachadiSection();
    initEventsSection();
    initUnderwaterBubbles();
    initRainCanvas();
    initConfetti();
}

// ═══════════════════════════════════════════════════════════════
// STAR FIELD CANVAS
// ═══════════════════════════════════════════════════════════════
function initStarField() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 0.3,
                alpha: Math.random(),
                speed: Math.random() * 0.02 + 0.005
            });
        }
    }
    resize();
    window.addEventListener('resize', resize);

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.alpha += Math.sin(Date.now() * s.speed) * 0.01;
            s.alpha = Math.max(0.1, Math.min(1, s.alpha));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 253, 230, ${s.alpha})`;
            ctx.fill();
            // Subtle glow for larger stars
            if (s.r > 1.5) {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 213, 79, ${s.alpha * 0.1})`;
                ctx.fill();
            }
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();
}

// ═══════════════════════════════════════════════════════════════
// SCROLL PROGRESS BAR
// ═══════════════════════════════════════════════════════════════
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    });
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION HIGHLIGHT
// ═══════════════════════════════════════════════════════════════
function initNavHighlight() {
    const sections = document.querySelectorAll('.story-section');
    const navDots = document.querySelectorAll('.nav-dot');

    // Click navigation
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(dot.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Highlight on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navDots.forEach(d => d.classList.remove('active'));
                const id = entry.target.id;
                const activeDot = document.querySelector(`.nav-dot[href="#${id}"]`);
                if (activeDot) activeDot.classList.add('active');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1: COSMIC OCEAN
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// SECTION 1: COSMIC OCEAN (Cinematic Intro)
// ═══════════════════════════════════════════════════════════════
function initCosmicSection() {
    // ── Initial States ──
    gsap.set('#cosmic-ocean .chapter-number', { opacity: 0, y: 30 });
    gsap.set('#cosmic-ocean .section-title', { opacity: 0, y: 50 });
    gsap.set('#cosmic-ocean .glass-panel', { opacity: 0, y: 40 });
    gsap.set('.subtitle-banner', { opacity: 0, y: 30 });
    gsap.set('.cosmic-ocean-waves', { opacity: 0 });
    gsap.set('#stars-canvas', { opacity: 0 });

    // ── Intro Timeline ──
    const introTl = gsap.timeline({
        delay: 2.2,
        defaults: { ease: 'power2.out' }
    });

    // 0. Fade out the Black Overlay
    introTl.to('.intro-overlay', {
        opacity: 0,
        duration: 3,
        ease: 'power1.inOut'
    });

    // 1. Reveal Stars & Waves
    introTl.to('#stars-canvas', {
        opacity: 1,
        duration: 2.5
    }, '-=2')
        .to('.cosmic-ocean-waves', {
            opacity: 1,
            duration: 2.5
        }, '-=2');

    // 2. Reveal Text Elements
    introTl.to('#cosmic-ocean .chapter-number', {
        opacity: 1, y: 0, duration: 1
    }, '-=1')
        .to('#cosmic-ocean .section-title', {
            opacity: 1, y: 0, duration: 1.2
        }, '-=0.8')
        .to('#cosmic-ocean .glass-panel', {
            opacity: 1, y: 0, duration: 1
        }, '-=0.6')
        .to('.subtitle-banner', {
            opacity: 1, y: 0, duration: 0.8
        }, '-=0.4');

    // ── ScrollTrigger for Re-entry (if user scrolls back up) ──
    // We only want the scroll trigger to handle opacity if we scroll *away* and come back,
    // but the initial load is handled by the timeline above.
    // To avoid conflict, we can set up a ScrollTrigger that just ensures visibility
    // or plays a simpler animation if triggered again.

    // For simplicity in this specific "Intro" case, we rely on the timeline.
    // However, if we want typical scroll behavior (fading out when scrolling down),
    // we can add a ScrollTrigger to the section.

    gsap.to('#cosmic-ocean', {
        scrollTrigger: {
            trigger: '#cosmic-ocean',
            start: 'top top',
            end: 'bottom center',
            scrub: true, // Smooth scrubbing effect
            // We can fade out elements as we scroll down
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2: DANGER — VEDAS STOLEN
// ═══════════════════════════════════════════════════════════════
function initDangerSection() {
    // Floating danger particles
    createFloatingParticles('danger-particles', 15, '#ff1744', 0.15);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#vedas-stolen',
            start: 'top 60%',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });

    tl.to('#vedas-stolen .chapter-number', {
        opacity: 1, y: 0, duration: 0.6
    })
        .to('#vedas-stolen .section-title', {
            opacity: 1, y: 0, duration: 0.8
        }, '-=0.3')
        .to('.demon-svg', {
            opacity: 0.8,
            duration: 1.2,
            ease: 'power2.out'
        }, '-=0.5')
        .to('#vedas-stolen .glass-panel-dark', {
            opacity: 1, y: 0, duration: 0.8
        }, '-=0.4')
        .to('.alert-banner', {
            opacity: 1, y: 0, duration: 0.6
        }, '-=0.2');
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3: MATSYA AVATAR
// ═══════════════════════════════════════════════════════════════
function initOceanSection() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#matsya-avatar',
            start: 'top 60%',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });

    tl.to('#matsya-avatar .chapter-number', {
        opacity: 1, y: 0, duration: 0.6
    })
        .to('#matsya-avatar .section-title', {
            opacity: 1, y: 0, duration: 0.8
        }, '-=0.3')
        .to('.matsya-svg', {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: 'power3.out'
        }, '-=0.5')
        .to('#matsya-avatar .glass-panel-ocean', {
            opacity: 1, y: 0, duration: 0.8
        }, '-=0.6')
        .to('.victory-banner', {
            opacity: 1, y: 0, duration: 0.6
        }, '-=0.2');

    // Initial offset for swim-in
    gsap.set('.matsya-svg', { x: -100 });
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4: CREATION BEGINS
// ═══════════════════════════════════════════════════════════════
function initCreationSection() {
    // Creation particles canvas
    initCreationParticles();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#creation-begins',
            start: 'top 60%',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
            onEnter: () => {
                document.getElementById('creation-burst').classList.add('active');
            },
            onLeaveBack: () => {
                document.getElementById('creation-burst').classList.remove('active');
            }
        }
    });

    tl.to('#creation-begins .chapter-number', {
        opacity: 1, y: 0, duration: 0.6
    })
        .to('#creation-begins .section-title', {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out'
        }, '-=0.3')
        .to('#creation-begins .glass-panel-gold', {
            opacity: 1, y: 0, duration: 0.8
        }, '-=0.4')
        .to('.ugadi-declaration', {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.4)'
        }, '-=0.3');
}

function initCreationParticles() {
    const canvas = document.getElementById('creation-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animating = false;

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    ScrollTrigger.create({
        trigger: '#creation-begins',
        start: 'top 80%',
        onEnter: () => {
            if (!animating) {
                animating = true;
                createParticles();
                animateParticles();
            }
        }
    });

    function createParticles() {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        for (let i = 0; i < 80; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            particles.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                r: Math.random() * 3 + 1,
                life: 1,
                decay: Math.random() * 0.005 + 0.002,
                color: `hsl(${40 + Math.random() * 20}, 100%, ${60 + Math.random() * 30}%)`
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
        if (particles.length > 0) {
            requestAnimationFrame(animateParticles);
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// SECTION X: THE COSMIC WHEEL
// ═══════════════════════════════════════════════════════════════
function initCosmicWheelSection() {
    const wheelSection = document.getElementById('cosmic-wheel-section');
    if (!wheelSection) return;

    // Animate the wheel's appearance
    gsap.fromTo('.wheel-container', 
        { opacity: 0, scale: 0.8 },
        {
            opacity: 0.8,
            scale: 1,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#cosmic-wheel-section',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Animate the text block
    gsap.fromTo('#cosmic-wheel-section .glass-panel', 
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#cosmic-wheel-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Animate the title
    gsap.fromTo('.wheel-title', 
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#cosmic-wheel-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Animate the subtitle banner
    gsap.fromTo('#cosmic-wheel-section .subtitle-banner', 
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#cosmic-wheel-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5: THE YUGAS
// ═══════════════════════════════════════════════════════════════
function initYugasSection() {
    gsap.to('#yugas-transition .chapter-number', {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: {
            trigger: '#yugas-transition',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('#yugas-transition .section-title', {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
            trigger: '#yugas-transition',
            start: 'top 65%',
            toggleActions: 'play none none reverse'
        }
    });

    // Rama Panel
    gsap.to('.rama-panel', {
        opacity: 1, y: 0, duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.rama-panel',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Divider Typing Effect
    const dividerText = document.querySelector('.yuga-divider .divider-text');
    if (dividerText) {
        gsap.to(dividerText, {
            text: "Ages Pass…",
            duration: 1.5,
            ease: "none",
            scrollTrigger: {
                trigger: '.yuga-divider',
                start: 'top 80%',
                onEnter: () => {
                    dividerText.classList.add('typing');
                    dividerText.textContent = ""; // Clear initial text
                },
                onLeaveBack: () => {
                    dividerText.classList.remove('typing');
                    dividerText.textContent = "Ages Pass…"; // Reset text
                }
            }
        });
    }

    // Krishna Panel
    gsap.to('.krishna-panel', {
        opacity: 1, y: 0, duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.krishna-panel',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Kali Yuga Banner
    gsap.to('#kali-banner', {
        opacity: 1, duration: 0.8,
        scrollTrigger: {
            trigger: '#kali-banner',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Krishna Video — open fullscreen overlay on scroll, close after video ends
    const krishnaVideo = document.getElementById('krishna-video');
    const overlay = document.getElementById('video-fullscreen-overlay');
    const fullscreenVideo = document.getElementById('fullscreen-video');

    if (krishnaVideo && overlay && fullscreenVideo) {
        fullscreenVideo.playbackRate = 2;
        let hasPlayedFullscreen = false;

        ScrollTrigger.create({
            trigger: '.krishna-video-scene',
            start: 'top 70%',
            onEnter: () => {
                if (!hasPlayedFullscreen) {
                    hasPlayedFullscreen = true;
                    // Open fullscreen overlay
                    overlay.classList.add('active');
                    fullscreenVideo.currentTime = 0;
                    fullscreenVideo.play();
                    document.body.style.overflow = 'hidden';
                }
            }
        });

        // When fullscreen video ends, close overlay and resume scroll
        fullscreenVideo.addEventListener('ended', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            // Also play the inline video as a looping background after fullscreen
            krishnaVideo.playbackRate = 2;
            krishnaVideo.play();
        });

        // Allow clicking the overlay to close it early
        overlay.addEventListener('click', () => {
            fullscreenVideo.pause();
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            krishnaVideo.playbackRate = 2;
            krishnaVideo.play();
        });
    }

    // Cosmic Ocean Background Video — auto-play after intro
    const cosmicVideo = document.getElementById('cosmic-video');
    if (cosmicVideo) {
        // Start playing after the intro timeline finishes (~8s)
        setTimeout(() => {
            cosmicVideo.play();
            cosmicVideo.classList.add('playing');
        }, 6000);

        // Pause when scrolled away from section
        ScrollTrigger.create({
            trigger: '#cosmic-ocean',
            start: 'top top',
            end: 'bottom top',
            onLeave: () => {
                cosmicVideo.pause();
                cosmicVideo.classList.remove('playing');
            },
            onEnterBack: () => {
                cosmicVideo.play();
                cosmicVideo.classList.add('playing');
            }
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// SECTION 6: MEANING
// ═══════════════════════════════════════════════════════════════
function initMeaningSection() {
    gsap.to('#ugadi-meaning .chapter-number', {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: {
            trigger: '#ugadi-meaning',
            start: 'top 65%',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('#ugadi-meaning .section-title', {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
            trigger: '#ugadi-meaning',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('.etymology-display', {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
            trigger: '.etymology-display',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });
    // Word parts stagger animation
    gsap.from('.word-part', {
        opacity: 0, x: -30, duration: 0.8, stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.word-split',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.from('.word-result', {
        opacity: 0, scale: 0.7, duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.8,
        scrollTrigger: {
            trigger: '.word-split',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('.glass-panel-meaning', {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
            trigger: '.glass-panel-meaning',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// SECTION 7: NATURE
// ═══════════════════════════════════════════════════════════════
function initNatureSection() {
    gsap.to('#natures-renewal .chapter-number', {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: {
            trigger: '#natures-renewal',
            start: 'top 65%',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('#natures-renewal .section-title', {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
            trigger: '#natures-renewal',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('.nature-scene', {
        opacity: 1, duration: 1.5, ease: 'power2.out',
        scrollTrigger: {
            trigger: '#natures-renewal',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('#natures-renewal .glass-panel-nature', {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
            trigger: '#natures-renewal .glass-panel-nature',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// SECTION 8: PACHADI
// ═══════════════════════════════════════════════════════════════
function initPachadiSection() {
    gsap.to('#ugadi-pachadi .chapter-number', {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: {
            trigger: '#ugadi-pachadi',
            start: 'top 65%',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('#ugadi-pachadi .section-title', {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
            trigger: '#ugadi-pachadi',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });

    // Bowl
    gsap.to('.pachadi-bowl', {
        opacity: 1, scale: 1, duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.pachadi-layout',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Ingredients stagger
    gsap.to('.ingredient-card', {
        opacity: 1, y: 0, duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.ingredients-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Wisdom
    gsap.to('.pachadi-wisdom', {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
            trigger: '.pachadi-wisdom',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });

    // Interactive hover effects
    document.querySelectorAll('.ingredient-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });
}

// ═══════════════════════════════════════════════════════════════
// SECTION 9: EVENTS
// ═══════════════════════════════════════════════════════════════
function initEventsSection() {
    gsap.to('#events-gateway .chapter-number', {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: {
            trigger: '#events-gateway',
            start: 'top 65%',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('#events-gateway .section-title', {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
            trigger: '#events-gateway',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });

    // Event cards stagger
    gsap.to('.event-card', {
        opacity: 1, y: 0, duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.events-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// UTILITY: FLOATING PARTICLES
// ═══════════════════════════════════════════════════════════════
function createFloatingParticles(containerId, count, color, maxOpacity) {
    const container = document.getElementById(containerId);
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            opacity: ${Math.random() * maxOpacity};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        container.appendChild(particle);
    }

    // Inject keyframes if not exists
    if (!document.getElementById('particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0); opacity: 0; }
                25% { opacity: 0.3; }
                50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}30px, -50px); opacity: 0.15; }
                75% { opacity: 0.2; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ═══════════════════════════════════════════════════════════════
// UNDERWATER BUBBLES
// ═══════════════════════════════════════════════════════════════
function initUnderwaterBubbles() {
    const container = document.getElementById('underwater-bubbles');
    if (!container) return;

    function createBubble() {
        const bubble = document.createElement('div');
        const size = Math.random() * 12 + 4;
        bubble.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border: 1px solid rgba(0, 200, 255, 0.3);
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, rgba(0, 200, 255, 0.15), transparent);
            bottom: -20px;
            left: ${Math.random() * 100}%;
            animation: bubbleRise ${4 + Math.random() * 6}s ease-out forwards;
            pointer-events: none;
        `;
        container.appendChild(bubble);
        setTimeout(() => bubble.remove(), 10000);
    }

    // Inject bubble keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bubbleRise {
            0% { transform: translateY(0) translateX(0); opacity: 0.6; }
            50% { transform: translateY(-50vh) translateX(${Math.random() * 40 - 20}px); opacity: 0.3; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 60 - 30}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Create bubbles when section is in view
    ScrollTrigger.create({
        trigger: '#matsya-avatar',
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
            if (self.isActive) {
                const interval = setInterval(() => {
                    if (!self.isActive) { clearInterval(interval); return; }
                    createBubble();
                }, 600);
            }
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// RAIN CANVAS
// ═══════════════════════════════════════════════════════════════
function initRainCanvas() {
    const canvas = document.getElementById('rain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drops = [];
    let raining = false;

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createRainDrops() {
        drops = [];
        for (let i = 0; i < 120; i++) {
            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 15 + 8,
                speed: Math.random() * 6 + 4,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    function animateRain() {
        if (!raining) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drops.forEach(d => {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x - 1, d.y + d.length);
            ctx.strokeStyle = `rgba(174, 213, 129, ${d.opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            d.y += d.speed;
            if (d.y > canvas.height) {
                d.y = -d.length;
                d.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animateRain);
    }

    ScrollTrigger.create({
        trigger: '#natures-renewal',
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
            raining = true;
            createRainDrops();
            animateRain();
        },
        onLeave: () => { raining = false; },
        onEnterBack: () => {
            raining = true;
            createRainDrops();
            animateRain();
        },
        onLeaveBack: () => { raining = false; }
    });
}

// ═══════════════════════════════════════════════════════════════
// CONFETTI (EVENTS SECTION)
// ═══════════════════════════════════════════════════════════════
function initConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;

    const colors = ['#ffd54f', '#e91e63', '#ff8f00', '#4caf50', '#2196f3', '#f48fb1'];

    function createConfettiPiece() {
        const piece = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isCircle = Math.random() > 0.5;

        piece.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${isCircle ? size : size * 2}px;
            background: ${color};
            border-radius: ${isCircle ? '50%' : '2px'};
            top: -20px;
            left: ${Math.random() * 100}%;
            animation: confettiFall ${3 + Math.random() * 4}s ease-out forwards;
            transform: rotate(${Math.random() * 360}deg);
            pointer-events: none;
        `;
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 7000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(${720 + Math.random() * 360}deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    ScrollTrigger.create({
        trigger: '#events-gateway',
        start: 'top 50%',
        onEnter: () => {
            for (let i = 0; i < 30; i++) {
                setTimeout(() => createConfettiPiece(), i * 100);
            }
        }
    });
}
