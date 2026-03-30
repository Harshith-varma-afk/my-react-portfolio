import React, { useState, useEffect } from 'react';
import { Download, Mail, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = ({ smoothScroll, theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="logo">
                    <span className="logo-text">Harshith's Portfolio</span>
                </div>
                <div className="navbar-nav">
                    <Button variant="ghost" size="sm" onClick={() => smoothScroll('#about')}>About</Button>
                    <Button variant="ghost" size="sm" onClick={() => smoothScroll('#experience')}>Experience</Button>
                    <Button variant="ghost" size="sm" onClick={() => smoothScroll('#skills')}>Skills</Button>
                    <Button variant="ghost" size="sm" onClick={() => smoothScroll('#projects')}>Projects</Button>
                    <Button variant="outline" size="sm" asChild>
                        <a href="resume.pdf" download="Harshith_Varma_Resume.pdf">
                            <Download className="w-4 h-4 mr-2" />
                            Resume
                        </a>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => smoothScroll('#contact')}>
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        className="ml-2"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
