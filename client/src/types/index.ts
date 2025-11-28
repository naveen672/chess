export interface User {
  id: number;
  email: string;
  username: string;
  skillLevel: string;
  completedLessons: string[];
  totalPoints: number;
  subscriptionTier: string;
  isVolunteer: boolean;
  avatar: {
    piece: string;
    color: string;
    accessories: {
      eyebrows?: string;
      hair?: string;
      nose?: string;
      mouth?: string;
      ears?: string;
    };
  };
}

export interface Island {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'main' | 'video' | 'puzzle' | 'game' | 'assessment';
  position: { x: number; y: number };
  unlocked: boolean;
  completed: boolean;
  icon: string;
  description: string;
}

export interface Lesson {
  id: string;
  title: string;
  level: string;
  description: string;
  content: string;
  completed: boolean;
}

export interface ChessPuzzle {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  position: string; // FEN notation
  solution: string[];
  description: string;
}