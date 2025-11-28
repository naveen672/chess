import { useState } from 'react';
import { Palette, RotateCcw } from 'lucide-react';

interface AvatarConfig {
  piece: string;
  color: string;
  accessories: {
    eyebrows?: string;
    hair?: string;
    nose?: string;
    mouth?: string;
    ears?: string;
  };
}

interface AvatarCustomizerProps {
  avatar: AvatarConfig;
  onAvatarChange: (avatar: AvatarConfig) => void;
}

export default function AvatarCustomizer({ avatar, onAvatarChange }: AvatarCustomizerProps) {
  const chessePieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
  const pieceNames = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
  const colors = ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe', '#1e40af', '#2563eb', '#3b82f6'];
  const accessories = {
    eyebrows: ['none', 'straight', 'thick', 'curved', 'raised'],
    hair: ['none', 'short', 'curly', 'long', 'spiky'],
    nose: ['none', 'small', 'large', 'pointed', 'round'],
    mouth: ['none', 'smile', 'serious', 'grin', 'frown'],
    ears: ['none', 'small', 'large', 'pointed', 'round']
  };

  const updateAvatar = (updates: Partial<AvatarConfig>) => {
    onAvatarChange({ ...avatar, ...updates });
  };

  const updateAccessory = (type: keyof typeof accessories, value: string) => {
    updateAvatar({
      accessories: {
        ...avatar.accessories,
        [type]: value === 'none' ? undefined : value
      }
    });
  };

  const resetAvatar = () => {
    onAvatarChange({
      piece: 'pawn',
      color: '#1e3a8a',
      accessories: {}
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Customize Your Avatar</h3>
        <button
          type="button"
          onClick={resetAvatar}
          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Avatar Preview */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div 
            className="text-8xl font-black transition-all duration-300 drop-shadow-lg"
            style={{ color: avatar.color }}
          >
            {chessePieces[pieceNames.indexOf(avatar.piece)]}
          </div>
          
          {/* Accessories overlay - positioned closer to piece with dramatic styling */}
          <div className="absolute inset-0 pointer-events-none">
            {avatar.accessories.eyebrows && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-lg font-bold text-gray-900 z-10 drop-shadow-sm">
                {avatar.accessories.eyebrows === 'straight' && '━━'}
                {avatar.accessories.eyebrows === 'thick' && '▬▬'}
                {avatar.accessories.eyebrows === 'curved' && '⌒⌒'}
                {avatar.accessories.eyebrows === 'raised' && '╱╲'}
              </div>
            )}
            
            {avatar.accessories.hair && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl font-extrabold text-amber-700 z-10 drop-shadow-md">
                {avatar.accessories.hair === 'short' && '⌒'}
                {avatar.accessories.hair === 'curly' && '🌀'}
                {avatar.accessories.hair === 'long' && '|||'}
                {avatar.accessories.hair === 'spiky' && '⚡'}
              </div>
            )}
            
            {avatar.accessories.mouth && (
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-lg font-bold text-red-600 z-10 drop-shadow-sm">
                {avatar.accessories.mouth === 'smile' && '😊'}
                {avatar.accessories.mouth === 'serious' && '😐'}
                {avatar.accessories.mouth === 'grin' && '😄'}
                {avatar.accessories.mouth === 'frown' && '😤'}
              </div>
            )}
            
            {avatar.accessories.nose && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-pink-500 z-10">
                {avatar.accessories.nose === 'small' && '●'}
                {avatar.accessories.nose === 'large' && '⬢'}
                {avatar.accessories.nose === 'pointed' && '▲'}
                {avatar.accessories.nose === 'round' && '⭕'}
              </div>
            )}

            {avatar.accessories.ears && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-peach-400 z-10">
                {avatar.accessories.ears === 'small' && (
                  <>
                    <span className="absolute -left-8 top-0">◐</span>
                    <span className="absolute -right-8 top-0">◑</span>
                  </>
                )}
                {avatar.accessories.ears === 'large' && (
                  <>
                    <span className="absolute -left-10 top-0">🔥</span>
                    <span className="absolute -right-10 top-0">🔥</span>
                  </>
                )}
                {avatar.accessories.ears === 'pointed' && (
                  <>
                    <span className="absolute -left-8 top-0">◂</span>
                    <span className="absolute -right-8 top-0">▸</span>
                  </>
                )}
                {avatar.accessories.ears === 'round' && (
                  <>
                    <span className="absolute -left-8 top-0">○</span>
                    <span className="absolute -right-8 top-0">○</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chess Piece Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Chess Piece</label>
        <div className="grid grid-cols-6 gap-2">
          {chessePieces.map((piece, index) => (
            <button
              key={piece}
              type="button"
              onClick={() => updateAvatar({ piece: pieceNames[index] })}
              className={`p-3 rounded-lg border text-2xl transition-all duration-200 ${
                avatar.piece === pieceNames[index]
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {piece}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <div className="grid grid-cols-8 gap-2">
          {colors.map((color, index) => (
            <button
              key={`color-${index}-${color}`}
              type="button"
              onClick={() => updateAvatar({ color })}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                avatar.color === color
                  ? 'border-gray-800 scale-110'
                  : 'border-gray-300 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Accessories */}
      <div className="space-y-4">
        {Object.entries(accessories).map(([type, options]) => (
          <div key={type}>
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {type}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateAccessory(type as keyof typeof accessories, option)}
                  className={`px-3 py-2 text-xs rounded-lg border transition-all duration-200 ${
                    (avatar.accessories[type as keyof typeof accessories] || 'none') === option
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}