import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';

const Stats = ({ stats }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

    useEffect(() => {
        if (inView) {
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;

            stats.forEach((stat, index) => {
                const increment = stat.value / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= stat.value) {
                        current = stat.value;
                        clearInterval(timer);
                    }
                    setAnimatedStats(prev => {
                        const newStats = [...prev];
                        newStats[index] = stat.label === "GPA" ? current.toFixed(2) : Math.floor(current);
                        return newStats;
                    });
                }, stepDuration);
            });
        }
    }, [inView, stats]);

    return (
        <section id="stats" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <span className="section-subtitle">Highlights</span>
                <h2>My Achievements</h2>
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className={`stat-card card-animate ${inView ? 'is-inView' : ''}`}
                            style={{ transitionDelay: `${index * 0.1 + 0.1}s` }}
                        >
                            <CardContent style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                                <div className="stat-number">
                                    {animatedStats[index]}{stat.suffix}
                                </div>
                                <div className="stat-label">
                                    {stat.label}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
