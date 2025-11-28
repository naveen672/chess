import { Crown, Star, Trophy, Users } from 'lucide-react';
import { useLocation } from 'wouter';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [, setLocation] = useLocation();
  const features = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Master the Fundamentals",
      description: "Learn chess basics through our interactive island-themed roadmap system."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Progressive Learning",
      description: "Three carefully crafted levels from Beginner to Advanced mastery."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Interactive Puzzles",
      description: "Solve challenging puzzles and test your skills with real-time feedback."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Track Your Progress",
      description: "Monitor your improvement and unlock new content as you advance."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen md:min-h-screen flex items-center">
        {/* Scrolling Background Images */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="flex animate-scroll-bg h-full" style={{ width: '300%' }}>
            <div 
              className="h-full bg-cover bg-center"
              style={{
                width: '33.333%',
                backgroundImage: "url('/chess-1.jpg')",
                backgroundPosition: "center center",
                backgroundSize: "cover"
              }}
            ></div>
            <div 
              className="h-full bg-cover bg-center"
              style={{
                width: '33.333%',
                backgroundImage: "url('/chess-2.jpg')",
                backgroundPosition: "center center",
                backgroundSize: "cover"
              }}
            ></div>
            <div 
              className="h-full bg-cover bg-center"
              style={{
                width: '33.333%',
                backgroundImage: "url('/chess-3.jpg')",
                backgroundPosition: "center center",
                backgroundSize: "cover"
              }}
            ></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>
        <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="text-center">
            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <img 
                src="/chess-champions-logo.png" 
                alt="Chess Champions Logo"
                className="w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 mb-3 sm:mb-4 rounded-full object-cover border-4 border-yellow-400 shadow-lg animate-float"
              />
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center animate-fadeInUp leading-tight">
                Master Chess Like Never Before
              </h1>
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto animate-fadeInUp animation-delay-200 opacity-0 px-2">
              Embark on an epic journey through our interactive island-themed learning system. 
              From beginner to grandmaster, your chess adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 animate-fadeInUp animation-delay-400 opacity-0 px-2">
              <button
                onClick={() => setLocation('/roadmap')}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 text-blue-900 rounded-lg font-semibold text-base sm:text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg w-full sm:w-auto"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => setLocation('/mission')}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              >
                Learn More
              </button>
            </div>


          </div>
        </div>
      </section>

      {/* TEACH, LEARN, INSPIRE Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-slideUp opacity-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 animate-glowPulse">Our Pillars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* TEACH */}
            <div className="text-center animate-slideInLeft opacity-0 group">
              <div className="mb-4 sm:mb-6">
                <img 
                  src="/teach-image.png" 
                  alt="Teaching chess to students"
                  className="w-full h-40 sm:h-48 md:h-64 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 group-hover:shadow-2xl"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4 animate-fadeInUp animation-delay-200 opacity-0">TEACH</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed animate-fadeInUp animation-delay-400 opacity-0">
                Volunteers will teach new players everything from pawn movements to advanced strategy.
              </p>
            </div>

            {/* LEARN */}
            <div className="text-center animate-scaleIn animation-delay-200 animate-cardHover">
              <div className="mb-4 sm:mb-6">
                <img 
                  src="/learn-image.png" 
                  alt="Students learning chess on interactive board"
                  className="w-full h-40 sm:h-48 md:h-64 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4 animate-fadeInUp animation-delay-400 opacity-0">LEARN</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed animate-fadeInUp animation-delay-600 opacity-0">
                Players can work in peer groups to solve chess puzzles and improve their skills.
              </p>
            </div>

            {/* INSPIRE */}
            <div className="text-center animate-slideInRight animation-delay-400 opacity-0">
              <div className="mb-4 sm:mb-6">
                <img 
                  src="/inspire-image.png" 
                  alt="Hand over chess board showing strategy"
                  className="w-full h-40 sm:h-48 md:h-64 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4 animate-fadeInUp animation-delay-600 opacity-0">INSPIRE</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed animate-fadeInUp animation-delay-800 opacity-0">
                Chess Champions welcomes all. Our volunteers strive to be role models and inspire players.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-slideUp opacity-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 sm:mb-6 animate-glowPulse">Our Vision</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Content */}
            <div className="space-y-4 sm:space-y-6 animate-slideInLeft opacity-0">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed animate-slideUp opacity-0 animation-delay-200">
                Chess Champions empowers volunteers and players to develop confidence and leadership qualities. 
                Through mentoring and game-play, we cultivate essential skills that will benefit community members 
                throughout their lives. As participants of all ages engage in friendly competition, they learn 
                effective communication, express themselves to others, and develop social skills.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed animate-slideUp opacity-0 animation-delay-400">
                People of all ages and backgrounds come together to play chess. Children find friends they return 
                to play with, families bond over the games, and senior citizens enjoy teaching and playing with 
                the kids. Even though we may have our differences, chess brings us all together.
              </p>
            </div>
            
            {/* Image */}
            <div className="lg:order-first animate-slideInRight opacity-0 animation-delay-200">
              <img 
                src="/community-vision.png" 
                alt="Community hands around chess board showing unity and inclusion"
                className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Meet Our Leaders</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Medha */}
            <div className="text-center animate-slideInLeft opacity-0">
              <div className="mb-6">
                <img 
                  src="/medha-profile.png" 
                  alt="Medha - President and Founder"
                  className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg border-4 border-yellow-400 animate-float"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2 animate-fadeInUp animation-delay-200 opacity-0">Medha (Senior)</h3>
              <p className="text-gray-600 leading-relaxed animate-fadeInUp animation-delay-400 opacity-0">
                Medha has been playing chess for 13 years. She is the president and founder of Chess Champions. 
                Her favorite part of Chess Champions is watching the players develop connections to each other and the game.
              </p>
            </div>

            {/* Ash */}
            <div className="text-center animate-slideInRight animation-delay-200 opacity-0">
              <div className="mb-6">
                <img 
                  src="/ash-profile.png" 
                  alt="Ash - Vice President"
                  className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg border-4 border-yellow-400 animate-float animation-delay-200"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2 animate-fadeInUp animation-delay-400 opacity-0">Ash (Senior)</h3>
              <p className="text-gray-600 leading-relaxed animate-fadeInUp animation-delay-600 opacity-0">
                Ash has been playing chess for 11 years. He is the vice president of the organization. 
                His favorite part of Chess Champions is seeing all of the members grow and progress each week.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Learning Path Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slideUp opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 animate-glowPulse">
              Your Learning Adventure
            </h2>
            <p className="text-xl text-gray-600 animate-slideUp opacity-0 animation-delay-200">
              Navigate through beautiful islands, each containing unique chess challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-slideInLeft opacity-0 hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                <span className="text-4xl animate-bounce">🏝️</span>
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-3 animate-slideUp opacity-0 animation-delay-200">Beginner Islands</h3>
              <p className="text-gray-600 animate-slideUp opacity-0 animation-delay-400">
                Start your journey with basic moves, piece values, and fundamental strategies
              </p>
            </div>
            
            <div className="text-center animate-scaleIn animation-delay-200 opacity-0 hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float animation-delay-200">
                <span className="text-4xl animate-shimmer animation-delay-200">⛰️</span>
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-3 animate-slideUp opacity-0 animation-delay-400">Intermediate Peaks</h3>
              <p className="text-gray-600 animate-slideUp opacity-0 animation-delay-600">
                Climb higher with tactical combinations, positional understanding, and endgames
              </p>
            </div>
            
            <div className="text-center animate-slideInRight animation-delay-400 opacity-0 hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float animation-delay-400">
                <span className="text-4xl animate-shimmer animation-delay-400">🏔️</span>
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-3 animate-slideUp opacity-0 animation-delay-600">Advanced Summits</h3>
              <p className="text-gray-600 animate-slideUp opacity-0 animation-delay-800">
                Master complex strategies, opening theory, and competitive play
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* READY SET CHESS Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              READY... SET... CHESS!
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">BE THE CHANGE:</h3>
                <div className="space-y-4 text-blue-100">
                  <p className="text-lg">
                    <strong className="text-white">Volunteer:</strong> Earn volunteer hours and teach other players.
                  </p>
                  <p className="text-lg">
                    <strong className="text-white">Chapter Head:</strong> Interested in leading your own chess night? 
                    Grab a few friends and sign up to create a new branch!
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">KEEP UP WITH US:</h3>
                <p className="text-lg text-blue-100">
                  Want to become a part of our activities? Join a chess night to play competitively 
                  or learn from the basics.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setLocation('/register')}
                  className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-lg font-semibold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Join Chess Night
                </button>
                <button
                  onClick={() => setLocation('/mission')}
                  className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-lg font-semibold text-lg hover:bg-yellow-400 hover:text-blue-900 transform hover:scale-105 transition-all duration-200"
                >
                  Become a Volunteer
                </button>
              </div>
            </div>
            
            {/* Right Images */}
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/chess-activity-1.png" 
                  alt="Students learning chess on interactive screen"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/chess-activity-2.png" 
                  alt="Interactive chess learning session with digital board"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}