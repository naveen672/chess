import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 600);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center z-[9999] transition-opacity duration-600 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated chess pieces background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl animate-chess-float animation-delay-0">♔</div>
        <div className="absolute top-20 right-20 text-5xl animate-chess-drift animation-delay-200">♕</div>
        <div className="absolute bottom-20 left-1/4 text-5xl animate-chess-bounce animation-delay-400">♖</div>
        <div className="absolute bottom-32 right-1/3 text-5xl animate-chess-spin animation-delay-600">♗</div>
        <div className="absolute top-1/3 right-10 text-4xl animate-chess-float animation-delay-400">♘</div>
        <div className="absolute bottom-1/4 right-20 text-4xl animate-chess-drift animation-delay-800">♙</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div className="mb-8 animate-chess-bounce">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl bg-white flex items-center justify-center">
            <img
              src="/chess-champions-logo.png"
              alt="Chess Champions"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title with chess glow effect */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-chess-glow">
          Chess Champions
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fadeInUp animation-delay-200 opacity-0">
          Master Chess Like Never Before
        </p>

        {/* Loading animation */}
        <div className="flex gap-2 justify-center items-center mb-8">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-200"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-400"></div>
        </div>

        {/* Loading text */}
        <p className="text-blue-200 text-sm tracking-widest">
          LOADING YOUR JOURNEY...
        </p>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </div>
  );
}
