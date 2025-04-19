import React from 'react';
import './Experience.css';

const Experience = () => {
    const experiences = [
        {
            company: "Amazon Web Services - CloudWatch",
            position: "Software Develoment Engineer",
            period: "Sep 2024 - Present",
            description: "",//"Led development of high-performance trading systems using React and TypeScript. Improved system efficiency by 40%.",,
            tech: [],//["React", "TypeScript", "Node.js", "AWS"],
            color: "#5CE1E6" // Bright red
        },
        {
            company: "Amazon Web Services - L7 Load Balancing",
            position: "Software Develoment Engineer",
            period: "Sep 2023 - Sep 2024",
            description: "",//"Built scalable microservices architecture. Implemented real-time data processing pipeline.",
            tech: [], //["Python", "Django", "React", "Docker"],
            color: "#5CE1E6" // Bright cyan
        },
        {
            company: "Innovation Value Institute",
            position: "Software Engineer",
            period: "Feb 2023 - May 2023",
            description: "",//"Built scalable microservices architecture. Implemented real-time data processing pipeline.",
            tech: [], //["Python", "Django", "React", "Docker"],\
            color: "#5CE1E6" // Bright cyan
        },
        {
            company: "Amazon Web Services - L7 Load Balancing",
            position: "Software Develoment Engineer Intern",
            period: "Feb 2022 - Jul 2022",
            description: "",//"Built scalable microservices architecture. Implemented real-time data processing pipeline.",
            tech: [], //["Python", "Django", "React", "Docker"],\
            color: "#5CE1E6" // Bright cyan
        },
    ];

    return (
        <section id="experience" className="experience-section">
            <div className="experience-header">
                <h2 className="rainbow-text">
                    Work Experience
                </h2>
                <div>
                    💻✨
                </div>
            </div>

            <div className="timeline">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="timeline-item"
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
                                    <span
                                        key={tech}
                                        className="tech-tag"
                                        style={{
                                            background: "rgba(100, 255, 218, 0.1)",
                                            color: "#64ffda"
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience; 