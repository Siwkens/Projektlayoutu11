import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-30"
      style={{
        left: x,
        top: y,
        x: '-50%',
        y: '-50%',
      }}
    >
      {/* Main spotlight */}
      <div 
        className="w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, rgba(167, 139, 250, 0.05) 30%, transparent 70%)',
        }}
      />
      
      {/* Inner glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
