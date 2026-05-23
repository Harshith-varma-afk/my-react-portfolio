import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { animateCards } from '../lib/animations';

const Certifications = ({ certifications }) => {
    const gridRef = useRef(null);

    useEffect(() => {
        if (gridRef.current && certifications.length > 0) {
            animateCards(gridRef.current, '.certification-card', {
                y: 50,
                stagger: 0.12,
                duration: 0.7,
                ease: 'back.out(1.2)',
            });
        }
    }, [certifications]);

    return (
        <section id="certifications">
            <div className="container">
                <span className="section-kicker mono">{'\u002f\u002f 05 — CREDENTIALS'}</span>
                <h2>Certifications</h2>
                {certifications.length === 0 ? (
                    <p className="section-description" style={{ marginBottom: '1.5rem' }}>
                        Formal certification badges aren’t enumerated on my latest résumé PDF—see LinkedIn or email me for attestations/history as needed.
                    </p>
                ) : (
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
                                    {cert.link && cert.link !== '#' && (
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
                )}
            </div>
        </section>
    );
};

export default Certifications;
