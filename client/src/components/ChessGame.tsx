import { useState, useEffect } from 'react';
import { Crown, RotateCcw, Flag, User, Bot, Settings, Clock, Zap, Users } from 'lucide-react';

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn' | null;
type PieceColor = 'white' | 'black';

interface Piece {
  type: PieceType;
  color: PieceColor;
}

interface Square {
  piece: Piece | null;
  row: number;
  col: number;
}

// Chess piece component with solid style matching reference image
const ChessPiece = ({ type, color, size = 'text-4xl' }: { type: PieceType, color: PieceColor, size?: string }) => {
  const pieceSymbols = {
    white: {
      king: '♔',
      queen: '♕', 
      rook: '♖',
      bishop: '♗',
      knight: '♘',
      pawn: '♙'
    },
    black: {
      king: '♚',
      queen: '♛',
      rook: '♜',
      bishop: '♝',
      knight: '♞',
      pawn: '♙'
    }
  };

  if (!type) return null;

  return (
    <div 
      className={`${size} font-black select-none hover:scale-105 transition-transform duration-200 flex items-center justify-center`}
      style={{
        color: color === 'white' ? '#ffffff' : '#000000',
        filter: color === 'white' ? 'drop-shadow(2px 2px 3px rgba(0,0,0,0.8))' : 'none',
        textShadow: color === 'white' ? '1px 1px 2px rgb(0 0 0), 0 0 0 2px #3b82f6' : 'none'
      }}>
      {pieceSymbols[color][type]}
    </div>
  );
};

