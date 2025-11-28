import { AlertTriangle, UserPlus, LogIn } from 'lucide-react';
import { useLocation } from 'wouter';

export default function GuestProgressBanner() {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6 shadow-md">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-amber-900 mb-2">
            Guest Mode - Progress Not Saved
          </h3>
          <p className="text-amber-800 mb-3">
            You're currently browsing as a guest. While you can explore videos and content, 
            your progress, achievements, and game history won't be saved unless you create an account.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setLocation('/register')}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
            >
              <UserPlus className="w-4 h-4" />
              Create Account
            </button>
            <button
              onClick={() => setLocation('/login')}
              className="flex items-center gap-2 px-4 py-2 border border-amber-600 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors text-sm font-medium"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}