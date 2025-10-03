'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// 🎮 MANGLAM'S PERSONAL GAME COLLECTION - BUILT DURING "WORK BREAKS" 🎮
const EMBEDDED_GAMES = [
  {
    id: 'snake',
    name: 'HUNGRY SNAKE',
    icon: '🐍',
    description: 'Just like my appetite for pizza at 2 AM while coding',
    difficulty: 'EASY',
    players: '1 PLAYER',
    category: 'SNACK TIME',
    year: '2024',
    rating: '★★★★★',
    color: '#4CAF50',
    funFact: 'This snake moves faster than my debugging skills! 🏃‍♂️',
    easterEgg: 'Try getting score 100 for a surprise! 🎉'
  },
  {
    id: 'pong',
    name: 'PING PONG MASTER',
    icon: '🏓',
    description: 'Me vs Computer - spoiler: computer usually wins',
    difficulty: 'HUMBLING',
    players: '1 PLAYER + 1 AI OVERLORD',
    category: 'REALITY CHECK',
    year: '2024',
    rating: '★★★★☆',
    color: '#2196F3',
    funFact: 'The AI is programmed to let me win... sometimes 😅',
    easterEgg: 'Score 10 points to unlock developer tears mode! 😭'
  },
  {
    id: 'breakout',
    name: 'BRICK DESTROYER',
    icon: '🧱',
    description: 'Destroying blocks like I destroy my sleep schedule',
    difficulty: 'THERAPEUTIC',
    players: '1 FRUSTRATED DEVELOPER',
    category: 'STRESS RELIEF',
    year: '2024',
    rating: '★★★★★',
    color: '#FF9800',
    funFact: 'Each brick represents a bug I\'ve fixed this week 🐛',
    easterEgg: 'Clear all bricks to see my productivity chart! 📊'
  },
  {
    id: 'memory',
    name: 'MEMORY CHALLENGE',
    icon: '🧠',
    description: 'Tests if my brain still works after too much caffeine',
    difficulty: 'DEPENDS ON COFFEE',
    players: '1 SLEEPY DEVELOPER',
    category: 'BRAIN TRAINING',
    year: '2024',
    rating: '★★★★☆',
    color: '#E91E63',
    funFact: 'My memory is like my code comments... barely there! 💭',
    easterEgg: 'Reach level 5 to unlock my coffee consumption stats! ☕'
  }
];

// 🐍 SNAKE GAME COMPONENT
const SnakeGame = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 5, y: 5 },
    direction: { x: 0, y: 0 },
    running: false
  });

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    gameRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: { x: 1, y: 0 },
      running: true
    };
  };

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#4CAF50';
    gameRef.current.snake.forEach(segment => {
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // Draw food
    ctx.fillStyle = '#FF1744';
    ctx.fillRect(gameRef.current.food.x * gridSize, gameRef.current.food.y * gridSize, gridSize - 2, gridSize - 2);

    // Move snake
    if (gameRef.current.running) {
      const head = { ...gameRef.current.snake[0] };
      head.x += gameRef.current.direction.x;
      head.y += gameRef.current.direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameRef.current.running = false;
        setGameOver(true);
        return;
      }

      // Check self collision
      if (gameRef.current.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameRef.current.running = false;
        setGameOver(true);
        return;
      }

      gameRef.current.snake.unshift(head);

      // Check food collision
      if (head.x === gameRef.current.food.x && head.y === gameRef.current.food.y) {
        setScore(prev => prev + 10);
        gameRef.current.food = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount)
        };
      } else {
        gameRef.current.snake.pop();
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRef.current.running) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault(); // Prevent page scroll
          if (gameRef.current.direction.y === 0) gameRef.current.direction = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          e.preventDefault(); // Prevent page scroll
          if (gameRef.current.direction.y === 0) gameRef.current.direction = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          e.preventDefault(); // Prevent page scroll
          if (gameRef.current.direction.x === 0) gameRef.current.direction = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          e.preventDefault(); // Prevent page scroll
          if (gameRef.current.direction.x === 0) gameRef.current.direction = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(drawGame, 150);
    return () => clearInterval(gameLoop);
  }, [gameStarted, drawGame]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] bg-black/90 rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-auto">
      <div className="mb-4 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-2">🐍 SNAKE LEGEND</h3>
        <p className="text-white/80 text-sm sm:text-base">Score: {score}</p>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-green-400 rounded-lg mb-4 w-full max-w-sm sm:max-w-md h-auto"
        style={{ aspectRatio: '1/1', maxWidth: '400px', width: '100%' }}
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
        {!gameStarted || gameOver ? (
          <button
            onClick={startGame}
            className="px-4 sm:px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
          >
            {gameOver ? 'PLAY AGAIN' : 'START GAME'}
          </button>
        ) : null}
        
        <button
          onClick={onClose}
          className="px-4 sm:px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
        >
          BACK TO ARCADE
        </button>
      </div>

      {gameStarted && !gameOver && (
        <div className="text-center mt-4">
          <p className="text-white/60 text-xs sm:text-sm">Use arrow keys to control the snake</p>
          {/* Mobile touch controls */}
          <div className="mt-3 sm:hidden">
            <div className="grid grid-cols-3 gap-2 w-32 mx-auto">
              <div></div>
              <button 
                onTouchStart={() => gameRef.current.direction = {x: 0, y: -1}}
                className="bg-white/20 p-3 rounded text-white text-xs"
              >↑</button>
              <div></div>
              <button 
                onTouchStart={() => gameRef.current.direction = {x: -1, y: 0}}
                className="bg-white/20 p-3 rounded text-white text-xs"
              >←</button>
              <div></div>
              <button 
                onTouchStart={() => gameRef.current.direction = {x: 1, y: 0}}
                className="bg-white/20 p-3 rounded text-white text-xs"
              >→</button>
              <div></div>
              <button 
                onTouchStart={() => gameRef.current.direction = {x: 0, y: 1}}
                className="bg-white/20 p-3 rounded text-white text-xs"
              >↓</button>
              <div></div>
            </div>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="text-center mt-4">
          <p className="text-red-400 font-bold">Game Over!</p>
          <p className="text-white/80">Final Score: {score}</p>
        </div>
      )}
    </div>
  );
};

