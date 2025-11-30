import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { SectionDivider } from './SectionDivider';

const faqData = [
  {
    id: 1,
    question: 'Czym jest bioenergoterapia?',
    answer: 'Bioenergoterapia to metoda pracy z polem energetycznym człowieka, znana od tysięcy lat. Polega na harmonizacji przepływu energii życiowej w organizmie poprzez oddziaływanie na czakry i meridiane energetyczne. To forma wsparcia dla naturalnych procesów samoregulacji organizmu, która nie zastępuje medycyny konwencjonalnej, lecz może ją uzupełniać.'
  },
  {
    id: 2,
    question: 'Jak przebiega sesja terapeutyczna?',
    answer: 'Sesja rozpoczyna się od rozmowy, podczas której poznajemy Twoje potrzeby i oczekiwania. Następnie w spokojnej atmosferze przeprowadzam pracę z Twoim polem energetycznym - może to odbywać się bez bezpośredniego kontaktu fizycznego. Sesja trwa zazwyczaj 60-90 minut i kończy się omówieniem odczuć oraz wskazówkami na przyszłość.'
  },
  {
    id: 3,
    question: 'Czy mogę mieć sesję online/na odległość?',
    answer: 'Tak! Praca z energią nie wymaga fizycznej obecności. Sesje zdalne są równie skuteczne jak stacjonarne. Odbywają się w ustalonym terminie - ty znajdujesz spokojne miejsce, a ja pracuję z Twoim polem energetycznym. Po sesji często rozmawiamy o odczuciach. To idealne rozwiązanie dla osób mieszkających za granicą lub preferujących własną przestrzeń.'
  },
  {
    id: 4,
    question: 'Ile trwa jedna sesja i jak często należy je powtarzać?',
    answer: 'Standardowa sesja trwa 60-90 minut. Częstotliwość zależy od indywidualnych potrzeb - niektóre osoby przychodzą raz w tygodniu, inne raz w miesiącu. Na początku często rekomendowane są 2-3 sesje w odstępach tygodniowych, aby zbudować fundament harmonii energetycznej. Później przechodzimy do sesji podtrzymujących co 3-4 tygodnie.'
  },
  {
    id: 5,
    question: 'Ile kosztuje terapia?',
    answer: 'Ceny zależą od rodzaju sesji i jej długości. Sesja standardowa (60 min) to inwestycja 200-300 zł. Oferuję również pakiety kilku sesji z rabatem oraz pierwszą konsultację diagnostyczną w obniżonej cenie. Szczegółowy cennik znajdziesz w sekcji "Cennik" poniżej.'
  },
  {
    id: 6,
    question: 'Czy bioenergoterapia może zastąpić leczenie medyczne?',
    answer: 'Nie. Bioenergoterapia NIE zastępuje diagnozy lekarskiej, leczenia ani terapii prowadzonej przez specjalistów medycznych. Praca z energią jest formą wsparcia i uzupełnienia, która może pomóc w radzeniu sobie ze stresem, napięciem i dysharmonią, ale zawsze powinna być realizowana równolegle z opieką medyczną, nigdy zamiast niej.'
  },
  {
    id: 7,
    question: 'W jakich przypadkach bioenergoterapia może pomóc?',
    answer: 'Osoby przychodzą najczęściej z problemami takimi jak: przewlekły stres, wypalenie zawodowe, bezsenność, napięcia emocjonalne, brak energii życiowej, trudności w radzeniu sobie z emocjami, poczucie blokad energetycznych. Terapia wspiera również w okresach przejściowych życia i w procesach rozwoju osobistego.'
  },
  {
    id: 8,
    question: 'Czy potrzebuję specjalnego przygotowania do sesji?',
    answer: 'Nie jest wymagane żadne szczególne przygotowanie. Zalecam jedynie: przyjść w wygodnym ubraniu, być wypoczętym (unikać alkoholu dzień wcześniej), nie spożywać ciężkiego posiłku bezpośrednio przed sesją oraz być otwartym na doświadczenie. W przypadku sesji zdalnej - przygotuj spokojne miejsce, gdzie nikt Ci nie przeszkodzi.'
  },
  {
    id: 9,
    question: 'Czy bioenergoterapia jest bezpieczna?',
    answer: 'Tak, bioenergoterapia jest metodą nieinwazyjną i bezpieczną. Nie wykorzystuję żadnych substancji czy narzędzi mogących zaszkodzić. Praca odbywa się na poziomie energetycznym, z pełnym szacunkiem dla granic i komfortu klienta. Każda sesja jest dostosowana indywidualnie do Twoich potrzeb i możliwości.'
  },
  {
    id: 10,
    question: 'Jakie masz kwalifikacje i doświadczenie?',
    answer: 'Jestem certyfikowanym Mistrzem bioenergoterapii z ponad 15-letnim doświadczeniem. Przeszedłem szkolenia z terapii kwantowej, pracy z czakrami oraz świętej geometrii. Pracowałem z setkami osób, pomagając im odnaleźć równowagę energetyczną i wewnętrzny spokój. Regularnie podnoszę swoje kwalifikacje, ucząc się od mistrzów z całego świata.'
  }
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <SectionDivider variant="wave" />
      
      <section id="faq" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
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
              <HelpCircle className="w-5 h-5 text-purple-300" />
              <span className="text-white/80" style={{ fontSize: '0.9rem' }}>FAQ</span>
            </motion.div>
            
            <h2 className="text-white mb-4">
              Najczęściej zadawane pytania
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Odpowiedzi na pytania, które pojawiają się najczęściej. Nie znalazłeś odpowiedzi? Skontaktuj się ze mną bezpośrednio.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <motion.div
                  className="relative bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                  whileHover={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <motion.div
                        className="mt-1 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/40 to-blue-600/40 border border-white/20 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </motion.div>
                      <h3 className="text-white flex-1" style={{ fontSize: '1.05rem', lineHeight: '1.5' }}>
                        {item.question}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openId === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-purple-300" />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openId === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pl-[4.5rem]">
                          <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            className="pt-2 border-t border-white/5"
                          >
                            <p className="text-white/70 leading-relaxed" style={{ fontSize: '0.95rem' }}>
                              {item.answer}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover glow effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 rounded-xl transition-all duration-300 pointer-events-none"
                    whileHover={{
                      background: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))',
                    }}
                  />
                </motion.div>

                {/* Floating particles on hover */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      left: `${20 + i * 60}%`,
                      top: '50%',
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/60 mb-4">
              Masz inne pytanie?
            </p>
            <motion.a
              href="mailto:wojciechbozemski@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="w-5 h-5" />
              Skontaktuj się ze mną
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
