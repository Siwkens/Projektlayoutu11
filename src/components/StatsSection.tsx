import { motion } from 'motion/react';
import { AnimatedCounter } from './AnimatedCounter';
import { Users, Sparkles, Award, Heart } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: '+',
    label: 'Zadowolonych Klientów'
  },
  {
    icon: Sparkles,
    value: 1200,
    suffix: '+',
    label: 'Sesji Przeprowadzonych'
  },
  {
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'Lat Doświadczenia'
  },
  {
    icon: Heart,
    value: 98,
    suffix: '%',
    label: 'Rekomendacji'
  }
];

export function StatsSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-purple-950/20 to-[#0a0a1a]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <motion.div
                className="relative bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center"
                whileHover={{ 
                  y: -10,
                  borderColor: 'rgba(167, 139, 250, 0.5)',
                  boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)'
                }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-purple-600/0 rounded-lg blur-xl"
                  whileHover={{ background: 'rgba(139, 92, 246, 0.2)' }}
                />

                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-purple-600/40 to-blue-600/40 rounded-full"
                  whileHover={{ rotateY: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <stat.icon className="w-8 h-8 text-purple-300" strokeWidth={1.5} />
                </motion.div>

                {/* Counter */}
                <div className="text-white mb-2" style={{ fontSize: '2.5rem', fontWeight: '300' }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-white/70" style={{ fontSize: '0.9rem' }}>
                  {stat.label}
                </p>

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
                      y: [0, -15, 0],
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
