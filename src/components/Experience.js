import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase } from 'lucide-react';
import { animateExperienceCards, animateTimeline } from '../lib/animations';

const Experience = ({ experiences }) => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const timelineLineRef = useRef(null);

    useEffect(() => {
        // Animate the timeline line drawing in
        if (timelineLineRef.current && timelineRef.current) {
            animateTimeline(timelineLineRef.current, timelineRef.current);
        }

        // Animate experience cards sliding in
        if (timelineRef.current) {
            animateExperienceCards(timelineRef.current);
        }
    }, []);

    return (
        <section id="experience" ref={sectionRef}>
            <div className="container">
                <span className="section-subtitle">Career</span>
                <h2>Experience</h2>
                <p className="section-description">My professional journey in AI, ML, and data science.</p>
                <div className="experience-timeline" ref={timelineRef}>
                    {/* Animated timeline line */}
                    <div
                        className="timeline-line"
                        ref={timelineLineRef}
                        style={{ transform: 'scaleY(0)' }}
                    />
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="experience-card"
                            style={{ opacity: 0 }}
                        >
                            <div className="timeline-dot" />
                            <Card>
                                <CardHeader>
                                    <div className="experience-header">
                                        <div>
                                            <CardTitle style={{
                                                fontSize: '1.25rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                <Briefcase style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    color: 'hsl(var(--primary))'
                                                }} />
                                                {exp.role}
                                            </CardTitle>
                                            <CardDescription style={{
                                                fontSize: '0.9375rem',
                                                marginTop: '0.375rem'
                                            }}>
                                                {exp.company} • {exp.location}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="secondary" className="exp-badge">
                                            {exp.period}
                                        </Badge>
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
