import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Easing Tokens ───────────────────────────────────────────────
const EASE = 'power3.out';
const EASE_SMOOTH = 'power2.out';
const EASE_ELASTIC = 'elastic.out(1, 0.5)';
const EASE_BACK = 'back.out(1.7)';
const EASE_EXPO = 'expo.out';
const EASE_CIRC = 'circ.out';

// ─── Global Defaults ─────────────────────────────────────────────
gsap.defaults({ ease: EASE, duration: 0.8 });

// ═══════════════════════════════════════════════════════════════════
// 1. TEXT SPLITTING — Character-level & word-level reveals
// ═══════════════════════════════════════════════════════════════════

/**
 * Wraps each character of an element's text in a <span>.
 * Returns array of char spans for GSAP targeting.
 */
export function splitTextToChars(element) {
    if (!element) return [];
    const text = element.textContent;
    element.textContent = '';
    element.style.display = 'inline-block'; // prevent layout shift

    const chars = [];
    for (const char of text) {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.willChange = 'transform, opacity';
        element.appendChild(span);
        chars.push(span);
    }
    return chars;
}

/**
 * Wraps each word in a span (preserving spaces).
 */
export function splitTextToWords(element) {
    if (!element) return [];
    const text = element.textContent;
    const words = text.split(' ');
    element.textContent = '';

    const wordSpans = [];
    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.willChange = 'transform, opacity';
        element.appendChild(span);
        wordSpans.push(span);

        if (i < words.length - 1) {
            const space = document.createElement('span');
            space.innerHTML = '&nbsp;';
            space.style.display = 'inline-block';
            element.appendChild(space);
        }
    });
    return wordSpans;
}

// ═══════════════════════════════════════════════════════════════════
// 2. HERO —  Cinematic Entrance Sequence
// ═══════════════════════════════════════════════════════════════════

export function animateHero(refs) {
    const tl = gsap.timeline({
        defaults: { ease: EASE },
        delay: 0.3, // let page settle
    });

    // Profile image — scale + rotation spring-in
    if (refs.image) {
        tl.fromTo(refs.image,
            { scale: 0, opacity: 0, rotation: -15, filter: 'blur(10px)' },
            { scale: 1, opacity: 1, rotation: 0, filter: 'blur(0px)', duration: 1.1, ease: EASE_BACK }
        );
    }

    // Greeting — slide from left with mask feel
    if (refs.greeting) {
        tl.fromTo(refs.greeting,
            { x: -60, opacity: 0, skewX: -8 },
            { x: 0, opacity: 1, skewX: 0, duration: 0.7, ease: EASE_EXPO },
            '-=0.5'
        );
    }

    // Name — dramatic scale-up with blur clear
    if (refs.name) {
        tl.fromTo(refs.name,
            { y: 50, opacity: 0, scale: 0.85, filter: 'blur(8px)' },
            { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: EASE_BACK },
            '-=0.4'
        );
    }

    // Underline wipe
    if (refs.underline) {
        tl.fromTo(refs.underline,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, ease: 'power2.inOut', transformOrigin: 'left center' },
            '-=0.3'
        );
    }

    // Dynamic text — fade up
    if (refs.dynamicText) {
        tl.fromTo(refs.dynamicText,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.4'
        );
    }

    // Description — word-level stagger (if more than a sentence)
    if (refs.description) {
        tl.fromTo(refs.description,
            { y: 25, opacity: 0, filter: 'blur(4px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7 },
            '-=0.3'
        );
    }

    // Buttons — spring in with stagger
    if (refs.buttons) {
        tl.fromTo(refs.buttons,
            { y: 40, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: EASE_BACK },
            '-=0.25'
        );
    }

    // Scroll indicator — gentle bob entrance
    if (refs.scrollIndicator) {
        tl.fromTo(refs.scrollIndicator,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.1'
        );
    }

    return tl;
}

// ═══════════════════════════════════════════════════════════════════
// 3. PARALLAX ORB FLOAT — Continuous ambient motion
// ═══════════════════════════════════════════════════════════════════

