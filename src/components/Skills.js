import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { animateCards, animateProgressBars } from '../lib/animations';

const Skills = ({ skills }) => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        // Staggered card reveal
        if (gridRef.current) {
            animateCards(gridRef.current, '.skill-category', {
                y: 50,
                stagger: 0.1,
                duration: 0.7,
            });
        }

        // Fill progress bars
        if (gridRef.current) {
            // Small delay to let cards appear first
            const timer = setTimeout(() => {
                animateProgressBars(gridRef.current);
            }, 200);
            return () => clearTimeout(timer);
        }
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
