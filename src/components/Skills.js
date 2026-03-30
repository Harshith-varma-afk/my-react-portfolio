import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const SkillCard = ({ category, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    return (
        <Card
            ref={ref}
            className={`skill-category card-animate ${inView ? 'is-inView' : ''}`}
            style={{ transitionDelay: `${index * 0.1 + 0.05}s` }}
        >
            <CardHeader style={{ paddingBottom: '0.75rem' }}>
                <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.0625rem' }}>
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
                            <Progress
                                value={inView ? category.levels[idx] : 0}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const Skills = ({ skills }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.05,
    });

    return (
        <section id="skills" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <span className="section-subtitle">Expertise</span>
                <h2>My Skills</h2>
                <p className="section-description">Technologies and tools I work with daily.</p>
                <div className="skills-grid">
                    {skills.map((category, index) => (
                        <SkillCard key={index} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
