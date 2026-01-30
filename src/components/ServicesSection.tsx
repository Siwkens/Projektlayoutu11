import { motion } from 'motion/react';
import { Hand, Infinity, Radio, Shield, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

import service1 from "figma:asset/d341cd1dd9afe1657b91f87774a2745bca12aeca.png";
import service2 from "figma:asset/6c63c61f1171641b7368e72f973f9729e56663f6.png";
import service3 from "figma:asset/8764f445faccbbbf029a02fe3b36f4873b0e872d.png";
import service4 from "figma:asset/92bc2f6976c3b7b7861df3766cbccd1eae58226c.png";

const services = [
  {
    title: 'Bioterapia',
    subtitle: 'Manualna i Energetyczna',
    description: 'Oczyszczanie i harmonizacja czakr oraz aury',
    details: 'Bezpośrednia praca z polem energetycznym pacjenta. Usuwanie blokad, zasilanie organów energią witalną i przywracanie homeostazy.',
    image: service1,
    icon: Hand,
    gradient: 'from-purple-600 via-purple-500 to-pink-600',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    accentColor: '#a855f7',
  },
  {
    title: 'Synchronizacja',
    subtitle: 'Kwantowa',
    description: 'Metoda Dwupunktowa i praca z intencją',
    details: 'Transformacja rzeczywistości poprzez pole serca i świadomości. Szybkie zmiany wzorców i przekonań na poziomie kwantowym.',
    image: service2,
    icon: Infinity,
    gradient: 'from-blue-600 via-blue-500 to-cyan-600',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    accentColor: '#3b82f6',
  },
  {
    title: 'Sesje',
    subtitle: 'na odległość',
    description: 'Pełna skuteczność bez kontaktu fizycznego',
    details: 'Energia nie zna granic czasu i przestrzeni. Sesje online są równie skuteczne co spotkania osobiste, idealne dla osób z zagranicy.',
    image: service3,
    icon: Radio,
    gradient: 'from-indigo-600 via-indigo-500 to-purple-600',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    accentColor: '#6366f1',
  },
  {
    title: 'Oczyszczanie',
    subtitle: 'Przestrzeni i Relacji',
    description: 'Harmonia w domu i w związkach',
    details: 'Energetyczne oczyszczanie mieszkań z ciężkich energii oraz uzdrawianie toksycznych relacji i węzłów karmicznych.',
    image: service4,
    icon: Shield,
    gradient: 'from-emerald-600 via-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    accentColor: '#10b981',
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card container */}
      <div 
        className={`
          relative overflow-hidden rounded-3xl
          backdrop-blur-xl bg-white/5 border border-white/10
          transition-all duration-500
          ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
        `}
        style={{
          boxShadow: isHovered 
            ? `0 25px 50px -12px ${service.glowColor}, 0 0 0 1px ${service.glowColor}`
            : '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className={`
          flex flex-col lg:flex-row
          ${isReversed ? 'lg:flex-row-reverse' : ''}
        `}>
          {/* Image section - 50% */}
          <div className="relative lg:w-1/2 h-80 lg:h-auto overflow-hidden">
            {/* Image */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ImageWithFallback
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-40`} />
            <div 
              className={`
                absolute inset-0 bg-gradient-to-r 
                ${isReversed 
                  ? 'from-transparent via-transparent to-[#0a0a1a]/80' 
                  : 'from-[#0a0a1a]/80 via-transparent to-transparent'
                }
              `} 
            />

            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 opacity-0"
              animate={{
                opacity: isHovered ? 0.3 : 0,
              }}
              transition={{ duration: 0.4 }}
              style={{
                background: `radial-gradient(circle at ${isReversed ? '100%' : '0%'} 50%, ${service.glowColor} 0%, transparent 60%)`,
              }}
            />

            {/* Floating icon badge */}
            <motion.div
              className={`
                absolute top-8 ${isReversed ? 'right-8' : 'left-8'}
                p-4 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20
              `}
              animate={{
                y: isHovered ? -8 : 0,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ 
                y: { duration: 0.4 },
                rotate: { duration: 0.8, ease: "easeInOut" }
              }}
              style={{
                boxShadow: `0 8px 32px ${service.glowColor}`,
              }}
            >
              <service.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
              
              {/* Icon glow pulse */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(circle, ${service.glowColor} 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: 999999,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Animated border shimmer */}
            <motion.div
              className="absolute inset-0 opacity-0 pointer-events-none"
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${isReversed ? '-90deg' : '90deg'}, transparent, ${service.glowColor}, transparent)`,
                }}
                animate={{
                  x: isReversed ? ['100%', '-100%'] : ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: 999999,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>

          {/* Content section - 50% */}
          <div className={`
            relative lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center
            ${isReversed ? 'lg:pr-16' : 'lg:pl-16'}
          `}>
            {/* Subtle gradient background */}
            <div 
              className={`
                absolute inset-0 opacity-5
                bg-gradient-to-br ${service.gradient}
              `}
            />

            {/* Accent line */}
            <motion.div
              className={`
                absolute top-0 ${isReversed ? 'right-0' : 'left-0'}
                h-full w-1
              `}
              style={{
                background: `linear-gradient(to bottom, transparent, ${service.accentColor}, transparent)`,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
              viewport={{ once: true }}
            />

            <div className="relative z-10">
              {/* Category badge */}
              <motion.div
                className="inline-block mb-4"
                initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
              >
                <div 
                  className="px-4 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 rounded-full"
                  style={{
                    boxShadow: `0 4px 16px ${service.glowColor}`,
                  }}
                >
                  <span 
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: service.accentColor }}
                  >
                    {service.subtitle}
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-white text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              >
                {service.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-white/70 text-lg mb-4 leading-relaxed"
                initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                viewport={{ once: true }}
              >
                {service.description}
              </motion.p>

              {/* Details */}
              <motion.p
                className="text-white/50 text-base mb-6 leading-relaxed"
                initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                viewport={{ once: true }}
              >
                {service.details}
              </motion.p>

              {/* Hover indicator */}
              <motion.div
                className="flex items-center gap-2 text-white/40 text-sm"
                animate={{
                  x: isHovered ? (isReversed ? -8 : 8) : 0,
                  opacity: isHovered ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-medium">Najedź, aby zobaczyć animację</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Decorative corner elements */}
            <div 
              className={`absolute top-4 ${isReversed ? 'right-4' : 'left-4'} w-8 h-8 border-t-2 ${isReversed ? 'border-r-2' : 'border-l-2'} ${isReversed ? 'rounded-tr-lg' : 'rounded-tl-lg'}`}
              style={{ borderColor: service.accentColor, opacity: 0.3 }}
            />
            <div 
              className={`absolute bottom-4 ${isReversed ? 'right-4' : 'left-4'} w-8 h-8 border-b-2 ${isReversed ? 'border-r-2' : 'border-l-2'} ${isReversed ? 'rounded-br-lg' : 'rounded-bl-lg'}`}
              style={{ borderColor: service.accentColor, opacity: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Outer glow on hover */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl blur-2xl"
        style={{
          background: `radial-gradient(circle at ${isReversed ? '100%' : '0%'} 50%, ${service.glowColor} 0%, transparent 60%)`,
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: 999999,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: 999999,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: 999999,
              ease: "easeInOut"
            }}
          >
            <div className="px-6 py-2.5 backdrop-blur-md bg-white/5 border border-white/10 rounded-full">
              <span className="text-purple-400 text-sm font-semibold tracking-wider">METODY TERAPEUTYCZNE</span>
            </div>
          </motion.div>
          
          <h2 className="text-white text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Jak pracuję z energią
          </h2>
          
          <p className="text-white/60 text-xl max-w-3xl mx-auto leading-relaxed">
            Odkryj unikalne metody energetyczne łączące tradycyjną wiedzę z nowoczesnymi technikami kwantowymi
          </p>
        </motion.div>

        {/* Service cards - vertical stack with zigzag layout */}
        <div className="space-y-12 lg:space-y-16">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
