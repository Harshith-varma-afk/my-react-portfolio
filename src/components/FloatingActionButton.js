import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const FloatingActionButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset > 400);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            className="floating-btn"
            onClick={scrollToTop}
            title="Back to Top"
            aria-label="Scroll to top"
        >
            <ChevronUp style={{ width: '20px', height: '20px' }} />
        </button>
    );
};

export default FloatingActionButton;