// 🏓 PONG GAME COMPONENT
const PongGame = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [gameStarted, setGameStarted] = useState(false);

  const gameRef = useRef({
    ball: { x: 300, y: 200, dx: 4, dy: 4 },
    player: { y: 150 },
    computer: { y: 150 },
    running: false
  });

  const startGame = () => {
    setGameStarted(true);
    setScore({ player: 0, computer: 0 });
    gameRef.current = {
      ball: { x: 300, y: 200, dx: 4, dy: 4 },
      player: { y: 150 },
      computer: { y: 150 },
      running: true
    };
  };

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = '#2196F3';
    ctx.fillRect(20, gameRef.current.player.y, 10, 100); // Player paddle
    ctx.fillRect(570, gameRef.current.computer.y, 10, 100); // Computer paddle

    // Draw ball
    ctx.fillStyle = '#FFF';
    ctx.fillRect(gameRef.current.ball.x, gameRef.current.ball.y, 15, 15);

    // Draw center line
    ctx.strokeStyle = '#555';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400);
    ctx.stroke();

    if (gameRef.current.running) {
      // Move ball
      gameRef.current.ball.x += gameRef.current.ball.dx;
      gameRef.current.ball.y += gameRef.current.ball.dy;

      // Ball collision with top/bottom
      if (gameRef.current.ball.y <= 0 || gameRef.current.ball.y >= 385) {
        gameRef.current.ball.dy = -gameRef.current.ball.dy;
      }

      // Ball collision with paddles
      if (gameRef.current.ball.x <= 30 && 
          gameRef.current.ball.y >= gameRef.current.player.y && 
          gameRef.current.ball.y <= gameRef.current.player.y + 100) {
        gameRef.current.ball.dx = -gameRef.current.ball.dx;
      }

      if (gameRef.current.ball.x >= 560 && 
          gameRef.current.ball.y >= gameRef.current.computer.y && 
          gameRef.current.ball.y <= gameRef.current.computer.y + 100) {
        gameRef.current.ball.dx = -gameRef.current.ball.dx;
      }

      // Score points
      if (gameRef.current.ball.x < 0) {
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
        gameRef.current.ball = { x: 300, y: 200, dx: 4, dy: 4 };
      }
      if (gameRef.current.ball.x > 600) {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
        gameRef.current.ball = { x: 300, y: 200, dx: -4, dy: 4 };
      }

      // Simple AI for computer paddle
      if (gameRef.current.computer.y + 50 < gameRef.current.ball.y) {
        gameRef.current.computer.y += 3;
      } else if (gameRef.current.computer.y + 50 > gameRef.current.ball.y) {
        gameRef.current.computer.y -= 3;
      }
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameRef.current.running) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      gameRef.current.player.y = Math.max(0, Math.min(300, mouseY - 50));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!gameRef.current.running) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const touchY = touch.clientY - rect.top;
      gameRef.current.player.y = Math.max(0, Math.min(300, touchY - 50));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(drawGame, 16);
    return () => clearInterval(gameLoop);
  }, [gameStarted, drawGame]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] bg-black/90 rounded-lg p-4 sm:p-6 w-full max-w-3xl mx-auto">
      <div className="mb-4 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">🏓 PONG ULTIMATE</h3>
        <div className="flex gap-4 sm:gap-8 text-white/80 text-sm sm:text-base">
          <div>Player: {score.player}</div>
          <div>Computer: {score.computer}</div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border-2 border-blue-400 rounded-lg mb-4 cursor-none w-full max-w-lg sm:max-w-xl h-auto"
        style={{ aspectRatio: '3/2', maxWidth: '600px' }}
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
        {!gameStarted ? (
          <button
            onClick={startGame}
            className="px-4 sm:px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
          >
            START GAME
          </button>
        ) : null}
        
        <button
          onClick={onClose}
          className="px-4 sm:px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
        >
          BACK TO ARCADE
        </button>
      </div>

      {gameStarted && (
        <div className="text-center mt-4">
          <p className="text-white/60 text-xs sm:text-sm">
            <span className="hidden sm:inline">Move your mouse to control the left paddle</span>
            <span className="sm:hidden">Touch and drag to control the paddle</span>
          </p>
        </div>
      )}
    </div>
  );
};

