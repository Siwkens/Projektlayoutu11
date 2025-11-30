import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SectionDivider } from './SectionDivider';

import portraitImage from 'figma:asset/9592c4a21b5692dd6eb431cd07275a9415a49caf.png';

export function AboutSection() {
  return (
    <>
      <SectionDivider variant="wave" />
      
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a]/20 to-[#0a0a1a]" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Portrait with 3D effects - Adjusted for landscape image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div 
                className="relative w-full rounded-lg overflow-hidden shadow-2xl"
                whileHover={{ 
                  rotateY: 2,
                  rotateX: -2,
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Multiple glow layers for depth */}
                <motion.div 
                  className="absolute -inset-8 bg-purple-600/20 blur-3xl rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <ImageWithFallback
                  src={portraitImage}
                  alt="Wojciech Bożemski"
                  className="relative z-10 w-full h-auto object-cover rounded-lg border border-white/10"
                />
                
                {/* Glass morphism overlay / Vignette to blend the edges */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-transparent to-transparent opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/80 via-transparent to-transparent" />
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
                Jako certyfikowany bioenergoterapeuta i pasjonat fizyki kwantowej, pomagam ludziom odzyskać wewnętrzną równowagę. 
                Moje sesje opierają się na głębokim zrozumieniu struktury energetycznej człowieka – czakr, aury i meridianów. 
                Wspieram procesy samouzdrawiania, usuwając blokady emocjonalne i energetyczne, które mogą manifestować się jako dolegliwości fizyczne.
                Wierzę, że każdy z nas posiada naturalny potencjał do życia w pełni zdrowia i harmonii.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider variant="energy" />
    </>
  );
}