export default function ChessGame() {
  const [board, setBoard] = useState<Square[][]>([]);
  const [selectedSquare, setSelectedSquare] = useState<{row: number, col: number} | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [gameStatus, setGameStatus] = useState<'playing' | 'check' | 'checkmate' | 'draw'>('playing');
  const [capturedPieces, setCapturedPieces] = useState<{white: Piece[], black: Piece[]}>({white: [], black: []});
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [kingInCheck, setKingInCheck] = useState<{color: PieceColor | null, position: {row: number, col: number} | null}>({color: null, position: null});
  const [gameResult, setGameResult] = useState<{winner: string, method: string} | null>(null);
  const [gameStartTime, setGameStartTime] = useState<number>(Date.now());
  
  // Game settings
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timeControl, setTimeControl] = useState<number>(600); // seconds
  const [gameMode, setGameMode] = useState<'ai' | 'human' | 'online'>('ai');
  const [whiteTime, setWhiteTime] = useState<number>(timeControl);
  const [blackTime, setBlackTime] = useState<number>(timeControl);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Initialize chess board
  useEffect(() => {
    initializeBoard();
  }, []);

  // Effect to handle computer moves
  useEffect(() => {
    if (currentPlayer === 'black' && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 1500); // Longer delay to show AI is "thinking"
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameStatus, board]); // Include board to ensure fresh state

  const initializeBoard = () => {
    const newBoard: Square[][] = [];
    
    // Initialize empty board
    for (let row = 0; row < 8; row++) {
      newBoard[row] = [];
      for (let col = 0; col < 8; col++) {
        newBoard[row][col] = {
          piece: null,
          row,
          col
        };
      }
    }

    // Place pieces
    // Black pieces (top)
    const blackBackRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    for (let col = 0; col < 8; col++) {
      newBoard[0][col].piece = { type: blackBackRow[col], color: 'black' };
      newBoard[1][col].piece = { type: 'pawn', color: 'black' };
    }

    // White pieces (bottom)
    const whiteBackRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    for (let col = 0; col < 8; col++) {
      newBoard[7][col].piece = { type: whiteBackRow[col], color: 'white' };
      newBoard[6][col].piece = { type: 'pawn', color: 'white' };
    }

    setBoard(newBoard);
  };

  const handleSquareClick = (row: number, col: number) => {
    if (currentPlayer !== 'white' || gameStatus === 'checkmate') return; // Only allow human player moves
    
    // console.log(`Player clicked ${row},${col}, current player: ${currentPlayer}`); // Commented out to reduce console spam

    if (selectedSquare) {
      if (selectedSquare.row === row && selectedSquare.col === col) {
        // Deselect
        setSelectedSquare(null);
      } else {
        // Try to move
        if (isValidMove(selectedSquare.row, selectedSquare.col, row, col)) {
          // Check if this move would leave own king in check with proper deep copy
          const testBoard = board.map(boardRow => 
            boardRow.map(square => ({
              ...square,
              piece: square.piece ? { ...square.piece } : null
            }))
          );
          testBoard[row][col].piece = testBoard[selectedSquare.row][selectedSquare.col].piece;
          testBoard[selectedSquare.row][selectedSquare.col].piece = null;
          
          if (!isKingInCheck('white', testBoard)) {
            makeMove(selectedSquare.row, selectedSquare.col, row, col);
            setSelectedSquare(null);
            setCurrentPlayer('black');
            
            // Computer will move automatically via useEffect
          }
        } else {
          // Select new piece if it belongs to current player
          const piece = board[row][col].piece;
          if (piece && piece.color === currentPlayer) {
            setSelectedSquare({ row, col });
          } else {
            setSelectedSquare(null);
          }
        }
      }
    } else {
      // Select piece
      const piece = board[row][col].piece;
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare({ row, col });
      }
    }
  };

  const isValidMove = (fromRow: number, fromCol: number, toRow: number, toCol: number, testBoard = board): boolean => {
    const piece = testBoard[fromRow][fromCol].piece;
    const targetPiece = testBoard[toRow][toCol].piece;
    
    if (!piece) return false;
    if (targetPiece && targetPiece.color === piece.color) return false;
    
    // Basic movement validation (simplified)
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        if (fromCol === toCol) {
          // Forward move
          if (toRow === fromRow + direction && !targetPiece) return true;
          if (fromRow === startRow && toRow === fromRow + 2 * direction && !targetPiece) return true;
        } else if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction && targetPiece) {
          // Capture
          return true;
        }
        return false;
        
      case 'rook':
        return (rowDiff === 0 || colDiff === 0) && isPathClear(fromRow, fromCol, toRow, toCol, testBoard);
        
      case 'bishop':
        return rowDiff === colDiff && isPathClear(fromRow, fromCol, toRow, toCol, testBoard);
        
      case 'queen':
        return (rowDiff === 0 || colDiff === 0 || rowDiff === colDiff) && isPathClear(fromRow, fromCol, toRow, toCol, testBoard);
        
      case 'king':
        return rowDiff <= 1 && colDiff <= 1;
        
      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        
      default:
        return false;
    }
  };

  const isPathClear = (fromRow: number, fromCol: number, toRow: number, toCol: number, testBoard = board): boolean => {
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
    
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;
    
    while (currentRow !== toRow || currentCol !== toCol) {
      if (testBoard[currentRow][currentCol].piece) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    return true;
  };

  const isKingInCheck = (color: PieceColor, testBoard = board): boolean => {
    // Find king position
    let kingRow = -1, kingCol = -1;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = testBoard[row][col].piece;
        if (piece && piece.type === 'king' && piece.color === color) {
          kingRow = row;
          kingCol = col;
          break;
        }
      }
    }
    
    if (kingRow === -1) return false;
    
    // Check if any opponent piece can attack the king
    const opponentColor = color === 'white' ? 'black' : 'white';
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = testBoard[row][col].piece;
        if (piece && piece.color === opponentColor) {
          if (isValidMove(row, col, kingRow, kingCol, testBoard)) {
            return true;
          }
        }
      }
    }
    
    return false;
  };

  const isCheckmate = (color: PieceColor): boolean => {
    return isCheckmateInBoard(color, board);
  };

  const isCheckmateInBoard = (color: PieceColor, testBoard: Square[][]): boolean => {
    // If not in check, can't be checkmate
    if (!isKingInCheck(color, testBoard)) return false;
    
    // Try all possible moves to see if any can get out of check
    for (let fromRow = 0; fromRow < 8; fromRow++) {
      for (let fromCol = 0; fromCol < 8; fromCol++) {
        const piece = testBoard[fromRow][fromCol].piece;
        if (piece && piece.color === color) {
          for (let toRow = 0; toRow < 8; toRow++) {
            for (let toCol = 0; toCol < 8; toCol++) {
              if (isValidMove(fromRow, fromCol, toRow, toCol, testBoard)) {
                // Simulate the move with proper deep copy
                const simulatedBoard = testBoard.map(row => 
                  row.map(square => ({
                    ...square,
                    piece: square.piece ? { ...square.piece } : null
                  }))
                );
                simulatedBoard[toRow][toCol].piece = simulatedBoard[fromRow][fromCol].piece;
                simulatedBoard[fromRow][fromCol].piece = null;
                
                // If this move gets out of check, it's not checkmate
                if (!isKingInCheck(color, simulatedBoard)) {
                  return false;
                }
              }
            }
          }
        }
      }
    }
    
    return true; // No legal moves can escape check
  };

  const findKingPosition = (color: PieceColor): {row: number, col: number} | null => {
    return findKingPositionInBoard(color, board);
  };

  const findKingPositionInBoard = (color: PieceColor, testBoard: Square[][]): {row: number, col: number} | null => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = testBoard[row][col].piece;
        if (piece && piece.type === 'king' && piece.color === color) {
          return {row, col};
        }
      }
    }
    return null;
  };

  const makeMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    // Create a deep copy of the board to avoid mutations
    const newBoard = board.map(row => 
      row.map(square => ({
        ...square,
        piece: square.piece ? { ...square.piece } : null
      }))
    );
    
    const piece = newBoard[fromRow][fromCol].piece;
    const capturedPiece = newBoard[toRow][toCol].piece;
    
    if (!piece) return; // Safety check
    
    // Move piece
    newBoard[toRow][toCol].piece = piece;
    newBoard[fromRow][fromCol].piece = null;
    
    // Handle captured pieces
    if (capturedPiece && piece) {
      setCapturedPieces(prev => ({
        ...prev,
        [piece.color]: [...prev[piece.color], capturedPiece]
      }));
    }
    
    setBoard(newBoard);
    
    // Add to move history
    const moveNotation = `${piece?.type}${String.fromCharCode(97 + fromCol)}${8 - fromRow} to ${String.fromCharCode(97 + toCol)}${8 - toRow}`;
    setMoveHistory(prev => [...prev, moveNotation]);
    
    // Check for check/checkmate after the move
    if (piece) {
      const opponentColor = piece.color === 'white' ? 'black' : 'white';
      
      // Use the updated board for check detection
      if (isKingInCheck(opponentColor, newBoard)) {
        const kingPos = findKingPositionInBoard(opponentColor, newBoard);
        setKingInCheck({color: opponentColor, position: kingPos});
        
        if (isCheckmateInBoard(opponentColor, newBoard)) {
          setGameStatus('checkmate');
          const gameResult = {
            winner: piece.color === 'white' ? 'Player' : 'Grandmaster AI',
            method: 'Checkmate'
          };
          setGameResult(gameResult);
          
          // Save game analysis data for the current user
          const savedUser = localStorage.getItem('chessUser');
          if (savedUser) {
            const currentUser = JSON.parse(savedUser);
            const gameAnalysis = {
              id: Date.now().toString(),
              userId: currentUser.id,
              userEmail: currentUser.email,
              username: currentUser.username,
              date: new Date().toISOString(),
              winner: gameResult.winner,
              method: gameResult.method,
              totalMoves: moveHistory.length + 1,
              gameLength: Math.floor((Date.now() - gameStartTime) / 60000), // in minutes
              moveHistory: [...moveHistory, `${piece.type}${String.fromCharCode(97 + fromCol)}${8 - fromRow} to ${String.fromCharCode(97 + toCol)}${8 - toRow}`],
              finalPosition: newBoard,
              capturedPieces: capturedPieces
            };
            
            // Store in user-specific localStorage key
            const userAnalysesKey = `chessAnalyses_${currentUser.id}`;
            const existingAnalyses = JSON.parse(localStorage.getItem(userAnalysesKey) || '[]');
            existingAnalyses.unshift(gameAnalysis); // Add to beginning
            localStorage.setItem(userAnalysesKey, JSON.stringify(existingAnalyses.slice(0, 10))); // Keep last 10 games per user
          }
        } else {
          setGameStatus('check');
        }
      } else {
        setKingInCheck({color: null, position: null});
        setGameStatus('playing');
      }
    }
  };

  const pieceValues = {
    pawn: 100,
    knight: 320,
    bishop: 330,
    rook: 500,
    queen: 900,
    king: 20000
  };

  const positionalValues = {
    pawn: [
      [0,  0,  0,  0,  0,  0,  0,  0],
      [50, 50, 50, 50, 50, 50, 50, 50],
      [10, 10, 20, 30, 30, 20, 10, 10],
      [5,  5, 10, 25, 25, 10,  5,  5],
      [0,  0,  0, 20, 20,  0,  0,  0],
      [5, -5,-10,  0,  0,-10, -5,  5],
      [5, 10, 10,-20,-20, 10, 10,  5],
      [0,  0,  0,  0,  0,  0,  0,  0]
    ],
    knight: [
      [-50,-40,-30,-30,-30,-30,-40,-50],
      [-40,-20,  0,  0,  0,  0,-20,-40],
      [-30,  0, 10, 15, 15, 10,  0,-30],
      [-30,  5, 15, 20, 20, 15,  5,-30],
      [-30,  0, 15, 20, 20, 15,  0,-30],
      [-30,  5, 10, 15, 15, 10,  5,-30],
      [-40,-20,  0,  5,  5,  0,-20,-40],
      [-50,-40,-30,-30,-30,-30,-40,-50]
    ],
    bishop: [
      [-20,-10,-10,-10,-10,-10,-10,-20],
      [-10,  0,  0,  0,  0,  0,  0,-10],
      [-10,  0,  5, 10, 10,  5,  0,-10],
      [-10,  5,  5, 10, 10,  5,  5,-10],
      [-10,  0, 10, 10, 10, 10,  0,-10],
      [-10, 10, 10, 10, 10, 10, 10,-10],
      [-10,  5,  0,  0,  0,  0,  5,-10],
      [-20,-10,-10,-10,-10,-10,-10,-20]
    ],
    rook: [
      [0,  0,  0,  0,  0,  0,  0,  0],
      [5, 10, 10, 10, 10, 10, 10,  5],
      [-5,  0,  0,  0,  0,  0,  0, -5],
      [-5,  0,  0,  0,  0,  0,  0, -5],
      [-5,  0,  0,  0,  0,  0,  0, -5],
      [-5,  0,  0,  0,  0,  0,  0, -5],
      [-5,  0,  0,  0,  0,  0,  0, -5],
      [0,  0,  0,  5,  5,  0,  0,  0]
    ],
    queen: [
      [-20,-10,-10, -5, -5,-10,-10,-20],
      [-10,  0,  0,  0,  0,  0,  0,-10],
      [-10,  0,  5,  5,  5,  5,  0,-10],
      [-5,  0,  5,  5,  5,  5,  0, -5],
      [0,  0,  5,  5,  5,  5,  0, -5],
      [-10,  5,  5,  5,  5,  5,  0,-10],
      [-10,  0,  5,  0,  0,  0,  0,-10],
      [-20,-10,-10, -5, -5,-10,-10,-20]
    ],
    king: [
      [-30,-40,-40,-50,-50,-40,-40,-30],
      [-30,-40,-40,-50,-50,-40,-40,-30],
      [-30,-40,-40,-50,-50,-40,-40,-30],
      [-30,-40,-40,-50,-50,-40,-40,-30],
      [-20,-30,-30,-40,-40,-30,-30,-20],
      [-10,-20,-20,-20,-20,-20,-20,-10],
      [20, 20,  0,  0,  0,  0, 20, 20],
      [20, 30, 10,  0,  0, 10, 30, 20]
    ]
  };

  const evaluatePosition = (depth: number = 0): number => {
    return evaluatePositionOnBoard(board);
  };

  const evaluatePositionOnBoard = (gameBoard: Square[][]): number => {
    let score = 0;
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = gameBoard[row][col].piece;
        if (piece) {
          const pieceValue = pieceValues[piece.type!];
          const positionalValue = positionalValues[piece.type!][piece.color === 'black' ? row : 7 - row][col];
          
          if (piece.color === 'black') {
            score += pieceValue + positionalValue;
          } else {
            score -= pieceValue + positionalValue;
          }
        }
      }
    }

    // Add strategic bonuses for advanced play
    score += evaluateStrategicFactorsOnBoard(gameBoard);
    
    return score;
  };

  const evaluateStrategicFactors = (): number => {
    return evaluateStrategicFactorsOnBoard(board);
  };

  const evaluateStrategicFactorsOnBoard = (gameBoard: Square[][]): number => {
    let score = 0;
    
    // Control of center squares
    const centerSquares = [[3,3], [3,4], [4,3], [4,4]];
    centerSquares.forEach(([row, col]) => {
      const piece = gameBoard[row][col].piece;
      if (piece) {
        score += piece.color === 'black' ? 30 : -30;
      }
    });

    // Piece development (early game advantage)
    let blackDeveloped = 0, whiteDeveloped = 0;
    
    // Count developed pieces (not on starting squares)
    for (let col = 0; col < 8; col++) {
      if (!gameBoard[0][col].piece || gameBoard[0][col].piece?.color !== 'black') blackDeveloped++;
      if (!gameBoard[7][col].piece || gameBoard[7][col].piece?.color !== 'white') whiteDeveloped++;
    }
    
    score += (blackDeveloped - whiteDeveloped) * 20;

    // King safety
    score += evaluateKingSafetyOnBoard('black', gameBoard) - evaluateKingSafetyOnBoard('white', gameBoard);
    
    return score;
  };

  const evaluateKingSafety = (color: PieceColor): number => {
    return evaluateKingSafetyOnBoard(color, board);
  };

  const evaluateKingSafetyOnBoard = (color: PieceColor, gameBoard: Square[][]): number => {
    let safety = 0;
    let kingRow = -1, kingCol = -1;
    
    // Find king position
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = gameBoard[row][col].piece;
        if (piece && piece.type === 'king' && piece.color === color) {
          kingRow = row;
          kingCol = col;
          break;
        }
      }
    }
    
    if (kingRow === -1) return -1000; // King captured
    
    // Check for pawn shield
    const direction = color === 'white' ? -1 : 1;
    const shieldRow = kingRow + direction;
    
    if (shieldRow >= 0 && shieldRow < 8) {
      for (let col = Math.max(0, kingCol - 1); col <= Math.min(7, kingCol + 1); col++) {
        const piece = gameBoard[shieldRow][col].piece;
        if (piece && piece.type === 'pawn' && piece.color === color) {
          safety += 50;
        }
      }
    }
    
    return safety;
  };

  const minimax = (depth: number, alpha: number, beta: number, maximizingPlayer: boolean, currentBoard?: Square[][]): {score: number, move?: any} => {
    const gameBoard = currentBoard || board;
    
    if (depth === 0) {
      return { score: evaluatePositionOnBoard(gameBoard) };
    }

    const moves = getAllValidMovesOnBoard(maximizingPlayer ? 'black' : 'white', gameBoard);
    
    if (moves.length === 0) {
      return { score: maximizingPlayer ? -10000 : 10000 };
    }

    let bestMove = null;

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      
      for (const move of moves) {
        // Create a new board with the move applied
        const newBoard = gameBoard.map(row => 
          row.map(square => ({
            ...square,
            piece: square.piece ? { ...square.piece } : null
          }))
        );
        newBoard[move.to.row][move.to.col].piece = newBoard[move.from.row][move.from.col].piece;
        newBoard[move.from.row][move.from.col].piece = null;
        
        const evaluation = minimax(depth - 1, alpha, beta, false, newBoard);
        
        if (evaluation.score > maxEval) {
          maxEval = evaluation.score;
          bestMove = move;
        }
        
        alpha = Math.max(alpha, evaluation.score);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      
      return { score: maxEval, move: bestMove };
    } else {
      let minEval = Infinity;
      
      for (const move of moves) {
        // Create a new board with the move applied
        const newBoard = gameBoard.map(row => 
          row.map(square => ({
            ...square,
            piece: square.piece ? { ...square.piece } : null
          }))
        );
        newBoard[move.to.row][move.to.col].piece = newBoard[move.from.row][move.from.col].piece;
        newBoard[move.from.row][move.from.col].piece = null;
        
        const evaluation = minimax(depth - 1, alpha, beta, true, newBoard);
        
        if (evaluation.score < minEval) {
          minEval = evaluation.score;
          bestMove = move;
        }
        
        beta = Math.min(beta, evaluation.score);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      
      return { score: minEval, move: bestMove };
    }
  };

  const getAllValidMoves = (color: PieceColor) => {
    return getAllValidMovesOnBoard(color, board);
  };

  const getAllValidMovesOnBoard = (color: PieceColor, gameBoard: Square[][]) => {
    const moves: {from: {row: number, col: number}, to: {row: number, col: number}, captureValue?: number}[] = [];
    
    for (let fromRow = 0; fromRow < 8; fromRow++) {
      for (let fromCol = 0; fromCol < 8; fromCol++) {
        const piece = gameBoard[fromRow][fromCol].piece;
        if (piece && piece.color === color) {
          for (let toRow = 0; toRow < 8; toRow++) {
            for (let toCol = 0; toCol < 8; toCol++) {
              if (isValidMove(fromRow, fromCol, toRow, toCol, gameBoard)) {
                // Check if this move leaves the king in check with proper deep copy
                const testBoard = gameBoard.map(row => 
                  row.map(square => ({
                    ...square,
                    piece: square.piece ? { ...square.piece } : null
                  }))
                );
                testBoard[toRow][toCol].piece = testBoard[fromRow][fromCol].piece;
                testBoard[fromRow][fromCol].piece = null;
                
                if (!isKingInCheck(color, testBoard)) {
                  const targetPiece = gameBoard[toRow][toCol].piece;
                  const captureValue = targetPiece ? pieceValues[targetPiece.type!] : 0;
                  
                  moves.push({
                    from: { row: fromRow, col: fromCol },
                    to: { row: toRow, col: toCol },
                    captureValue
                  });
                }
              }
            }
          }
        }
      }
    }
    
    // Sort moves: captures first, then by piece value
    return moves.sort((a, b) => (b.captureValue || 0) - (a.captureValue || 0));
  };

  const makeComputerMove = () => {
    // Only proceed if it's the computer's turn
    if (currentPlayer !== 'black' || gameStatus === 'checkmate') return;
    
    console.log("Grandmaster AI is calculating...");
    
    // Use advanced minimax algorithm with depth 3 for challenging gameplay
    const depth = 3;
    const result = minimax(depth, -Infinity, Infinity, true, board);
    
    if (result.move) {
      console.log(`Grandmaster AI moving from ${result.move.from.row},${result.move.from.col} to ${result.move.to.row},${result.move.to.col} (score: ${result.score})`);
      
      makeMove(result.move.from.row, result.move.from.col, result.move.to.row, result.move.to.col);
      setCurrentPlayer('white');
    } else {
      // Fallback to smart move selection if minimax fails
      const moves = getAllValidMovesOnBoard('black', board);
      if (moves.length > 0) {
        // Prioritize high-value captures, then positional moves
        const bestMove = moves.find(move => move.captureValue && move.captureValue > 500) || 
                        moves.find(move => move.captureValue && move.captureValue > 300) ||
                        moves.find(move => move.captureValue && move.captureValue > 0) ||
                        moves[0];
        
        console.log(`Fallback move: ${bestMove.from.row},${bestMove.from.col} to ${bestMove.to.row},${bestMove.to.col}`);
        makeMove(bestMove.from.row, bestMove.from.col, bestMove.to.row, bestMove.to.col);
        setCurrentPlayer('white');
      }
    }
  };

  const resetGame = () => {
    initializeBoard();
    setSelectedSquare(null);
    setCurrentPlayer('white');
    setGameStatus('playing');
    setCapturedPieces({white: [], black: []});
    setMoveHistory([]);
    setKingInCheck({color: null, position: null});
    setGameResult(null);
    setGameStartTime(Date.now());
  };

  const surrenderGame = () => {
    setGameStatus('checkmate');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-blue-900">Chess Game</h1>
            <Crown className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-blue-700">Face the ultimate chess challenge - Grandmaster AI with 3-level deep analysis!</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Info Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Player */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Current Turn</h3>
              <div className="flex items-center gap-3">
                {currentPlayer === 'white' ? (
                  <>
                    <User className="w-6 h-6 text-blue-600" />
                    <span className="font-medium">Your Turn (White)</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-6 h-6 text-red-600" />
                    <span className="font-medium">Grandmaster AI (Black)</span>
                  </>
                )}
              </div>
            </div>

            {/* Game Settings */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Game Settings</h3>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              
              {showSettings && (
                <div className="space-y-4 mb-4">
                  {/* Difficulty Setting */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Zap className="inline w-4 h-4 mr-1" />
                      Difficulty
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  
                  {/* Time Control */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline w-4 h-4 mr-1" />
                      Time Control
                    </label>
                    <select
                      value={timeControl}
                      onChange={(e) => {
                        const newTime = parseInt(e.target.value);
                        setTimeControl(newTime);
                        setWhiteTime(newTime);
                        setBlackTime(newTime);
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={300}>5 Minutes</option>
                      <option value={600}>10 Minutes</option>
                      <option value={900}>15 Minutes</option>
                      <option value={1800}>30 Minutes</option>
                      <option value={3600}>1 Hour</option>
                    </select>
                  </div>
                  
                  {/* Game Mode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline w-4 h-4 mr-1" />
                      Opponent
                    </label>
                    <select
                      value={gameMode}
                      onChange={(e) => setGameMode(e.target.value as 'ai' | 'human' | 'online')}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="ai">AI Computer</option>
                      <option value="human">Local Human</option>
                      <option value="online">Online Human (Coming Soon)</option>
                    </select>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <button
                  onClick={resetGame}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Game
                </button>
                <button
                  onClick={surrenderGame}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Flag className="w-4 h-4" />
                  Surrender
                </button>
              </div>
            </div>
            
            {/* Time Display */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Game Timer</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">White Time:</span>
                  <span className="text-lg font-bold text-blue-900">
                    {Math.floor(whiteTime / 60)}:{(whiteTime % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Black Time:</span>
                  <span className="text-lg font-bold text-blue-900">
                    {Math.floor(blackTime / 60)}:{(blackTime % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* Captured Pieces */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Captured Pieces</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Computer Captured:</p>
                  <div className="flex flex-wrap gap-1">
                    {capturedPieces.black.map((piece, index) => (
                      <ChessPiece 
                        key={index}
                        type={piece.type} 
                        color={piece.color}
                        size="text-2xl"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">You Captured:</p>
                  <div className="flex flex-wrap gap-1">
                    {capturedPieces.white.map((piece, index) => (
                      <ChessPiece 
                        key={index}
                        type={piece.type} 
                        color={piece.color}
                        size="text-2xl"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chess Board */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
              <div className="grid grid-cols-8 gap-0 border-4 border-blue-900 rounded-lg overflow-hidden shadow-xl">
                {board.map((row, rowIndex) =>
                  row.map((square, colIndex) => {
                    const isLight = (rowIndex + colIndex) % 2 === 0;
                    const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
                    const isKingInCheckSquare = kingInCheck.position && 
                      kingInCheck.position.row === rowIndex && 
                      kingInCheck.position.col === colIndex;
                    
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                        className={`
                          w-20 h-20 flex items-center justify-center cursor-pointer transition-all duration-200 hover:brightness-110
                          ${isLight ? 'bg-white' : 'bg-blue-500'}
                          ${isSelected ? 'ring-4 ring-yellow-400 ring-inset' : ''}
                          ${isKingInCheckSquare ? 'animate-pulse bg-red-500 ring-4 ring-red-300' : ''}
                        `}
                      >
                        {square.piece && (
                          <ChessPiece 
                            type={square.piece.type} 
                            color={square.piece.color}
                            size="text-5xl"
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
              
              {/* Board coordinates */}
              <div className="flex justify-between mt-2 px-2">
                {'abcdefgh'.split('').map(letter => (
                  <span key={letter} className="text-sm font-medium text-blue-900 w-20 text-center">
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Game Status & Results */}
        {gameStatus === 'check' && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl animate-pulse">⚠️</span>
              <h3 className="text-xl font-bold text-red-800">CHECK!</h3>
              <span className="text-2xl animate-pulse">⚠️</span>
            </div>
            <p className="text-red-700">
              {kingInCheck.color === 'white' ? 'Your' : 'Grandmaster AI\'s'} king is under attack!
            </p>
          </div>
        )}

        {gameStatus === 'checkmate' && gameResult && (
          <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-12 h-12 text-yellow-400 animate-bounce" />
              <h2 className="text-3xl font-bold">CHECKMATE!</h2>
              <Crown className="w-12 h-12 text-yellow-400 animate-bounce" />
            </div>
            <p className="text-xl mb-4">{gameResult.winner} wins by {gameResult.method}!</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={() => window.location.href = '/analysis'}
                className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                View Analysis
              </button>
            </div>
          </div>
        )}

        {/* Move History */}
        {moveHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Move History</h3>
            <div className="max-h-32 overflow-y-auto">
              <div className="text-sm text-gray-600 space-y-1">
                {moveHistory.map((move, index) => (
                  <div key={index}>
                    {index + 1}. {move}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}