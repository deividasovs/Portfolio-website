import React from 'react';
import './Projects.css';

// Add at the top of the file
interface Project {
    title: string;
    description: string;
    tech: string[];
    image: string;
    github: string;
    demo: string;
}

const Projects = () => {
    const projects: Project[] = [
        {
            title: "BlockyList",
            description: "Template your Spotify playlists using blocks of playlists and songs",
            tech: ["React", "Typescript", "TailwindCSS", "Spotify Web API", "Firebase"],
            image: "./images/BlockyList.png",
            github: "https://github.com/deividasovs/BlockyList",
            demo: "https://deividasovs.github.io/BlockyList"
        },
        {
            title: "CodeSnap",
            description: "Multiple choice leetcode style puzzles",
            tech: ["Vite", "Typescript", "TailwindCSS"],
            image: "./images/CodeSnap.png",
            github: "https://github.com/cameronkenny-101/CodeSnap",
            demo: "https://cameronkenny-101.github.io/CodeSnap/"
        }

    ];

    return (
        <section id="projects" className="projects">
            <h2>Things I'm tinkering with</h2>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div
                        className="project-card"
                        key={index}
                        onClick={() => window.open(project.demo, '_blank')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className="project-content">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-tags">
                                {project.tech.map(tech => (
                                    <span key={tech}>{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <i className="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="view-all-projects">
                <Link to="/projects" className="projects-link">
                    View All Projects →
                </Link>
            </div> */}
        </section>
    );
};

export default Projects; 