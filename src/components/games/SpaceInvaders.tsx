"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SpaceInvadersProps {
  onBack: () => void;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 30;
const INVADER_WIDTH = 30;
const INVADER_HEIGHT = 20;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 10;

interface Position {
  x: number;
  y: number;
}

interface Bullet extends Position {
  id: number;
  direction: 'up' | 'down';
}

interface Invader extends Position {
  id: number;
  alive: boolean;
}

export default function SpaceInvaders({ onBack }: SpaceInvadersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const bulletIdRef = useRef(0);
  const invaderIdRef = useRef(0);
  
  const [player, setPlayer] = useState<Position>({ x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, y: GAME_HEIGHT - 60 });
  const [invaders, setInvaders] = useState<Invader[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameOver' | 'victory'>('waiting');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [invaderDirection, setInvaderDirection] = useState<'left' | 'right'>('right');
  const [lastShot, setLastShot] = useState(0);
  
  const keys = useRef({
    left: false,
    right: false,
    space: false,
  });

  const createInvaders = useCallback((levelNum: number) => {
    const newInvaders: Invader[] = [];
    const rows = Math.min(5 + Math.floor(levelNum / 2), 8);
    const cols = 10;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newInvaders.push({
          id: invaderIdRef.current++,
          x: col * (INVADER_WIDTH + 10) + 50,
          y: row * (INVADER_HEIGHT + 10) + 50,
          alive: true
        });
      }
    }
    
    return newInvaders;
  }, []);

  const startGame = useCallback(() => {
    setPlayer({ x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, y: GAME_HEIGHT - 60 });
    setInvaders(createInvaders(1));
    setBullets([]);
    setScore(0);
    setLives(3);
    setLevel(1);
    setInvaderDirection('right');
    setGameState('playing');
  }, [createInvaders]);

  const nextLevel = useCallback(() => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setInvaders(createInvaders(newLevel));
    setBullets([]);
    setInvaderDirection('right');
  }, [level, createInvaders]);

  // Handle input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'waiting' && e.code === 'Space') {
        startGame();
        return;
      }
      
      if (gameState === 'gameOver' && e.code === 'Space') {
        startGame();
        return;
      }

      if (gameState !== 'playing') return;

      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          keys.current.left = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          keys.current.right = true;
          break;
        case 'Space':
          e.preventDefault();
          keys.current.space = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          keys.current.left = false;
          break;
        case 'ArrowRight':
        case 'KeyD':
          keys.current.right = false;
          break;
        case 'Space':
          keys.current.space = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, startGame]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    gameLoopRef.current = setInterval(() => {
      // Move player
      setPlayer(prev => {
        let newX = prev.x;
        const speed = 5;
        
        if (keys.current.left && newX > 0) {
          newX -= speed;
        }
        if (keys.current.right && newX < GAME_WIDTH - PLAYER_WIDTH) {
          newX += speed;
        }
        
        return { ...prev, x: newX };
      });

      // Player shooting
      if (keys.current.space && Date.now() - lastShot > 200) {
        setBullets(prev => [...prev, {
          id: bulletIdRef.current++,
          x: player.x + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2,
          y: player.y,
          direction: 'up'
        }]);
        setLastShot(Date.now());
      }

      // Move bullets
      setBullets(prev => prev.map(bullet => ({
        ...bullet,
        y: bullet.direction === 'up' ? bullet.y - 8 : bullet.y + 6
      })).filter(bullet => bullet.y > 0 && bullet.y < GAME_HEIGHT));

      // Move invaders
      setInvaders(prev => {
        const speed = 1 + Math.floor(level / 2);
        let shouldDropDown = false;
        
        const moved = prev.map(invader => {
          if (!invader.alive) return invader;
          
          const newX = invaderDirection === 'right' 
            ? invader.x + speed 
            : invader.x - speed;
            
          if (newX <= 0 || newX >= GAME_WIDTH - INVADER_WIDTH) {
            shouldDropDown = true;
          }
          
          return { ...invader, x: newX };
        });

        if (shouldDropDown) {
          setInvaderDirection(prev => prev === 'right' ? 'left' : 'right');
          return moved.map(invader => ({
            ...invader,
            y: invader.y + 20
          }));
        }

        return moved;
      });

      // Invader shooting (random)
      if (Math.random() < 0.01 + level * 0.005) {
        const aliveInvaders = invaders.filter(inv => inv.alive);
        if (aliveInvaders.length > 0) {
          const shooter = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];
          setBullets(prev => [...prev, {
            id: bulletIdRef.current++,
            x: shooter.x + INVADER_WIDTH / 2 - BULLET_WIDTH / 2,
            y: shooter.y + INVADER_HEIGHT,
            direction: 'down'
          }]);
        }
      }

      // Check bullet-invader collisions
      setBullets(prevBullets => {
        let newBullets = [...prevBullets];
        
        setInvaders(prevInvaders => {
          return prevInvaders.map(invader => {
            if (!invader.alive) return invader;
            
            const hit = newBullets.find(bullet => 
              bullet.direction === 'up' &&
              bullet.x < invader.x + INVADER_WIDTH &&
              bullet.x + BULLET_WIDTH > invader.x &&
              bullet.y < invader.y + INVADER_HEIGHT &&
              bullet.y + BULLET_HEIGHT > invader.y
            );
            
            if (hit) {
              newBullets = newBullets.filter(b => b.id !== hit.id);
              setScore(prev => prev + 10 * level);
              return { ...invader, alive: false };
            }
            
            return invader;
          });
        });
        
        return newBullets;
      });

      // Check bullet-player collisions
      setBullets(prevBullets => {
        const hit = prevBullets.find(bullet => 
          bullet.direction === 'down' &&
          bullet.x < player.x + PLAYER_WIDTH &&
          bullet.x + BULLET_WIDTH > player.x &&
          bullet.y < player.y + PLAYER_HEIGHT &&
          bullet.y + BULLET_HEIGHT > player.y
        );
        
        if (hit) {
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameState('gameOver');
            }
            return newLives;
          });
          return prevBullets.filter(b => b.id !== hit.id);
        }
        
        return prevBullets;
      });

      // Check if all invaders are dead
      const aliveInvaders = invaders.filter(inv => inv.alive);
      if (aliveInvaders.length === 0) {
        nextLevel();
      }

      // Check if invaders reached bottom
      const bottomInvader = invaders.find(inv => inv.alive && inv.y > GAME_HEIGHT - 100);
      if (bottomInvader) {
        setGameState('gameOver');
      }
    }, 16);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, player, invaders, lastShot, level, invaderDirection, nextLevel]);

  // Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear screen with space background
    const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    gradient.addColorStop(0, '#000011');
    gradient.addColorStop(1, '#000033');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 100; i++) {
      const x = (i * 123) % GAME_WIDTH;
      const y = (i * 456) % GAME_HEIGHT;
      ctx.fillRect(x, y, 1, 1);
    }

    if (gameState === 'playing') {
      // Draw player
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
      
      // Player cannon
      ctx.fillStyle = '#00cc00';
      ctx.fillRect(player.x + PLAYER_WIDTH/2 - 3, player.y - 5, 6, 10);

      // Draw invaders
      invaders.forEach(invader => {
        if (invader.alive) {
          ctx.fillStyle = '#ff00ff';
          ctx.fillRect(invader.x, invader.y, INVADER_WIDTH, INVADER_HEIGHT);
          
          // Invader eyes
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(invader.x + 5, invader.y + 5, 4, 4);
          ctx.fillRect(invader.x + 21, invader.y + 5, 4, 4);
        }
      });

      // Draw bullets
      bullets.forEach(bullet => {
        ctx.fillStyle = bullet.direction === 'up' ? '#ffff00' : '#ff0000';
        ctx.fillRect(bullet.x, bullet.y, BULLET_WIDTH, BULLET_HEIGHT);
      });
    }
  }, [player, invaders, bullets, gameState]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="border-4 border-purple-500 rounded-lg shadow-2xl shadow-purple-500/30"
        />

        {/* HUD */}
        {gameState === 'playing' && (
          <div className="absolute top-4 left-4 text-white font-mono">
            <div className="bg-black/80 px-4 py-2 rounded space-y-1">
              <div className="text-yellow-400">Score: {score}</div>
              <div className="text-green-400">Lives: {lives}</div>
              <div className="text-purple-400">Level: {level}</div>
              <div className="text-blue-400">Invaders: {invaders.filter(i => i.alive).length}</div>
            </div>
          </div>
        )}

        {/* Game States */}
        {gameState === 'waiting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <div className="text-center text-white font-mono">
              <h2 className="text-4xl font-bold mb-4 text-purple-400">👾 SPACE INVADERS</h2>
              <p className="text-lg mb-6">Defend Earth from alien invasion!</p>
              <p className="text-sm text-gray-300 mb-2">Arrow keys or A/D to move</p>
              <p className="text-sm text-gray-300">SPACE to shoot</p>
              <p className="text-yellow-400 mt-4">Press SPACE to start</p>
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
              <h2 className="text-4xl font-bold mb-4 text-red-400">👽 EARTH INVADED</h2>
              <p className="text-2xl mb-2">Final Score: {score}</p>
              <p className="text-lg mb-6">Level Reached: {level}</p>
              <p className="text-sm mb-4">Press SPACE to defend again</p>
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
        <p>🎮 Arrow Keys or A/D to move • SPACE to shoot • Destroy all aliens to advance!</p>
      </div>
    </div>
  );
}
