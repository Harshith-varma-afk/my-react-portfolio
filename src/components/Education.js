import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap } from 'lucide-react';
import { animateExperienceCards, animateTimeline } from '../lib/animations';

/** Formal training timeline — synced with résumé education block */
const Education = ({ entries }) => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const timelineLineRef = useRef(null);

    useEffect(() => {
        if (timelineLineRef.current && timelineRef.current) {
            animateTimeline(timelineLineRef.current, timelineRef.current);
        }

        if (timelineRef.current) {
            animateExperienceCards(timelineRef.current);
        }
    }, []);

    return (
        <section id="education" ref={sectionRef}>
            <div className="container">
                <span className="section-kicker mono">{'\u002f\u002f 04 — EDUCATION'}</span>
                <h2>Education</h2>
                <p className="section-description">
                    Graduate training that grounds the applied ML and LLM systems work in the projects and experience above.
                </p>
                <div className="experience-timeline" ref={timelineRef}>
                    <div
                        className="timeline-line"
                        ref={timelineLineRef}
                        style={{ transform: 'scaleY(0)' }}
                    />
                    {entries.map((entry) => (
                        <div
                            key={entry.id}
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
                                                gap: '0.5rem',
                                            }}>
                                                <GraduationCap style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    color: 'hsl(var(--primary))',
                                                }} />
                                                {entry.degree}
                                            </CardTitle>
                                            <CardDescription style={{
                                                fontSize: '0.9375rem',
                                                marginTop: '0.375rem',
                                            }}>
                                                {entry.school}
                                                {entry.location ? ` • ${entry.location}` : ''}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="secondary" className="exp-badge">
                                            {entry.period}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="experience-highlights">
                                        {entry.highlights.map((highlight, idx) => (
                                            <li key={`${entry.id}-${idx}`}>{highlight}</li>
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

export default Education;
