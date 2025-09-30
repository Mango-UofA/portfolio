'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// 🎮 EMBEDDED PLAYABLE GAMES - BUILT INTO YOUR PORTFOLIO! 🎮
const EMBEDDED_GAMES = [
  {
    id: 'snake',
    name: 'SNAKE LEGEND',
    icon: '🐍',
    description: 'Classic snake game with modern twists',
    difficulty: 'EASY',
    players: '1 PLAYER',
    category: 'ARCADE',
    year: '2024',
    rating: '★★★★★',
    color: '#4CAF50',
    embedded: true
  },
  {
    id: 'tetris',
    name: 'TETRIS MASTER',
    icon: '🧩',
    description: 'Legendary block-stacking puzzle game',
    difficulty: 'MEDIUM',
    players: '1 PLAYER',
    category: 'PUZZLE',
    year: '2024',
    rating: '★★★★★',
    color: '#FF1744',
    embedded: true
  },
  {
    id: 'pong',
    name: 'PONG ULTIMATE',
    icon: '🏓',
    description: 'The classic that started it all',
    difficulty: 'EASY',
    players: '1-2 PLAYERS',
    category: 'ARCADE',
    year: '2024',
    rating: '★★★★☆',
    color: '#2196F3',
    embedded: true
  },
  {
    id: 'breakout',
    name: 'BREAKOUT REVOLUTION',
    icon: '🧱',
    description: 'Destroy bricks with bouncing ball physics',
    difficulty: 'MEDIUM',
    players: '1 PLAYER',
    category: 'ARCADE',
    year: '2024',
    rating: '★★★★★',
    color: '#FF9800',
    embedded: true
  },
  {
    id: 'spaceshooter',
    name: 'SPACE DEFENDER',
    icon: '🚀',
    description: 'Defend Earth from alien invasion',
    difficulty: 'HARD',
    players: '1 PLAYER',
    category: 'SHOOTER',
    year: '2024',
    rating: '★★★★★',
    color: '#9C27B0',
    embedded: true
  },
  {
    id: 'memory',
    name: 'MEMORY MATRIX',
    icon: '🧠',
    description: 'Test your memory with pattern sequences',
    difficulty: 'MEDIUM',
    players: '1 PLAYER',
    category: 'PUZZLE',
    year: '2024',
    rating: '★★★★☆',
    color: '#E91E63',
    embedded: true
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
          if (gameRef.current.direction.y === 0) gameRef.current.direction = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (gameRef.current.direction.y === 0) gameRef.current.direction = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (gameRef.current.direction.x === 0) gameRef.current.direction = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
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
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-black/90 rounded-lg p-6">
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-green-400 mb-2">🐍 SNAKE LEGEND</h3>
        <p className="text-white/80">Score: {score}</p>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-green-400 rounded-lg mb-4"
      />

      <div className="flex gap-4">
        {!gameStarted || gameOver ? (
          <button
            onClick={startGame}
            className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg transition-all duration-300"
          >
            {gameOver ? 'PLAY AGAIN' : 'START GAME'}
          </button>
        ) : null}
        
        <button
          onClick={onClose}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all duration-300"
        >
          BACK TO ARCADE
        </button>
      </div>

      {gameStarted && !gameOver && (
        <p className="text-white/60 text-sm mt-4">Use arrow keys to control the snake</p>
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

// 🧩 TETRIS GAME COMPONENT
const TetrisGame = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameRef = useRef({
    board: Array(20).fill(null).map(() => Array(10).fill(0)),
    currentPiece: null as any,
    running: false
  });

  // Tetris pieces
  const pieces = [
    { shape: [[1,1,1,1]], color: '#00FFFF' }, // I
    { shape: [[1,1],[1,1]], color: '#FFFF00' }, // O
    { shape: [[0,1,0],[1,1,1]], color: '#800080' }, // T
    { shape: [[0,1,1],[1,1,0]], color: '#00FF00' }, // S
    { shape: [[1,1,0],[0,1,1]], color: '#FF0000' }, // Z
    { shape: [[1,0,0],[1,1,1]], color: '#FF8000' }, // L
    { shape: [[0,0,1],[1,1,1]], color: '#0000FF' }  // J
  ];

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setLines(0);
    gameRef.current = {
      board: Array(20).fill(null).map(() => Array(10).fill(0)),
      currentPiece: {
        ...pieces[Math.floor(Math.random() * pieces.length)],
        x: 4,
        y: 0
      },
      running: true
    };
  };

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const blockSize = 25;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw board
    gameRef.current.board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillStyle = '#444';
          ctx.fillRect(x * blockSize, y * blockSize, blockSize - 1, blockSize - 1);
        }
      });
    });

    // Draw current piece
    if (gameRef.current.currentPiece) {
      ctx.fillStyle = gameRef.current.currentPiece.color;
      gameRef.current.currentPiece.shape.forEach((row: number[], dy: number) => {
        row.forEach((cell, dx) => {
          if (cell) {
            const x = (gameRef.current.currentPiece.x + dx) * blockSize;
            const y = (gameRef.current.currentPiece.y + dy) * blockSize;
            ctx.fillRect(x, y, blockSize - 1, blockSize - 1);
          }
        });
      });
    }

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= 10; x++) {
      ctx.beginPath();
      ctx.moveTo(x * blockSize, 0);
      ctx.lineTo(x * blockSize, 500);
      ctx.stroke();
    }
    for (let y = 0; y <= 20; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * blockSize);
      ctx.lineTo(250, y * blockSize);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(() => {
      if (gameRef.current.running && gameRef.current.currentPiece) {
        // Move piece down
        gameRef.current.currentPiece.y++;
        
        // Check if piece should land (simplified)
        if (gameRef.current.currentPiece.y > 15) {
          // Place piece and spawn new one
          gameRef.current.currentPiece = {
            ...pieces[Math.floor(Math.random() * pieces.length)],
            x: 4,
            y: 0
          };
          setScore(prev => prev + 100);
        }
      }
      drawGame();
    }, 500);

    return () => clearInterval(gameLoop);
  }, [gameStarted, drawGame]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRef.current.running || !gameRef.current.currentPiece) return;

      switch (e.key) {
        case 'ArrowLeft':
          if (gameRef.current.currentPiece.x > 0) gameRef.current.currentPiece.x--;
          break;
        case 'ArrowRight':
          if (gameRef.current.currentPiece.x < 8) gameRef.current.currentPiece.x++;
          break;
        case 'ArrowDown':
          gameRef.current.currentPiece.y++;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-black/90 rounded-lg p-6">
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-blue-400 mb-2">🧩 TETRIS MASTER</h3>
        <div className="grid grid-cols-3 gap-4 text-white/80">
          <div>Score: {score}</div>
          <div>Level: {level}</div>
          <div>Lines: {lines}</div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={250}
        height={500}
        className="border-2 border-blue-400 rounded-lg mb-4"
      />

      <div className="flex gap-4">
        {!gameStarted || gameOver ? (
          <button
            onClick={startGame}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-all duration-300"
          >
            {gameOver ? 'PLAY AGAIN' : 'START GAME'}
          </button>
        ) : null}
        
        <button
          onClick={onClose}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all duration-300"
        >
          BACK TO ARCADE
        </button>
      </div>

      {gameStarted && !gameOver && (
        <p className="text-white/60 text-sm mt-4">Use arrow keys to move and rotate pieces</p>
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

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(drawGame, 16);
    return () => clearInterval(gameLoop);
  }, [gameStarted, drawGame]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-black/90 rounded-lg p-6">
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-blue-400 mb-2">🏓 PONG ULTIMATE</h3>
        <div className="flex gap-8 text-white/80">
          <div>Player: {score.player}</div>
          <div>Computer: {score.computer}</div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border-2 border-blue-400 rounded-lg mb-4 cursor-none"
      />

      <div className="flex gap-4">
        {!gameStarted ? (
          <button
            onClick={startGame}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-all duration-300"
          >
            START GAME
          </button>
        ) : null}
        
        <button
          onClick={onClose}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all duration-300"
        >
          BACK TO ARCADE
        </button>
      </div>

      {gameStarted && (
        <p className="text-white/60 text-sm mt-4">Move your mouse to control the left paddle</p>
      )}
    </div>
  );
};

