import { useState } from 'react';
import { Book, Play, Target, Trophy, ChevronRight, Clock, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LessonModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
}

export default function ChessGuidanceSystem() {
  const { user } = useAuth();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Only show for Grandmaster subscribers
  if (!user || user.subscriptionTier !== 'grandmaster') {
    return null;
  }

  const guidanceModules: LessonModule[] = [
    {
      id: 'chess-basics',
      title: 'Chess Fundamentals',
      description: 'Learn how each piece moves, basic rules, and board setup',
      duration: '45 min',
      difficulty: 'beginner',
      completed: user.completedLessons?.includes('chess-basics') || false
    },
    {
      id: 'opening-principles',
      title: 'Opening Principles',
      description: 'Master the first 10 moves with development and center control',
      duration: '60 min',
      difficulty: 'beginner',
      completed: user.completedLessons?.includes('opening-principles') || false
    },
    {
      id: 'tactical-patterns',
      title: 'Tactical Patterns',
      description: 'Recognize pins, forks, skewers, and discovered attacks',
      duration: '90 min',
      difficulty: 'intermediate',
      completed: user.completedLessons?.includes('tactical-patterns') || false
    },
    {
      id: 'endgame-mastery',
      title: 'Endgame Techniques',
      description: 'Learn essential checkmate patterns and pawn endgames',
      duration: '75 min',
      difficulty: 'intermediate',
      completed: user.completedLessons?.includes('endgame-mastery') || false
    },
    {
      id: 'strategic-thinking',
      title: 'Strategic Concepts',
      description: 'Pawn structure, weak squares, and long-term planning',
      duration: '120 min',
      difficulty: 'advanced',
      completed: user.completedLessons?.includes('strategic-thinking') || false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Personalized Chess Guidance</h2>
          <p className="text-gray-600 text-sm">Step-by-step learning path designed for your level</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guidanceModules.map((module) => (
          <div
            key={module.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              module.completed 
                ? 'bg-green-50 border-green-200' 
                : selectedModule === module.id
                ? 'border-purple-300 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {module.completed ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <Book className="w-4 h-4 text-gray-500" />
                  </div>
                )}
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                selectedModule === module.id ? 'rotate-90' : ''
              }`} />
            </div>

            <h3 className="font-semibold text-gray-800 mb-2">{module.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{module.description}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {module.duration}
              </div>
              {module.completed && (
                <span className="text-green-600 font-medium">Completed</span>
              )}
            </div>

            {selectedModule === module.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700">Small group session available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Play className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">Interactive practice included</span>
                  </div>
                  <button className="w-full mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                    {module.completed ? 'Review Lesson' : 'Start Learning'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-purple-600" />
          <div>
            <h4 className="font-medium text-purple-900">Upcoming Group Session</h4>
            <p className="text-sm text-purple-700">
              Next small group lesson: "Advanced Tactics" - Tomorrow at 7 PM EST
            </p>
          </div>
          <button className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
            Join Session
          </button>
        </div>
      </div>
    </div>
  );
}