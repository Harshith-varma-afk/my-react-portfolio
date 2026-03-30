import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const Skills = ({ skills }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="skills" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <h2>My Skills</h2>
                <div className="skills-grid">
                    {skills.map((category, index) => (
                        <Card key={index} className="skill-category group hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    {category.icon}
                                    {category.category}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {category.items.map((item, idx) => (
                                    <div className="skill-item space-y-2" key={idx}>
                                        <div className="flex justify-between items-center">
                                            <span className="skill-name font-medium">{item}</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {category.levels[idx]}%
                                            </Badge>
                                        </div>
                                        <Progress 
                                            value={inView ? category.levels[idx] : 0}
                                            className="h-2"
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
