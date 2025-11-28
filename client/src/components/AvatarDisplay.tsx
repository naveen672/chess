import { useState } from 'react';
import { Edit, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AvatarCustomizer from './AvatarCustomizer';

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

interface AvatarDisplayProps {
  avatar: AvatarConfig;
  size?: 'small' | 'medium' | 'large';
  editable?: boolean;
}

export default function AvatarDisplay({ avatar, size = 'medium', editable = false }: AvatarDisplayProps) {
  const { updateAvatar } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(avatar);
  const [isLoading, setIsLoading] = useState(false);

  const chessePieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
  const pieceNames = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-4xl w-14 h-14 font-black';
      case 'large':
        return 'text-9xl w-28 h-28 font-black';
      default:
        return 'text-7xl w-20 h-20 font-black';
    }
  };

  const handleSave = async () => {
    if (!isEditing) return;
    
    setIsLoading(true);
    try {
      await updateAvatar(editingAvatar);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update avatar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingAvatar(avatar);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Edit Avatar</h3>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
        <AvatarCustomizer avatar={editingAvatar} onAvatarChange={setEditingAvatar} />
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <div 
        className={`${getSizeClasses()} flex items-center justify-center transition-all duration-300 rounded-lg drop-shadow-lg`}
        style={{ color: avatar.color }}
      >
        {chessePieces[pieceNames.indexOf(avatar.piece)]}
      </div>
      
      {editable && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          title="Edit Avatar"
        >
          <Edit className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}