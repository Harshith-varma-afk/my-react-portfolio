import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Default easing for refined, premium feel
const EASE = 'power3.out';
const EASE_SMOOTH = 'power2.out';
const EASE_ELASTIC = 'elastic.out(1, 0.5)';
const EASE_BACK = 'back.out(1.7)';

/**
 * Fade-up reveal for section headings
 */
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

/**
 * Staggered card entrance — each card slides up with delay
 */
export function animateCards(containerSelector, cardSelector, options = {}) {
    const container = typeof containerSelector === 'string'
        ? document.querySelector(containerSelector)
        : containerSelector;
    if (!container) return;

    const cards = container.querySelectorAll(cardSelector);
    if (!cards.length) return;

    gsap.fromTo(cards,
        {
            y: options.y || 60,
            opacity: 0,
            scale: options.scale || 0.95,
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: options.duration || 0.8,
            stagger: options.stagger || 0.12,
            ease: options.ease || EASE,
            scrollTrigger: {
                trigger: container,
                start: options.start || 'top 80%',
                toggleActions: 'play none none none',
            }
        }
    );
}

/**
 * Hero entrance — orchestrated timeline
 */
export function animateHero(refs) {
    const tl = gsap.timeline({ defaults: { ease: EASE } });

    if (refs.image) {
        tl.fromTo(refs.image,
            { scale: 0, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: EASE_BACK }
        );
    }

    if (refs.greeting) {
        tl.fromTo(refs.greeting,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.4'
        );
    }

    if (refs.name) {
        tl.fromTo(refs.name,
            { y: 40, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: EASE_BACK },
            '-=0.3'
        );
    }

    if (refs.underline) {
        tl.fromTo(refs.underline,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: 'power2.inOut', transformOrigin: 'left center' },
            '-=0.3'
        );
    }

    if (refs.dynamicText) {
        tl.fromTo(refs.dynamicText,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.4'
        );
    }

    if (refs.description) {
        tl.fromTo(refs.description,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.3'
        );
    }

    if (refs.buttons) {
        tl.fromTo(refs.buttons,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: EASE_BACK },
            '-=0.2'
        );
    }

    if (refs.scrollIndicator) {
        tl.fromTo(refs.scrollIndicator,
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            '-=0.1'
        );
    }

    return tl;
}

/**
 * Parallax float effect for hero orbs
 */
export function animateOrbs(orbElements) {
    orbElements.forEach((orb, i) => {
        if (!orb) return;
        const duration = 15 + i * 5;
        const xRange = 40 + i * 20;
        const yRange = 30 + i * 15;

        gsap.to(orb, {
            x: `random(-${xRange}, ${xRange})`,
            y: `random(-${yRange}, ${yRange})`,
            scale: `random(0.9, 1.15)`,
            duration: duration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
        });
    });
}

/**
 * Timeline line draw-in effect
 */
export function animateTimeline(lineElement, containerElement) {
    if (!lineElement || !containerElement) return;

    gsap.fromTo(lineElement,
        { scaleY: 0, transformOrigin: 'top center' },
        {
            scaleY: 1,
            duration: 1.5,
            ease: EASE_SMOOTH,
            scrollTrigger: {
                trigger: containerElement,
                start: 'top 75%',
                toggleActions: 'play none none none',
            }
        }
    );
}

/**
 * Experience card slide-in with timeline dot pulse
 */
export function animateExperienceCards(containerElement) {
    if (!containerElement) return;

    const cards = containerElement.querySelectorAll('.experience-card');
    cards.forEach((card, i) => {
        const dot = card.querySelector('.timeline-dot');

        gsap.fromTo(card,
            { x: -40, opacity: 0 },
            {
                x: 0, opacity: 1,
                duration: 0.8,
                ease: EASE,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                }
            }
        );

        if (dot) {
            gsap.fromTo(dot,
                { scale: 0, opacity: 0 },
                {
                    scale: 1, opacity: 1,
                    duration: 0.5,
                    ease: EASE_ELASTIC,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 82%',
                        toggleActions: 'play none none none',
                    },
                    delay: 0.2,
                }
            );
        }
    });
}

/**
 * Skill progress bars fill animation
 */
export function animateProgressBars(containerElement) {
    if (!containerElement) return;

    const bars = containerElement.querySelectorAll('.progress-indicator');
    bars.forEach((bar) => {
        gsap.fromTo(bar,
            { scaleX: 0, transformOrigin: 'left center' },
            {
                scaleX: 1,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar.closest('.skill-category') || bar,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });
}

/**
 * Stat number counter with GSAP
 */
export function animateStatCounter(element, targetValue, isDecimal = false, suffix = '') {
    if (!element) return;

    const obj = { value: 0 };
    gsap.to(obj, {
        value: targetValue,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
        onUpdate: () => {
            element.textContent = isDecimal
                ? obj.value.toFixed(2) + suffix
                : Math.floor(obj.value) + suffix;
        }
    });
}

/**
 * Magnetic hover effect for buttons
 */
export function addMagneticEffect(element) {
    if (!element) return;

    const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
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

/**
 * Smooth section fade-up for any section
 */
export function animateSection(sectionElement) {
    if (!sectionElement) return;

    gsap.fromTo(sectionElement,
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: EASE,
            scrollTrigger: {
                trigger: sectionElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        }
    );
}

/**
 * Navbar hide/show on scroll
 */
export function animateNavbar(navElement) {
    if (!navElement) return;

    let lastScrollY = 0;

    ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
            const currentScrollY = self.scroll();
            if (currentScrollY > lastScrollY && currentScrollY > 300) {
                // Scrolling down — hide
                gsap.to(navElement, { y: -100, duration: 0.3, ease: EASE_SMOOTH });
            } else {
                // Scrolling up — show
                gsap.to(navElement, { y: 0, duration: 0.3, ease: EASE_SMOOTH });
            }
            lastScrollY = currentScrollY;
        }
    });
}

/**
 * Cleanup all ScrollTriggers (call on unmount)
 */
export function cleanupAnimations() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

export { gsap, ScrollTrigger };
