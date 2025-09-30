'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// 🎮 REVOLUTIONARY ARCADE UNIVERSE - NEVER SEEN BEFORE! 🎮
const LEGENDARY_GAMES = [
  {
    id: 'tetris-ultimate',
    name: 'TETRIS ULTIMATE',
    icon: '🧩',
    description: 'The legendary block-stacking masterpiece that defined gaming',
    url: 'https://tetris.com/play-tetris',
    difficulty: 'LEGENDARY',
    players: '1 HERO',
    category: 'PUZZLE MASTER',
    year: '1984',
    rating: '★★★★★',
    color: '#FF1744',
    glow: 'shadow-red-500/50',
    energy: 95
  },
  {
    id: 'pacman-champion',
    name: 'PAC-MAN CHAMPION',
    icon: '👻',
    description: 'The iconic maze-running legend that conquered the world',
    url: 'https://www.google.com/search?q=pacman',
    difficulty: 'CLASSIC',
    players: '1 HERO', 
    category: 'ARCADE KING',
    year: '1980',
    rating: '★★★★★',
    color: '#FFD600',
    glow: 'shadow-yellow-500/50',
    energy: 100
  },
  {
    id: 'galaga-infinity',
    name: 'GALAGA INFINITY',
    icon: '🛸',
    description: 'Epic space warfare with formation attacks and alien intelligence',
    url: 'https://www.retrogames.cc/arcade-games/galaga.html',
    difficulty: 'EXTREME',
    players: '1-2 WARRIORS',
    category: 'SPACE COMBAT',
    year: '1981',
    rating: '★★★★★',
    color: '#00E676',
    glow: 'shadow-green-500/50',
    energy: 90
  },
  {
    id: 'asteroids-revolution',
    name: 'ASTEROIDS REVOLUTION',
    icon: '🚀',
    description: 'Physics-based space combat in zero gravity chaos',
    url: 'https://freeasteroids.org/',
    difficulty: 'INSANE',
    players: '1 PILOT',
    category: 'SPACE SHOOTER',
    year: '1979',
    rating: '★★★★★',
    color: '#2196F3',
    glow: 'shadow-blue-500/50',
    energy: 85
  },
  {
    id: 'streetfighter-legends',
    name: 'STREET FIGHTER LEGENDS',
    icon: '🥊',
    description: 'Ultimate fighting with legendary special moves and combos',
    url: 'https://www.retrogames.cc/arcade-games/street-fighter.html',
    difficulty: 'GODLIKE',
    players: '1-2 FIGHTERS',
    category: 'COMBAT MASTER',
    year: '1987',
    rating: '★★★★★',
    color: '#E91E63',
    glow: 'shadow-pink-500/50',
    energy: 98
  },
  {
    id: 'donkeykong-empire',
    name: 'DONKEY KONG EMPIRE',
    icon: '🦍',
    description: 'Legendary platformer that created the jump-and-run genre',
    url: 'https://www.retrogames.cc/arcade-games/donkey-kong.html',
    difficulty: 'CLASSIC',
    players: '1 HERO',
    category: 'PLATFORM LEGEND',
    year: '1981',
    rating: '★★★★★',
    color: '#FF9800',
    glow: 'shadow-orange-500/50',
    energy: 88
  },
  {
    id: 'spaceinvaders-genesis',
    name: 'SPACE INVADERS GENESIS',
    icon: '👾',
    description: 'The genesis of arcade gaming - where it all began',
    url: 'https://www.retrogames.cc/arcade-games/space-invaders.html',
    difficulty: 'FOUNDATIONAL',
    players: '1-2 DEFENDERS',
    category: 'ARCADE GENESIS',
    year: '1978',
    rating: '★★★★★',
    color: '#9C27B0',
    glow: 'shadow-purple-500/50',
    energy: 92
  },
  {
    id: 'frogger-odyssey',
    name: 'FROGGER ODYSSEY',
    icon: '🐸',
    description: 'Cross dimensions of traffic and rivers in this timing odyssey',
    url: 'https://www.retrogames.cc/arcade-games/frogger.html',
    difficulty: 'PRECISION',
    players: '1 NAVIGATOR',
    category: 'TIMING MASTER',
    year: '1981',
    rating: '★★★★★',
    color: '#4CAF50',
    glow: 'shadow-green-400/50',
    energy: 87
  }
];

