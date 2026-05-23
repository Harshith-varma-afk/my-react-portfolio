import React from 'react';
import { cn } from '../lib/utils';

/** Full-width neo glass featured layout for each project entry. */
const FeaturedProjectCard = ({ project }) => {
    const p = project;
    const hasBullets =
        Array.isArray(p.bulletsLeft) &&
        Array.isArray(p.bulletsRight) &&
        (p.bulletsLeft.length > 0 || p.bulletsRight.length > 0);

    return (
        <div className="project-featured neo-glass-heavy">
            <div className="project-featured-visual neo-mesh-pane">
                <img
                    src={p.image}
                    alt=""
                    className="project-featured-img"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/640x420/120e16/f0a31a?text=${encodeURIComponent(p.title.slice(0, 12))}`;
                    }}
                />
            </div>
            <div className="project-featured-body">
                {Array.isArray(p.tags) && p.tags.length > 0 && (
                    <div className="neo-pill-row">
                        {p.tags.map(tag => (
                            <span key={tag} className="neo-pill-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <h3 className="project-featured-title">{p.title}</h3>
                <p className="project-featured-lead">{p.description}</p>
                {hasBullets && (
                    <div className="project-featured-bullets">
                        <ul>
                            {(p.bulletsLeft || []).map((item, i) => (
                                <li key={`l-${p.id}-${i}`}>{item}</li>
                            ))}
                        </ul>
                        <ul>
                            {(p.bulletsRight || []).map((item, i) => (
                                <li key={`r-${p.id}-${i}`}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {Array.isArray(p.metrics) && p.metrics.length > 0 && (
                    <div className="neo-metric-row">
                        {p.metrics.map(m => (
                            <div key={m.label} className="neo-metric-chip">
                                <span className="neo-metric-label">{m.label}</span>
                                <span className="neo-metric-value">{m.value}</span>
                            </div>
                        ))}
                    </div>
                )}
                {p.link ? (
                    <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'btn-component btn-outline btn-sm',
                            'project-featured-cta'
                        )}
                    >
                        {(typeof p.link === 'string' && p.link.includes('github.com'))
                            ? 'View on GitHub '
                            : 'View deployment '}
                        &rarr;
                    </a>
                ) : null}
            </div>
        </div>
    );
};

const Projects = ({ projects }) => {
    return (
        <section id="projects" className="projects-section">
            <div className="container projects-header">
                <span className="section-kicker mono">{'\u002f\u002f 06 — PROJECTS'}</span>
                <h2>Systems I have shipped end-to-end</h2>
                <p className="section-description">
                    Each build uses the same glass treatment—dense technical bullets on the right rails, calibrated metrics chips,
                    and hero imagery anchored to layered mesh lighting.
                </p>
            </div>

            <div className="container projects-featured-stack">
                {projects.map(project => (
                    <FeaturedProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
