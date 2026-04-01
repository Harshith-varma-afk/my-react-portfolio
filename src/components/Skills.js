import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { animateCards, animateProgressBars, add3DTiltEffect } from '../lib/animations';

const Skills = ({ skills }) => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        // Staggered card reveal with 3D rotation
        if (gridRef.current) {
            animateCards(gridRef.current, '.skill-category', {
                y: 60,
                stagger: 0.1,
                duration: 0.8,
            });
        }

        // 3D tilt on skill category cards
        const cardEls = cardRefs.current.filter(Boolean);
        const tiltCleanups = add3DTiltEffect(cardEls);

        // Fill progress bars with delay
        if (gridRef.current) {
            const timer = setTimeout(() => {
                animateProgressBars(gridRef.current);
            }, 300);
            return () => {
                clearTimeout(timer);
                tiltCleanups.forEach(fn => fn && fn());
            };
        }

        return () => {
            tiltCleanups.forEach(fn => fn && fn());
        };
    }, []);

    return (
        <section id="skills" ref={sectionRef}>
            <div className="container">
                <span className="section-subtitle">Expertise</span>
                <h2>My Skills</h2>
                <p className="section-description">Technologies and tools I work with daily.</p>
                <div className="skills-grid" ref={gridRef}>
                    {skills.map((category, index) => (
                        <Card
                            key={index}
                            className="skill-category"
                            style={{ opacity: 0 }}
                            ref={el => cardRefs.current[index] = el}
                        >
                            <CardHeader style={{ paddingBottom: '0.75rem' }}>
                                <CardTitle style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    fontSize: '1.0625rem'
                                }}>
                                    <span className="category-icon">{category.icon}</span>
                                    {category.category}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="skill-items">
                                    {category.items.map((item, idx) => (
                                        <div className="skill-item" key={idx}>
                                            <div className="skill-info">
                                                <span className="skill-name">{item}</span>
                                                <Badge variant="secondary" style={{ fontSize: '0.7rem' }}>
                                                    {category.levels[idx]}%
                                                </Badge>
                                            </div>
                                            <Progress value={category.levels[idx]} />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
