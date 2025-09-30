"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface DoomCloneProps {
  onBack: () => void;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const MAP_SIZE = 16;
const FOV = Math.PI / 3; // 60 degrees
const HALF_FOV = FOV / 2;
const NUM_RAYS = GAME_WIDTH;
const MAX_DEPTH = 16;
const DELTA_ANGLE = FOV / NUM_RAYS;

// Enhanced map with different wall types
const MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,2,2,0,0,0,0,0,0,0,0,2,2,0,1],
  [1,0,2,0,0,0,0,3,3,0,0,0,0,2,0,1],
  [1,0,0,0,0,0,0,3,3,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,2,2,2,0,0,2,2,2,0,0,0,1],
  [1,0,0,0,2,0,0,0,0,0,0,2,0,0,0,1],
  [1,0,0,0,2,0,0,0,0,0,0,2,0,0,0,1],
  [1,0,0,0,2,2,2,0,0,2,2,2,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,3,3,0,0,0,0,0,0,1],
  [1,0,2,0,0,0,0,3,3,0,0,0,0,2,0,1],
  [1,0,2,2,0,0,0,0,0,0,0,0,2,2,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

interface Player {
  x: number;
  y: number;
  angle: number;
}

interface Enemy {
  x: number;
  y: number;
  health: number;
  lastHit: number;
  sprite: number;
}

interface AudioManager {
  shootSound: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  footstepSound: HTMLAudioElement | null;
  bgMusic: HTMLAudioElement | null;
}

export default function DoomClone({ onBack }: DoomCloneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const mouseSensitivity = 0.003;
  const audioRef = useRef<AudioManager>({
    shootSound: null,
    hitSound: null,
    footstepSound: null,
    bgMusic: null
  });
  
  const [player, setPlayer] = useState<Player>({ x: 2, y: 2, angle: 0 });
  const [enemies, setEnemies] = useState<Enemy[]>([
    { x: 8, y: 8, health: 100, lastHit: 0, sprite: 0 },
    { x: 12, y: 4, health: 100, lastHit: 0, sprite: 1 },
    { x: 6, y: 12, health: 100, lastHit: 0, sprite: 0 },
  ]);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameOver' | 'victory'>('waiting');
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [ammo, setAmmo] = useState(30);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  
  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  // Initialize audio
  useEffect(() => {
    // Create synthetic sounds using Web Audio API
    const createBeepSound = (frequency: number, duration: number, type: OscillatorType = 'square') => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
      
      return oscillator;
    };

    audioRef.current = {
      shootSound: null,
      hitSound: null,
      footstepSound: null,
      bgMusic: null
    };
  }, []);

  const playSound = (type: 'shoot' | 'hit' | 'footstep') => {
    try {
      switch (type) {
        case 'shoot':
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = 150;
          oscillator.type = 'sawtooth';
          
          gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
        case 'hit':
          const hitContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const hitOsc = hitContext.createOscillator();
          const hitGain = hitContext.createGain();
          
          hitOsc.connect(hitGain);
          hitGain.connect(hitContext.destination);
          
          hitOsc.frequency.value = 100;
          hitOsc.type = 'square';
          
          hitGain.gain.setValueAtTime(0.3, hitContext.currentTime);
          hitGain.gain.exponentialRampToValueAtTime(0.01, hitContext.currentTime + 0.2);
          
          hitOsc.start(hitContext.currentTime);
          hitOsc.stop(hitContext.currentTime + 0.2);
          break;
        case 'footstep':
          const stepContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const stepOsc = stepContext.createOscillator();
          const stepGain = stepContext.createGain();
          
          stepOsc.connect(stepGain);
          stepGain.connect(stepContext.destination);
          
          stepOsc.frequency.value = 80;
          stepOsc.type = 'sine';
          
          stepGain.gain.setValueAtTime(0.1, stepContext.currentTime);
          stepGain.gain.exponentialRampToValueAtTime(0.01, stepContext.currentTime + 0.1);
          
          stepOsc.start(stepContext.currentTime);
          stepOsc.stop(stepContext.currentTime + 0.1);
          break;
      }
    } catch (error) {
      console.log('Audio not available');
    }
  };

  const startGame = useCallback(() => {
    setPlayer({ x: 2, y: 2, angle: 0 });
    setEnemies([
      { x: 8, y: 8, health: 100, lastHit: 0, sprite: 0 },
      { x: 12, y: 4, health: 100, lastHit: 0, sprite: 1 },
      { x: 6, y: 12, health: 100, lastHit: 0, sprite: 0 },
    ]);
    setScore(0);
    setHealth(100);
    setAmmo(30);
    setGameState('playing');
  }, []);

  // Handle keyboard input
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

      switch (e.code.toLowerCase()) {
        case 'keyw':
          keys.current.w = true;
          break;
        case 'keya':
          keys.current.a = true;
          break;
        case 'keys':
          keys.current.s = true;
          break;
        case 'keyd':
          keys.current.d = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code.toLowerCase()) {
        case 'keyw':
          keys.current.w = false;
          break;
        case 'keya':
          keys.current.a = false;
          break;
        case 'keys':
          keys.current.s = false;
          break;
        case 'keyd':
          keys.current.d = false;
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

  // Handle pointer lock
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement === canvas);
    };

    const handleClick = () => {
      if (gameState === 'playing' && !isPointerLocked) {
        canvas.requestPointerLock();
      }
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    canvas.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      canvas.removeEventListener('click', handleClick);
    };
  }, [gameState, isPointerLocked]);

  // Handle mouse movement
  useEffect(() => {
    if (gameState !== 'playing' || !isPointerLocked) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPlayer(prev => ({
        ...prev,
        angle: prev.angle + e.movementX * mouseSensitivity
      }));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [gameState, isPointerLocked]);

  // Handle shooting
  useEffect(() => {
    const handleClick = () => {
      if (gameState !== 'playing' || ammo <= 0 || !isPointerLocked) return;

      setAmmo(prev => prev - 1);
      playSound('shoot');
      
      // Simple shooting - check if looking at enemy
      const shootAngle = player.angle;
      const shootX = player.x + Math.cos(shootAngle) * 0.5;
      const shootY = player.y + Math.sin(shootAngle) * 0.5;

      setEnemies(prev => prev.map(enemy => {
        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angleToEnemy = Math.atan2(dy, dx);
        const angleDiff = Math.abs(shootAngle - angleToEnemy);
        
        if (distance < 5 && angleDiff < 0.3) {
          const newHealth = enemy.health - 50;
          playSound('hit');
          if (newHealth <= 0) {
            setScore(prev => prev + 100);
          }
          return { ...enemy, health: newHealth, lastHit: Date.now() };
        }
        return enemy;
      }));
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', handleClick);
      return () => canvas.removeEventListener('click', handleClick);
    }
  }, [gameState, ammo, player, isPointerLocked]);

  // Raycasting function
  const castRays = useCallback((playerX: number, playerY: number, playerAngle: number) => {
    const rays = [];
    
    for (let i = 0; i < NUM_RAYS; i++) {
      const currentAngle = playerAngle - HALF_FOV + i * DELTA_ANGLE;
      
      let distance = 0;
      let hit = 0;
      
      const rayX = Math.cos(currentAngle);
      const rayY = Math.sin(currentAngle);
      
      while (distance < MAX_DEPTH && hit === 0) {
        distance += 0.05;
        
        const testX = playerX + rayX * distance;
        const testY = playerY + rayY * distance;
        
        const mapX = Math.floor(testX);
        const mapY = Math.floor(testY);
        
        if (mapX < 0 || mapX >= MAP_SIZE || mapY < 0 || mapY >= MAP_SIZE) {
          hit = 1;
        } else {
          hit = MAP[mapY][mapX];
        }
      }
      
      // Fix fisheye effect
      distance *= Math.cos(currentAngle - playerAngle);
      
      rays.push({ distance, hit, angle: currentAngle });
    }
    
    return rays;
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      // Move player
      setPlayer(prev => {
        let newX = prev.x;
        let newY = prev.y;
        const speed = 0.05;
        let moved = false;

        if (keys.current.w) {
          newX += Math.cos(prev.angle) * speed;
          newY += Math.sin(prev.angle) * speed;
          moved = true;
        }
        if (keys.current.s) {
          newX -= Math.cos(prev.angle) * speed;
          newY -= Math.sin(prev.angle) * speed;
          moved = true;
        }
        if (keys.current.a) {
          newX += Math.cos(prev.angle - Math.PI/2) * speed;
          newY += Math.sin(prev.angle - Math.PI/2) * speed;
          moved = true;
        }
        if (keys.current.d) {
          newX += Math.cos(prev.angle + Math.PI/2) * speed;
          newY += Math.sin(prev.angle + Math.PI/2) * speed;
          moved = true;
        }

        // Play footstep sound occasionally
        if (moved && Math.random() < 0.1) {
          playSound('footstep');
        }

        // Check wall collision
        const mapX = Math.floor(newX);
        const mapY = Math.floor(newY);
        
        if (mapX >= 0 && mapX < MAP_SIZE && mapY >= 0 && mapY < MAP_SIZE && MAP[mapY][mapX] === 0) {
          return { ...prev, x: newX, y: newY };
        }
        
        return prev;
      });

      // Check if all enemies are dead
      setEnemies(prev => {
        const alive = prev.filter(e => e.health > 0);
        if (alive.length === 0) {
          setGameState('victory');
        }
        return prev;
      });

      // Check if player is dead
      if (health <= 0) {
        setGameState('gameOver');
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, health]);

  // Render 3D view
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear screen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    if (gameState === 'playing') {
      const rays = castRays(player.x, player.y, player.angle);
      
      // Draw walls
      for (let i = 0; i < rays.length; i++) {
        const ray = rays[i];
        const wallHeight = GAME_HEIGHT / ray.distance;
        const wallTop = (GAME_HEIGHT - wallHeight) / 2;
        
        // Wall color based on type and distance
        let color = '#666';
        switch (ray.hit) {
          case 1:
            color = `rgb(${Math.floor(100 / ray.distance * 8)}, ${Math.floor(100 / ray.distance * 8)}, ${Math.floor(100 / ray.distance * 8)})`;
            break;
          case 2:
            color = `rgb(${Math.floor(150 / ray.distance * 8)}, ${Math.floor(50 / ray.distance * 8)}, ${Math.floor(50 / ray.distance * 8)})`;
            break;
          case 3:
            color = `rgb(${Math.floor(50 / ray.distance * 8)}, ${Math.floor(150 / ray.distance * 8)}, ${Math.floor(50 / ray.distance * 8)})`;
            break;
        }
        
        ctx.fillStyle = color;
        ctx.fillRect(i, wallTop, 1, wallHeight);
      }
      
      // Draw floor and ceiling
      for (let y = GAME_HEIGHT / 2; y < GAME_HEIGHT; y++) {
        const distance = GAME_HEIGHT / (2 * y - GAME_HEIGHT);
        const intensity = Math.max(0, 1 - distance / 8);
        
        ctx.fillStyle = `rgb(${Math.floor(40 * intensity)}, ${Math.floor(20 * intensity)}, ${Math.floor(10 * intensity)})`;
        ctx.fillRect(0, y, GAME_WIDTH, 1);
        
        // Ceiling
        ctx.fillStyle = `rgb(${Math.floor(20 * intensity)}, ${Math.floor(20 * intensity)}, ${Math.floor(40 * intensity)})`;
        ctx.fillRect(0, GAME_HEIGHT - y, GAME_WIDTH, 1);
      }

      // Draw enemies as sprites
      enemies.forEach(enemy => {
        if (enemy.health > 0) {
          const dx = enemy.x - player.x;
          const dy = enemy.y - player.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angleToEnemy = Math.atan2(dy, dx);
          const relativeAngle = angleToEnemy - player.angle;
          
          // Normalize angle
          let normalizedAngle = relativeAngle;
          while (normalizedAngle > Math.PI) normalizedAngle -= 2 * Math.PI;
          while (normalizedAngle < -Math.PI) normalizedAngle += 2 * Math.PI;
          
          if (Math.abs(normalizedAngle) < HALF_FOV && distance < 10) {
            const screenX = (normalizedAngle / HALF_FOV) * (GAME_WIDTH / 2) + GAME_WIDTH / 2;
            const spriteHeight = GAME_HEIGHT / distance;
            const spriteWidth = spriteHeight * 0.8;
            
            const isHit = Date.now() - enemy.lastHit < 200;
            ctx.fillStyle = isHit ? '#ff8888' : '#ff0000';
            ctx.fillRect(
              screenX - spriteWidth / 2,
              (GAME_HEIGHT - spriteHeight) / 2,
              spriteWidth,
              spriteHeight
            );
            
            // Enemy "face"
            ctx.fillStyle = isHit ? '#ffffff' : '#ffff00';
            ctx.fillRect(
              screenX - spriteWidth / 4,
              (GAME_HEIGHT - spriteHeight) / 2 + spriteHeight * 0.2,
              spriteWidth / 8,
              spriteHeight * 0.1
            );
            ctx.fillRect(
              screenX + spriteWidth / 8,
              (GAME_HEIGHT - spriteHeight) / 2 + spriteHeight * 0.2,
              spriteWidth / 8,
              spriteHeight * 0.1
            );
          }
        }
      });

      // Draw weapon
      ctx.fillStyle = '#444';
      ctx.fillRect(GAME_WIDTH - 120, GAME_HEIGHT - 100, 100, 80);
      ctx.fillStyle = '#666';
      ctx.fillRect(GAME_WIDTH - 110, GAME_HEIGHT - 90, 80, 60);
      ctx.fillStyle = '#888';
      ctx.fillRect(GAME_WIDTH - 100, GAME_HEIGHT - 80, 60, 40);
    }
  }, [player, enemies, gameState, castRays]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative">
      {/* Game Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="border-4 border-red-500 rounded-lg shadow-2xl shadow-red-500/30 cursor-crosshair"
        />

        {/* HUD */}
        {gameState === 'playing' && (
          <div className="absolute top-4 left-4 text-white font-mono">
            <div className="bg-black/80 px-4 py-2 rounded space-y-1">
              <div className="text-red-400">Health: {health}/100</div>
              <div className="text-yellow-400">Ammo: {ammo}</div>
              <div className="text-green-400">Score: {score}</div>
              <div className="text-blue-400">Enemies: {enemies.filter(e => e.health > 0).length}</div>
              {!isPointerLocked && (
                <div className="text-orange-400 text-xs">Click to lock mouse</div>
              )}
            </div>
          </div>
        )}

        {/* Crosshair */}
        {gameState === 'playing' && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-6 h-0.5 bg-red-500"></div>
            <div className="w-0.5 h-6 bg-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        )}

        {/* Game states */}
        {gameState === 'waiting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <div className="text-center text-white font-mono">
              <h2 className="text-4xl font-bold mb-4 text-red-400">👹 DOOM CLONE</h2>
              <p className="text-lg mb-6">Real 3D raycasting with sound effects!</p>
              <p className="text-sm text-gray-300 mb-2">WASD to move, Mouse to look, Click to shoot</p>
              <p className="text-sm text-gray-300 mb-2">Eliminate all red demons</p>
              <p className="text-sm text-yellow-400">Enhanced with real-time raycasting!</p>
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
              <h2 className="text-4xl font-bold mb-4 text-red-400">💀 YOU DIED</h2>
              <p className="text-2xl mb-6">Score: {score}</p>
              <p className="text-sm mb-4">Press SPACE to try again</p>
            </div>
          </motion.div>
        )}

        {gameState === 'victory' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center"
          >
            <div className="text-center text-white font-mono bg-green-900/80 p-8 rounded-lg border-2 border-green-500">
              <h2 className="text-4xl font-bold mb-4 text-green-400">🎉 VICTORY!</h2>
              <p className="text-2xl mb-2">All demons eliminated!</p>
              <p className="text-lg mb-6">Final Score: {score}</p>
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
        <p>🎮 WASD to move • Mouse to look around • Click to shoot • Real 3D raycasting!</p>
      </div>
    </div>
  );
}
