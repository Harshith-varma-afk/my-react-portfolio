import React, { useState, useEffect} from 'react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser'; // Import EmailJS
import './App.css';

// --- Data Definitions (for easy management) ---
const projectsData = [
    {
        id: 1,
        image: "lipnet.jpg",
        title: "Lip movement to Text Conversion Application",
        description: "Developed an advanced lip movement-to-text conversion system utilizing deep learning to transcribe spoken words from lip movements into text. This innovative project focused on bridging the gap between visual cues and textual information, with applications in speech recognition."
    },
    {
        id: 2,
        image: "faces.jpg",
        title: "Video Frame Analysis and Face Clustering",
        description: "Developed a Python project using OpenCV to extract frames from video files and save them as images. Implemented Haar Cascade classifiers for face detection within the frames. Designed a mechanism to cluster and save unique faces while filtering out duplicates, utilizing techniques like resizing and DBSCAN clustering."
    },
    {
        id: 3,
        image: "sql.jpg",
        title: "Natural language to SQL Query generator",
        description: "A project leveraging Retrieval-Augmented Generation (RAG) to transform natural language English questions into accurate QL queries. This boosts data accessibility by reducing reliance on specialized query language knowledge."
    }
];

const skillsData = [
    {
        category: "Programming Languages",
        items: ["Python", "C", "C++"]
    },
    {
        category: "Development Platforms",
        items: ["IntelliJ", "Visual Studio"]
    },
    {
        category: "Operating Systems",
        items: ["Windows XP/7/8/10", "Linux (Ubuntu)"]
    },
    {
        category: "Web Technologies",
        items: ["HTML", "CSS", "XML"]
    },
    {
        category: "New Technologies",
        items: ["PyTorch", "Android Developer", "Fundamentals of Blockchain"]
    },
    {
        category: "Data Science Tools & Concepts",
        items: ["Statistical Modeling", "Data Analysis (Pandas, NumPy)", "SQL", "Machine Learning", "TensorFlow"]
    }
];

const certificationsData = [
    {
        id: 1,
        title: "Introduction to Machine Learning",
        issuer: "Issued by Coursera (Stanford University)",
        description: "Covers fundamental concepts of machine learning, including supervised and unsupervised learning, linear regression, logistic regression, neural networks, and support vector machines.",
        link: "https://www.coursera.org/account/accomplishments/verify/EXAMPLE_CERT_ID_1"
    },
    {
        id: 2,
        title: "Deep Learning Specialization",
        issuer: "Issued by Coursera (DeepLearning.AI)",
        description: "A comprehensive specialization covering deep learning fundamentals, neural networks, convolutional networks, recurrent networks, and transformers, with practical applications.",
        link: "https://www.coursera.org/account/accomplishments/verify/EXAMPLE_CERT_ID_2"
    },
    {
        id: 3,
        title: "Python for Data Science and Machine Learning Bootcamp",
        issuer: "Issued by Udemy",
        description: "Hands-on training in Python for data science, covering NumPy, Pandas, Matplotlib, Seaborn, Plotly, Scikit-Learn, and various machine learning algorithms.",
        link: "https://www.udemy.com/certificate/UC-EXAMPLE_CERT_ID_3/"
    }
];

const dynamicTexts = [
    "Passionate Data Science Student",
    "Machine Learning Enthusiast",
    "AI Explorer",
    "Proficient in Python and C",
    "Android Developer",
    "Learning about Blockchain Fundamentals",
    "Skilled in Statistical Modeling",
    "Adept at Data Analysis (Pandas, NumPy)",
    "Experienced with SQL"
];

// --- Components ---

const Navbar = ({ smoothScroll }) => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">MyPortfolio</div>
                <div className="navbar-nav">
                    <a href="#about" onClick={(e) => { e.preventDefault(); smoothScroll('#about'); }}>About</a>
                    <a href="#skills" onClick={(e) => { e.preventDefault(); smoothScroll('#skills'); }}>Skills</a>
                    <a href="#certifications" onClick={(e) => { e.preventDefault(); smoothScroll('#certifications'); }}>Certifications</a>
                    <a href="#projects" onClick={(e) => { e.preventDefault(); smoothScroll('#projects'); }}>Projects</a>
                    <a href="resume.pdf" download="Harshith_Varma_Resume.pdf" className="resume-link">Resume</a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); smoothScroll('#contact'); }}>Contact</a>
                </div>
            </div>
        </nav>
    );
};

const Hero = ({ smoothScroll }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 1500;
    const pauseBeforeType = 700;

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
            <div className="container">
                <img src="prof.jpg" alt="Harshith Varma" className="hero-img"
                     onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/180x180/FF4D00/FFFFFF?text=HV"; }}/>
                <h1>Hi, I'm Harshith Varma</h1>
                <p className="dynamic-text">
                    <span className="typed-text">{displayedText}</span>
                    <span className="cursor">|</span>
                </p>
                <p>Welcome to my corner of the internet where I showcase my work.</p>
                <a href="#projects" className="btn" onClick={(e) => { e.preventDefault(); smoothScroll('#projects'); }}>View My Work</a>
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
                        <div className="skill-category" key={index}>
                            <h3>{category.category}</h3>
                            <ul>
                                {category.items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
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
        <div ref={ref} className={`certification-card card-animate ${inView ? 'is-inView' : ''}`}>
            <h3>{cert.title}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            <p>{cert.description}</p>
            {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Certificate &rarr;
                </a>
            )}
        </div>
    );
};


const ProjectCard = ({ project }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <div ref={ref} className={`project-card card-animate ${inView ? 'is-inView' : ''}`}>
            <img
                src={project.image}
                alt={project.title}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src=`https://placehold.co/400x200/CCCCCC/FFFFFF?text=${project.title.substring(0,15)}`;
                }}
            />
            <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href="#projects" onClick={(e) => e.preventDefault()} className="project-link">View Project &rarr;</a>
            </div>
        </div>
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

    // We keep the state to control the form inputs
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    
    // The handleChange function updates the state as the user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // The handleSubmit function now uses the state object to send the email
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionMessage('');

        // The template params object should match the variables in your EmailJS template
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
            // Clear the form fields by resetting the state
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
                <p>Have a question or want to work together? Feel free to reach out!</p>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
                </form>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Harshith Varma. All rights reserved.</p>
            </div>
        </footer>
    );
};

// --- Main App Component ---
const App = () => {
    useEffect(() => {
        document.body.setAttribute('data-theme', 'dark');
    }, []);

    const smoothScroll = (id) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <Navbar smoothScroll={smoothScroll} />
            <Hero smoothScroll={smoothScroll} />
            <Skills skills={skillsData} />
            <Certifications certifications={certificationsData} />
            <Projects projects={projectsData} />
            <Contact />
            <Footer />
        </>
    );
};

export default App;