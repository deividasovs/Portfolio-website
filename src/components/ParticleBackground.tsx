import React, { useCallback } from 'react';
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "#0a192f",
                    },
                },
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                    },
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        enable: true,
                        color: "#ffffff",
                        opacity: 0.2,
                    },
                    move: {
                        enable: true,
                        speed: 1,
                    },
                    size: {
                        value: 2,
                    },
                    opacity: {
                        value: 0.3,
                    },
                },
            }}
        />
    );
};

export default ParticleBackground; 