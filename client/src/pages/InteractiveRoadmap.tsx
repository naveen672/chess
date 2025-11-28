import { useState, useEffect } from 'react';
import { Crown, Play, Puzzle, BookOpen, Target, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';
import { Island } from '../types';
import { Footer } from '@/components/Footer';
import ChessGuidanceSystem from '../components/ChessGuidanceSystem';
import GuestProgressBanner from '../components/GuestProgressBanner';

export default function InteractiveRoadmap() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);

  const islands: Island[] = [
    // Beginner Islands
    { id: 'beginner-main', name: 'Chess Basics Island', level: 'beginner', type: 'main', position: { x: 20, y: 70 }, unlocked: true, completed: false, icon: '🏝️', description: 'Learn the fundamental rules and piece movements' },
    { id: 'beginner-video', name: 'Tutorial Cove', level: 'beginner', type: 'video', position: { x: 15, y: 85 }, unlocked: true, completed: false, icon: '📹', description: 'Watch instructional videos' },
    { id: 'beginner-puzzle', name: 'Puzzle Harbor', level: 'beginner', type: 'puzzle', position: { x: 30, y: 85 }, unlocked: true, completed: false, icon: '🧩', description: 'Solve basic chess puzzles' },
    { id: 'beginner-game', name: 'Practice Bay', level: 'beginner', type: 'game', position: { x: 25, y: 60 }, unlocked: true, completed: false, icon: '⚔️', description: 'Play guided practice games' },
    { id: 'beginner-assessment', name: 'Skills Lighthouse', level: 'beginner', type: 'assessment', position: { x: 35, y: 75 }, unlocked: false, completed: false, icon: '🗼', description: 'Test your beginner skills' },
    
    // Intermediate Islands
    { id: 'intermediate-main', name: 'Strategy Summit', level: 'intermediate', type: 'main', position: { x: 50, y: 50 }, unlocked: false, completed: false, icon: '⛰️', description: 'Master intermediate chess strategies' },
    { id: 'intermediate-video', name: 'Tactics Theater', level: 'intermediate', type: 'video', position: { x: 45, y: 65 }, unlocked: false, completed: false, icon: '🎭', description: 'Advanced tactical training videos' },
    { id: 'intermediate-puzzle', name: 'Challenge Cliffs', level: 'intermediate', type: 'puzzle', position: { x: 60, y: 65 }, unlocked: false, completed: false, icon: '🏔️', description: 'Complex puzzle challenges' },
    { id: 'intermediate-game', name: 'Tournament Grounds', level: 'intermediate', type: 'game', position: { x: 55, y: 40 }, unlocked: false, completed: false, icon: '🏟️', description: 'Competitive game practice' },
    { id: 'intermediate-assessment', name: 'Mastery Tower', level: 'intermediate', type: 'assessment', position: { x: 65, y: 55 }, unlocked: false, completed: false, icon: '🗼', description: 'Intermediate skill evaluation' },
    
    // Advanced Islands
    { id: 'advanced-main', name: 'Grandmaster Peak', level: 'advanced', type: 'main', position: { x: 80, y: 30 }, unlocked: false, completed: false, icon: '🏔️', description: 'Achieve chess mastery' },
    { id: 'advanced-video', name: 'Masters Academy', level: 'advanced', type: 'video', position: { x: 75, y: 45 }, unlocked: false, completed: false, icon: '🎓', description: 'Learn from chess masters' },
    { id: 'advanced-puzzle', name: 'Enigma Peaks', level: 'advanced', type: 'puzzle', position: { x: 90, y: 45 }, unlocked: false, completed: false, icon: '❓', description: 'Master-level puzzles' },
    { id: 'advanced-game', name: 'Champions Arena', level: 'advanced', type: 'game', position: { x: 85, y: 20 }, unlocked: false, completed: false, icon: '👑', description: 'Elite competition matches' },
    { id: 'advanced-assessment', name: 'Crown Citadel', level: 'advanced', type: 'assessment', position: { x: 95, y: 35 }, unlocked: false, completed: false, icon: '🏰', description: 'Final mastery test' },
  ];

  const getIslandIcon = (island: Island) => {
    if (!island.unlocked) return <Lock className="w-8 h-8 text-gray-400" />;
    if (island.completed) return <CheckCircle className="w-8 h-8 text-green-500" />;
    
    switch (island.type) {
      case 'main': return <Crown className="w-8 h-8 text-yellow-400" />;
      case 'video': return <Play className="w-8 h-8 text-blue-400" />;
      case 'puzzle': return <Puzzle className="w-8 h-8 text-purple-400" />;
      case 'game': return <Target className="w-8 h-8 text-red-400" />;
      case 'assessment': return <BookOpen className="w-8 h-8 text-green-400" />;
      default: return <Crown className="w-8 h-8 text-yellow-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-blue-500';
      case 'advanced': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  // Show roadmap to everyone, but with different interactions based on auth status

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* Ocean Background Effect with Enhanced Chess Piece Animations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Floating Chess Pieces Background with Multiple Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-chess-float animation-delay-200">♔</div>
        <div className="absolute top-32 right-20 text-4xl opacity-15 animate-chess-drift animation-delay-400">♛</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-20 animate-chess-spin animation-delay-600">♜</div>
        <div className="absolute bottom-20 right-40 text-6xl opacity-15 animate-chess-bounce animation-delay-800">♞</div>
        <div className="absolute top-40 left-1/2 text-4xl opacity-20 animate-chess-glow">♗</div>
        <div className="absolute bottom-60 right-10 text-5xl opacity-15 animate-chess-float animation-delay-200">♙</div>
        <div className="absolute top-60 left-1/4 text-3xl opacity-10 animate-chess-drift animation-delay-400">♟</div>
        <div className="absolute top-80 right-1/3 text-4xl opacity-15 animate-chess-spin animation-delay-600">♚</div>
        <div className="absolute bottom-80 left-1/3 text-5xl opacity-10 animate-chess-bounce animation-delay-800">♝</div>
        <div className="absolute top-20 right-1/4 text-3xl opacity-15 animate-chess-glow animation-delay-200">♟</div>
        
        {/* Additional animated pawns scattered around */}
        <div className="absolute top-1/4 left-1/5 text-2xl opacity-10 animate-chess-float animation-delay-400">♟</div>
        <div className="absolute top-3/4 right-1/5 text-2xl opacity-10 animate-chess-drift animation-delay-600">♙</div>
        <div className="absolute bottom-1/4 left-3/4 text-2xl opacity-10 animate-chess-bounce animation-delay-800">♟</div>
        <div className="absolute top-1/2 right-1/6 text-2xl opacity-10 animate-chess-glow">♙</div>
        <div className="absolute bottom-1/3 left-1/6 text-2xl opacity-10 animate-chess-spin animation-delay-200">♟</div>
        <div className="absolute top-2/3 left-2/3 text-2xl opacity-10 animate-chess-float animation-delay-600">♙</div>
        <div className="absolute bottom-2/3 right-2/3 text-2xl opacity-10 animate-chess-drift animation-delay-800">♟</div>
        <div className="absolute top-1/3 left-5/6 text-2xl opacity-10 animate-chess-bounce">♟</div>
        <div className="absolute bottom-1/6 right-5/6 text-2xl opacity-10 animate-chess-glow animation-delay-400">♙</div>
      </div>

      {/* Guest Progress Banner */}
      {!isAuthenticated && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <GuestProgressBanner />
        </div>
      )}

      {/* Progress Header */}
      <div className="relative z-10 bg-black bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {isAuthenticated ? 'Your Chess Journey' : 'Chess Learning Roadmap'}
              </h1>
              <p className="text-blue-100">
                {isAuthenticated 
                  ? 'Navigate through the islands to master chess' 
                  : 'Explore our interactive learning path - sign in to track your progress'
                }
              </p>
            </div>
            {isAuthenticated ? (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex gap-4">
                  <div className="bg-green-500 bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 border border-green-400 border-opacity-30">
                    <div className="text-sm text-green-100">Beginner</div>
                    <div className="text-lg font-bold text-white">{Math.min(Math.floor((user?.completedLessons?.length || 0) * 10), 100)}%</div>
                  </div>
                  <div className="bg-blue-500 bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-400 border-opacity-30">
                    <div className="text-sm text-blue-100">Intermediate</div>
                    <div className="text-lg font-bold text-white">{user?.skillLevel === 'intermediate' ? Math.min(Math.floor((user?.completedLessons?.length || 0) * 5), 100) : '0'}%</div>
                  </div>
                  <div className="bg-purple-500 bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 border border-purple-400 border-opacity-30">
                    <div className="text-sm text-purple-100">Advanced</div>
                    <div className="text-lg font-bold text-white">{user?.skillLevel === 'advanced' ? Math.min(Math.floor((user?.completedLessons?.length || 0) * 3), 100) : '0'}%</div>
                  </div>
                </div>
                <button
                  onClick={() => setLocation('/chess')}
                  className="px-6 py-2 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300 transition-colors font-semibold flex items-center gap-2"
                >
                  <span className="text-lg">♔</span>
                  Play Chess
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => setLocation('/login')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setLocation('/register')}
                  className="px-6 py-2 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative z-10 h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {islands.map((island) => (
            <div
              key={island.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${
                !isAuthenticated ? 'hover:scale-110' : (island.unlocked ? 'hover:scale-110' : 'cursor-not-allowed')
              } transition-all duration-300`}
              style={{
                left: `${island.position.x}%`,
                top: `${island.position.y}%`,
              }}
              onClick={() => {
                if (!isAuthenticated && island.type !== 'video') {
                  setLocation('/register');
                  return;
                }
                if (island.unlocked || (!isAuthenticated && island.type === 'video')) {
                  setSelectedIsland(island);
                }
              }}
            >
              {/* Island Base */}
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${getLevelColor(island.level)} ${
                !isAuthenticated ? 'bg-opacity-60' : (island.unlocked ? 'bg-opacity-80' : 'bg-opacity-30')
              } backdrop-blur-sm border-4 border-white border-opacity-50 flex items-center justify-center shadow-lg`}>
                {getIslandIcon(island)}
              </div>
              
              {/* Island Name */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {island.name}
                  {!isAuthenticated && (
                    <div className="text-yellow-300 text-[10px] mt-1">Click to sign up!</div>
                  )}
                </div>
              </div>

              {/* Connection Lines */}
              {island.id === 'beginner-main' && (
                <>
                  <div className="absolute w-16 h-0.5 bg-white bg-opacity-30 top-1/2 -right-16 transform -translate-y-1/2"></div>
                  <div className="absolute w-0.5 h-16 bg-white bg-opacity-30 left-1/2 -bottom-16 transform -translate-x-1/2"></div>
                </>
              )}
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4 text-white">
            <h3 className="font-bold mb-2">Island Types</h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span>Main Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-blue-400" />
                <span>Video Tutorials</span>
              </div>
              <div className="flex items-center gap-2">
                <Puzzle className="w-4 h-4 text-purple-400" />
                <span>Puzzles</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                <span>Practice Games</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-green-400" />
                <span>Skill Assessment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Island Detail Modal */}
      {selectedIsland && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className={`w-20 h-20 rounded-full ${getLevelColor(selectedIsland.level)} bg-opacity-20 flex items-center justify-center mx-auto mb-4`}>
                {getIslandIcon(selectedIsland)}
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{selectedIsland.name}</h2>
              <p className="text-gray-600">{selectedIsland.description}</p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedIsland(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setLocation('/learn');
                  setSelectedIsland(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}