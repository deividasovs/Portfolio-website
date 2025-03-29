import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../components/Projects.css';

const ProjectsPage = () => {
    // Copy the projects array from your Projects component
    const projects = [
        // Add your projects here, copied from Projects.tsx
    ];

    return (
        <div className="projects-page">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="projects-page-header"
            >
                <Link to="/" className="back-button">← Back to Home</Link>
                <h1>All Projects</h1>
            </motion.div>

            <div className="projects-grid expanded">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="project-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className="project-content">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-tags">
                                {project.tech.map((tech, techIndex) => (
                                    <span key={techIndex}>{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a href={project.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage; 