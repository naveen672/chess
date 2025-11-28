import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UpgradeBanner from './UpgradeBanner';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIAssistant() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isPremiumUser = user && (user.subscriptionTier === 'premium' || user.subscriptionTier === 'grandmaster');
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(false);
  const [freeQuestions, setFreeQuestions] = useState(3);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage(userMessage, true);
    setIsLoading(true);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      let response = '';
      const msg = userMessage.toLowerCase();

      // Basic Rules and Piece Movements
      if (msg.includes('king move') || msg.includes('how does the king')) {
        response = "♔ **King Movement:**\nThe king moves exactly one square in any direction: vertical, horizontal, or diagonal.\n\n**Special King Rules:**\n• Can castle (if conditions are met)\n• Cannot move into check\n• Most important piece - losing it ends the game\n• In endgames, the king becomes an active fighting piece!";
      } else if (msg.includes('queen move') || msg.includes('how does the queen')) {
        response = "♕ **Queen Movement:**\nThe queen moves any number of squares in any direction: vertical, horizontal, or diagonal.\n\n**Queen Facts:**\n• Most powerful piece on the board\n• Combines rook and bishop movement\n• Worth about 9 points\n• Should be developed later in the opening to avoid attacks";
      } else if (msg.includes('rook move') || msg.includes('how does the rook')) {
        response = "♖ **Rook Movement:**\nThe rook moves any number of squares vertically or horizontally, but not diagonally.\n\n**Rook Strategy:**\n• Control open files and ranks\n• Work well in pairs on the 7th rank\n• Should be connected after castling\n• Worth about 5 points";
      } else if (msg.includes('bishop move') || msg.includes('how does the bishop')) {
        response = "♗ **Bishop Movement:**\nThe bishop moves any number of squares diagonally. It always stays on the same color square it started on.\n\n**Bishop Tips:**\n• You have one light-squared and one dark-squared bishop\n• Work well in open positions\n• Can control long diagonals\n• Worth about 3 points";
      } else if (msg.includes('knight move') || msg.includes('how does the knight')) {
        response = "♘ **Knight Movement:**\nThe knight moves in an L-shape: two squares in one direction and then one square perpendicular. It's the only piece that can jump over other pieces.\n\n**Knight Strategy:**\n• Great in closed positions\n• Excellent for forks\n• Should be developed early\n• Worth about 3 points\n• 'A knight on the rim is dim'";
      } else if (msg.includes('pawn move') || msg.includes('how does the pawn') || msg.includes('how do pawns')) {
        response = "♙ **Pawn Movement:**\nPawns move one square forward, but capture one square diagonally forward. On their first move, pawns may move two squares forward.\n\n**Pawn Rules:**\n• Cannot move backward\n• Can be promoted when reaching the end\n• Can capture 'en passant'\n• Form the backbone of your position\n• Worth 1 point";
      } else if (msg.includes('castling') || msg.includes('castle')) {
        response = "🏰 **Castling:**\nCastling is a special move where the king moves two squares toward a rook, and the rook jumps over the king.\n\n**Castling Conditions:**\n• No pieces between king and rook\n• Neither king nor rook has moved\n• King is not in check\n• King doesn't move through or into check\n\n**Why Castle:**\n• King safety\n• Rook development\n• Connect your rooks";
      } else if (msg.includes('fork')) {
        response = "🍴 **Fork:**\nA fork is when one piece attacks two or more enemy pieces at the same time.\n\n**Types of forks:**\n• **Knight fork** - Most common, attacks king and queen\n• **Pawn fork** - Attacks two pieces diagonally\n• **Bishop fork** - Along diagonals\n• **Queen fork** - Most devastating";
      } else if (msg.includes('pin')) {
        response = "📌 **Pin:**\nA pin is when a piece cannot move because it would expose a more valuable piece behind it.\n\n**Types of pins:**\n• **Absolute pin** - Piece pinned to the king (cannot move legally)\n• **Relative pin** - Piece pinned to queen/rook (can move but loses material)";
      } else if (msg.includes('puzzle')) {
        response = "🧩 **Chess Puzzle:**\nWhite: King g1, Queen h5, Black: King g8\n**Puzzle:** Find checkmate in 1 move!\n**Solution:** Qh7# is checkmate! The queen attacks the king and the king has no escape squares.";
      } else if (msg.includes('hello') || msg.includes('hi')) {
        response = "👋 Hello! I'm **Queenie**, your AI Chess Coach! I'm here to help you:\n\n🎓 **Learn Chess:**\n• Piece movements and special rules\n• Opening principles and tactics\n• Strategy and endgame techniques\n• Famous games and players\n\n🧩 **Practice:**\n• Generate chess puzzles\n• Analyze positions\n• Learn tactical patterns\n\n**Try asking me:**\n• \"How does a knight move?\"\n• \"Give me a puzzle\"\n• \"Explain the Sicilian Defense\"\n• \"Tell me about Magnus Carlsen\"";
      } else {
        response = "♟️ **Great Question!** I'm Queenie, your Chess AI Coach! Here's what I can help with:\n\n**📚 Learn:**\n• Chess rules and piece movements\n• Opening principles\n• Tactical patterns (forks, pins, skewers)\n• Endgame techniques\n\n**🧩 Practice:**\n• Generate puzzles\n• Analyze positions\n• Solve tactical problems\n\n**🏆 Explore:**\n• Famous players and games\n• Chess history\n• Strategic concepts\n\n**Try asking:**\n• \"How do knights move?\"\n• \"Give me a puzzle\"\n• \"Explain castling\"\n• \"Tell me about Kasparov\"";
      }

      addMessage(response, false);
      setIsLoading(false);
    }, 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 animate-pulse-glow"
      >
        <Sparkles className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 transform ${
        isMinimized ? 'scale-90' : 'scale-100'
      }`}
      style={{
        width: isMinimized ? 'auto' : '420px',
        height: isMinimized ? 'auto' : '600px'
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-purple-200 h-full flex flex-col overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-purple-600" />
            </div>
            {!isMinimized && (
              <div>
                <h3 className="font-bold text-lg">Queenie AI</h3>
                <p className="text-purple-100 text-xs">Chess Coach</p>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-purple-500 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-purple-500 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50 to-white">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-2">Welcome to Queenie AI!</h3>
                  <p className="text-gray-600 text-sm mb-4">Your personal chess coach is ready to help. Ask me anything about chess!</p>
                  <div className="text-left text-xs text-gray-600 space-y-1">
                    <p>💡 Try: "How does a knight move?"</p>
                    <p>🧩 Try: "Give me a puzzle"</p>
                    <p>🏆 Try: "Tell me about Magnus"</p>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`animate-message-slide ${
                        message.isUser ? 'flex justify-end' : 'flex justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl ${
                          message.isUser
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isUser ? 'text-purple-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Thinking Indicator */}
                  {isThinking && (
                    <div className="flex justify-start animate-fadeInUp">
                      <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-400"></div>
                          </div>
                          <span className="text-xs text-gray-600 ml-2">Queenie is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Loading Indicator */}
                  {isLoading && !isThinking && (
                    <div className="flex justify-start animate-fadeInUp">
                      <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-600">Typing...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-purple-200 p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about chess..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
