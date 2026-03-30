import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { dynamicTexts } from '../data/portfolioData';

const Hero = ({ smoothScroll }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const spotlightRef = useRef(null);
    const heroRef = useRef(null);
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

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
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="hero-orb hero-orb-3" />
            </div>

            {/* Grid pattern */}
            <div className="hero-grid" />

            {/* Mouse spotlight */}
            <div className="hero-spotlight" ref={spotlightRef} />

            <div className="container">
                <div className="hero-content">
                    <div className="hero-image-container">
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
                        <span className="greeting">Hi, I'm</span>
                        <span className="name">Harshith Varma</span>
                    </h1>
                    <p className="dynamic-text">
                        <span className="typed-text">{displayedText}</span>
                        <span className="cursor">|</span>
                    </p>
                    <p className="hero-description">
                        MS Data Science Student at UAB | AI & Analytics Enthusiast
                    </p>
                    <div className="hero-buttons">
                        <Button variant="gradient" size="lg" onClick={() => smoothScroll('#projects')}>
                            View My Work
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => smoothScroll('#contact')}>
                            Get In Touch
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll chevron */}
            <div className="scroll-indicator">
                <div className="scroll-chevron" onClick={() => smoothScroll('#stats')}>
                    <ChevronDown />
                    <ChevronDown />
                </div>
            </div>
        </section>
    );
};

export default Hero;
