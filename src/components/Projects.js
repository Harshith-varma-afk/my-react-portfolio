import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

const ProjectCard = ({ project }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <Card ref={ref} className={`project-card card-animate group hover:scale-105 transition-all duration-300 overflow-hidden ${inView ? 'is-inView' : ''}`}>
            <div className="relative overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src=`https://placehold.co/400x200/0f172a/60a5fa?text=${project.title.substring(0,15)}`;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                {project.link ? (
                    <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            View on GitHub &rarr;
                        </a>
                    </Button>
                ) : (
                    <Button variant="outline" size="sm" className="w-full">
                        View Project &rarr;
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

const Projects = ({ projects }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="projects" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <h2>My Projects</h2>
                <div className="projects-grid">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