export default function UltimateArcadeUniverse() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [arcadeMode, setArcadeMode] = useState<'neon' | 'hologram' | 'cosmic'>('neon');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [energyField, setEnergyField] = useState(100);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Revolutionary Loading Effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Revolutionary Mouse Tracking for 3D Environment
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

  // Dynamic Energy Field Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyField(prev => {
        const newEnergy = prev + (Math.random() - 0.5) * 10;
        return Math.max(80, Math.min(100, newEnergy));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const playGame = (game: typeof LEGENDARY_GAMES[0]) => {
    window.open(game.url, '_blank');
  };

  // Revolutionary Loading Screen
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-8xl mb-8"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎮
          </motion.div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            ULTIMATE ARCADE
          </h1>
          
          <div className="flex justify-center items-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-cyan-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (selectedGame) {
    const game = LEGENDARY_GAMES.find(g => g.id === selectedGame);
    if (!game) return null;

    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* COSMIC GAME PORTAL */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-black to-blue-900/30"></div>
          
          {/* Animated Energy Rings */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-400/20 rounded-full"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full rounded-3xl border-2 border-cyan-400/50 bg-black/80 backdrop-blur-xl p-8"
          >
            <div className="text-center mb-8">
              <motion.div
                className="text-8xl mb-4"
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
              >
                {game.icon}
              </motion.div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent mb-4">
                {game.name}
              </h1>
              
              <p className="text-xl text-white/80 mb-6">
                {game.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-3 border border-cyan-400/30">
                  <div className="text-cyan-400 font-bold">DIFFICULTY</div>
                  <div className="text-white">{game.difficulty}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 border border-cyan-400/30">
                  <div className="text-cyan-400 font-bold">PLAYERS</div>
                  <div className="text-white">{game.players}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 border border-cyan-400/30">
                  <div className="text-cyan-400 font-bold">CATEGORY</div>
                  <div className="text-white">{game.category}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 border border-cyan-400/30">
                  <div className="text-cyan-400 font-bold">RATING</div>
                  <div className="text-yellow-400">{game.rating}</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => playGame(game)}
                  className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  🚀 LAUNCH GAME
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedGame(null)}
                  className="px-8 py-4 rounded-xl font-bold text-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300"
                >
                  ← BACK TO ARCADE
                </motion.button>
              </div>
            </div>
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
      {/* REVOLUTIONARY FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
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

      {/* REVOLUTIONARY HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center pt-12 pb-8"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-4"
          style={{
            background: `linear-gradient(45deg, 
              #ff0080, #00ffff, #ff8000, #8000ff, #ff0080)`,
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
          ULTIMATE ARCADE
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-white/80 mb-8"
        >
          🎮 LEGENDARY GAMES THAT CHANGED EVERYTHING 🎮
        </motion.p>

        {/* REVOLUTIONARY MODE SELECTOR */}
        <div className="flex justify-center gap-4 mb-8">
          {(['neon', 'hologram', 'cosmic'] as const).map((mode) => (
            <motion.button
              key={mode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setArcadeMode(mode)}
              className={cn(
                "px-6 py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300",
                arcadeMode === mode
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              )}
            >
              {mode === 'neon' && '🌈'} 
              {mode === 'hologram' && '🔮'}
              {mode === 'cosmic' && '🌌'}
              {mode}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* REVOLUTIONARY GAME GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 5 - 2.5}deg) rotateY(${mousePosition.x * 5 - 2.5}deg)`,
          }}
        >
          {LEGENDARY_GAMES.map((game, index) => (
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
                hoveredGame === game.id ? "border-cyan-400/80 shadow-2xl" : "border-white/20",
                arcadeMode === 'neon' && "hover:shadow-neon",
                arcadeMode === 'hologram' && "hover:shadow-hologram", 
                arcadeMode === 'cosmic' && "hover:shadow-cosmic"
              )}
              onClick={() => setSelectedGame(game.id)}
            >
              {/* REVOLUTIONARY GAME CARD BACKGROUND */}
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
                {/* REVOLUTIONARY GAME ICON */}
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

                {/* REVOLUTIONARY GAME INFO */}
                <h3 className="text-xl font-bold text-white mb-2 text-center">
                  {game.name}
                </h3>
                
                <p className="text-sm text-white/70 mb-4 text-center">
                  {game.description}
                </p>

                {/* REVOLUTIONARY STATS */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <div className="text-xs text-cyan-400 font-bold">LEVEL</div>
                    <div className="text-sm text-white">{game.difficulty}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <div className="text-xs text-cyan-400 font-bold">ERA</div>
                    <div className="text-sm text-white">{game.year}</div>
                  </div>
                </div>

                {/* REVOLUTIONARY ENERGY BAR */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>ENERGY</span>
                    <span>{game.energy}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      initial={{ width: '0%' }}
                      animate={{ width: `${game.energy}%` }}
                      transition={{ delay: index * 0.1, duration: 1 }}
                    />
                  </div>
                </div>

                {/* REVOLUTIONARY RATING */}
                <div className="text-center">
                  <div className="text-yellow-400 text-lg mb-2">{game.rating}</div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      playGame(game);
                    }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    PLAY NOW
                  </motion.button>
                </div>
              </div>

              {/* REVOLUTIONARY HOVER EFFECTS */}
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

      {/* REVOLUTIONARY LEADERBOARD */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="relative z-10 max-w-4xl mx-auto px-4 mb-16"
      >
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl border-2 border-white/20 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🏆 HALL OF LEGENDS 🏆
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LEGENDARY_GAMES.slice(0, 4).map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{game.icon}</div>
                <div className="text-cyan-400 font-bold text-sm">{game.name}</div>
                <div className="text-yellow-400 font-bold">
                  {10000 - index * 1000}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* REVOLUTIONARY FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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

      {/* REVOLUTIONARY CSS STYLES */}
      <style jsx>{`
        .shadow-neon {
          box-shadow: 0 0 30px #00ffff50, 0 0 60px #00ffff20;
        }
        .shadow-hologram {
          box-shadow: 0 0 30px #ff00ff50, 0 0 60px #ff00ff20;
        }
        .shadow-cosmic {
          box-shadow: 0 0 30px #ffff0050, 0 0 60px #ffff0020;
        }
      `}</style>
    </div>
  );
}
