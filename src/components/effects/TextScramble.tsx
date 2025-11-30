import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

const chars = '-_~=+*^&★†‡∆∇szcieł';

export function TextScramble({ text, className, trigger = true }: TextScrambleProps) {
  const [display, setDisplay] = useState('');
  
  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(prev => 
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {display}
    </motion.span>
  );
}