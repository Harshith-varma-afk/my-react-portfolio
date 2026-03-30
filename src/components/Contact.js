import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { animateSection } from '../lib/animations';

const Contact = () => {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    useEffect(() => {
        if (sectionRef.current) {
            animateSection(sectionRef.current);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionMessage('');

        const templateParams = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
        };

        emailjs.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            templateParams,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
            setSubmissionMessage('Message sent successfully! Thank you.');
            setFormData({ name: '', email: '', message: '' });
        })
        .catch(() => {
            setSubmissionMessage('Failed to send message. Please try again later.');
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <section id="contact" ref={sectionRef} style={{ opacity: 0 }}>
            <div className="container">
                <span className="section-subtitle">Connect</span>
                <h2>Get In Touch</h2>
                <p className="section-description">
                    Have a question or want to work together? Feel free to reach out!
                </p>
                <Card className="contact-card">
                    <CardHeader>
                        <CardTitle>Send Me a Message</CardTitle>
                        <CardDescription>I'll get back to you as soon as possible.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="contact-form-group">
                                <label htmlFor="name" className="contact-label">Name</label>
                                <Input
                                    type="text" id="name" name="name"
                                    value={formData.name} onChange={handleChange}
                                    required placeholder="Your name"
                                />
                            </div>
                            <div className="contact-form-group">
                                <label htmlFor="email" className="contact-label">Email</label>
                                <Input
                                    type="email" id="email" name="email"
                                    value={formData.email} onChange={handleChange}
                                    required placeholder="your.email@example.com"
                                />
                            </div>
                            <div className="contact-form-group">
                                <label htmlFor="message" className="contact-label">Message</label>
                                <textarea
                                    id="message" name="message" rows="5"
                                    value={formData.message} onChange={handleChange}
                                    required placeholder="Tell me about your project or idea..."
                                    className="contact-textarea"
                                />
                            </div>
                            <Button
                                type="submit" disabled={isSubmitting}
                                style={{ width: '100%' }} variant="gradient" size="lg"
                            >
                                {isSubmitting ? 'Sending...' : (
                                    <>
                                        <Send style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                                        Send Message
                                    </>
                                )}
                            </Button>
                            {submissionMessage && (
                                <div className={`submission-message ${
                                    submissionMessage.includes('successfully')
                                        ? 'submission-success' : 'submission-error'
                                }`}>
                                    {submissionMessage}
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Contact;
