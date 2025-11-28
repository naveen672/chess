import { Crown, Sparkles, Bot, ArrowUp } from 'lucide-react';
import { useLocation } from 'wouter';

interface UpgradeBannerProps {
  feature: string;
  description: string;
  onUpgrade?: () => void;
}

export default function UpgradeBanner({ feature, description, onUpgrade }: UpgradeBannerProps) {
  const [, setLocation] = useLocation();

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      setLocation('/register');
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-purple-900">
              Premium Feature: {feature}
            </h3>
          </div>
          <p className="text-purple-800 mb-3">
            {description}
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleUpgrade}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
            >
              <ArrowUp className="w-4 h-4" />
              Upgrade to Premium
            </button>
            <div className="flex items-center gap-2 text-sm text-purple-700">
              <Bot className="w-4 h-4" />
              <span>Unlock Queenie AI + advanced features</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}