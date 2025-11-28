import { useState, useEffect } from 'react';
import { BarChart3, Search, Target, BookOpen, Lightbulb, TrendingUp, Calendar, User, Bot, Trophy, Clock, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AnalysisResult {
  position: string;
  evaluation: number;
  bestMove: string;
  explanation: string;
  threats: string[];
  improvements: string[];
}

interface GameAnalysis {
  id: string;
  userId: number;
  userEmail: string;
  username: string;
  date: string;
  winner: string;
  method: string;
  totalMoves: number;
  gameLength: number;
  moveHistory: string[];
  finalPosition: any[];
  capturedPieces: {white: any[], black: any[]};
}

export default function ChessAnalysis() {
  const { user } = useAuth();
  const [position, setPosition] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [gameAnalyses, setGameAnalyses] = useState<GameAnalysis[]>([]);
  const [selectedTab, setSelectedTab] = useState<'position' | 'games'>('games');

  const analyzePosition = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis with realistic chess insights
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        position: position || "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
        evaluation: Math.random() > 0.5 ? +(Math.random() * 2).toFixed(2) : -(Math.random() * 2).toFixed(2),
        bestMove: getRandomMove(),
        explanation: getRandomExplanation(),
        threats: getRandomThreats(),
        improvements: getRandomImprovements()
      };
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getRandomMove = () => {
    const moves = ['Nf3', 'Nc3', 'e4', 'd4', 'Bb5+', 'Qh5', 'O-O', 'Rd1', 'Bxf7+'];
    return moves[Math.floor(Math.random() * moves.length)];
  };

  const getRandomExplanation = () => {
    const explanations = [
      "This move develops a piece while controlling central squares.",
      "Strong positional move that improves piece coordination.",
      "Tactical shot that creates immediate threats.",
      "Solid defensive move that maintains material balance.",
      "Aggressive approach targeting the opponent's king safety."
    ];
    return explanations[Math.floor(Math.random() * explanations.length)];
  };

  const getRandomThreats = () => {
    const allThreats = [
      "Back rank weakness",
      "Exposed king position",
      "Loose pieces on kingside",
      "Weak pawn structure",
      "Undefended pieces",
      "Potential knight fork",
      "Pin on the queen"
    ];
    return allThreats.slice(0, Math.floor(Math.random() * 3) + 1);
  };

  const getRandomImprovements = () => {
    const improvements = [
      "Improve piece activity",
      "Castle for king safety",
      "Control the center",
      "Develop minor pieces",
      "Create pawn breaks",
      "Coordinate rooks",
      "Fix pawn weaknesses"
    ];
    return improvements.slice(0, Math.floor(Math.random() * 3) + 2);
  };

  // Load game analyses from localStorage for current user only
  useEffect(() => {
    if (user) {
      const userAnalysesKey = `chessAnalyses_${user.id}`;
      const stored = localStorage.getItem(userAnalysesKey);
      if (stored) {
        setGameAnalyses(JSON.parse(stored));
      } else {
        setGameAnalyses([]);
      }
    } else {
      setGameAnalyses([]);
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatGameLength = (minutes: number) => {
    if (minutes < 1) return '< 1 min';
    if (minutes === 1) return '1 min';
    return `${minutes} mins`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-blue-900">Chess Analysis</h1>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-blue-700">Deep analysis of chess positions and game history</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setSelectedTab('games')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                selectedTab === 'games'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Trophy className="w-5 h-5 inline-block mr-2" />
              Game History
            </button>
            <button
              onClick={() => setSelectedTab('position')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                selectedTab === 'position'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Target className="w-5 h-5 inline-block mr-2" />
              Position Analysis
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'games' ? (
          <div className="space-y-6">
            {!user ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Please Log In</h3>
                <p className="text-gray-500">
                  You need to be logged in to view your game analysis history.
                </p>
              </div>
            ) : gameAnalyses.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Games Yet</h3>
                <p className="text-gray-500">
                  Complete a chess game to see detailed analysis here. 
                  After checkmate, your game will automatically be analyzed and stored.
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  Playing as: {user.username}
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {gameAnalyses.map((game) => (
                  <div key={game.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          game.winner === 'Player' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {game.winner === 'Player' ? (
                            <User className={`w-6 h-6 text-green-600`} />
                          ) : (
                            <Bot className={`w-6 h-6 text-red-600`} />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {game.winner === 'Player' ? 'Victory!' : 'Defeat'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {game.winner} wins by {game.method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(game.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatGameLength(game.gameLength)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-blue-600">{game.totalMoves}</div>
                        <div className="text-sm text-blue-700">Total Moves</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-gray-600">{game.capturedPieces.white.length + game.capturedPieces.black.length}</div>
                        <div className="text-sm text-gray-700">Captures</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-600">{game.capturedPieces.white.length}</div>
                        <div className="text-sm text-green-700">White Captured</div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-red-600">{game.capturedPieces.black.length}</div>
                        <div className="text-sm text-red-700">Black Captured</div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Moves:</h4>
                      <div className="text-sm text-gray-600">
                        {game.moveHistory.slice(-6).join(' • ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Position Analysis Tab */
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Chess Position Analysis</h2>
                <p className="text-gray-600">Get detailed analysis of any chess position</p>
              </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position (FEN notation or describe the position)
                </label>
                <textarea
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Enter FEN notation (e.g., rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1) or describe the position..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
              <button
                onClick={analyzePosition}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-5 h-5" />
                {isAnalyzing ? 'Analyzing Position...' : 'Analyze Position'}
              </button>
            </div>

            {/* Analysis Results */}
            {analysis && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-blue-900">Position Evaluation</h3>
                    <div className={`text-2xl font-bold ${analysis.evaluation > 0 ? 'text-green-600' : analysis.evaluation < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {analysis.evaluation > 0 ? '+' : ''}{analysis.evaluation}
                    </div>
                  </div>
                  <p className="text-blue-700 text-sm mt-2">
                    {analysis.evaluation > 1 ? 'White has a significant advantage' :
                     analysis.evaluation > 0.3 ? 'White has a slight advantage' :
                     analysis.evaluation < -1 ? 'Black has a significant advantage' :
                     analysis.evaluation < -0.3 ? 'Black has a slight advantage' :
                     'The position is roughly equal'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Best Move */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-900">Best Move</h4>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-2">{analysis.bestMove}</div>
                    <p className="text-gray-600 text-sm">{analysis.explanation}</p>
                  </div>

                  {/* Threats */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-orange-600" />
                      <h4 className="font-semibold text-gray-900">Threats</h4>
                    </div>
                    <ul className="space-y-1">
                      {analysis.threats.map((threat, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                          {threat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Suggested Improvements</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {analysis.improvements.map((improvement, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          {improvement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}