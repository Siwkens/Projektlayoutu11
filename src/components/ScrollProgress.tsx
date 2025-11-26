import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Circular progress indicator */}
      <div className="fixed bottom-8 right-8 z-50">
        <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="30"
            cy="30"
            r="26"
            stroke="rgba(167, 139, 250, 0.2)"
            strokeWidth="3"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="30"
            cy="30"
            r="26"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress
            }}
            strokeDasharray="0 1"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white"
          style={{ rotate: 90 }}
        >
          <motion.span style={{ 
            opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }) 
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.span>
        </motion.div>
      </div>
    </>
  );
}
