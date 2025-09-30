"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SnakeProps {
  onBack: () => void;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const CELL_SIZE = 20;
const COLS = GAME_WIDTH / CELL_SIZE;
const ROWS = GAME_HEIGHT / CELL_SIZE;

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function Snake({ onBack }: SnakeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  
  const [snake, setSnake] = useState<Position[]>([{ x: 20, y: 15 }]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [food, setFood] = useState<Position>({ x: 25, y: 15 });
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameOver'>('waiting');
  const [highScore, setHighScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(150);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('snake-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const generateFood = useCallback((snakePositions: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS)
      };
    } while (snakePositions.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const startGame = useCallback(() => {
    setSnake([{ x: 20, y: 15 }]);
    setDirection('RIGHT');
    setFood({ x: 25, y: 15 });
    setScore(0);
    setGameSpeed(150);
    setGameState('playing');
  }, []);

  // Handle input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState === 'waiting' && (e.code === 'Space' || e.code.startsWith('Arrow') || 
          ['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code))) {
        startGame();
        return;
      }

      if (gameState === 'gameOver' && e.code === 'Space') {
        startGame();
        return;
      }

      if (gameState !== 'playing') return;

      let newDirection: Direction | null = null;
      
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          if (direction !== 'DOWN') newDirection = 'UP';
          break;
        case 'ArrowDown':
        case 'KeyS':
          if (direction !== 'UP') newDirection = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'KeyA':
          if (direction !== 'RIGHT') newDirection = 'LEFT';
          break;
        case 'ArrowRight':
        case 'KeyD':
          if (direction !== 'LEFT') newDirection = 'RIGHT';
          break;
      }

      if (newDirection) {
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, direction, startGame]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    gameLoopRef.current = setTimeout(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        
        // Move head
        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
          setGameState('gameOver');
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snake-highscore', score.toString());
          }
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameState('gameOver');
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snake-highscore', score.toString());
          }
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          setFood(generateFood(newSnake));
          // Increase speed slightly
          setGameSpeed(prev => Math.max(80, prev - 2));
          return newSnake;
        }

        // Remove tail if no food eaten
        return newSnake.slice(0, -1);
      });
    }, gameSpeed);

    return () => {
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    };
  }, [gameState, direction, food, score, highScore, gameSpeed, generateFood]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, GAME_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(GAME_WIDTH, y * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Head
        ctx.fillStyle = '#32CD32';
        ctx.fillRect(segment.x * CELL_SIZE + 1, segment.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        // Eyes
        ctx.fillStyle = '#fff';
        const eyeSize = 3;
        const eyeOffset = 6;
        ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + 4, eyeSize, eyeSize);
        ctx.fillRect(segment.x * CELL_SIZE + eyeOffset + 6, segment.y * CELL_SIZE + 4, eyeSize, eyeSize);
      } else {
        // Body
        const alpha = 1 - (index / snake.length) * 0.5;
        ctx.fillStyle = `rgba(34, 139, 34, ${alpha})`;
        ctx.fillRect(segment.x * CELL_SIZE + 2, segment.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
      }
    });

    // Draw food
    ctx.fillStyle = '#FF4444';
    ctx.fillRect(food.x * CELL_SIZE + 3, food.y * CELL_SIZE + 3, CELL_SIZE - 6, CELL_SIZE - 6);
    // Food highlight
    ctx.fillStyle = '#FF8888';
    ctx.fillRect(food.x * CELL_SIZE + 5, food.y * CELL_SIZE + 5, CELL_SIZE - 10, CELL_SIZE - 10);
  }, [snake, food]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative">
      {/* Game Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="border-4 border-green-500 rounded-lg shadow-2xl shadow-green-500/30"
        />
        
        {/* Game UI */}
        <div className="absolute top-4 left-4 text-white font-mono">
          <div className="bg-black/80 px-4 py-2 rounded">
            <div>Score: {score}</div>
            <div>High: {highScore}</div>
            <div className="text-xs text-green-400">Speed: {151 - gameSpeed}</div>
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
              <h2 className="text-4xl font-bold mb-4 text-green-400">🐍 SNAKE</h2>
              <p className="text-lg mb-6">Use WASD or Arrow Keys to move!</p>
              <p className="text-sm text-gray-300 mb-2">Eat the red food to grow</p>
              <p className="text-sm text-gray-300">Don't hit the walls or yourself!</p>
              <p className="text-yellow-400 mt-4">Press any movement key to start</p>
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
              <h2 className="text-4xl font-bold mb-4 text-red-400">💀 GAME OVER</h2>
              <p className="text-2xl mb-2">Score: {score}</p>
              <p className="text-lg mb-6">High Score: {highScore}</p>
              {score === highScore && score > 0 && (
                <p className="text-yellow-400 text-lg mb-4">🎉 NEW HIGH SCORE!</p>
              )}
              <p className="text-sm mb-4">Press SPACE to play again</p>
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
        <p>🎮 WASD or Arrow Keys to move • Eat red food to grow • Avoid walls and yourself!</p>
      </div>
    </div>
  );
}
