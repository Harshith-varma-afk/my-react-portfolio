import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';

const CertificationCard = ({ cert }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <Card ref={ref} className={`certification-card card-animate group hover:scale-105 transition-all duration-300 ${inView ? 'is-inView' : ''}`}>
            <CardHeader>
                <CardTitle className="text-xl">{cert.title}</CardTitle>
                <CardDescription className="font-medium text-primary">
                    {cert.issuer}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
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
        threshold: 0.1,
    });

    return (
        <section id="certifications" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <h2>My Certifications</h2>
                <div className="certifications-grid">
                    {certifications.map(cert => (
                        <CertificationCard key={cert.id} cert={cert} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
