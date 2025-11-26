import { motion } from 'motion/react';

export function MorphingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large blob 1 */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Large blob 2 */}
      <motion.div
        className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Medium blob 3 */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Smaller accent blobs */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-60 h-60 bg-purple-400/25 rounded-full blur-2xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
