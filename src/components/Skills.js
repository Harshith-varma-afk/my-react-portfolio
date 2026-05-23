import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { animateCards } from '../lib/animations';

const Skills = ({ skills }) => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        if (gridRef.current) {
            animateCards(gridRef.current, '.skill-category', {
                y: 48,
                stagger: 0.08,
                duration: 0.72,
            });
        }
    }, []);

    return (
        <section id="skills" ref={sectionRef}>
            <div className="container">
                <h2>Technical stack</h2>
                <p className="section-description">
                    Loose buckets—not claiming I&apos;ve shipped every badge on here in anger.
                </p>
                <div className="skills-grid skills-grid-compact" ref={gridRef}>
                    {skills.map(category => (
                        <Card
                            key={category.category}
                            className="skill-category skill-category--chips"
                            style={{ opacity: 0 }}
                        >
                            <CardHeader className="skill-category-head">
                                <CardTitle className="skill-category-title">
                                    <span className="category-icon" aria-hidden>
                                        {category.icon}
                                    </span>
                                    {category.category}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="skill-category-body">
                                <ul className="skills-chip-cloud">
                                    {category.items.map(item => (
                                        <li key={`${category.category}-${item}`}>
                                            <span className="skills-chip">{item}</span>
                                        </li>
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

export default Skills;
