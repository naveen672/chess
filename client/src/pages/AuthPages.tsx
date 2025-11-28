import { useState } from 'react';
import { Crown, Mail, Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';
import AvatarCustomizer from '../components/AvatarCustomizer';
import UpgradeBanner from '../components/UpgradeBanner';
import ForgotPassword from '../components/ForgotPassword';

interface AuthPagesProps {
  type: 'login' | 'register' | 'volunteer';
}

export default function AuthPages({ type }: AuthPagesProps) {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isVolunteer: type === 'volunteer'
  });
  const [avatar, setAvatar] = useState({
    piece: 'pawn',
    color: '#8B4513',
    accessories: {}
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (type === 'login') {
        await login(formData.email, formData.password);
        setLocation('/roadmap');
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters long');
          return;
        }
        await register(formData.email, formData.username, formData.password, {
          isVolunteer: formData.isVolunteer,
          avatar: avatar
        });
        setLocation('/roadmap');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (type === 'login') {
      handleSubmit(new Event('submit') as any);
      return;
    }
    
    if (currentStep === 1) {
      if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
      setError('');
      setCurrentStep(2);
    } else {
      handleSubmit(new Event('submit') as any);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Show forgot password component if requested
  if (showForgotPassword) {
    return (
      <ForgotPassword
        onBackToLogin={() => setShowForgotPassword(false)}
        onSuccess={() => {
          setShowForgotPassword(false);
          setError('');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400 mx-auto mb-4">
              <img 
                src="/chess-champions-logo.png" 
                alt="Chess Champions Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              {type === 'login' ? 'Welcome Back' : 
               type === 'volunteer' ? 'Volunteer Registration' : 'Join Chess Champions'}
            </h2>
            <p className="text-gray-600">
              {type === 'login' ? 'Continue your chess journey' : 
               type === 'volunteer' ? 'Help teach the next generation of chess masters' :
               'Start your chess mastery today'}
            </p>
            {type !== 'login' && (
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-500 ml-2">
                  Step {currentStep} of 2
                </span>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none relative block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {type !== 'login' && (
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        className="appearance-none relative block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Choose a unique username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password {type !== 'login' && <span className="text-sm text-gray-500">(minimum 8 characters)</span>}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="appearance-none relative block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {type !== 'login' && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="appearance-none relative block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                {type === 'volunteer' && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-blue-900">Volunteer Account</h4>
                    </div>
                    <p className="text-sm text-blue-700">
                      As a volunteer, you'll have access to teaching tools and can help mentor new players.
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && type !== 'login' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Customize Your Avatar</h3>
                  <p className="text-sm text-gray-600">Choose your chess piece and make it unique!</p>
                </div>
                <AvatarCustomizer avatar={avatar} onAvatarChange={setAvatar} />
                
                {/* Premium upgrade banner during registration */}
                <UpgradeBanner 
                  feature="Queenie AI + Premium Features"
                  description="Unlock unlimited AI conversations, advanced position analysis, personalized training, and exclusive content. Start your chess mastery journey with premium access!"
                />
              </div>
            )}

            <div className="flex gap-3">
              {currentStep === 2 && type !== 'login' && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="flex-1 group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-blue-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  'Processing...'
                ) : type === 'login' ? (
                  'Sign In'
                ) : currentStep === 1 ? (
                  'Next: Customize Avatar'
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            <div className="text-center">
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setLocation(type === 'login' ? '/register' : '/login')}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium block w-full"
                >
                  {type === 'login' 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
                {type === 'login' && (
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-gray-500 hover:text-gray-600 text-sm font-medium"
                  >
                    Forgot your password?
                  </button>
                )}
              </div>
              {type !== 'volunteer' && type !== 'login' && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => setLocation('/volunteer')}
                    className="text-green-600 hover:text-green-500 text-sm font-medium"
                  >
                    Want to teach chess? Join as a volunteer
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}