import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SectionDivider } from './SectionDivider';

export function AboutSection() {
  return (
    <>
      <SectionDivider variant="wave" />
      
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a]/20 to-[#0a0a1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Portrait with 3D effects */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div 
                className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-lg overflow-hidden"
                whileHover={{ 
                  rotateY: 5,
                  rotateX: -5,
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Multiple glow layers for depth */}
                <motion.div 
                  className="absolute -inset-8 bg-purple-600/30 blur-3xl rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -inset-6 bg-pink-600/20 blur-2xl rounded-full"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQxODQyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Wojcech Bożemski"
                  className="relative z-10 w-full h-full object-cover"
                />
                
                {/* Glass morphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent backdrop-blur-[1px]" />
              </motion.div>

              {/* Floating particles around image */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-400 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 3) * 30}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <motion.h2 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Kim jestem
              </motion.h2>
              
              <motion.p 
                className="text-white/70 leading-relaxed" 
                style={{ fontSize: '1rem', lineHeight: '1.9' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Jestem terapeutą specjalizującym się w nowych metodach
                w wyjaśnianiu przyczyn i przywracaniu zdrowia
                także w polu energetycznych połączeń i uzdrowień
                relacyjnych, sprzedaży, własności
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider variant="energy" />
    </>
  );
}
