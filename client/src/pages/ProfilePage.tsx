import { useState } from 'react';
import { User, Settings, Trophy, Target, BookOpen, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';
import { Footer } from '@/components/Footer';
import AvatarDisplay from '@/components/AvatarDisplay';

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h2>
          <button
            onClick={() => setLocation('/login')}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <Target className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-400 bg-white flex items-center justify-center">
            <AvatarDisplay avatar={user.avatar} size="large" editable={true} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-blue-100">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-yellow-400 text-blue-900 rounded-full text-sm font-semibold capitalize">
                {user.skillLevel}
              </span>
              <span className="text-blue-100">• {user.totalPoints} Points</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{user.completedLessons.length}</p>
              <p className="text-sm sm:text-base text-gray-600">Lessons Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{Math.floor(user.totalPoints / 10)}</p>
              <p className="text-sm sm:text-base text-gray-600">Puzzles Solved</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm sm:text-base text-gray-600">Achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Completed "Basic Piece Movement" lesson</span>
            <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Solved 5 beginner puzzles</span>
            <span className="text-gray-500 text-sm ml-auto">1 day ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-700">Earned "First Steps" achievement</span>
            <span className="text-gray-500 text-sm ml-auto">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Learning Progress</h3>
      
      {/* Progress by Level */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-900">Beginner Level</h4>
            <span className="text-green-600 font-semibold">{Math.min(Math.floor((user.completedLessons?.length || 0) * 10), 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(Math.floor((user.completedLessons?.length || 0) * 10), 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm mt-2">Great progress! Keep practicing the fundamentals.</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-900">Intermediate Level</h4>
            <span className="text-blue-600 font-semibold">{user.skillLevel === 'intermediate' ? Math.min(Math.floor((user.completedLessons?.length || 0) * 5), 100) : '0'}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${user.skillLevel === 'intermediate' ? Math.min(Math.floor((user.completedLessons?.length || 0) * 5), 100) : 0}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm mt-2">Complete beginner level to unlock intermediate content.</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-900">Advanced Level</h4>
            <span className="text-purple-600 font-semibold">{user.skillLevel === 'advanced' ? Math.min(Math.floor((user.completedLessons?.length || 0) * 3), 100) : '0'}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-purple-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${user.skillLevel === 'advanced' ? Math.min(Math.floor((user.completedLessons?.length || 0) * 3), 100) : 0}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm mt-2">Master intermediate level to access advanced strategies.</p>
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Achievements</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 border-l-4 border-l-yellow-400">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <h4 className="font-semibold text-gray-900">First Steps</h4>
              <p className="text-gray-600 text-sm">Complete your first lesson</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 border-l-4 border-l-green-400">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-green-500" />
            <div>
              <h4 className="font-semibold text-gray-900">Puzzle Solver</h4>
              <p className="text-gray-600 text-sm">Solve 10 chess puzzles</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 border-l-4 border-l-blue-400">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <div>
              <h4 className="font-semibold text-gray-900">Dedicated Learner</h4>
              <p className="text-gray-600 text-sm">Study for 7 consecutive days</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-200 opacity-60">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-gray-400" />
            <div>
              <h4 className="font-semibold text-gray-500">Chess Master</h4>
              <p className="text-gray-400 text-sm">Complete all levels</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Account Settings</h3>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Board Theme</h4>
        <div className="grid grid-cols-3 gap-4">
          {['classic', 'royal', 'golden'].map((theme) => (
            <div
              key={theme}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                'classic' === theme ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-gradient-to-br from-blue-100 to-yellow-100"></div>
                <p className="text-sm font-medium capitalize">{theme}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Notifications</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
            <span className="ml-2 text-gray-700">Daily practice reminders</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
            <span className="ml-2 text-gray-700">Achievement notifications</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="ml-2 text-gray-700">Weekly progress reports</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 sm:mb-8">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 px-3 sm:px-6 min-w-max sm:min-w-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'progress' && renderProgress()}
            {activeTab === 'achievements' && renderAchievements()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}