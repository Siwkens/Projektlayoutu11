import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type MoodType = 'calm' | 'stress' | 'fatigue';

interface MoodContextType {
  mood: MoodType;
  setMood: (mood: MoodType) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const moodThemes = {
  calm: { // Default (Purple/Cosmic)
    primary: '#8b5cf6', // Violet-500
    secondary: '#ec4899', // Pink-500
    accent: '#a78bfa',
    background: '#0a0a1a',
    text: '#ffffff'
  },
  stress: { // Calming (Blue/Teal)
    primary: '#2dd4bf', // Teal-400
    secondary: '#60a5fa', // Blue-400
    accent: '#99f6e4',
    background: '#0f172a', // Slate-900
    text: '#ffffff'
  },
  fatigue: { // Energizing (Orange/Amber)
    primary: '#fbbf24', // Amber-400
    secondary: '#f87171', // Red-400
    accent: '#fcd34d',
    background: '#1c1917', // Stone-900
    text: '#ffffff'
  }
};

const MOOD_STORAGE_KEY = 'mood_preference';

export function MoodProvider({ children }: { children: ReactNode }) {
  // Initialize mood from localStorage or default to 'calm'
  const [mood, setMoodState] = useState<MoodType>(() => {
    if (typeof window !== 'undefined') {
      const savedMood = localStorage.getItem(MOOD_STORAGE_KEY) as MoodType;
      if (savedMood && (savedMood === 'calm' || savedMood === 'stress' || savedMood === 'fatigue')) {
        return savedMood;
      }
    }
    return 'calm';
  });

  // Persist mood to localStorage whenever it changes
  const setMood = (newMood: MoodType) => {
    setMoodState(newMood);
    if (typeof window !== 'undefined') {
      localStorage.setItem(MOOD_STORAGE_KEY, newMood);
    }
  };

  return (
    <MoodContext.Provider value={{ mood, setMood, colors: moodThemes[mood] }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}