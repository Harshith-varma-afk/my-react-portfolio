import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Download, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { animateNavbar } from '../lib/animations';

const Navbar = ({ smoothScroll }) => {
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

    useEffect(() => {
        if (navRef.current) {
            animateNavbar(navRef.current);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setIsMobileOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    const handleNavClick = useCallback((id) => {
        smoothScroll(id);
        setIsMobileOpen(false);
    }, [smoothScroll]);

    const linkBtns = (
        <>
            <Button variant="ghost" size="sm" onClick={() => handleNavClick('#about')}>About</Button>
            <Button variant="ghost" size="sm" onClick={() => handleNavClick('#experience')}>Experience</Button>
            <Button variant="ghost" size="sm" onClick={() => handleNavClick('#projects')}>Projects</Button>
            <Button variant="ghost" size="sm" onClick={() => handleNavClick('#skills')}>Stack</Button>
            <Button variant="ghost" size="sm" onClick={() => handleNavClick('#contact')}>Contact</Button>
        </>
    );

    return (
        <nav ref={navRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-shell">
                <div className="navbar-brand">
                    <span className="logo-text">Harshith Varma</span>
                </div>

                <div className="navbar-links-desktop">
                    {linkBtns}
                </div>

                <div className="navbar-trailing-desktop">
                    <a
                        href="resume.pdf"
                        download="Harshith_AI_Data_Resume.pdf"
                        className={cn(
                            'btn-component btn-gradient btn-sm',
                            'nav-resume-cta'
                        )}
                    >
                        Resume
                        <ArrowUpRight className="nav-resume-icon" aria-hidden />
                    </a>
                </div>

                <button
                    type="button"
                    className={`hamburger ${isMobileOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileOpen(prev => !prev)}
                    aria-label="Toggle navigation menu"
                >
                    <span /><span /><span />
                </button>

                <div
                    className={`mobile-overlay ${isMobileOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileOpen(false)}
                    aria-hidden="true"
                />

                <div className={`navbar-nav navbar-nav-drawer ${isMobileOpen ? 'open' : ''}`}>
                    {linkBtns}
                    <a
                        href="resume.pdf"
                        download="Harshith_AI_Data_Resume.pdf"
                        className={cn(
                            'btn-component btn-outline btn-sm neo-mobile-resume-link'
                        )}
                    >
                        <Download className="w-4 h-4 neo-mobile-resume-dl" aria-hidden />
                        Resume
                        <ArrowUpRight className="w-4 h-4 neo-mobile-resume-arr" aria-hidden />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
