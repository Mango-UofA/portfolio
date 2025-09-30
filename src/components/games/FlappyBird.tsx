"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface FlappyBirdProps {
  onBack: () => void;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BIRD_SIZE = 30;
const PIPE_WIDTH = 80;
const PIPE_GAP = 200;
const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const GAME_SPEED = 3;

interface Bird {
  x: number;
  y: number;
  velocity: number;
}

interface Pipe {
  x: number;
  topHeight: number;
  passed: boolean;
}

export default function FlappyBird({ onBack }: FlappyBirdProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const [bird, setBird] = useState<Bird>({ x: 100, y: GAME_HEIGHT / 2, velocity: 0 });
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameOver'>('waiting');
  const [highScore, setHighScore] = useState(0);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('flappybird-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const jump = useCallback(() => {
    if (gameState === 'waiting') {
      setGameState('playing');
      setBird(prev => ({ ...prev, velocity: JUMP_FORCE }));
    } else if (gameState === 'playing') {
      setBird(prev => ({ ...prev, velocity: JUMP_FORCE }));
    } else if (gameState === 'gameOver') {
      // Reset game
      setBird({ x: 100, y: GAME_HEIGHT / 2, velocity: 0 });
      setPipes([]);
      setScore(0);
      setGameState('waiting');
    }
  }, [gameState]);

  // Handle input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => jump();

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [jump]);

  // Check collision
  const checkCollision = useCallback((birdY: number, pipes: Pipe[]) => {
    // Ground and ceiling collision
    if (birdY < 0 || birdY > GAME_HEIGHT - BIRD_SIZE) {
      return true;
    }

    // Pipe collision
    for (const pipe of pipes) {
      if (
        100 + BIRD_SIZE > pipe.x &&
        100 < pipe.x + PIPE_WIDTH
      ) {
        if (birdY < pipe.topHeight || birdY + BIRD_SIZE > pipe.topHeight + PIPE_GAP) {
          return true;
        }
      }
    }

    return false;
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    gameLoopRef.current = setInterval(() => {
      setBird(prev => {
        const newY = prev.y + prev.velocity;
        const newVelocity = prev.velocity + GRAVITY;
        return { ...prev, y: newY, velocity: newVelocity };
      });

      setPipes(prev => {
        let newPipes = prev.map(pipe => ({ ...pipe, x: pipe.x - GAME_SPEED }));
        
        // Remove pipes that are off screen
        newPipes = newPipes.filter(pipe => pipe.x > -PIPE_WIDTH);
        
        // Add new pipe
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 300) {
          const topHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50;
          newPipes.push({
            x: GAME_WIDTH,
            topHeight,
            passed: false
          });
        }

        // Check for score
        newPipes.forEach(pipe => {
          if (!pipe.passed && pipe.x + PIPE_WIDTH < 100) {
            pipe.passed = true;
            setScore(prev => prev + 1);
          }
        });

        return newPipes;
      });
    }, 16);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState]);

  // Check collision and game over
  useEffect(() => {
    if (gameState === 'playing' && checkCollision(bird.y, pipes)) {
      setGameState('gameOver');
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('flappybird-highscore', score.toString());
      }
    }
  }, [bird.y, pipes, gameState, checkCollision, score, highScore]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 5; i++) {
      const x = (i * 200) - (Date.now() * 0.01) % (GAME_WIDTH + 100);
      const y = 50 + Math.sin(i) * 30;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.arc(x + 30, y, 40, 0, Math.PI * 2);
      ctx.arc(x + 60, y, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw pipes
    ctx.fillStyle = '#228B22';
    pipes.forEach(pipe => {
      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
      // Bottom pipe
      ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, GAME_HEIGHT - pipe.topHeight - PIPE_GAP);
      
      // Pipe caps
      ctx.fillStyle = '#32CD32';
      ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20);
      ctx.fillRect(pipe.x - 5, pipe.topHeight + PIPE_GAP, PIPE_WIDTH + 10, 20);
      ctx.fillStyle = '#228B22';
    });

    // Draw bird
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(bird.x, bird.y, BIRD_SIZE, BIRD_SIZE);
    
    // Bird eye
    ctx.fillStyle = '#000';
    ctx.fillRect(bird.x + 20, bird.y + 8, 6, 6);
    
    // Bird beak
    ctx.fillStyle = '#FF8C00';
    ctx.fillRect(bird.x + BIRD_SIZE, bird.y + 12, 8, 6);

    // Ground
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, GAME_HEIGHT - 50, GAME_WIDTH, 50);
    
    // Grass on ground
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, GAME_HEIGHT - 50, GAME_WIDTH, 10);
  }, [bird, pipes]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative">
      {/* Game Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="border-4 border-yellow-500 rounded-lg shadow-2xl shadow-yellow-500/30"
        />
        
        {/* Game UI Overlay */}
        <div className="absolute top-4 left-4 text-white font-mono">
          <div className="bg-black/80 px-4 py-2 rounded">
            <div>Score: {score}</div>
            <div>High: {highScore}</div>
          </div>
        </div>

        {/* Game State Overlays */}
        {gameState === 'waiting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <div className="text-center text-white font-mono">
              <h2 className="text-4xl font-bold mb-4 text-yellow-400">🐦 FLAPPY BIRD</h2>
              <p className="text-lg mb-6">Click or press SPACE to start!</p>
              <p className="text-sm text-gray-300">Navigate through the green pipes</p>
            </div>
          </motion.div>
        )}

        {gameState === 'gameOver' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center"
          >
            <div className="text-center text-white font-mono bg-red-900/80 p-8 rounded-lg border-2 border-red-500">
              <h2 className="text-4xl font-bold mb-4 text-red-400">💥 GAME OVER</h2>
              <p className="text-2xl mb-2">Score: {score}</p>
              <p className="text-lg mb-6">High Score: {highScore}</p>
              {score === highScore && score > 0 && (
                <p className="text-yellow-400 text-lg mb-4">🎉 NEW HIGH SCORE!</p>
              )}
              <p className="text-sm mb-4">Click or press SPACE to play again</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-mono transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        BACK TO ARCADE
      </button>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-300 font-mono text-sm">
        <p>🎮 Click or press SPACE to flap • Avoid the pipes • Get the highest score!</p>
      </div>
    </div>
  );
}
