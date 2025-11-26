import { motion } from 'motion/react';
import { Sparkles, Globe, Radio, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRipple } from './RippleEffect';
import { useState } from 'react';

const services = [
  {
    title: 'Bietberapia',
    subtitle: 'Energetyczna',
    description: 'Przywracanie równowagi\nenergii i harmonii',
    backDescription: 'Kompleksowa praca z polem bioenergetycznym dla przywrócenia naturalnej równowagi organizmu',
    image: 'https://images.unsplash.com/photo-1761393972233-e0fecb5e94db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWNyZWQlMjBnZW9tZXRyeSUyMGxpZ2h0fGVufDF8fHx8MTc2NDE4NDI3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Sparkles,
  },
  {
    title: 'Terapia',
    subtitle: 'Kwantowa',
    description: 'Harmonizacja energii\nna poziomie kwantowym',
    backDescription: 'Praca na najgłębszym poziomie informacyjno-energetycznym z wykorzystaniem praw fizyki kwantowej',
    image: 'https://images.unsplash.com/photo-1734039176190-61264ba627c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwZW5lcmd5JTIwcHVycGxlfGVufDF8fHx8MTc2NDE4NDI3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Globe,
  },
  {
    title: 'Uzdrawianie',
    subtitle: 'na odległość',
    description: 'Praca energetyczna na odległość',
    backDescription: 'Skuteczna terapia bez względu na odległość - energia nie zna granic przestrzeni',
    image: 'https://images.unsplash.com/photo-1591630060069-7cb1f16261b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsaW5nJTIwaGFuZHMlMjBlbmVyZ3l8ZW58MXx8fHwxNzY0MTExMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Radio,
  },
  {
    title: 'Oczyszczanie',
    subtitle: 'Przestrzeni',
    description: 'Usuwanie wtargnięcia\ni negatywnej energii',
    backDescription: 'Harmonizacja przestrzeni domowej i biznesowej, neutralizacja negatywnych wpływów',
    image: 'https://images.unsplash.com/photo-1674228401343-b4c2568cc2ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBtZWRpdGF0aW9uJTIwcHVycGxlfGVufDF8fHx8MTc2NDE4NDI3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Home,
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { createRipple, RippleContainer } = useRipple();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative h-[400px]"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 group bg-gradient-to-b from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden cursor-pointer"
          whileHover={{ y: -8 }}
          onClick={createRipple}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <RippleContainer />
          
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.5), transparent)',
            }}
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <ImageWithFallback
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
            
            {/* Floating icon with 3D rotation */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              whileHover={{ rotateY: 360, scale: 1.2 }}
              transition={{ duration: 0.8 }}
            >
              <service.icon className="w-16 h-16 text-white/40" strokeWidth={1} />
            </motion.div>

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-colors duration-300"
              style={{
                boxShadow: '0 0 40px rgba(167, 139, 250, 0)',
              }}
              whileHover={{
                boxShadow: '0 0 40px rgba(167, 139, 250, 0.5)',
              }}
            />
          </div>

          {/* Content */}
          <div className="p-6 text-center relative">
            <h3 className="text-white mb-1" style={{ fontSize: '1.25rem' }}>
              {service.title}
            </h3>
            <p className="text-white/80 mb-3" style={{ fontSize: '1.1rem' }}>
              {service.subtitle}
            </p>
            <p className="text-white/60 whitespace-pre-line" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              {service.description}
            </p>
          </div>
        </motion.div>

        {/* Back of card */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden flex items-center justify-center p-6"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="text-center">
            <service.icon className="w-12 h-12 text-purple-300 mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-white mb-2" style={{ fontSize: '1.25rem' }}>
              {service.title}
            </h3>
            <p className="text-white/90" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
              {service.backDescription}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-3xl rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-white text-center mb-16"
        >
          Jak pracuję z energią
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
