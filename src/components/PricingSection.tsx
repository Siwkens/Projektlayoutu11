import { motion } from 'motion/react';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';
import { SectionDivider } from './SectionDivider';

const pricingPlans = [
  {
    id: 1,
    name: 'Sesja pojedyncza',
    subtitle: 'Poznaj terapię',
    price: '250',
    duration: '60 min',
    icon: Sparkles,
    popular: false,
    features: [
      'Rozmowa diagnostyczna',
      'Sesja energetyczna (60 min)',
      'Analiza pola energetycznego',
      'Wskazówki na przyszłość',
      'Wsparcie przez 7 dni email',
    ],
    gradient: 'from-purple-600/20 to-blue-600/20',
    borderGradient: 'from-purple-600/30 to-blue-600/30',
  },
  {
    id: 2,
    name: 'Pakiet Start',
    subtitle: 'Najpopularniejszy',
    price: '650',
    originalPrice: '750',
    duration: '3 sesje',
    icon: Star,
    popular: true,
    features: [
      'Wszystko z sesji pojedynczej',
      '3 sesje energetyczne (60 min)',
      'Praca z głównymi blokami',
      'Plan terapeutyczny',
      'Materiały edukacyjne',
      'Wsparcie 24/7 przez cały czas trwania pakietu',
      'Rabat 13%',
    ],
    gradient: 'from-purple-600/30 to-blue-600/30',
    borderGradient: 'from-purple-400/50 to-blue-400/50',
  },
  {
    id: 3,
    name: 'Pakiet Premium',
    subtitle: 'Kompleksowa transformacja',
    price: '1200',
    originalPrice: '1500',
    duration: '6 sesji',
    icon: Crown,
    popular: false,
    features: [
      'Wszystko z pakietu Start',
      '6 sesji energetycznych (90 min)',
      'Głęboka praca transformacyjna',
      'Indywidualny plan rozwoju',
      'Sesje zdalne nielimitowane',
      'Dostęp do nagrań medytacji',
      'Priorytetowy kontakt',
      'Rabat 20%',
    ],
    gradient: 'from-amber-600/20 to-purple-600/20',
    borderGradient: 'from-amber-400/30 to-purple-400/30',
  },
];

const additionalServices = [
  { name: 'Sesja diagnostyczna (30 min)', price: '100 zł' },
  { name: 'Sesja zdalna (60 min)', price: '200 zł' },
  { name: 'Oczyszczanie przestrzeni', price: '400 zł' },
  { name: 'Konsultacja telefoniczna (20 min)', price: 'Gratis dla klientów pakietowych' },
];

interface PricingSectionProps {
  onBookingClick?: () => void;
}

export function PricingSection({ onBookingClick }: PricingSectionProps) {
  return (
    <>
      <SectionDivider variant="geometric" />
      
      <section id="pricing" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-5 h-5 text-purple-300" />
              <span className="text-white/80" style={{ fontSize: '0.9rem' }}>Cennik</span>
            </motion.div>
            
            <h2 className="text-white mb-4">
              Przejrzyste ceny
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Wybierz pakiet dopasowany do Twoich potrzeb. Wszystkie ceny są orientacyjne i mogą być dostosowane indywidualnie.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
                style={{ perspective: '1000px' }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white text-xs shadow-lg"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Najczęściej wybierany
                  </motion.div>
                )}

                <motion.div
                  className={`relative h-full bg-gradient-to-br ${plan.gradient} backdrop-blur-sm border rounded-2xl p-8 overflow-hidden ${
                    plan.popular ? 'border-purple-400/50 shadow-2xl shadow-purple-500/20' : 'border-white/10'
                  }`}
                  whileHover={{ 
                    y: -12,
                    rotateX: 3,
                    rotateY: 3,
                    borderColor: plan.popular ? 'rgba(167, 139, 250, 0.7)' : 'rgba(255, 255, 255, 0.25)',
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Glow effect */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-2xl transition-all duration-300`}
                    whileHover={{
                      opacity: 0.8,
                      boxShadow: plan.popular ? '0 25px 50px rgba(139, 92, 246, 0.4)' : '0 25px 50px rgba(139, 92, 246, 0.2)',
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-6 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.borderGradient} border border-white/20 flex items-center justify-center`}>
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>

                    {/* Plan Name */}
                    <h3 className="text-white text-center mb-2" style={{ fontSize: '1.5rem' }}>
                      {plan.name}
                    </h3>
                    <p className="text-white/60 text-center mb-6 text-sm">
                      {plan.subtitle}
                    </p>

                    {/* Price */}
                    <div className="text-center mb-6">
                      {plan.originalPrice && (
                        <p className="text-white/40 line-through text-sm mb-1">
                          {plan.originalPrice} zł
                        </p>
                      )}
                      <div className="flex items-end justify-center gap-2">
                        <span className="text-white" style={{ fontSize: '3rem', lineHeight: '1' }}>
                          {plan.price}
                        </span>
                        <span className="text-white/60 mb-2">zł</span>
                      </div>
                      <p className="text-white/50 text-sm mt-1">
                        {plan.duration}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Check className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      onClick={onBookingClick}
                      className={`w-full py-3 rounded-lg text-white transition-all ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/25'
                          : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Wybierz pakiet
                    </motion.button>
                  </div>

                  {/* Floating particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* 3D shadow */}
                <motion.div 
                  className={`absolute inset-0 -z-10 rounded-2xl blur-xl ${
                    plan.popular ? 'bg-purple-600/20' : 'bg-purple-600/10'
                  }`}
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Additional Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-white text-center mb-6" style={{ fontSize: '1.3rem' }}>
              Dodatkowe usługi
            </h3>
            
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="space-y-3">
                {additionalServices.map((service, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-white/80">{service.name}</span>
                    <span className="text-purple-300">{service.price}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/50 text-sm max-w-2xl mx-auto">
              * Ceny mogą być indywidualnie dostosowane do Twoich potrzeb. Pierwsza konsultacja diagnostyczna (15 min) jest bezpłatna. 
              Płatności można dokonywać gotówką, przelewem lub BLIK.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
