import React, { useCallback } from 'react';
import { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
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
                        speed: 0.5,
                    },
                    size: {
                        value: 2,
                    },
                    opacity: {
                        value: 0.2,
                    },
                },
            }}
        />
    );
};

export default ParticleBackground; 