// 🧱 BREAKOUT GAME COMPONENT
const BreakoutGame = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameRef = useRef({
    ball: { x: 300, y: 350, dx: 4, dy: -4 },
    paddle: { x: 250 },
    bricks: [] as Array<{x: number, y: number, visible: boolean}>,
    running: false
  });

  const initBricks = () => {
    const bricks = [];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 10; c++) {
        bricks.push({
          x: c * 60 + 10,
          y: r * 30 + 10,
          visible: true
        });
      }
    }
    return bricks;
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setGameWon(false);
    setScore(0);
    setLives(3);
    gameRef.current = {
      ball: { x: 300, y: 350, dx: 4, dy: -4 },
      paddle: { x: 250 },
      bricks: initBricks(),
      running: true
    };
  };

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bricks
    gameRef.current.bricks.forEach(brick => {
      if (brick.visible) {
        ctx.fillStyle = '#FF9800';
        ctx.fillRect(brick.x, brick.y, 50, 25);
      }
    });

    // Draw paddle
    ctx.fillStyle = '#2196F3';
    ctx.fillRect(gameRef.current.paddle.x, 370, 100, 15);

    // Draw ball
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(gameRef.current.ball.x, gameRef.current.ball.y, 8, 0, Math.PI * 2);
    ctx.fill();

    if (gameRef.current.running) {
      // Move ball
      gameRef.current.ball.x += gameRef.current.ball.dx;
      gameRef.current.ball.y += gameRef.current.ball.dy;

      // Ball collision with walls
      if (gameRef.current.ball.x <= 8 || gameRef.current.ball.x >= 592) {
        gameRef.current.ball.dx = -gameRef.current.ball.dx;
      }
      if (gameRef.current.ball.y <= 8) {
        gameRef.current.ball.dy = -gameRef.current.ball.dy;
      }

      // Ball collision with paddle
      if (gameRef.current.ball.y >= 360 && 
          gameRef.current.ball.x >= gameRef.current.paddle.x && 
          gameRef.current.ball.x <= gameRef.current.paddle.x + 100) {
        gameRef.current.ball.dy = -gameRef.current.ball.dy;
      }

      // Ball collision with bricks
      gameRef.current.bricks.forEach(brick => {
        if (brick.visible && 
            gameRef.current.ball.x >= brick.x && 
            gameRef.current.ball.x <= brick.x + 50 &&
            gameRef.current.ball.y >= brick.y && 
            gameRef.current.ball.y <= brick.y + 25) {
          brick.visible = false;
          gameRef.current.ball.dy = -gameRef.current.ball.dy;
          setScore(prev => prev + 10);
        }
      });

      // Check win condition
      if (gameRef.current.bricks.every(brick => !brick.visible)) {
        gameRef.current.running = false;
        setGameWon(true);
      }

      // Ball falls below paddle
      if (gameRef.current.ball.y > 400) {
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            gameRef.current.running = false;
            setGameOver(true);
          } else {
            // Reset ball position
            gameRef.current.ball = { x: 300, y: 350, dx: 4, dy: -4 };
          }
          return newLives;
        });
      }
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameRef.current.running) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      gameRef.current.paddle.x = Math.max(0, Math.min(500, mouseX - 50));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!gameRef.current.running) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const touchX = touch.clientX - rect.left;
      gameRef.current.paddle.x = Math.max(0, Math.min(500, touchX - 50));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(drawGame, 16);
    return () => clearInterval(gameLoop);
  }, [gameStarted, drawGame]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] bg-black/90 rounded-lg p-4 sm:p-6 w-full max-w-3xl mx-auto">
      <div className="mb-4 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-orange-400 mb-2">🧱 BREAKOUT REVOLUTION</h3>
        <div className="flex gap-4 sm:gap-8 text-white/80 text-sm sm:text-base">
          <div>Score: {score}</div>
          <div>Lives: {lives}</div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border-2 border-orange-400 rounded-lg mb-4 cursor-none w-full max-w-lg sm:max-w-xl h-auto"
        style={{ aspectRatio: '3/2', maxWidth: '600px' }}
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
        {!gameStarted || gameOver || gameWon ? (
          <button
            onClick={startGame}
            className="px-4 sm:px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
          >
            {gameOver || gameWon ? 'PLAY AGAIN' : 'START GAME'}
          </button>
        ) : null}
        
        <button
          onClick={onClose}
          className="px-4 sm:px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
        >
          BACK TO ARCADE
        </button>
      </div>

      {gameStarted && !gameOver && !gameWon && (
        <div className="text-center mt-4">
          <p className="text-white/60 text-xs sm:text-sm">
            <span className="hidden sm:inline">Move your mouse to control the paddle</span>
            <span className="sm:hidden">Touch and drag to control the paddle</span>
          </p>
        </div>
      )}

      {gameOver && (
        <div className="text-center mt-4">
          <p className="text-red-400 font-bold">Game Over!</p>
          <p className="text-white/80">Final Score: {score}</p>
        </div>
      )}

      {gameWon && (
        <div className="text-center mt-4">
          <p className="text-green-400 font-bold">You Won!</p>
          <p className="text-white/80">Final Score: {score}</p>
        </div>
      )}
    </div>
  );
};

