import React, { useState, useEffect, useCallback} from 'react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { ChevronUp, Mail, Download, Code, Database, Cpu, Globe, Briefcase } from 'lucide-react';
import './App.css';

// --- Data Definitions ---
const projectsData = [
    {
        id: 1,
        image: "faces.jpg",
        title: "Video Frame Analysis and Face Clustering",
        description: "Built a frame extraction and clustering system to identify unique faces from video sequences using Python and OpenCV. Applied Haar Cascade classifiers for detection and DBSCAN for clustering."
    },
    {
        id: 2,
        image: "lipnet.jpg",
        title: "Lip Movement to Text Conversion",
        description: "Designed a neural network model using deep learning to translate lip movements into text for non-verbal communication and speech recognition applications."
    },
    {
        id: 3,
        image: "sql.jpg",
        title: "Sales Performance Dashboard",
        description: "Developed an interactive Power BI dashboard integrating CRM and ERP data for a phone repair shop. Reduced manual reporting time by 70% using DAX and Power Query."
    },
    {
        id: 4,
        image: "https://placehold.co/400x200/0f172a/60a5fa?text=Chatbot",
        title: "Conversational Chatbot",
        description: "Created a context-aware chatbot using Python and OpenAI's NLP capabilities to enhance automated interactions with intelligent natural language understanding."
    },
    {
        id: 5,
        image: "https://placehold.co/400x200/0f172a/60a5fa?text=Financial+Analytics",
        title: "Financial Data Analysis Dashboards",
        description: "Developed Power BI dashboards for financial performance tracking and investment analysis. Automated data pipelines with API integrations for continuous data refresh."
    }
];

const skillsData = [
    {
        category: "Programming Languages",
        items: ["Python", "C", "C++"],
        levels: [95, 85, 80],
        icon: <Code className="w-5 h-5" />
    },
    {
        category: "Development Platforms",
        items: ["IntelliJ", "Visual Studio"],
        levels: [90, 85],
        icon: <Cpu className="w-5 h-5" />
    },
    {
        category: "Operating Systems",
        items: ["Windows XP/7/8/10", "Linux (Ubuntu)"],
        levels: [95, 75],
        icon: <Database className="w-5 h-5" />
    },
    {
        category: "Web Technologies",
        items: ["HTML", "CSS", "XML"],
        levels: [90, 85, 70],
        icon: <Globe className="w-5 h-5" />
    },
    {
        category: "New Technologies",
        items: ["PyTorch", "Android Developer", "Fundamentals of Blockchain"],
        levels: [85, 70, 60],
        icon: <Cpu className="w-5 h-5" />
    },
    {
        category: "Data Science Tools & Concepts",
        items: ["Statistical Modeling", "Data Analysis (Pandas, NumPy)", "SQL", "Machine Learning", "TensorFlow"],
        levels: [90, 95, 85, 88, 80],
        icon: <Database className="w-5 h-5" />
    }
];

const certificationsData = [
    {
        id: 1,
        title: "Introduction to Blockchain",
        issuer: "Issued by TCS",
        description: "Comprehensive introduction to blockchain technology, distributed ledger systems, smart contracts, and fundamental concepts of decentralized applications.",
        link: "#"
    },
    {
        id: 2,
        title: "Python (Basic Skills)",
        issuer: "Issued by HackerRank",
        description: "Certification validating proficiency in Python programming fundamentals, including data structures, algorithms, and problem-solving capabilities.",
        link: "#"
    },
    {
        id: 3,
        title: "Python Data Structures: Stacks, Queues, Deques",
        issuer: "Issued by LinkedIn Learning",
        description: "Advanced training in Python data structures, covering implementation and application of stacks, queues, deques, and related algorithms.",
        link: "#"
    },
    {
        id: 4,
        title: "Flipkart Grid 4.0 Software Development Challenge",
        issuer: "Issued by Unstop",
        description: "Participated in Flipkart's national-level software development challenge, demonstrating problem-solving and software engineering skills.",
        link: "#"
    }
];

