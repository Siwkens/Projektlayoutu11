import { motion } from 'motion/react';
import { Activity, Waves, Sparkles } from 'lucide-react';
import { SectionDivider } from './SectionDivider';

const steps = [
  {
    number: '1',
    title: 'Diagnoza',
    subtitle: 'energetyczna',
    icon: Activity,
  },
  {
    number: '2',
    title: 'Proces',
    subtitle: 'korekcji energii',
    icon: Waves,
  },
  {
    number: '3',
    title: 'Integracja',
    subtitle: 'i stabilizacja',
    icon: Sparkles,
  },
];

export function ProcessSection() {
  return (
    <>
      <SectionDivider variant="geometric" />
      
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white text-center mb-16"
          >
            Jak przebiega sesja
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
                style={{ perspective: '1000px' }}
              >
                {/* Card */}
                <motion.div
                  className="relative bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center group cursor-pointer"
                  whileHover={{ 
                    y: -10,
                    rotateX: 5,
                    rotateY: 5,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Glow effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 rounded-lg transition-all duration-300"
                    whileHover={{
                      background: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                      boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
                    }}
                  />
                  
                  <div className="relative z-10">
                    {/* Number with animated ring */}
                    <div className="mb-6 flex justify-center relative">
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/40 to-blue-600/40 border border-white/20 flex items-center justify-center relative"
                        whileHover={{ scale: 1.1 }}
                      >
                        {/* Rotating ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-400"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <span className="text-white" style={{ fontSize: '2rem' }}>
                          {step.number}
                        </span>
                      </motion.div>
                    </div>

                    {/* Icon with 3D rotation on hover */}
                    <motion.div 
                      className="mb-4 flex justify-center"
                      whileHover={{ rotateY: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <step.icon className="w-12 h-12 text-purple-300/60" strokeWidth={1.5} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-white mb-2" style={{ fontSize: '1.3rem' }}>
                      {step.title}
                    </h3>
                    <p className="text-white/70" style={{ fontSize: '0.95rem' }}>
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Floating particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${30 + i * 20}%`,
                        top: `${20 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Connecting line with animation */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500/40 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
