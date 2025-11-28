import { useLocation } from 'wouter';
import { Footer } from '@/components/Footer';

export default function MissionPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
            At Chess Champions, we believe chess is more than a game—it's a tool for building minds, 
            creating connections, and inspiring excellence in players of all ages.
          </p>
        </div>
      </section>

      {/* TEACH, LEARN, INSPIRE Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* TEACH */}
            <div className="text-center animate-slideInLeft opacity-0">
              <div className="mb-6">
                <img 
                  src="/teach-image.png" 
                  alt="Teaching chess to students"
                  className="w-full h-64 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 animate-fadeInUp animation-delay-200 opacity-0">TEACH</h3>
              <p className="text-gray-600 leading-relaxed animate-fadeInUp animation-delay-400 opacity-0">
                Volunteers will teach new players everything from pawn movements to advanced strategy.
              </p>
            </div>

            {/* LEARN */}
            <div className="text-center animate-scaleIn animation-delay-200 opacity-0">
              <div className="mb-6">
                <img 
                  src="/learn-image.png" 
                  alt="Students learning chess on interactive board"
                  className="w-full h-64 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 animate-fadeInUp animation-delay-400 opacity-0">LEARN</h3>
              <p className="text-gray-600 leading-relaxed animate-fadeInUp animation-delay-600 opacity-0">
                Players can work in peer groups to solve chess puzzles and improve their skills.
              </p>
            </div>

            {/* INSPIRE */}
            <div className="text-center animate-slideInRight animation-delay-400 opacity-0">
              <div className="mb-6">
                <img 
                  src="/inspire-image.png" 
                  alt="Hand over chess board showing strategy"
                  className="w-full h-64 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 animate-fadeInUp animation-delay-600 opacity-0">INSPIRE</h3>
              <p className="text-gray-600 leading-relaxed animate-fadeInUp animation-delay-800 opacity-0">
                Chess Champions welcomes all. Our volunteers strive to be role models and inspire players.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Our Vision</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Chess Champions empowers volunteers and players to develop confidence and leadership qualities. 
                Through mentoring and game-play, we cultivate essential skills that will benefit community members 
                throughout their lives. As participants of all ages engage in friendly competition, they learn 
                effective communication, express themselves to others, and develop social skills.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                People of all ages and backgrounds come together to play chess. Children find friends they return 
                to play with, families bond over the games, and senior citizens enjoy teaching and playing with 
                the kids. Even though we may have our differences, chess brings us all together.
              </p>
            </div>
            
            {/* Image */}
            <div className="lg:order-first">
              <img 
                src="/community-vision.png" 
                alt="Community hands around chess board showing unity and inclusion"
                className="w-full rounded-lg shadow-lg"
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

      {/* Call to Action */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Whether you're a complete beginner or looking to refine your skills, 
            Chess Champions has the perfect path for your chess journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setLocation('/roadmap')}
              className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-lg font-semibold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Learning
            </button>
            <button
              onClick={() => setLocation('/donate')}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all duration-200"
            >
              Support Our Mission
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}