const experienceData = [
    {
        id: 1,
        role: "AI Engineer Intern",
        company: "AriesView",
        location: "Remote",
        period: "Sep 2025 – Dec 2025",
        highlights: [
            "Developed LLM-based pipelines for extracting structured data from real estate and financial documents",
            "Improved underwriting automation and lease abstraction accuracy through AI model experimentation",
            "Designed retrieval-augmented generation (RAG) systems and scalable evaluation frameworks",
            "Built Power BI dashboards for financial data analysis supporting private equity investment decisions"
        ]
    },
    {
        id: 2,
        role: "Data Analytics Intern",
        company: "UAB Athletic Performance",
        location: "Birmingham, AL",
        period: "Sep 2025 – Nov 2025",
        highlights: [
            "Developed data integration pipelines unifying athlete performance metrics from multiple platforms",
            "Designed dashboards and data visualizations for performance tracking and decision support",
            "Conducted statistical analysis to optimize player performance across teams and sports",
            "Presented analytical results and recommendations to coaching and performance staff"
        ]
    }
];

const dynamicTexts = [
    "MS Data Science Student @ UAB",
    "AI Engineer Intern @ AriesView",
    "Data Analytics Intern @ UAB Athletics",
    "Machine Learning Enthusiast",
    "Power BI Dashboard Developer",
    "Python Developer",
    "Computer Vision Specialist",
    "LLM Pipeline Developer",
    "Financial Data Analyst",
    "Deep Learning Practitioner",
    "RAG Systems Developer"
];

const statsData = [
    { label: "Projects Completed", value: 5, suffix: "+" },
    { label: "Certifications", value: 4, suffix: "" },
    { label: "Internships", value: 2, suffix: "" },
    { label: "GPA", value: 3.88, suffix: "/4.0" }
];

// --- Components ---

const Navbar = ({ smoothScroll }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="logo">
                    <span className="logo-text">Harshith's Portfolio</span>
                </div>
                <div className="navbar-nav">
                    <Button variant="ghost" size="sm" onClick={() => smoothScroll('#about')}>About</Button>
                    <Button variant="ghost" size="sm" onClick={() => smoothScroll('#experience')}>Experience</Button>
                    <Button variant="ghost" size="sm" onClick={() => smoothScroll('#skills')}>Skills</Button>
                    <Button variant="ghost" size="sm" onClick={() => smoothScroll('#projects')}>Projects</Button>
                    <Button variant="outline" size="sm" asChild>
                        <a href="resume.pdf" download="Harshith_Varma_Resume.pdf">
                            <Download className="w-4 h-4 mr-2" />
                            Resume
                        </a>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => smoothScroll('#contact')}>
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                    </Button>
                </div>
            </div>
        </nav>
    );
};

const Hero = ({ smoothScroll }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [particles, setParticles] = useState([]);
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

    useEffect(() => {
        const createParticles = () => {
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            }));
            setParticles(newParticles);
        };

        createParticles();
        const interval = setInterval(() => {
            setParticles(prev => prev.map(particle => ({
                ...particle,
                x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
                y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight
            })));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const currentPhrase = dynamicTexts[currentTextIndex];
        let timer;

        const handleTypingEffect = () => {
            if (!isDeleting) {
                setDisplayedText(prev => currentPhrase.slice(0, prev.length + 1));
                if (displayedText.length === currentPhrase.length - 1) {
                    timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
                } else {
                    timer = setTimeout(handleTypingEffect, typingSpeed);
                }
            } else {
                setDisplayedText(prev => prev.slice(0, prev.length - 1));
                if (displayedText.length === 0) {
                    setIsDeleting(false);
                    setCurrentTextIndex(prevIndex => (prevIndex + 1) % dynamicTexts.length);
                } else {
                    timer = setTimeout(handleTypingEffect, deletingSpeed);
                }
            }
        };

        if (!isDeleting && displayedText.length < currentPhrase.length) {
            timer = setTimeout(handleTypingEffect, typingSpeed);
        } else if (isDeleting && displayedText.length > 0) {
            timer = setTimeout(handleTypingEffect, deletingSpeed);
        } else if (!isDeleting && displayedText.length === currentPhrase.length) {
            timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        } else if (!isDeleting && displayedText.length === 0 && currentPhrase.length > 0) {
            timer = setTimeout(handleTypingEffect, pauseBeforeType);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentTextIndex]);

    return (
        <section id="about" className="hero">
            <div className="hero-spotlight"></div>
            <div className="particles-container">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            width: particle.size,
                            height: particle.size,
                            opacity: particle.opacity
                        }}
                    />
                ))}
            </div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-image-container">
                        <img src="prof.jpg" alt="Harshith Varma" className="hero-img"
                             onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/180x180/0f172a/60a5fa?text=HV"; }}/>
                        <div className="hero-img-border"></div>
                    </div>
                    <h1>
                        <span className="greeting">Hi, I'm</span>
                        <span className="name">Harshith Varma</span>
                    </h1>
                    <p className="dynamic-text">
                        <span className="typed-text">{displayedText}</span>
                    </p>
                    <p className="hero-description">MS Data Science Student at UAB | AI & Analytics Enthusiast</p>
                    <div className="hero-buttons">
                        <Button variant="gradient" size="lg" onClick={() => smoothScroll('#projects')}>
                            View My Work
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => smoothScroll('#contact')}>
                            Get In Touch
                        </Button>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <div className="scroll-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        </section>
    );
};