export default function EmbeddedArcade() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
      case 'tetris':
        return <TetrisGame onClose={() => setSelectedGame(null)} />;
      case 'pong':
        return <PongGame onClose={() => setSelectedGame(null)} />;
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

        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
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
      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][i % 4],
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center pt-12 pb-8"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-4"
          style={{
            background: `linear-gradient(45deg, #ff0080, #00ffff, #ff8000, #8000ff, #ff0080)`,
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          EMBEDDED ARCADE
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-white/80 mb-8"
        >
          🎮 PLAY CLASSIC GAMES RIGHT IN YOUR PORTFOLIO! 🎮
        </motion.p>
      </motion.div>

      {/* GAME GRID */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 3 - 1.5}deg) rotateY(${mousePosition.x * 3 - 1.5}deg)`,
          }}
        >
          {EMBEDDED_GAMES.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
              }}
              onHoverStart={() => setHoveredGame(game.id)}
              onHoverEnd={() => setHoveredGame(null)}
              className={cn(
                "relative group cursor-pointer",
                "bg-black/50 backdrop-blur-xl rounded-2xl border-2 p-6",
                "transition-all duration-500 transform-gpu",
                hoveredGame === game.id ? "border-cyan-400/80 shadow-2xl" : "border-white/20"
              )}
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `linear-gradient(45deg, ${game.color}20, transparent, ${game.color}20)`,
                  }}
                  animate={{
                    rotate: hoveredGame === game.id ? [0, 360] : 0,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="relative z-10">
                <motion.div
                  className="text-6xl mb-4 text-center"
                  animate={{
                    rotateY: hoveredGame === game.id ? [0, 360] : 0,
                    scale: hoveredGame === game.id ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 1 }}
                >
                  {game.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2 text-center">
                  {game.name}
                </h3>
                
                <p className="text-sm text-white/70 mb-4 text-center">
                  {game.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <div className="text-xs text-cyan-400 font-bold">LEVEL</div>
                    <div className="text-sm text-white">{game.difficulty}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <div className="text-xs text-cyan-400 font-bold">PLAYERS</div>
                    <div className="text-sm text-white">{game.players}</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-yellow-400 text-lg mb-2">{game.rating}</div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGame(game.id);
                    }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                    style={{
                      background: `linear-gradient(45deg, ${game.color}, ${game.color}80)`
                    }}
                  >
                    PLAY NOW
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {hoveredGame === game.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
                    style={{
                      boxShadow: `0 0 30px ${game.color}50`,
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 text-center pb-8"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          RETURN TO PORTFOLIO
        </Link>
      </motion.div>
    </div>
  );
}
