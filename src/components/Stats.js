import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { animateCards, animateStatCounter } from '../lib/animations';

const Stats = ({ stats }) => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const numberRefs = useRef([]);

    useEffect(() => {
        // Staggered card entrance
        if (gridRef.current) {
            animateCards(gridRef.current, '.stat-card', {
                y: 50,
                stagger: 0.1,
                duration: 0.7,
                ease: 'back.out(1.4)',
            });
        }

        // Animated counters
        stats.forEach((stat, i) => {
            const el = numberRefs.current[i];
            if (el) {
                animateStatCounter(
                    el,
                    stat.value,
                    stat.label === "GPA",
                    stat.suffix
                );
            }
        });
    }, [stats]);

    return (
        <section id="stats" ref={sectionRef}>
            <div className="container">
                <span className="section-subtitle">Highlights</span>
                <h2>My Achievements</h2>
                <div className="stats-grid" ref={gridRef}>
                    {stats.map((stat, index) => (
                        <Card key={index} className="stat-card">
                            <CardContent style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                                <div
                                    className="stat-number"
                                    ref={el => numberRefs.current[index] = el}
                                >
                                    0{stat.suffix}
                                </div>
                                <div className="stat-label">{stat.label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
