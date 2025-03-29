import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
            title: "AI-Powered Trading Platform",
            description: "A sophisticated trading platform using machine learning algorithms to predict market trends and execute automated trades.",
            tech: ["Python", "TensorFlow", "React", "Node.js"],
            image: "/images/trading-platform.jpg",
            github: "https://github.com/yourusername/trading-platform",
            demo: "https://trading-platform.com"
        },
        {
            title: "Real-time Collaboration Tool",
            description: "A WebSocket-based collaboration tool allowing multiple users to edit documents simultaneously with conflict resolution.",
            tech: ["TypeScript", "Socket.io", "Redis", "React"],
            image: "/images/collab-tool.jpg",
            github: "https://github.com/yourusername/collab-tool",
            demo: "https://collab-tool.com"
        },
        {
            title: "Blockchain Voting System",
            description: "A secure and transparent voting system built on Ethereum blockchain, ensuring tamper-proof election results.",
            tech: ["Solidity", "Web3.js", "React", "Node.js"],
            image: "/images/blockchain-voting.jpg",
            github: "https://github.com/yourusername/blockchain-voting",
            demo: "https://blockchain-voting.com"
        },
        // Add more projects as needed
    ];

    return (
        <section id="projects" className="projects">
            <motion.h2>Featured Projects</motion.h2>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <motion.div
                        className="project-card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        key={index}
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
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="view-all-projects">
                <Link to="/projects" className="projects-link">
                    View All Projects →
                </Link>
            </div>
        </section>
    );
};

export default Projects; 