import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectsPage from './pages/ProjectsPage';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2, // Stagger delay
      duration: 0.5,
      ease: "easeOut"
    },
  }),
};

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const HomePage = () => (
    <div className="App">
      <ParticleBackground />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <motion.div initial="hidden" animate="visible" custom={0} variants={sectionVariants}>
          <Hero />
        </motion.div>
        <motion.div initial="hidden" animate="visible" custom={1} variants={sectionVariants}>
          <Experience />
        </motion.div>
        <motion.div initial="hidden" animate="visible" custom={2} variants={sectionVariants}>
          <Projects />
        </motion.div>
      </main>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
