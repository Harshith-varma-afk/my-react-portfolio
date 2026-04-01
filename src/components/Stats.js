import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { animateCards, animateStatCounter, add3DTiltEffect } from '../lib/animations';

const Stats = ({ stats }) => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const numberRefs = useRef([]);
    const cardRefs = useRef([]);

    useEffect(() => {
        // Staggered card entrance with 3D rotation
        if (gridRef.current) {
            animateCards(gridRef.current, '.stat-card', {
                y: 60,
                stagger: 0.1,
                duration: 0.8,
                ease: 'back.out(1.4)',
            });
        }

        // 3D tilt effect on stat cards
        const cardEls = cardRefs.current.filter(Boolean);
        const tiltCleanups = add3DTiltEffect(cardEls);

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

        return () => {
            tiltCleanups.forEach(fn => fn && fn());
        };
    }, [stats]);

    return (
        <section id="stats" ref={sectionRef}>
            <div className="container">
                <span className="section-subtitle">Highlights</span>
                <h2>My Achievements</h2>
                <div className="stats-grid" ref={gridRef}>
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className="stat-card"
                            ref={el => cardRefs.current[index] = el}
                        >
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
