import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Download, Mail, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { animateNavbar } from '../lib/animations';

const Navbar = ({ smoothScroll, theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP navbar hide/show on scroll
    useEffect(() => {
        if (navRef.current) {
            animateNavbar(navRef.current);
        }
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setIsMobileOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    const handleNavClick = useCallback((id) => {
        smoothScroll(id);
        setIsMobileOpen(false);
    }, [smoothScroll]);

    return (
        <nav ref={navRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="logo">
                    <span className="logo-text">Harshith Varma</span>
                </div>

                <button
                    className={`hamburger ${isMobileOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileOpen(prev => !prev)}
                    aria-label="Toggle navigation menu"
                >
                    <span /><span /><span />
                </button>

                <div
                    className={`mobile-overlay ${isMobileOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileOpen(false)}
                />

                <div className={`navbar-nav ${isMobileOpen ? 'open' : ''}`}>
                    <Button variant="ghost" size="sm" onClick={() => handleNavClick('#about')}>About</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleNavClick('#experience')}>Experience</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleNavClick('#skills')}>Skills</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleNavClick('#projects')}>Projects</Button>
                    <Button variant="outline" size="sm" asChild>
                        <a href="resume.pdf" download="Harshith_AI_Data_Resume.pdf">
                            <Download className="w-4 h-4" style={{ marginRight: '6px' }} />
                            Resume
                        </a>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleNavClick('#contact')}>
                        <Mail className="w-4 h-4" style={{ marginRight: '6px' }} />
                        Contact
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        className="theme-toggle-btn"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
