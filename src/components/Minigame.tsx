import React, { useEffect, useRef, useState } from 'react';
import './Minigame.css';

const Minigame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        if (!gameStarted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Player properties
        const player = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: 30,
            color: '#64ffda',
            speed: 5
        };

        // Target properties
        const target = {
            x: Math.random() * (canvas.width - 20),
            y: Math.random() * (canvas.height - 20),
            size: 20,
            color: '#FF5757'
        };

        // Keys state
        const keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };

        // Key event listeners
        const handleKeyDown = (e: KeyboardEvent) => {
            if (Object.keys(keys).includes(e.key)) {
                keys[e.key as keyof typeof keys] = true;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (Object.keys(keys).includes(e.key)) {
                keys[e.key as keyof typeof keys] = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Collision detection
        const checkCollision = () => {
            const dx = player.x - target.x;
            const dy = player.y - target.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < player.size / 2 + target.size / 2) {
                // Collect target and spawn a new one
                target.x = Math.random() * (canvas.width - 20);
                target.y = Math.random() * (canvas.height - 20);
                setScore(prevScore => prevScore + 1);
            }
        };

        // Game loop
        const gameLoop = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Move player based on key presses
            if (keys.ArrowUp) player.y = Math.max(player.y - player.speed, player.size / 2);
            if (keys.ArrowDown) player.y = Math.min(player.y + player.speed, canvas.height - player.size / 2);
            if (keys.ArrowLeft) player.x = Math.max(player.x - player.speed, player.size / 2);
            if (keys.ArrowRight) player.x = Math.min(player.x + player.speed, canvas.width - player.size / 2);

            // Draw target
            ctx.beginPath();
            ctx.arc(target.x, target.y, target.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = target.color;
            ctx.fill();
            ctx.closePath();

            // Draw player
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = player.color;
            ctx.fill();
            ctx.closePath();

            // Check for collisions
            checkCollision();

            // Continue game loop
            requestAnimationFrame(gameLoop);
        };

        // Start game loop
        const animationId = requestAnimationFrame(gameLoop);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(animationId);
        };
    }, [gameStarted]);

    return (
        <section id="minigame" className="minigame-section">
            <div className="minigame-container">
                <h2>Mini Game Challenge</h2>
                <p className="instructions">
                    Use arrow keys to move the circle and collect the red dots!
                </p>
                <div className="score-display">Score: {score}</div>

                {!gameStarted ? (
                    <button className="start-button" onClick={() => setGameStarted(true)}>
                        Start Game
                    </button>
                ) : (
                    <canvas ref={canvasRef} className="game-canvas" tabIndex={0} />
                )}
            </div>
        </section>
    );
};

export default Minigame; 