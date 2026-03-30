import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

const ProjectCard = ({ project, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    return (
        <div
            ref={ref}
            className={`project-card card-animate ${inView ? 'is-inView' : ''}`}
            style={{ transitionDelay: `${index * 0.12 + 0.1}s` }}
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
                    {/* Gradient overlay on hover */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, hsl(var(--primary) / 0.3), transparent)',
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        pointerEvents: 'none'
                    }}
                    className="project-overlay"
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
    );
};

const Projects = ({ projects }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.05,
    });

    return (
        <section id="projects" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <span className="section-subtitle">Portfolio</span>
                <h2>My Projects</h2>
                <p className="section-description">Showcasing my work in AI, ML, and data-driven solutions.</p>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
