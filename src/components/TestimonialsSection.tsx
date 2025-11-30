import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { SectionDivider } from './SectionDivider';

const testimonials = [
  {
    id: 1,
    text: "Po sesji poczułam niesamowitą lekkość. Ból pleców, z którym zmagałam się od miesięcy, po prostu zniknął. To było jak zdjęcie ciężkiego plecaka.",
    author: "Anna Kowalska",
    role: "Przedsiębiorca",
    rating: 5,
    initials: "AK"
  },
  {
    id: 2,
    text: "Wojciech ma niezwykły dar. Jego spokój i profesjonalizm sprawiają, że od razu czujesz się bezpiecznie. Polecam każdemu, kto szuka równowagi.",
    author: "Marek Nowak",
    role: "Programista",
    rating: 5,
    initials: "MN"
  },
  {
    id: 3,
    text: "Sceptycznie podchodziłam do bioenergoterapii, ale efekty przerosły moje oczekiwania. Odzyskałam energię do działania i radość z życia.",
    author: "Katarzyna Wiśniewska",
    role: "Nauczycielka",
    rating: 5,
    initials: "KW"
  },
  {
    id: 4,
    text: "Regularne sesje pomogły mi uporać się ze stresem w pracy. Czuję się teraz znacznie bardziej skoncentrowany i spokojny.",
    author: "Piotr Zieliński",
    role: "Manager",
    rating: 5,
    initials: "PZ"
  },
  {
    id: 5,
    text: "Atmosfera w gabinecie jest magiczna. Już samo przebywanie tam leczy. Dziękuję za pomoc w trudnym momencie mojego życia.",
    author: "Magdalena S.",
    role: "Artystka",
    rating: 5,
    initials: "MS"
  },
  {
    id: 6,
    text: "Niesamowite doświadczenie głębokiego relaksu. Czuję, jakby moje baterie zostały naładowane do pełna. Wrócę na pewno!",
    author: "Tomasz R.",
    role: "Sportowiec",
    rating: 5,
    initials: "TR"
  }
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Głosy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Uzrowienia</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Dołącz do grona osób, które odzyskały wewnętrzną harmonię i zdrowie.
            Prawdziwe historie, prawdziwe zmiany.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-purple-500/20 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/80 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">
                    {testimonial.author}
                  </h4>
                  <span className="text-white/40 text-xs">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