const Stats = ({ stats }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
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
                <h2>My Achievements</h2>
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <Card key={index} className="stat-card group hover:scale-105 transition-all duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="stat-number text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    {animatedStats[index]}{stat.suffix}
                                </div>
                                <div className="stat-label text-sm font-medium text-muted-foreground mt-2">
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

const Experience = ({ experiences }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="experience" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <h2>Experience</h2>
                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <Card key={exp.id} className={`experience-card card-animate ${inView ? 'is-inView' : ''}`} style={{ transitionDelay: `${index * 0.15}s` }}>
                            <CardHeader>
                                <div className="experience-header">
                                    <div>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <Briefcase className="w-5 h-5 text-primary" />
                                            {exp.role}
                                        </CardTitle>
                                        <CardDescription className="text-base mt-1">
                                            {exp.company} • {exp.location}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="secondary" className="exp-badge">{exp.period}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="experience-highlights">
                                    {exp.highlights.map((highlight, idx) => (
                                        <li key={idx}>{highlight}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

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

const ProjectCard = ({ project }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <Card ref={ref} className={`project-card card-animate group hover:scale-105 transition-all duration-300 overflow-hidden ${inView ? 'is-inView' : ''}`}>
            <div className="relative overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src=`https://placehold.co/400x200/0f172a/60a5fa?text=${project.title.substring(0,15)}`;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                    View Project &rarr;
                </Button>
            </CardContent>
        </Card>
    );
};

const Projects = ({ projects }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="projects" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <h2>My Projects</h2>
                <div className="projects-grid">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    
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
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setSubmissionMessage('Message sent successfully! Thank you.');
            setFormData({ name: '', email: '', message: '' });
        })
        .catch((err) => {
            console.log('FAILED...', err);
            setSubmissionMessage('Failed to send message. Please try again later.');
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <section id="contact" ref={ref} className={`section-animate ${inView ? 'is-inView' : ''}`}>
            <div className="container">
                <h2>Get In Touch</h2>
                <p className="section-description">Have a question or want to work together? Feel free to reach out!</p>
                <Card className="max-w-2xl mx-auto contact-card">
                    <CardHeader>
                        <CardTitle>Send Me a Message</CardTitle>
                        <CardDescription>
                            I'll get back to you as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <Input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    rows="6" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    required
                                    placeholder="Your message..."
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <Button type="submit" disabled={isSubmitting} className="w-full" variant="gradient">
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                            
                            {submissionMessage && (
                                <div className={`p-3 rounded-md text-sm text-center ${
                                    submissionMessage.includes('successfully') 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-red-100 text-red-800 border border-red-200'
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

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-brand">Harshith Varma</h3>
                        <p className="footer-tagline">Data Science • AI Engineering • Analytics</p>
                    </div>
                    <div className="footer-section">
                        <div className="footer-links">
                            <a href="mailto:hrudrara@uab.edu" className="footer-link">hrudrara@uab.edu</a>
                            <span className="footer-divider">•</span>
                            <a href="tel:+12055868488" className="footer-link">+1 (205) 586-8488</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Harshith Varma. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const FloatingActionButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <Button 
                    variant="glow" 
                    size="icon" 
                    className="floating-btn" 
                    onClick={scrollToTop} 
                    title="Back to Top"
                >
                    <ChevronUp className="w-5 h-5" />
                </Button>
            )}
        </>
    );
};

const App = () => {
    useEffect(() => {
        document.body.setAttribute('data-theme', 'dark');
    }, []);

    const smoothScroll = useCallback((id) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <>
            <Navbar smoothScroll={smoothScroll} />
            <Hero smoothScroll={smoothScroll} />
            <Stats stats={statsData} />
            <Experience experiences={experienceData} />
            <Skills skills={skillsData} />
            <Certifications certifications={certificationsData} />
            <Projects projects={projectsData} />
            <Contact />
            <Footer />
            <FloatingActionButton />
        </>
    );
};

export default App;
