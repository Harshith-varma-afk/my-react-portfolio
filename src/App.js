import React, { useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';
import { projectsData, skillsData, educationData, experienceData, statsData } from './data/portfolioData';
import {
    createScrollProgress,
    createPreloader,
    animateSectionHeadings,
    addSectionParallax,
    cleanupAnimations,
    ScrollTrigger,
} from './lib/animations';
import './App.css';

const App = () => {
    const hasInitialized = useRef(false);

    useEffect(() => {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }, []);

    // Global GSAP effects — run once on mount
    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        // 1. Preloader animation
        createPreloader();

        // 2. Scroll progress bar
        const progressBar = createScrollProgress();

        // 3. Section heading reveals (all sections)
        // Wait for preloader to finish before initializing scroll-based stuff
        const initTimer = setTimeout(() => {
            animateSectionHeadings();
            addSectionParallax();
            ScrollTrigger.refresh();
        }, 2200);

        return () => {
            clearTimeout(initTimer);
            if (progressBar) progressBar.remove();
            cleanupAnimations();
        };
    }, []);

    const smoothScroll = useCallback((id) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <>
            <div className="neo-scroll-rail" aria-hidden="true" />
            <Navbar smoothScroll={smoothScroll} />
            <Hero smoothScroll={smoothScroll} />
            <Stats stats={statsData} />
            <Experience experiences={experienceData} />
            <Education entries={educationData} />
            <Skills skills={skillsData} />
            <Projects projects={projectsData} />
            <Contact />
            <Footer />
            <FloatingActionButton />
        </>
    );
};

export default App;
