import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { SectionDivider } from './SectionDivider';
import { ImageWithFallback } from './figma/ImageWithFallback';

const articles = [
  {
    id: 1,
    title: "Czym jest bioenergoterapia i jak może Ci pomóc?",
    excerpt: "Poznaj podstawy pracy z energią i dowiedz się, w jaki sposób równoważenie czakr wpływa na Twoje zdrowie fizyczne i psychiczne.",
    date: "28 Listopada 2024",
    readTime: "5 min czytania",
    category: "Wiedza podstawowa",
    image: "https://images.unsplash.com/photo-1579016759615-dcfd5813b6ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsJTIwZW5lcmd5JTIwaGVhbGluZyUyMGxpZ2h0JTIwY2hha3JhfGVufDF8fHx8MTc2NDQ1NzgxNHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "Oczyszczanie aury - dlaczego jest tak ważne?",
    excerpt: "Twoje pole energetyczne codziennie chłonie emocje otoczenia. Zobacz proste techniki na zachowanie higieny energetycznej.",
    date: "24 Listopada 2024",
    readTime: "7 min czytania",
    category: "Praktyka",
    image: "https://images.unsplash.com/photo-1673189209566-efe514f00f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwZW5lcmd5JTIwYXVyYSUyMGdsb3d8ZW58MXx8fHwxNzY0NDU3ODIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "Medytacja dla zapracowanych",
    excerpt: "Nie masz czasu na godzinne sesje? Odkryj 5-minutowe techniki oddechowe, które zresetują Twój układ nerwowy w trakcie pracy.",
    date: "15 Listopada 2024",
    readTime: "4 min czytania",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1758274530259-9a3b144acc9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG1lZGl0YXRpb24lMjBwZXJzb24lMjB6ZW4lMjBuYXR1cmV8ZW58MXx8fHwxNzY0NDU3ODIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function BlogSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <>
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
           <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-purple-300 mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wider uppercase">Baza Wiedzy</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            >
              Wiedza i <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Inspiracje</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 max-w-2xl mx-auto"
            >
              Odkryj artykuły, które pomogą Ci zrozumieć świat energii i zadbać o równowagę wewnętrzną każdego dnia.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredId(article.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative flex flex-col h-full"
              >
                {/* Card Background with Glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-500 group-hover:border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]" />

                {/* Image Container */}
                <div className="relative h-56 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 opacity-60" />
                  <motion.div
                    animate={{ 
                      scale: hoveredId === article.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-md border border-white/10 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 flex flex-col flex-grow z-20">
                  <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>

                  <div className="pt-6 mt-auto border-t border-white/5 flex items-center justify-between group/btn">
                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                      Czytaj dalej
                    </span>
                    <motion.div
                      animate={{ x: hoveredId === article.id ? 5 : 0 }}
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-purple-500 group-hover/btn:text-white transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <button className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white transition-all hover:scale-105 active:scale-95 group">
              <span className="flex items-center gap-2">
                Zobacz wszystkie artykuły
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>
      
      <SectionDivider variant="wave" />
    </>
  );
}
