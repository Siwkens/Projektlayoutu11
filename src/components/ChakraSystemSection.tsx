import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { SectionDivider } from './SectionDivider';

interface Chakra {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  position: { top: string; left: string };
  description: string;
  symptoms: string[];
  healing: string;
}

const chakras: Chakra[] = [
  {
    id: 'crown',
    name: 'Czakra Korony (Sahasrara)',
    color: '#A855F7', // Purple-500
    glowColor: 'rgba(168, 85, 247, 0.6)',
    position: { top: '5%', left: '50%' },
    description: 'Centrum duchowości, oświecenia i połączenia z wszechświatem. Odpowiada za poczucie sensu życia.',
    symptoms: ['Brak celu w życiu', 'Depresja', 'Zamknięcie na duchowość', 'Bóle głowy'],
    healing: 'Medytacja ciszy, kontakt z naturą, afirmacje: "Jestem połączony ze Źródłem".'
  },
  {
    id: 'third-eye',
    name: 'Czakra Trzeciego Oka (Ajna)',
    color: '#3B82F6', // Blue-500
    glowColor: 'rgba(59, 130, 246, 0.6)',
    position: { top: '12%', left: '50%' },
    description: 'Siedziba intuicji, wyobraźni i mądrości. Odpowiada za widzenie rzeczy takimi, jakimi są.',
    symptoms: ['Problemy ze wzrokiem', 'Brak koncentracji', 'Koszmary senne', 'Zamęt myślowy'],
    healing: 'Wizualizacje, koloroterapia (indygo), praca ze snami.'
  },
  {
    id: 'throat',
    name: 'Czakra Gardła (Vishuddha)',
    color: '#0EA5E9', // Sky-500
    glowColor: 'rgba(14, 165, 233, 0.6)',
    position: { top: '20%', left: '50%' },
    description: 'Ośrodek komunikacji i wyrażania siebie. Odpowiada za mówienie prawdy i kreatywność.',
    symptoms: ['Problemy z gardłem/tarczycą', 'Strach przed mówieniem', 'Nadmierne gadulstwo'],
    healing: 'Śpiew, pisanie dziennika, szczera rozmowa, kolor niebieski.'
  },
  {
    id: 'heart',
    name: 'Czakra Serca (Anahata)',
    color: '#22C55E', // Green-500
    glowColor: 'rgba(34, 197, 94, 0.6)',
    position: { top: '30%', left: '50%' },
    description: 'Centrum miłości, współczucia i uzdrawiania. Łączy materię z duchem.',
    symptoms: ['Problemy z sercem/płucami', 'Brak empatii', 'Lęk przed bliskością', 'Zazdrość'],
    healing: 'Praktyka wdzięczności, przebywanie w zieleni, praca z oddechem.'
  },
  {
    id: 'solar-plexus',
    name: 'Czakra Splotu Słonecznego (Manipura)',
    color: '#EAB308', // Yellow-500
    glowColor: 'rgba(234, 179, 8, 0.6)',
    position: { top: '40%', left: '50%' },
    description: 'Siedziba woli, pewności siebie i osobistej mocy. Odpowiada za realizację celów.',
    symptoms: ['Problemy trawienne', 'Niska samoocena', 'Brak asertywności', 'Agresja'],
    healing: 'Przebywanie na słońcu, ćwiczenia fizyczne, żółte jedzenie.'
  },
  {
    id: 'sacral',
    name: 'Czakra Sakralna (Svadhishthana)',
    color: '#F97316', // Orange-500
    glowColor: 'rgba(249, 115, 22, 0.6)',
    position: { top: '50%', left: '50%' },
    description: 'Ośrodek emocji, seksualności i kreatywności. Odpowiada za radość z życia.',
    symptoms: ['Zablokowana kreatywność', 'Problemy seksualne', 'Brak radości', 'Poczucie winy'],
    healing: 'Taniec, twórczość artystyczna, kąpiele w wodzie z solą morską.'
  },
  {
    id: 'root',
    name: 'Czakra Podstawy (Muladhara)',
    color: '#EF4444', // Red-500
    glowColor: 'rgba(239, 68, 68, 0.6)',
    position: { top: '60%', left: '50%' },
    description: 'Fundament istnienia. Odpowiada za poczucie bezpieczeństwa, przetrwanie i uziemienie.',
    symptoms: ['Lęk egzystencjalny', 'Brak stabilności finansowej', 'Osłabienie fizyczne'],
    healing: 'Chodzenie boso po ziemi, ćwiczenia fizyczne, czerwone jedzenie.'
  }
];

