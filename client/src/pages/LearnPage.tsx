import { useState } from 'react';
import { BookOpen, Play, ChevronRight, CheckCircle, Lock, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';

export default function LearnPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const levels = {
    beginner: {
      title: 'Beginner Level',
      description: 'Master the fundamentals of chess',
      color: 'green',
      lessons: [
        { id: 'setup', title: 'Chess Board Setup', duration: '10 min', completed: true, unlocked: true },
        { id: 'pieces', title: 'How Pieces Move', duration: '15 min', completed: true, unlocked: true },
        { id: 'special-moves', title: 'Special Moves', duration: '12 min', completed: false, unlocked: true },
        { id: 'check-checkmate', title: 'Check and Checkmate', duration: '18 min', completed: false, unlocked: true },
        { id: 'basic-strategy', title: 'Basic Strategy', duration: '20 min', completed: false, unlocked: false },
      ]
    },
    intermediate: {
      title: 'Intermediate Level',
      description: 'Develop tactical and positional understanding',
      color: 'blue',
      lessons: [
        { id: 'tactics', title: 'Tactical Patterns', duration: '25 min', completed: false, unlocked: false },
        { id: 'openings', title: 'Opening Principles', duration: '30 min', completed: false, unlocked: false },
        { id: 'middlegame', title: 'Middlegame Strategy', duration: '35 min', completed: false, unlocked: false },
        { id: 'endgames', title: 'Essential Endgames', duration: '40 min', completed: false, unlocked: false },
        { id: 'analysis', title: 'Game Analysis', duration: '30 min', completed: false, unlocked: false },
      ]
    },
    advanced: {
      title: 'Advanced Level',
      description: 'Master complex strategies and competitive play',
      color: 'purple',
      lessons: [
        { id: 'advanced-tactics', title: 'Advanced Tactical Motifs', duration: '45 min', completed: false, unlocked: false },
        { id: 'opening-theory', title: 'Opening Theory', duration: '50 min', completed: false, unlocked: false },
        { id: 'positional', title: 'Advanced Positional Play', duration: '60 min', completed: false, unlocked: false },
        { id: 'complex-endgames', title: 'Complex Endgames', duration: '55 min', completed: false, unlocked: false },
        { id: 'tournament', title: 'Tournament Preparation', duration: '40 min', completed: false, unlocked: false },
      ]
    }
  };

  const getLevelColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-500',
          bgLight: 'bg-green-50',
          border: 'border-green-500',
          text: 'text-green-600'
        };
      case 'blue':
        return {
          bg: 'bg-blue-500',
          bgLight: 'bg-blue-50',
          border: 'border-blue-500',
          text: 'text-blue-600'
        };
      case 'purple':
        return {
          bg: 'bg-purple-500',
          bgLight: 'bg-purple-50',
          border: 'border-purple-500',
          text: 'text-purple-600'
        };
      default:
        return {
          bg: 'bg-gray-500',
          bgLight: 'bg-gray-50',
          border: 'border-gray-500',
          text: 'text-gray-600'
        };
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md">
          <img 
            src="/chess-champions-logo.png" 
            alt="Chess Champions Logo"
            className="w-24 h-24 mx-auto mb-4 rounded-full object-cover border-2 border-yellow-400"
          />
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Access Learning Content</h2>
          <p className="text-gray-600 mb-6">Sign in to access our comprehensive chess curriculum and track your progress.</p>
          <div className="flex gap-4">
            <button
              onClick={() => setLocation('/login')}
              className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => setLocation('/register')}
              className="flex-1 px-4 py-2 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentLevel = levels[selectedLevel as keyof typeof levels];
  const colorClasses = getLevelColorClasses(currentLevel.color);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1 sm:mb-2">Learn Chess</h1>
              <p className="text-sm sm:text-base text-gray-600">Master the royal game through our comprehensive curriculum</p>
            </div>
            <div className="flex gap-1 sm:gap-2 flex-wrap">
              {Object.entries(levels).map(([key, level]) => {
                const isSelected = selectedLevel === key;
                const colors = getLevelColorClasses(level.color);
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedLevel(key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isSelected
                        ? `${colors.bg} text-white`
                        : `${colors.bgLight} ${colors.text} hover:${colors.bg} hover:text-white`
                    }`}
                  >
                    {level.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Lesson List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full">
              <div className={`${colorClasses.bg} text-white p-6 rounded-t-2xl`}>
                <h2 className="text-2xl font-bold mb-2">{currentLevel.title}</h2>
                <p className="opacity-90">{currentLevel.description}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {currentLevel.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${
                        lesson.unlocked
                          ? `hover:${colorClasses.border} hover:${colorClasses.bgLight}`
                          : 'border-gray-200 opacity-60 cursor-not-allowed'
                      } ${
                        selectedLesson === lesson.id ? `${colorClasses.border} ${colorClasses.bgLight}` : 'border-gray-200'
                      }`}
                      onClick={() => lesson.unlocked && setSelectedLesson(lesson.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            lesson.completed
                              ? 'bg-green-100 text-green-600'
                              : lesson.unlocked
                              ? `${colorClasses.bgLight} ${colorClasses.text}`
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            {lesson.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : lesson.unlocked ? (
                              <BookOpen className="w-5 h-5" />
                            ) : (
                              <Lock className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                            <p className="text-sm text-gray-500">{lesson.duration}</p>
                          </div>
                        </div>
                        {lesson.unlocked && (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Detail */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              {selectedLesson ? (
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-4">
                    {currentLevel.lessons.find(l => l.id === selectedLesson)?.title}
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Lesson Overview</h4>
                      <p className="text-gray-600 text-sm">
                        This comprehensive lesson will teach you the fundamental concepts and 
                        practical applications. You'll learn through interactive examples and exercises.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">What You'll Learn</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Key concepts and definitions</li>
                        <li>• Practical applications</li>
                        <li>• Common patterns and strategies</li>
                        <li>• Practice exercises</li>
                      </ul>
                    </div>

                    <button className={`w-full py-3 ${colorClasses.bg} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}>
                      <Play className="w-5 h-5" />
                      Start Lesson
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Lesson</h3>
                  <p className="text-gray-600">Choose a lesson from the list to see details and start learning.</p>
                </div>
              )}
            </div>

            {/* Progress Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                {Object.entries(levels).map(([key, level]) => {
                  const completed = level.lessons.filter(l => l.completed).length;
                  const total = level.lessons.length;
                  const percentage = (completed / total) * 100;
                  const colors = getLevelColorClasses(level.color);
                  
                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{level.title}</span>
                        <span className="text-sm text-gray-600">{completed}/{total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${colors.bg} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}