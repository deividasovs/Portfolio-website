import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Experience.css';

const Experience = () => {
    const experiences = [
        {
            company: "Tech Giant Corp",
            position: "Senior Software Engineer",
            period: "2020 - Present",
            description: "Led development of high-performance trading systems using React and TypeScript. Improved system efficiency by 40%.",
            tech: ["React", "TypeScript", "Node.js", "AWS"],
            color: "#FF5757" // Bright red
        },
        {
            company: "Innovation Startup",
            position: "Full Stack Developer",
            period: "2018 - 2020",
            description: "Built scalable microservices architecture. Implemented real-time data processing pipeline.",
            tech: ["Python", "Django", "React", "Docker"],
            color: "#5CE1E6" // Bright cyan
        },
        // Add more experiences
    ];

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    // Fun bouncy animation variants
    const headingVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    return (
        <section id="experience" className="experience-section">
            <motion.div className="experience-header">
                <motion.h2
                    variants={headingVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="rainbow-text"
                >
                    Professional Experience
                </motion.h2>
                <motion.div
                    className="floating-emoji"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3
                    }}
                >
                    💻✨
                </motion.div>
            </motion.div>

            <div className="timeline" ref={ref}>
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="timeline-item"
                        initial={{
                            x: index % 2 === 0 ? -100 : 100,
                            opacity: 0,
                            rotate: index % 2 === 0 ? -5 : 5
                        }}
                        animate={{
                            x: inView ? 0 : (index % 2 === 0 ? -100 : 100),
                            opacity: inView ? 1 : 0,
                            rotate: inView ? 0 : (index % 2 === 0 ? -5 : 5)
                        }}
                        transition={{
                            delay: index * 0.2,
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                        }}
                        style={{
                            borderColor: exp.color,
                            background: "transparent"
                        }}
                    >
                        <div className="timeline-content">
                            <h3 style={{ color: exp.color }}>{exp.company}</h3>
                            <h4>{exp.position}</h4>
                            <p className="period">{exp.period}</p>
                            <p>{exp.description}</p>
                            <div className="tech-stack">
                                {exp.tech.map(tech => (
                                    <motion.span
                                        key={tech}
                                        className="tech-tag"
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: [0, 5, -5, 0],
                                            transition: { duration: 0.5 }
                                        }}
                                        style={{
                                            background: "rgba(100, 255, 218, 0.1)",
                                            color: "#64ffda"
                                        }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience; 