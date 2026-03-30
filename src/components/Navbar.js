import React, { useState, useEffect, useCallback } from 'react';
import { Download, Mail, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = ({ smoothScroll, theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    const handleNavClick = useCallback((id) => {
        smoothScroll(id);
        setIsMobileOpen(false);
    }, [smoothScroll]);

    const toggleMobile = useCallback(() => {
        setIsMobileOpen(prev => !prev);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="logo">
                    <span className="logo-text">Harshith Varma</span>
                </div>

                {/* Hamburger button */}
                <button
                    className={`hamburger ${isMobileOpen ? 'active' : ''}`}
                    onClick={toggleMobile}
                    aria-label="Toggle navigation menu"
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* Mobile overlay */}
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
