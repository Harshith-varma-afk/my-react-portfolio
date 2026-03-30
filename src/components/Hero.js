import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { dynamicTexts } from '../data/portfolioData';
import { animateHero, animateOrbs, addMagneticEffect } from '../lib/animations';

const Hero = ({ smoothScroll }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Refs for GSAP
    const heroRef = useRef(null);
    const spotlightRef = useRef(null);
    const imageRef = useRef(null);
    const greetingRef = useRef(null);
    const nameRef = useRef(null);
    const underlineRef = useRef(null);
    const dynamicTextRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonsRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);
    const orb3Ref = useRef(null);
    const viewWorkBtnRef = useRef(null);
    const getInTouchBtnRef = useRef(null);

    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

    // GSAP animations on mount
    useEffect(() => {
        const cleanups = [];

        // Orchestrated hero entrance
        const tl = animateHero({
            image: imageRef.current,
            greeting: greetingRef.current,
            name: nameRef.current,
            underline: underlineRef.current,
            dynamicText: dynamicTextRef.current,
            description: descriptionRef.current,
            buttons: buttonsRef.current,
            scrollIndicator: scrollIndicatorRef.current,
        });

        // Floating orbs
        animateOrbs([orb1Ref.current, orb2Ref.current, orb3Ref.current]);

        // Magnetic effect on CTA buttons
        if (viewWorkBtnRef.current) {
            cleanups.push(addMagneticEffect(viewWorkBtnRef.current));
        }
        if (getInTouchBtnRef.current) {
            cleanups.push(addMagneticEffect(getInTouchBtnRef.current));
        }

        return () => {
            if (tl) tl.kill();
            cleanups.forEach(cleanup => cleanup && cleanup());
        };
    }, []);

    // Mouse spotlight effect
    const handleMouseMove = useCallback((e) => {
        if (spotlightRef.current && heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - 300;
            const y = e.clientY - rect.top - 300;
            spotlightRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
    }, []);

    useEffect(() => {
        const heroEl = heroRef.current;
        if (heroEl) {
            heroEl.addEventListener('mousemove', handleMouseMove);
            return () => heroEl.removeEventListener('mousemove', handleMouseMove);
        }
    }, [handleMouseMove]);

    // Typing effect
    useEffect(() => {
        const currentPhrase = dynamicTexts[currentTextIndex];
        let timer;

        const handleTypingEffect = () => {
            if (!isDeleting) {
                setDisplayedText(prev => currentPhrase.slice(0, prev.length + 1));
                if (displayedText.length === currentPhrase.length - 1) {
                    timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
                } else {
                    timer = setTimeout(handleTypingEffect, typingSpeed);
                }
            } else {
                setDisplayedText(prev => prev.slice(0, prev.length - 1));
                if (displayedText.length === 0) {
                    setIsDeleting(false);
                    setCurrentTextIndex(prevIndex => (prevIndex + 1) % dynamicTexts.length);
                } else {
                    timer = setTimeout(handleTypingEffect, deletingSpeed);
                }
            }
        };

        if (!isDeleting && displayedText.length < currentPhrase.length) {
            timer = setTimeout(handleTypingEffect, typingSpeed);
        } else if (isDeleting && displayedText.length > 0) {
            timer = setTimeout(handleTypingEffect, deletingSpeed);
        } else if (!isDeleting && displayedText.length === currentPhrase.length) {
            timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        } else if (!isDeleting && displayedText.length === 0 && currentPhrase.length > 0) {
            timer = setTimeout(handleTypingEffect, pauseBeforeType);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentTextIndex]);

    return (
        <section id="about" className="hero" ref={heroRef}>
            {/* Gradient mesh background */}
            <div className="hero-gradient-mesh">
                <div className="hero-orb hero-orb-1" ref={orb1Ref} />
                <div className="hero-orb hero-orb-2" ref={orb2Ref} />
                <div className="hero-orb hero-orb-3" ref={orb3Ref} />
            </div>

            {/* Grid pattern */}
            <div className="hero-grid" />

            {/* Mouse spotlight */}
            <div className="hero-spotlight" ref={spotlightRef} />

            <div className="container">
                <div className="hero-content">
                    <div className="hero-image-container" ref={imageRef} style={{ opacity: 0 }}>
                        <img
                            src="prof.jpg"
                            alt="Harshith Varma"
                            className="hero-img"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/180x180/0a0a1a/5b8af7?text=HV";
                            }}
                        />
                    </div>
                    <h1>
                        <span className="greeting" ref={greetingRef} style={{ opacity: 0 }}>Hi, I'm</span>
                        <span className="name" ref={nameRef} style={{ opacity: 0 }}>
                            Harshith Varma
                            <span className="name-underline" ref={underlineRef} />
                        </span>
                    </h1>
                    <p className="dynamic-text" ref={dynamicTextRef} style={{ opacity: 0 }}>
                        <span className="typed-text">{displayedText}</span>
                        <span className="cursor">|</span>
                    </p>
                    <p className="hero-description" ref={descriptionRef} style={{ opacity: 0 }}>
                        MS Data Science Student at UAB | AI & Analytics Enthusiast
                    </p>
                    <div className="hero-buttons" ref={buttonsRef} style={{ opacity: 0 }}>
                        <div ref={viewWorkBtnRef}>
                            <Button variant="gradient" size="lg" onClick={() => smoothScroll('#projects')}>
                                View My Work
                            </Button>
                        </div>
                        <div ref={getInTouchBtnRef}>
                            <Button variant="outline" size="lg" onClick={() => smoothScroll('#contact')}>
                                Get In Touch
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll chevron */}
            <div className="scroll-indicator" ref={scrollIndicatorRef} style={{ opacity: 0 }}>
                <div className="scroll-chevron" onClick={() => smoothScroll('#stats')}>
                    <ChevronDown />
                    <ChevronDown />
                </div>
            </div>
        </section>
    );
};

export default Hero;
