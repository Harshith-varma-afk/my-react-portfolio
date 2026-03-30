import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';
import { projectsData, skillsData, certificationsData, experienceData, statsData } from './data/portfolioData';
import './App.css';

const App = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
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
            <Navbar smoothScroll={smoothScroll} theme={theme} toggleTheme={toggleTheme} />
            <Hero smoothScroll={smoothScroll} />
            <Stats stats={statsData} />
            <Experience experiences={experienceData} />
            <Skills skills={skillsData} />
            <Certifications certifications={certificationsData} />
            <Projects projects={projectsData} />
            <Contact />
            <Footer />
            <FloatingActionButton />
        </>
    );
};

export default App;
