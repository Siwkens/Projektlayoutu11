import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailId++ }];
        return newTrail.slice(-8); // Keep only last 8 positions
      });

      // Check if hovering interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {trail.map((pos, index) => (
        <motion.div
          key={pos.id}
          className="fixed pointer-events-none z-50 rounded-full bg-purple-400"
          style={{
            left: pos.x,
            top: pos.y,
            width: 4,
            height: 4,
            x: -2,
            y: -2,
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ 
            opacity: 0,
            scale: 0.5,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full border-2 border-purple-400 mix-blend-difference"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          width: 32,
          height: 32,
          x: -16,
          y: -16,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-purple-400 opacity-20" />
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full bg-purple-400"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 28,
        }}
        style={{
          width: 6,
          height: 6,
          x: -3,
          y: -3,
        }}
      />
    </>
  );
}
