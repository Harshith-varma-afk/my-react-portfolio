import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase } from 'lucide-react';

const Experience = ({ experiences }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="experience" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <h2>Experience</h2>
                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <Card key={exp.id} className={`experience-card card-animate group hover:scale-105 transition-all duration-300 ${inView ? 'is-inView' : ''}`} style={{ transitionDelay: `${index * 0.15}s` }}>
                            <CardHeader>
                                <div className="experience-header">
                                    <div>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <Briefcase className="w-5 h-5 text-primary" />
                                            {exp.role}
                                        </CardTitle>
                                        <CardDescription className="text-base mt-1">
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
