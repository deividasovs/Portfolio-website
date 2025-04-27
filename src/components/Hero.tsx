import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Check screen size - Only run game on larger screens
        const isLargeScreen = window.innerWidth >= 1024; // Typical laptop width threshold

        if (!isLargeScreen) {
            // Don't initialize game on small screens
            return;
        }

        // Track initialization state
        let isGameInitialized = false;

        // Set canvas dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Tank properties
        const tank = {
            x: 50,
            y: 100,
            size: 30,
            color: '#64ffda',
            speed: 4,
            direction: 0, // in radians, 0 = right
            turretLength: 20
        };

        // Bullets array
        const bullets: { x: number, y: number, speed: number, direction: number }[] = [];

        // Targets array
        const targets: { x: number, y: number, size: number }[] = [];

        // Create initial targets away from text - REDUCED to 3
        for (let i = 0; i < 3; i++) {
            // Define text area to avoid with larger buffer zones
            const textAreaX = canvas.width / 2;
            const textAreaY = canvas.height / 2;
            const textAreaWidth = canvas.width * 0.8;  // Increased from 0.7 to 0.8
            const textAreaHeight = canvas.height * 0.5; // Increased from 0.4 to 0.5
            const headerHeight = 150; // Increased from 100 to 150
            const bufferZone = 50; // Added buffer zone around text

            // Generate random position
            let x, y;
            do {
                x = Math.random() * canvas.width;
                y = Math.random() * (canvas.height - headerHeight) + headerHeight;
            } while (
                // Check if position is within the expanded text area plus buffer
                x > textAreaX - textAreaWidth / 2 - bufferZone &&
                x < textAreaX + textAreaWidth / 2 + bufferZone &&
                y > textAreaY - textAreaHeight / 2 - bufferZone &&
                y < textAreaY + textAreaHeight / 2 + bufferZone
            );

            targets.push({
                x: x,
                y: y,
                size: 15
            });
        }

        // Keys state
        const keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            e: false
        };

        // Key event listeners
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'w') keys.w = true;
            if (e.key === 'a') keys.a = true;
            if (e.key === 's') keys.s = true;
            if (e.key === 'd') keys.d = true;
            if (e.key === 'e') keys.e = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'w') keys.w = false;
            if (e.key === 'a') keys.a = false;
            if (e.key === 's') keys.s = false;
            if (e.key === 'd') keys.d = false;
            if (e.key === 'e') keys.e = false;
        };

        // Focus event handlers to ensure the game responds to keyboard input
        const handleFocus = () => {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
        };

        const handleBlur = () => {
            // Reset all keys when focus is lost to prevent stuck keys
            keys.w = false;
            keys.a = false;
            keys.s = false;
            keys.d = false;
            keys.e = false;

            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };

        // Add click handler to canvas to ensure it gets focus
        const handleCanvasClick = () => {
            // Make sure event listeners are attached when canvas is clicked
            handleFocus();

            // If game isn't initialized yet or got paused, restart it
            if (!isGameInitialized) {
                isGameInitialized = true;
                requestAnimationFrame(gameLoop);
            }
        };

        // Attach focus-related event listeners
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);
        canvas.addEventListener('click', handleCanvasClick);

        // Add keyboard event listeners initially
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Shooting logic
        let lastShot = 0;
        const shoot = (time: number) => {
            if (keys.e && time - lastShot > 300) {
                const bullet = {
                    x: tank.x + Math.cos(tank.direction) * tank.turretLength,
                    y: tank.y + Math.sin(tank.direction) * tank.turretLength,
                    speed: 7,
                    direction: tank.direction
                };
                bullets.push(bullet);
                lastShot = time;
            }
        };

        // Collision detection
        const checkCollisions = () => {
            // Check bullet-target collisions
            for (let i = bullets.length - 1; i >= 0; i--) {
                for (let j = targets.length - 1; j >= 0; j--) {
                    const dx = bullets[i].x - targets[j].x;
                    const dy = bullets[i].y - targets[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < targets[j].size) {
                        // Remove hit target and bullet
                        targets.splice(j, 1);
                        bullets.splice(i, 1);

                        // Only respawn if we have fewer than 3 targets
                        if (targets.length < 3) {
                            // Create a new target away from text with larger buffer zones
                            const textAreaX = canvas.width / 2;
                            const textAreaY = canvas.height / 2;
                            const textAreaWidth = canvas.width * 0.8;
                            const textAreaHeight = canvas.height * 0.5;
                            const headerHeight = 150;
                            const bufferZone = 50;

                            let x, y;
                            do {
                                x = Math.random() * canvas.width;
                                y = Math.random() * (canvas.height - headerHeight) + headerHeight;
                            } while (
                                x > textAreaX - textAreaWidth / 2 - bufferZone &&
                                x < textAreaX + textAreaWidth / 2 + bufferZone &&
                                y > textAreaY - textAreaHeight / 2 - bufferZone &&
                                y < textAreaY + textAreaHeight / 2 + bufferZone
                            );

                            targets.push({
                                x: x,
                                y: y,
                                size: 15
                            });
                        }

                        break;
                    }
                }
            }
        };

        // Game loop
        const gameLoop = (time: number) => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Move tank based on key presses
            if (keys.w) {
                tank.x += Math.cos(tank.direction) * tank.speed;
                tank.y += Math.sin(tank.direction) * tank.speed;
            }
            if (keys.s) {
                tank.x -= Math.cos(tank.direction) * tank.speed;
                tank.y -= Math.sin(tank.direction) * tank.speed;
            }
            if (keys.a) {
                tank.direction -= 0.05;
            }
            if (keys.d) {
                tank.direction += 0.05;
            }

            // Keep tank within canvas and below header
            const headerHeight = 100; // Approximate header height
            tank.x = Math.max(tank.size / 2, Math.min(tank.x, canvas.width - tank.size / 2));
            tank.y = Math.max(headerHeight + tank.size / 2, Math.min(tank.y, canvas.height - tank.size / 2));

            // Handle shooting
            shoot(time);

            // Update bullets
            for (let i = bullets.length - 1; i >= 0; i--) {
                bullets[i].x += Math.cos(bullets[i].direction) * bullets[i].speed;
                bullets[i].y += Math.sin(bullets[i].direction) * bullets[i].speed;

                // Remove bullets that are out of bounds
                if (bullets[i].x < 0 || bullets[i].x > canvas.width ||
                    bullets[i].y < 0 || bullets[i].y > canvas.height) {
                    bullets.splice(i, 1);
                }
            }

            // Check collisions
            checkCollisions();

            // Draw targets as bullseyes
            targets.forEach(target => {
                // Outer circle
                ctx.beginPath();
                ctx.arc(target.x, target.y, target.size, 0, Math.PI * 2);
                ctx.fillStyle = '#233554'; // Dark blue from theme
                ctx.fill();
                ctx.strokeStyle = '#64ffda';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();

                // Middle circle
                ctx.beginPath();
                ctx.arc(target.x, target.y, target.size * 0.7, 0, Math.PI * 2);
                ctx.fillStyle = '#112240'; // Darker blue
                ctx.fill();
                ctx.closePath();

                // Inner circle
                ctx.beginPath();
                ctx.arc(target.x, target.y, target.size * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = '#64ffda'; // Accent color (muted teal)
                ctx.fill();
                ctx.closePath();

                // Center dot
                ctx.beginPath();
                ctx.arc(target.x, target.y, target.size * 0.15, 0, Math.PI * 2);
                ctx.fillStyle = '#e6f1ff'; // Light color for center
                ctx.fill();
                ctx.closePath();
            });

            // Draw bullets with softer colors
            bullets.forEach(bullet => {
                ctx.beginPath();
                ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(100, 255, 218, 0.7)'; // Semi-transparent teal
                ctx.fill();
                ctx.closePath();
            });

            // Draw tank body
            ctx.save();
            ctx.translate(tank.x, tank.y);
            ctx.rotate(tank.direction);

            // Tank body (main rectangle)
            ctx.beginPath();
            ctx.rect(-tank.size / 2, -tank.size / 3, tank.size, tank.size / 1.5);
            ctx.fillStyle = '#8892b0'; // More subtle blue-gray color
            ctx.fill();
            ctx.strokeStyle = '#64ffda';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

            // Tank tracks
            ctx.beginPath();
            ctx.rect(-tank.size / 2, -tank.size / 2, tank.size, tank.size / 6);
            ctx.rect(-tank.size / 2, tank.size / 3, tank.size, tank.size / 6);
            ctx.fillStyle = '#495670'; // Darker color for tracks
            ctx.fill();
            ctx.closePath();

            // Tank turret (base)
            ctx.beginPath();
            ctx.arc(0, 0, tank.size / 4, 0, Math.PI * 2);
            ctx.fillStyle = '#64ffda';
            ctx.fill();
            ctx.closePath();

            // Tank turret (cannon)
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(tank.turretLength, 0);
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#ccd6f6';
            ctx.stroke();
            ctx.closePath();

            ctx.restore();

            // Continue game loop if game is still initialized
            if (isGameInitialized) {
                requestAnimationFrame(gameLoop);
            }
        };

        // Start game loop
        isGameInitialized = true;
        const animationId = requestAnimationFrame(gameLoop);
        setIsInitialized(true);

        // Auto-focus for better UX
        setTimeout(() => {
            if (canvas && document.activeElement !== canvas) {
                canvas.focus();
                handleFocus();
            }
        }, 500);

        // Add window resize listener to handle responsive behavior
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                // Clean up game if screen becomes too small
                isGameInitialized = false;
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('keyup', handleKeyUp);
                cancelAnimationFrame(animationId);

                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else {
                // Reinitialize if screen size becomes large enough
                if (!isGameInitialized) {
                    isGameInitialized = true;
                    requestAnimationFrame(gameLoop);
                    handleFocus();
                }
            }
        };

        window.addEventListener('resize', handleResize);

        // Add message handler to help debug and recover
        const messageHandler = (e: MessageEvent) => {
            if (e.data === 'restartGame' && !isGameInitialized) {
                isGameInitialized = true;
                requestAnimationFrame(gameLoop);
                handleFocus();
            }
        };

        window.addEventListener('message', messageHandler);

        // Cleanup
        return () => {
            isGameInitialized = false;
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('message', messageHandler);
            canvas.removeEventListener('click', handleCanvasClick);
            cancelAnimationFrame(animationId);
        };
    }, []);

    const handleCanvasClick = () => {
        // Force restart if game isn't working
        if (!isInitialized) {
            window.postMessage('restartGame', '*');
        }
    };

    return (
        <section className="hero">
            <canvas
                ref={canvasRef}
                className="hero-game-canvas"
                tabIndex={-1}
                onClick={handleCanvasClick}
                style={{ pointerEvents: 'auto' }}
            />
            <div className="hero-content">
                <h1>
                    <span>Meet</span>
                    <span className="name">[Deiv]</span>
                </h1>
                <h2>Software Engineer @ AWS Dublin 🇮🇪</h2>

                {window.innerWidth >= 1024 && (
                    <div className="controls-hint">
                        Use WASD to move tank, E to shoot
                        {!isInitialized && <span> (click game area if tank doesn't move)</span>}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero; 