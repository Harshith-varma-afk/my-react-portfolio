import React, { useEffect, useRef } from 'react';
import { animateSection } from '../lib/animations';

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        if (footerRef.current) {
            animateSection(footerRef.current);
        }
    }, []);

    return (
        <footer ref={footerRef} style={{ opacity: 0 }}>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-brand">Harshith Varma Rudraraju</h3>
                        <p className="footer-tagline">AI/ML Engineer · LLM systems & agentic AI · DL/NLP · MLOps & scalable inference</p>
                    </div>
                    <div className="footer-section">
                        <div className="footer-links">
                            <a href="mailto:harshithvarmarudraraju419@gmail.com" className="footer-link">
                                harshithvarmarudraraju419@gmail.com
                            </a>
                            <span className="footer-divider">•</span>
                            <a href="tel:+12055868488" className="footer-link">+1 (205) 586-8488</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Harshith Varma Rudraraju. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
