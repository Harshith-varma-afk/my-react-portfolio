import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { animateCards } from '../lib/animations';

const Projects = ({ projects }) => {
    const gridRef = useRef(null);

    useEffect(() => {
        if (gridRef.current) {
            animateCards(gridRef.current, '.project-card', {
                y: 60,
                scale: 0.92,
                stagger: 0.15,
                duration: 0.8,
                ease: 'back.out(1.3)',
            });
        }
    }, []);

    return (
        <section id="projects">
            <div className="container">
                <span className="section-subtitle">Portfolio</span>
                <h2>My Projects</h2>
                <p className="section-description">Showcasing my work in AI, ML, and data-driven solutions.</p>
                <div className="projects-grid" ref={gridRef}>
                    {projects.map(project => (
                        <div key={project.id} className="project-card" style={{ opacity: 0 }}>
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
            </div>
        </section>
    );
};

export default Projects;
