import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

let rippleId = 0;

export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: rippleId++ };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 800);
  };

  const RippleContainer = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, opacity: 0.5, x: 0, y: 0 }}
            animate={{ 
              width: 400, 
              height: 400, 
              opacity: 0,
              x: -200,
              y: -200,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  return { createRipple, RippleContainer };
}
