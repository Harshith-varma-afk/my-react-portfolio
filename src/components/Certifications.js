import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';

const CertificationCard = ({ cert, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    return (
        <Card
            ref={ref}
            className={`certification-card card-animate ${inView ? 'is-inView' : ''}`}
            style={{ transitionDelay: `${index * 0.12 + 0.1}s` }}
        >
            <CardHeader>
                <CardTitle style={{ fontSize: '1.25rem' }}>{cert.title}</CardTitle>
                <CardDescription style={{ fontWeight: 600, color: 'hsl(var(--primary))' }}>
                    {cert.issuer}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1rem', lineHeight: 1.6 }}>
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
    );
};

const Certifications = ({ certifications }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.05,
    });

    return (
        <section id="certifications" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <span className="section-subtitle">Credentials</span>
                <h2>Certifications</h2>
                <div className="certifications-grid">
                    {certifications.map((cert, index) => (
                        <CertificationCard key={cert.id} cert={cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