// 🧠 MEMORY GAME COMPONENT
const MemoryGame = ({ onClose }: { onClose: () => void }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const colors = ['#FF1744', '#4CAF50', '#2196F3', '#FF9800'];
  const sounds = ['C', 'E', 'G', 'C2'];

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setSequence([]);
    setPlayerSequence([]);
    addToSequence();
  };

  const addToSequence = () => {
    const nextColor = Math.floor(Math.random() * 4);
    setSequence(prev => [...prev, nextColor]);
    setPlayerSequence([]);
  };

  const showSequence = useCallback(() => {
    setIsShowingSequence(true);
    sequence.forEach((color, index) => {
      setTimeout(() => {
        setActiveButton(color);
        setTimeout(() => setActiveButton(null), 400);
      }, (index + 1) * 600);
    });
    setTimeout(() => setIsShowingSequence(false), sequence.length * 600 + 500);
  }, [sequence]);

  useEffect(() => {
    if (sequence.length > 0 && gameStarted) {
      showSequence();
    }
  }, [sequence, gameStarted, showSequence]);

  const handleButtonClick = (colorIndex: number) => {
    if (isShowingSequence || gameOver) return;

    const newPlayerSequence = [...playerSequence, colorIndex];
    setPlayerSequence(newPlayerSequence);

    // Check if the player got it wrong
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true);
      return;
    }

    // Check if the player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      setScore(prev => prev + sequence.length * 10);
      setTimeout(() => addToSequence(), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] bg-black/90 rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-auto">
      <div className="mb-4 sm:mb-6 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-pink-400 mb-2">🧠 MEMORY MATRIX</h3>
        <div className="text-white/80 text-sm sm:text-base">
          <div>Score: {score}</div>
          <div>Round: {sequence.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            disabled={isShowingSequence || gameOver}
            className={cn(
              "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg transition-all duration-200 transform",
              activeButton === index ? "scale-95 opacity-100" : "scale-100 opacity-70",
              "hover:scale-105 hover:opacity-100 disabled:hover:scale-100 disabled:hover:opacity-70"
            )}
            style={{
              backgroundColor: activeButton === index ? color : `${color}80`,
              boxShadow: activeButton === index ? `0 0 30px ${color}` : 'none'
            }}
          >
            <span className="text-2xl font-bold text-white">
              {sounds[index]}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
        {!gameStarted || gameOver ? (
          <button
            onClick={startGame}
            className="px-4 sm:px-6 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
          >
            {gameOver ? 'PLAY AGAIN' : 'START GAME'}
          </button>
        ) : null}
        
        <button
          onClick={onClose}
          className="px-4 sm:px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
        >
          BACK TO ARCADE
        </button>
      </div>

      {isShowingSequence && (
        <p className="text-white/60 text-sm mt-4">Watch the sequence...</p>
      )}

      {gameStarted && !isShowingSequence && !gameOver && (
        <p className="text-white/60 text-sm mt-4">Repeat the sequence!</p>
      )}

      {gameOver && (
        <div className="text-center mt-4">
          <p className="text-red-400 font-bold">Game Over!</p>
          <p className="text-white/80">Final Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default function EmbeddedArcade() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Client-side detection to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate stable particle positions for client-side rendering
  const generateParticlePositions = () => {
    return Array.from({ length: 25 }, (_, i) => ({
      left: (i * 17 + 23) % 100, // Deterministic but scattered positions
      top: (i * 11 + 31) % 100,
      color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][i % 4],
      delay: (i * 0.3) % 2,
      duration: 3 + (i % 3),
    }));
  };

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCodeSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    const handleKeyPress = (e: KeyboardEvent) => {
      // For debugging purposes, let's create a visible indicator
      const keyPressed = e.code || e.key.toLowerCase();
      
      setKeySequence(prev => {
        const newSequence = [...prev, keyPressed];
        
        // Check for proper Konami Code sequence (↑↑↓↓←→←→BA)
        const lastTen = newSequence.slice(-10);
        if (lastTen.length === 10 && 
            lastTen.every((key, index) => key === konamiCodeSequence[index])) {
          setKonamiActivated(true);
          alert('🎉 KONAMI CODE ACTIVATED! 🎉\n\n🎮 You found the REAL secret code!\n\n⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️\n\n🚀 Fun fact: I actually spent 3 hours implementing this easter egg instead of fixing that one CSS bug that\'s been bothering me for weeks! 😅\n\n☕ Coffee count today: ' + Math.floor(Math.random() * 12 + 1) + ' cups\n🐛 Bugs created while making this: Probably ' + Math.floor(Math.random() * 5 + 1) + '\n\n🎯 Pro tip: You can also just type "konami" for us lazy folks!');
          return [];
        }
        
        // Check for simple "konami" typing (last 6 characters) - easier alternative
        const lastSix = newSequence.slice(-6).join('').toLowerCase();
        if (lastSix === 'konami') {
          setKonamiActivated(true);
          alert('🎉 KONAMI CODE ACTIVATED! 🎉\n\n🎮 You found the secret developer mode!\n\n🚀 Fun fact: You took the easy route by typing "konami" instead of the full ↑↑↓↓←→←→BA sequence! 😄\n\n☕ Coffee count today: ' + Math.floor(Math.random() * 12 + 1) + ' cups\n🐛 Bugs created while making this: Probably ' + Math.floor(Math.random() * 5 + 1));
          return [];
        }
        
        // Alternative trigger - typing "test" will also activate for debugging
        if (lastSix.includes('test')) {
          alert('🔧 DEBUG MODE: Test trigger activated! The Konami code system is working. Try the real sequence: ↑↑↓↓←→←→BA or just type "KONAMI"!');
          return [];
        }
        
        // Keep only last 15 keys to prevent memory issues and allow for full sequence
        return newSequence.slice(-15);
      });
    };

    // Add event listener to document to ensure it catches all key presses
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderGame = () => {
    switch (selectedGame) {
      case 'snake':
        return <SnakeGame onClose={() => setSelectedGame(null)} />;
      case 'pong':
        return <PongGame onClose={() => setSelectedGame(null)} />;
      case 'breakout':
        return <BreakoutGame onClose={() => setSelectedGame(null)} />;
      case 'memory':
        return <MemoryGame onClose={() => setSelectedGame(null)} />;
      default:
        return null;
    }
  };

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-black to-blue-900/30"></div>
        </div>

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setSelectedGame(null)}
          className="fixed top-20 left-8 z-50 bg-red-600/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-red-400/30 transition-all duration-300 hover:scale-105"
        >
          ← Back to Games
        </motion.button>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-8 pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full"
          >
            {renderGame()}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(0, 255, 255, 0.1) 0%, 
          transparent 50%),
          linear-gradient(45deg, #000 0%, #1a0033 25%, #000 50%, #001a33 75%, #000 100%)
        `
      }}
    >
      {/* OPTIMIZED PARTICLE SYSTEM - Client Side Only */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Simplified floating particles */}
          {generateParticlePositions().map((particle, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                backgroundColor: particle.color,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}

          {/* Minimal accent lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute w-px bg-cyan-400/20"
              style={{
                left: `${20 + i * 20}%`,
                top: 0,
                height: '100%',
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}

      {/* Fallback static background for SSR */}
      {!isClient && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10"></div>
        </div>
      )}

      {/* SIMPLIFIED GRID OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* PERSONAL HEADER WITH EASTER EGGS */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center pt-20 sm:pt-24 md:pt-28 pb-6 md:pb-8 px-4"
      >
        {/* Personal title with gradient */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 relative cursor-pointer leading-tight"
          style={{
            background: `linear-gradient(45deg, #ff0080, #00ffff, #ff8000, #8000ff, #00ff00, #ff0080)`,
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
          onClick={() => {
            // Easter egg: konami code tribute
            const sounds = ['🎵', '🎶', '🎸', '🎹', '🥁'];
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
            alert(`${randomSound} Hey there! You found the secret title click! I spent way too much time making these games instead of fixing actual bugs... 😅`);
          }}
        >
          MANGLAM'S GAME CORNER
        </motion.h1>

        {/* Engaging personal subtitle with resume connection */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-white/80 mb-4 px-2 leading-relaxed"
        >
          📄 Bored browsing through my resume? 😴 <br className="sm:hidden" />Stop by and play some games! 🎮
        </motion.p>

        {/* Additional funny line with Konami code hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs sm:text-sm md:text-base text-cyan-400/80 mb-2 font-mono px-2 leading-relaxed"
        >
          // Because who needs a serious portfolio when you can have embedded arcade games? 🕹️
        </motion.p>

        {/* Konami Code Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-xs md:text-sm text-yellow-400/70 mb-8 font-mono bg-yellow-400/10 px-4 py-2 rounded-lg inline-block border border-yellow-400/20"
        >
          🎯 <strong>SECRET CODE:</strong> Try the classic ↑↑↓↓←→←→BA sequence for a special surprise! 
          <br />
          <span className="text-yellow-300/60">Or just type "KONAMI" if you're feeling lazy 😉</span>
        </motion.div>

        {/* Personal status indicators with easter eggs */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 md:gap-8 text-cyan-400 font-mono text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="cursor-pointer"
            onClick={() => {
              alert("😴 Coffee Level: DANGEROUSLY LOW! ☕");
            }}
          >
            CAFFEINE.EXE LOADED
          </motion.div>
          
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400 cursor-pointer"
            animate={{
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            onClick={() => {
              alert("🚀 This dot represents my motivation level at 3 AM when I built these games!");
            }}
          />
          
          <motion.div
            className="cursor-pointer"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
            }}
            onClick={() => {
              const bugs = ['🐛', '🪲', '🐞', '🦟'];
              const randomBug = bugs[Math.floor(Math.random() * bugs.length)];
              alert(`${randomBug} BUGS.COUNT = ${Math.floor(Math.random() * 99) + 1} (At least I'm honest about it!) 😅`);
            }}
          >
            PROCRASTINATION ACTIVE
          </motion.div>
        </motion.div>

        {/* Secret Konami Code Easter Egg */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-4"
        >
          <motion.p
            className="text-xs text-white/40 font-mono cursor-pointer hover:text-cyan-400 transition-colors"
            onClick={() => {
              alert("🎮 DEVELOPER CONFESSION: I actually spent more time building these games than I did on my actual job applications... 😅\n\n📊 Time spent ratio:\n- Building games: 80%\n- Writing resume: 15%\n- Procrastinating: 5%\n\n...Wait, that doesn't add up to 100%. Must be a bug! 🐛");
            }}
          >
            💭 click here for developer confessions...
          </motion.p>
          
          {/* Hidden Games Counter (appears after 3+ games) */}
          {gamesPlayed >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-3 text-center"
            >
              <motion.p
                className="text-xs text-yellow-400/70 font-mono bg-yellow-400/10 px-3 py-1 rounded-full inline-block cursor-pointer hover:text-yellow-400 transition-colors"
                onClick={() => {
                  if (gamesPlayed >= 15) {
                    alert(`🎮 ULTIMATE GAMER STATUS! You've played ${gamesPlayed} games! You're officially more dedicated to my games than my actual job applications! 😂`);
                  } else if (gamesPlayed >= 10) {
                    alert(`🏆 ACHIEVEMENT: ${gamesPlayed} games played! You're really testing my debugging skills! 🤓`);
                  } else {
                    alert(`🎯 Nice! ${gamesPlayed} games played! You're helping me procrastinate... I mean, "test my portfolio!" 😉`);
                  }
                }}
                whileHover={{ scale: 1.05 }}
              >
                🎮 GAMES PLAYED: {gamesPlayed} {gamesPlayed >= 10 ? '🏆' : gamesPlayed >= 5 ? '🌟' : ''}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* ULTRA-CREATIVE GAME GRID */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        {/* Section intro animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12 px-4"
        >
          {/* Fun intro text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-xs sm:text-sm md:text-base mb-4 md:mb-6 font-mono leading-relaxed max-w-2xl mx-auto"
          >
            🎯 <span className="text-cyan-400">Pro Tip:</span> These games are way more fun than reading technical skills on a resume! 
            <br className="hidden sm:block" />
            <span className="text-white/50 block sm:inline mt-1 sm:mt-0">Plus, they actually demonstrate my coding abilities in action 😉</span>
          </motion.p>

          <motion.div
            className="text-cyan-400 font-mono text-sm mb-4"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            ━━━ AVAILABLE GAMES ━━━
          </motion.div>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
          style={{
            transform: `perspective(1200px) rotateX(${mousePosition.y * 1}deg) rotateY(${mousePosition.x * 1}deg)`,
          }}
        >
          {EMBEDDED_GAMES.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.02,
                rotateY: hoveredGame === game.id ? 8 : 0,
                rotateX: hoveredGame === game.id ? -5 : 0,
                z: 50,
              }}
              onHoverStart={() => setHoveredGame(game.id)}
              onHoverEnd={() => setHoveredGame(null)}
              className={cn(
                "relative group cursor-pointer overflow-hidden",
                "backdrop-blur-xl rounded-3xl border transition-all duration-700 transform-gpu",
                hoveredGame === game.id 
                  ? "border-cyan-400/60 shadow-2xl shadow-cyan-400/20" 
                  : "border-white/10 hover:border-white/30"
              )}
              style={{
                background: hoveredGame === game.id 
                  ? `linear-gradient(135deg, ${game.color}15, transparent, ${game.color}10)`
                  : 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
              }}
              onClick={() => setSelectedGame(game.id)}
            >
              {/* Holographic scanning effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, transparent 30%, ${game.color}20 50%, transparent 70%)`,
                }}
                animate={hoveredGame === game.id ? {
                  x: ['-100%', '100%'],
                  opacity: [0, 0.8, 0],
                } : {}}
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              />

              {/* Data matrix background */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <motion.div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        0deg,
                        ${game.color} 0px,
                        transparent 1px,
                        transparent 8px,
                        ${game.color} 9px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        ${game.color} 0px,
                        transparent 1px,
                        transparent 8px,
                        ${game.color} 9px
                      )
                    `,
                  }}
                  animate={{
                    backgroundPosition: hoveredGame === game.id 
                      ? ['0px 0px', '8px 8px'] 
                      : ['0px 0px', '0px 0px'],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400/40"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400/40"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400/40"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400/40"></div>

              <div className="relative z-10 p-4 sm:p-6 md:p-8">
                {/* Game icon with advanced effects */}
                <motion.div
                  className="text-center mb-4 md:mb-6 relative"
                  animate={{
                    rotateY: hoveredGame === game.id ? [0, 360] : 0,
                  }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                >
                  <motion.div
                    className="text-6xl sm:text-7xl md:text-8xl relative z-10"
                    animate={{
                      scale: hoveredGame === game.id ? [1, 1.15, 1] : 1,
                      filter: hoveredGame === game.id 
                        ? [`drop-shadow(0 0 20px ${game.color}80)`]
                        : ['drop-shadow(0 0 0px transparent)'],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {game.icon}
                  </motion.div>
                  
                  {/* Icon glow effect */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-8xl opacity-30"
                    animate={hoveredGame === game.id ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.1, 0.3],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ color: game.color }}
                  >
                    {game.icon}
                  </motion.div>
                </motion.div>

                {/* Game info with enhanced typography */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 text-center relative px-2">
                    {game.name}
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5"
                      style={{ backgroundColor: game.color }}
                      animate={{
                        width: hoveredGame === game.id ? '80%' : '0%',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </h3>
                  
                  <p className="text-white/70 mb-4 md:mb-6 text-center text-xs sm:text-sm leading-relaxed px-2">
                    {game.description}
                  </p>
                  
                  {/* Fun Fact Easter Egg */}
                  {game.funFact && (
                    <motion.div
                      className="bg-purple-500/20 backdrop-blur-sm rounded-lg p-3 mb-4 border border-purple-400/30 cursor-pointer"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(147, 51, 234, 0.3)' }}
                      onClick={() => alert(`💡 Fun Fact: ${game.funFact}`)}
                    >
                      <div className="text-xs text-purple-300 font-semibold mb-1">💡 DEVELOPER SECRET</div>
                      <div className="text-xs text-white/80">Click for a fun fact!</div>
                    </motion.div>
                  )}
                  
                  {/* Easter Egg Interactive Element */}
                  {game.easterEgg && (
                    <motion.div
                      className="bg-orange-500/20 backdrop-blur-sm rounded-lg p-3 mb-4 border border-orange-400/30 cursor-pointer"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(234, 88, 12, 0.3)' }}
                      onClick={() => alert(`🎮 Easter Egg: ${game.easterEgg}`)}
                    >
                      <div className="text-xs text-orange-300 font-semibold mb-1">🎮 HIDDEN FEATURE</div>
                      <div className="text-xs text-white/80">Click to reveal secret!</div>
                    </motion.div>
                  )}

                  {/* Enhanced stats grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 md:mb-6">
                    <motion.div 
                      className="bg-black/30 backdrop-blur-sm rounded-lg md:rounded-xl p-2 sm:p-3 text-center border border-white/10"
                      whileHover={{ 
                        backgroundColor: `${game.color}20`,
                        borderColor: `${game.color}40`,
                      }}
                    >
                      <div className="text-xs text-cyan-400 font-bold mb-1">DIFFICULTY</div>
                      <div className="text-xs sm:text-sm text-white font-semibold truncate">{game.difficulty}</div>
                    </motion.div>
                    <motion.div 
                      className="bg-black/30 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10"
                      whileHover={{ 
                        backgroundColor: `${game.color}20`,
                        borderColor: `${game.color}40`,
                      }}
                    >
                      <div className="text-xs text-cyan-400 font-bold mb-1">PLAYERS</div>
                      <div className="text-sm text-white font-semibold">{game.players}</div>
                    </motion.div>
                  </div>

                  {/* Rating and play button */}
                  <div className="text-center">
                    <motion.div 
                      className="text-yellow-400 text-xl mb-4"
                      animate={hoveredGame === game.id ? {
                        scale: [1, 1.1, 1],
                        filter: ['drop-shadow(0 0 0px #ffd700)', 'drop-shadow(0 0 10px #ffd700)', 'drop-shadow(0 0 0px #ffd700)'],
                      } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {game.rating}
                    </motion.div>
                    
                    <motion.button
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: `0 5px 20px ${game.color}40`,
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGame(game.id);
                        setGamesPlayed(prev => {
                          const newCount = prev + 1;
                          // Easter egg messages based on game count
                          if (newCount === 5) {
                            setTimeout(() => alert("🎮 Wow! You've played 5 games! You're really putting my creations to the test! 😄"), 500);
                          } else if (newCount === 10) {
                            setTimeout(() => alert("🏆 ACHIEVEMENT UNLOCKED: Game Enthusiast! 10 games played! I'm impressed! 🤩"), 500);
                          } else if (newCount === 20) {
                            setTimeout(() => alert("🎯 LEGENDARY STATUS: 20 games! You might have officially played my games more than I did while testing them! 😅"), 500);
                          }
                          return newCount;
                        });
                      }}
                      className="w-full text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg md:rounded-xl transition-all duration-300 text-sm sm:text-base md:text-lg relative overflow-hidden border-2"
                      style={{
                        background: `linear-gradient(135deg, ${game.color}, ${game.color}80)`,
                        borderColor: `${game.color}60`,
                      }}
                    >
                      <span className="relative z-10">▶ LAUNCH GAME</span>
                      
                      {/* Button shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={hoveredGame === game.id ? {
                          x: ['-100%', '100%'],
                        } : {}}
                        transition={{
                          duration: 0.8,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced hover border effect */}
              <AnimatePresence>
                {hoveredGame === game.id && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 rounded-3xl border-2"
                      style={{
                        borderColor: `${game.color}80`,
                        boxShadow: `inset 0 0 60px ${game.color}20, 0 0 60px ${game.color}30`,
                      }}
                    />
                    
                    {/* Corner pulse effects */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: game.color,
                          top: i < 2 ? '1rem' : 'auto',
                          bottom: i >= 2 ? '1rem' : 'auto',
                          left: i % 2 === 0 ? '1rem' : 'auto',
                          right: i % 2 === 1 ? '1rem' : 'auto',
                        }}
                        animate={{
                          scale: [0.5, 1.2, 0.5],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ENHANCED FOOTER WITH PORTAL EFFECT */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
        className="relative z-10 text-center pb-8 md:pb-12 px-4"
      >
        {/* Portal ring background */}
        <div className="relative inline-block">
          {/* Outer rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute border border-cyan-400/30 rounded-full"
              style={{
                width: 200 + i * 40,
                height: 200 + i * 40,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.9, 1.1, 0.9],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}

          {/* Portal energy particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`portal-particle-${i}`}
              className="absolute w-2 h-2 rounded-full bg-cyan-400"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                x: [0, Math.cos(i * 30 * Math.PI / 180) * 80],
                y: [0, Math.sin(i * 30 * Math.PI / 180) * 80],
                opacity: [1, 0, 1],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Main portal button */}
          <motion.div
            whileHover={{ 
              scale: 1.1,
              rotateY: 10,
            }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link 
              href="/" 
              className="relative inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white border-2 border-cyan-400/50 overflow-hidden group transition-all duration-500"
              style={{
                background: `
                  linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1)),
                  radial-gradient(circle at center, rgba(0, 255, 255, 0.2), transparent)
                `,
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)',
              }}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Animated arrow icon */}
              <motion.div
                animate={{
                  x: [-2, 2, -2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.div>

              <span className="relative z-10">RETURN TO PORTFOLIO</span>

              {/* Hover shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut',
                }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Navigation tip */}
        <motion.div
          className="mt-4 md:mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <motion.p
            className="text-white/60 text-xs sm:text-sm font-mono bg-purple-900/20 px-3 sm:px-4 py-2 sm:py-3 rounded-lg inline-block border border-purple-400/20 max-w-sm sm:max-w-md md:max-w-2xl mx-auto leading-relaxed"
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(147, 51, 234, 0.3)' }}
          >
            🧭 <span className="text-purple-300">Navigation Tip:</span> Head back to my portfolio to see the "boring" stuff like skills, projects & contact info 
            <br className="hidden sm:block" />
            <span className="text-white/40 block sm:inline mt-1 sm:mt-0">But honestly, these games probably show my coding skills better than any resume bullet point! 😄</span>
          </motion.p>
        </motion.div>

        {/* Extra UI elements */}
        <motion.div
          className="mt-8 flex justify-center items-center gap-8 text-cyan-400/60 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            ━━━ SESSION COMPLETE ━━━
          </motion.div>
          
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1.5,
            }}
          >
            ━━━ GAMES ARCHIVED ━━━
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
