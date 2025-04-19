import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-links">
                <a href="https://github.com/deividasovs" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i> GitHub
                </a>
                <a href="https://www.linkedin.com/in/deividasovs" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i> LinkedIn
                </a>
            </div>
        </footer>
    );
};

export default Footer; 