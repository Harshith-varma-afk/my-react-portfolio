import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { animateCards } from '../lib/animations';

const Certifications = ({ certifications }) => {
    const gridRef = useRef(null);

    useEffect(() => {
        if (gridRef.current) {
            animateCards(gridRef.current, '.certification-card', {
                y: 50,
                stagger: 0.12,
                duration: 0.7,
                ease: 'back.out(1.2)',
            });
        }
    }, []);

    return (
        <section id="certifications">
            <div className="container">
                <span className="section-subtitle">Credentials</span>
                <h2>Certifications</h2>
                <div className="certifications-grid" ref={gridRef}>
                    {certifications.map(cert => (
                        <Card key={cert.id} className="certification-card" style={{ opacity: 0 }}>
                            <CardHeader>
                                <CardTitle style={{ fontSize: '1.25rem' }}>{cert.title}</CardTitle>
                                <CardDescription style={{
                                    fontWeight: 600,
                                    color: 'hsl(var(--primary))'
                                }}>
                                    {cert.issuer}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: 'hsl(var(--muted-foreground))',
                                    marginBottom: '1rem',
                                    lineHeight: 1.6
                                }}>
                                    {cert.description}
                                </p>
                                {cert.link && cert.link !== "#" && (
                                    <Button variant="outline" size="sm" asChild>
                                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                            View Certificate &rarr;
                                        </a>
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