export function animateOrbs(orbElements) {
    orbElements.forEach((orb, i) => {
        if (!orb) return;
        const duration = 12 + i * 6;
        const xRange = 50 + i * 25;
        const yRange = 40 + i * 20;

        // Continuous random drift
        gsap.to(orb, {
            x: `random(-${xRange}, ${xRange})`,
            y: `random(-${yRange}, ${yRange})`,
            scale: `random(0.85, 1.2)`,
            duration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
        });

        // Parallax scroll — orbs shift with scroll
        gsap.to(orb, {
            yPercent: -30 * (i + 1),
            ease: 'none',
            scrollTrigger: {
                trigger: orb.closest('section') || orb.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════
// 4. SECTION HEADING REVEALS — Scroll-triggered with line wipe
// ═══════════════════════════════════════════════════════════════════

export function animateSectionHeadings() {
    const subtitles = document.querySelectorAll('.section-subtitle');
    const h2s = document.querySelectorAll('section h2');
    const descriptions = document.querySelectorAll('.section-description');

    subtitles.forEach(el => {
        gsap.fromTo(el,
            { y: 30, opacity: 0, letterSpacing: '0.3em' },
            {
                y: 0, opacity: 1, letterSpacing: '0.15em',
                duration: 0.7, ease: EASE,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });

    h2s.forEach(el => {
        gsap.fromTo(el,
            { y: 50, opacity: 0, scale: 0.92 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 0.9, ease: EASE_BACK,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 86%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });

    descriptions.forEach(el => {
        gsap.fromTo(el,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.7, ease: EASE,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });
}

// ═══════════════════════════════════════════════════════════════════
// 5. STAGGERED CARD ENTRANCE — With 3D rotation reveal
// ═══════════════════════════════════════════════════════════════════

export function animateCards(containerElement, cardSelector, options = {}) {
    const container = typeof containerElement === 'string'
        ? document.querySelector(containerElement)
        : containerElement;
    if (!container) return;

    const cards = container.querySelectorAll(cardSelector);
    if (!cards.length) return;

    // Each card gets its own ScrollTrigger for precise per-card triggering
    cards.forEach((card, i) => {
        gsap.fromTo(card,
            {
                y: options.y || 80,
                opacity: 0,
                scale: options.scale || 0.92,
                rotateX: 8,
                filter: 'blur(4px)',
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                rotateX: 0,
                filter: 'blur(0px)',
                duration: options.duration || 0.9,
                delay: i * (options.stagger || 0.12),
                ease: options.ease || EASE_BACK,
                scrollTrigger: {
                    trigger: card,
                    start: options.start || 'top 88%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });
}

// ═══════════════════════════════════════════════════════════════════
// 6. 3D TILT EFFECT — Premium interactive card tilt
// ═══════════════════════════════════════════════════════════════════

export function add3DTiltEffect(cardElements) {
    if (!cardElements || !cardElements.length) return [];

    const cleanups = [];

    cardElements.forEach(card => {
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
                rotateY: x * 12,
                rotateX: -y * 12,
                scale: 1.02,
                duration: 0.4,
                ease: 'power2.out',
                transformPerspective: 800,
                transformOrigin: 'center center',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                duration: 0.6,
                ease: EASE_ELASTIC,
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        cleanups.push(() => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        });
    });

    return cleanups;
}

// ═══════════════════════════════════════════════════════════════════
// 7. TIMELINE DRAW-IN — Scrub-linked line drawing
// ═══════════════════════════════════════════════════════════════════

export function animateTimeline(lineElement, containerElement) {
    if (!lineElement || !containerElement) return;

    // The line draws as you scroll through the section
    gsap.fromTo(lineElement,
        { scaleY: 0, transformOrigin: 'top center' },
        {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: containerElement,
                start: 'top 70%',
                end: 'bottom 30%',
                scrub: 1,   // Links animation to scroll position
            }
        }
    );
}

// ═══════════════════════════════════════════════════════════════════
// 8. EXPERIENCE CARDS — Alternating slide-in with dot pulse
// ═══════════════════════════════════════════════════════════════════

export function animateExperienceCards(containerElement) {
    if (!containerElement) return;

    const cards = containerElement.querySelectorAll('.experience-card');
    cards.forEach((card, i) => {
        const dot = card.querySelector('.timeline-dot');
        const isEven = i % 2 === 0;

        // Alternate left / opacity-only for visual rhythm
        gsap.fromTo(card,
            {
                x: isEven ? -60 : 60,
                opacity: 0,
                filter: 'blur(3px)',
            },
            {
                x: 0, opacity: 1,
                filter: 'blur(0px)',
                duration: 0.9,
                ease: EASE,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            }
        );

        // Timeline dot — elastic pop
        if (dot) {
            gsap.fromTo(dot,
                { scale: 0, opacity: 0 },
                {
                    scale: 1, opacity: 1,
                    duration: 0.6,
                    ease: EASE_ELASTIC,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    delay: 0.15,
                }
            );
        }
    });
}

// ═══════════════════════════════════════════════════════════════════
// 9. PROGRESS BAR FILL — Scrub-linked skill reveal
// ═══════════════════════════════════════════════════════════════════

export function animateProgressBars(containerElement) {
    if (!containerElement) return;

    const bars = containerElement.querySelectorAll('.progress-indicator');
    bars.forEach((bar) => {
        gsap.fromTo(bar,
            { scaleX: 0, transformOrigin: 'left center' },
            {
                scaleX: 1,
                duration: 1.4,
                ease: EASE_EXPO,
                scrollTrigger: {
                    trigger: bar.closest('.skill-category') || bar,
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });
}

// ═══════════════════════════════════════════════════════════════════
// 10. STAT COUNTER — Animated number with scroll trigger
// ═══════════════════════════════════════════════════════════════════

export function animateStatCounter(element, targetValue, isDecimal = false, suffix = '') {
    if (!element) return;

    const obj = { value: 0 };
    gsap.to(obj, {
        value: targetValue,
        duration: 2.5,
        ease: EASE_CIRC,
        scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            toggleActions: 'play none none none',
        },
        onUpdate: () => {
            element.textContent = isDecimal
                ? obj.value.toFixed(2) + suffix
                : Math.floor(obj.value) + suffix;
        }
    });
}

// ═══════════════════════════════════════════════════════════════════
// 11. MAGNETIC HOVER — Premium button interaction
// ═══════════════════════════════════════════════════════════════════

export function addMagneticEffect(element) {
    if (!element) return () => {};

    const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
            x: x * 0.25,
            y: y * 0.25,
            rotation: x * 0.02,
            duration: 0.35,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        gsap.to(element, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: EASE_ELASTIC,
        });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
    };
}

// ═══════════════════════════════════════════════════════════════════
// 12. SECTION FADE-UP — Generic scroll-triggered reveal
// ═══════════════════════════════════════════════════════════════════

export function animateSection(sectionElement) {
    if (!sectionElement) return;

    gsap.fromTo(sectionElement,
        { y: 60, opacity: 0, filter: 'blur(3px)' },
        {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: EASE,
            scrollTrigger: {
                trigger: sectionElement,
                start: 'top 88%',
                toggleActions: 'play none none none',
            }
        }
    );
}

// ═══════════════════════════════════════════════════════════════════
// 13. NAVBAR — Smart hide/show + blur transition
// ═══════════════════════════════════════════════════════════════════

export function animateNavbar(navElement) {
    if (!navElement) return;

    let lastScrollY = 0;

    ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
            const currentScrollY = self.scroll();
            const delta = currentScrollY - lastScrollY;

            if (delta > 5 && currentScrollY > 300) {
                // Scrolling down — hide with slide + fade
                gsap.to(navElement, {
                    y: -100,
                    opacity: 0,
                    duration: 0.35,
                    ease: EASE_SMOOTH,
                });
            } else if (delta < -3) {
                // Scrolling up — reveal
                gsap.to(navElement, {
                    y: 0,
                    opacity: 1,
                    duration: 0.35,
                    ease: EASE_SMOOTH,
                });
            }
            lastScrollY = currentScrollY;
        }
    });
}

// ═══════════════════════════════════════════════════════════════════
// 14. SCROLL PROGRESS INDICATOR — Top bar
// ═══════════════════════════════════════════════════════════════════

export function createScrollProgress() {
    // Create progress bar element
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg,
            hsl(220, 90%, 56%),
            hsl(250, 85%, 60%),
            hsl(190, 95%, 55%),
            hsl(250, 85%, 60%),
            hsl(220, 90%, 56%)
        );
        background-size: 200% 100%;
        z-index: 10000;
        pointer-events: none;
        transition: none;
        box-shadow: 0 0 10px hsl(220 90% 56% / 0.4);
    `;
    document.body.appendChild(bar);

    // Animate gradient
    gsap.to(bar, {
        backgroundPosition: '-200% 0',
        duration: 3,
        ease: 'none',
        repeat: -1,
    });

    // Link width to scroll progress
    gsap.to(bar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
        }
    });

    return bar;
}

// ═══════════════════════════════════════════════════════════════════
// 15. PARALLAX SECTIONS — Depth layers on scroll
// ═══════════════════════════════════════════════════════════════════

export function addSectionParallax() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        // Parallax shift for the section background
        const heading = section.querySelector('h2');
        if (heading) {
            gsap.to(heading, {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.2,
                }
            });
        }
    });
}

// ═══════════════════════════════════════════════════════════════════
// 16. HORIZONTAL SCROLL GALLERY — Pinned project section
// ═══════════════════════════════════════════════════════════════════

export function createHorizontalScroll(containerElement, wrapperElement) {
    if (!containerElement || !wrapperElement) return null;

    const cards = wrapperElement.querySelectorAll('.project-card');
    if (!cards.length) return null;

    // Ensure all cards are visible before animation
    cards.forEach(card => {
        gsap.set(card, { opacity: 1 });
    });

    // Calculate the horizontal scroll distance —
    // We want to scroll so the last card is fully visible
    const getScrollAmount = () => {
        const wrapperWidth = wrapperElement.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Only scroll if content is wider than viewport
        if (wrapperWidth <= viewportWidth) return 0;
        return -(wrapperWidth - viewportWidth);
    };

    // Don't create scroll if content fits viewport
    const scrollAmount = getScrollAmount();
    if (scrollAmount === 0) return null;

    const tween = gsap.to(wrapperElement, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
            trigger: containerElement,
            start: 'top 60px', // Below navbar
            end: () => `+=${Math.abs(getScrollAmount()) * 1.5}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
        }
    });

    // Subtle scale + opacity boost as cards enter center of viewport
    cards.forEach((card) => {
        gsap.fromTo(card,
            { scale: 0.95 },
            {
                scale: 1,
                duration: 0.5,
                ease: EASE_SMOOTH,
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: tween,
                    start: 'left 85%',
                    end: 'left 50%',
                    scrub: 1,
                }
            }
        );
    });

    return tween;
}

// ═══════════════════════════════════════════════════════════════════
// 17. STAGGER REVEAL — For any list of items
// ═══════════════════════════════════════════════════════════════════

export function staggerReveal(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach((el, i) => {
        gsap.fromTo(el,
            {
                y: options.y || 40,
                opacity: 0,
                scale: options.scale || 0.97,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: options.duration || 0.7,
                delay: i * (options.stagger || 0.08),
                ease: options.ease || EASE,
                scrollTrigger: {
                    trigger: el,
                    start: options.start || 'top 90%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });
}

// ═══════════════════════════════════════════════════════════════════
// 18. PRELOADER / PAGE TRANSITION
// ═══════════════════════════════════════════════════════════════════

export function createPreloader() {
    const overlay = document.createElement('div');
    overlay.className = 'preloader-overlay';
    overlay.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">HV</div>
            <div class="preloader-bar-track">
                <div class="preloader-bar-fill"></div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const tl = gsap.timeline({
        onComplete: () => {
            overlay.remove();
            // Refresh ScrollTrigger after preloader removal
            ScrollTrigger.refresh();
        }
    });

    // Fill bar
    tl.to('.preloader-bar-fill', {
        width: '100%',
        duration: 1.2,
        ease: 'power2.inOut',
    });

    // Logo pulse
    tl.to('.preloader-logo', {
        scale: 1.2,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
    }, '-=0.3');

    // Slide overlay away
    tl.to(overlay, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
    }, '-=0.1');

    return tl;
}

// ═══════════════════════════════════════════════════════════════════
// 19. HEADING REVEAL ANIMATION
// ═══════════════════════════════════════════════════════════════════

export function animateHeading(element) {
    if (!element) return;
    gsap.fromTo(element,
        { y: 50, opacity: 0, scale: 0.95 },
        {
            y: 0, opacity: 1, scale: 1,
            duration: 0.9,
            ease: EASE,
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        }
    );
}

// ═══════════════════════════════════════════════════════════════════
// CLEANUP
// ═══════════════════════════════════════════════════════════════════

export function cleanupAnimations() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // Remove scroll progress bar if it exists
    const bar = document.querySelector('.scroll-progress-bar');
    if (bar) bar.remove();
    // Remove preloader if still present
    const preloader = document.querySelector('.preloader-overlay');
    if (preloader) preloader.remove();
}

export { gsap, ScrollTrigger };
