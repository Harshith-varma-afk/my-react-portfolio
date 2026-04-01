import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { createHorizontalScroll, add3DTiltEffect, ScrollTrigger } from '../lib/animations';

const Projects = ({ projects }) => {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (!sectionRef.current || !wrapperRef.current) return;

        // Only use horizontal scroll on desktop (>= 1024px)
        let scrollInstance = null;
        const isDesktop = window.innerWidth >= 1024;

        if (isDesktop) {
            scrollInstance = createHorizontalScroll(sectionRef.current, wrapperRef.current);
        }

        // 3D tilt on project cards
        const cardEls = cardsRef.current.filter(Boolean);
        const tiltCleanups = add3DTiltEffect(cardEls);

        const handleResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            if (scrollInstance && scrollInstance.scrollTrigger) {
                scrollInstance.scrollTrigger.kill();
                scrollInstance.kill();
            }
            tiltCleanups.forEach(fn => fn && fn());
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="projects-section">
            <div className="container projects-header">
                <span className="section-subtitle">Portfolio</span>
                <h2>My Projects</h2>
                <p className="section-description">Showcasing my work in AI, ML, and data-driven solutions.</p>
            </div>
            <div className="projects-scroll-wrapper" ref={wrapperRef}>
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="project-card"
                        ref={el => cardsRef.current[index] = el}
                    >
                        <Card>
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://placehold.co/400x200/0a0a1a/5b8af7?text=${encodeURIComponent(project.title.substring(0, 15))}`;
                                    }}
                                />
                            </div>
                            <CardHeader>
                                <CardTitle style={{ fontSize: '1.125rem' }}>{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: 'hsl(var(--muted-foreground))',
                                    marginBottom: '1rem',
                                    lineHeight: 1.6
                                }}>
                                    {project.description}
                                </p>
                                {project.link ? (
                                    <Button variant="outline" size="sm" style={{ width: '100%' }} asChild>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            View on GitHub &rarr;
                                        </a>
                                    </Button>
                                ) : (
                                    <Button variant="outline" size="sm" style={{ width: '100%' }}>
                                        View Project &rarr;
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
