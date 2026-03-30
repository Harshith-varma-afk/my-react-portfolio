import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase } from 'lucide-react';

const ExperienceCard = ({ exp, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    return (
        <div
            ref={ref}
            className={`experience-card card-animate ${inView ? 'is-inView' : ''}`}
            style={{ transitionDelay: `${index * 0.15 + 0.1}s` }}
        >
            <div className="timeline-dot" />
            <Card>
                <CardHeader>
                    <div className="experience-header">
                        <div>
                            <CardTitle style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Briefcase style={{ width: '18px', height: '18px', color: 'hsl(var(--primary))' }} />
                                {exp.role}
                            </CardTitle>
                            <CardDescription style={{ fontSize: '0.9375rem', marginTop: '0.375rem' }}>
                                {exp.company} • {exp.location}
                            </CardDescription>
                        </div>
                        <Badge variant="secondary" className="exp-badge">{exp.period}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="experience-highlights">
                        {exp.highlights.map((highlight, idx) => (
                            <li key={idx}>{highlight}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

const Experience = ({ experiences }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.05,
    });

    return (
        <section id="experience" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <span className="section-subtitle">Career</span>
                <h2>Experience</h2>
                <p className="section-description">My professional journey in AI, ML, and data science.</p>
                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={exp.id} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
