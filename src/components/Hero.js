import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { dynamicTexts } from '../data/portfolioData';

const Hero = ({ smoothScroll }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [particles, setParticles] = useState([]);
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

    useEffect(() => {
        const createParticles = () => {
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            }));
            setParticles(newParticles);
        };

        createParticles();
        const interval = setInterval(() => {
            setParticles(prev => prev.map(particle => ({
                ...particle,
                x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
                y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight
            })));
        }, 50);

        return () => clearInterval(interval);
    }, []);

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
        <section id="about" className="hero">
            <div className="hero-spotlight"></div>
            <div className="particles-container">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            width: particle.size,
                            height: particle.size,
                            opacity: particle.opacity
                        }}
                    />
                ))}
            </div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-image-container">
                        <img src="prof.jpg" alt="Harshith Varma" className="hero-img"
                             onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/180x180/0f172a/60a5fa?text=HV"; }}/>
                        <div className="hero-img-border"></div>
                    </div>
                    <h1>
                        <span className="greeting">Hi, I'm</span>
                        <span className="name">Harshith Varma</span>
                    </h1>
                    <p className="dynamic-text">
                        <span className="typed-text">{displayedText}</span>
                    </p>
                    <p className="hero-description">MS Data Science Student at UAB | AI & Analytics Enthusiast</p>
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
            <div className="scroll-indicator">
                <div className="scroll-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