export function ChakraSystemSection() {
  const [selectedChakra, setSelectedChakra] = useState<Chakra | null>(null);

  return (
    <>
      <SectionDivider variant="wave" />
      <section className="relative py-24 px-6 overflow-hidden min-h-[900px]">
        {/* Background Decor */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col md:flex-row items-center justify-center gap-12">
          
          {/* Text Content */}
          <div className="md:w-1/3 text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Mapa <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Energii</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/60 mb-8"
            >
              Twój system energetyczny to sieć połączonych naczyń. 
              Kliknij w punkt na mapie, aby zrozumieć, co mówi Twoje ciało.
            </motion.p>
            
            {!selectedChakra && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden md:block p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 text-purple-300 mb-2">
                  <Info size={20} />
                  <span className="font-medium">Instrukcja</span>
                </div>
                <p className="text-sm text-white/60">
                  Wybierz jeden z pulsujących punktów na sylwetce, aby zobaczyć diagnozę energetyczną.
                </p>
              </motion.div>
            )}
          </div>

          {/* 3D Body Silhouette */}
          <div className="relative w-[300px] h-[600px] md:w-[400px] md:h-[700px] flex-shrink-0">
            {/* Silhouette SVG */}
            <svg viewBox="0 0 200 600" className="w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <path 
                d="M100,50 C115,50 125,60 125,75 C125,85 120,90 115,95 L135,120 C150,135 160,150 155,190 L150,250 C150,270 140,290 135,300 L130,450 L140,550 C140,560 130,570 120,570 L110,550 L105,400 L95,400 L90,550 L80,570 C70,570 60,560 60,550 L70,450 L65,300 C60,290 50,270 50,250 L45,190 C40,150 50,135 65,120 L85,95 C80,90 75,85 75,75 C75,60 85,50 100,50 Z" 
                fill="url(#bodyGradient)" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="1"
              />
              <defs>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Aura Glow */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl -z-10 scale-110 animate-pulse" />

            {/* Chakra Points */}
            {chakras.map((chakra) => (
              <motion.button
                key={chakra.id}
                style={{ 
                  top: chakra.position.top, 
                  left: chakra.position.left,
                  backgroundColor: chakra.color,
                  boxShadow: `0 0 20px ${chakra.glowColor}, 0 0 40px ${chakra.glowColor}`
                }}
                className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full cursor-pointer z-20"
                whileHover={{ scale: 1.5 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                onClick={() => setSelectedChakra(chakra)}
              />
            ))}
          </div>

          {/* Info Panel (Desktop: Side, Mobile: Modal overlay) */}
          <AnimatePresence mode="wait">
            {selectedChakra && (
              <motion.div
                key={selectedChakra.id}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                className="md:w-1/3 relative"
              >
                <div className="bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  
                  {/* Decorative Background based on chakra color */}
                  <div 
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 opacity-20"
                    style={{ backgroundColor: selectedChakra.color }} 
                  />

                  <button 
                    onClick={() => setSelectedChakra(null)}
                    className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  >
                    <X size={20} />
                  </button>

                  <h3 className="text-2xl font-bold text-white mb-2" style={{ color: selectedChakra.color }}>
                    {selectedChakra.name}
                  </h3>
                  <div className="w-full h-px bg-white/10 my-4" />
                  
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {selectedChakra.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                        Objawy blokady
                      </h4>
                      <ul className="space-y-2">
                        {selectedChakra.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                        Jak uzdrowić?
                      </h4>
                      <p className="text-sm text-white/70 italic bg-white/5 p-3 rounded-lg border border-white/5">
                        {selectedChakra.healing}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10 flex items-center justify-center gap-2">
                      Umów oczyszczanie tej czakry
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </>
  );
}
