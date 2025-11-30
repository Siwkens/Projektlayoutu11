import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useMood } from './context/MoodContext';

interface PageTransitionProps {
  children: ReactNode;
  delay?: number;
}

export function PageTransition({ children, delay = 0 }: PageTransitionProps) {
  const { colors } = useMood();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Cubic bezier for smooth motion
      }}
    >
      {children}
    </motion.div>
  );
}

interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function SectionTransition({ children, id, className = '' }: SectionTransitionProps) {
  const { colors } = useMood();

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ 
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1] // Smooth ease out
        }}
      >
        {children}
      </motion.div>

      {/* Animated section divider */}
      <motion.div
        className="relative h-px w-full overflow-hidden mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 h-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.primary}60, ${colors.accent}60, transparent)`,
          }}
          initial={{ x: '-100%' }}
          whileInView={{ x: '100%' }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.5, 
            delay: 0.5,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.section>
  );
}

// Stagger children animations
interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ children, staggerDelay = 0.1, className = '' }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
};
