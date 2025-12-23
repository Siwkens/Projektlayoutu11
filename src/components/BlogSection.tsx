import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SectionDivider } from './SectionDivider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId } from '../utils/supabase/info';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  author: string;
  created_at: string;
  published: boolean;
}

// Fallback articles (używane gdy baza jest pusta)
const fallbackArticles = [
  {
    id: '1',
    title: "Czym jest bioenergoterapia i jak może Ci pomóc?",
    excerpt: "Poznaj podstawy pracy z energią i dowiedz się, w jaki sposób równoważenie czakr wpływa na Twoje zdrowie fizyczne i psychiczne.",
    date: "28 Listopada 2024",
    readTime: "5 min czytania",
    category: "Wiedza podstawowa",
    image: "https://images.unsplash.com/photo-1579016759615-dcfd5813b6ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsJTIwZW5lcmd5JTIwaGVhbGluZyUyMGxpZ2h0JTIwY2hha3JhfGVufDF8fHx8MTc2NDQ1NzgxNHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '2',
    title: "Oczyszczanie aury - dlaczego jest tak ważne?",
    excerpt: "Twoje pole energetyczne codziennie chłonie emocje otoczenia. Zobacz proste techniki na zachowanie higieny energetycznej.",
    date: "24 Listopada 2024",
    readTime: "7 min czytania",
    category: "Praktyka",
    image: "https://images.unsplash.com/photo-1673189209566-efe514f00f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwZW5lcmd5JTIwYXVyYSUyMGdsb3d8ZW58MXx8fHwxNzY0NDU3ODIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '3',
    title: "Medytacja dla zapracowanych",
    excerpt: "Nie masz czasu na godzinne sesje? Odkryj 5-minutowe techniki oddechowe, które zresetują Twój układ nerwowy w trakcie pracy.",
    date: "15 Listopada 2024",
    readTime: "4 min czytania",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1758274530259-9a3b144acc9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG1lZGl0YXRpb24lMjBwZXJzb24lMjB6ZW4lMjBuYXR1cmV8ZW58MXx8fHwxNzY0NDU3ODIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function BlogSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/blog/articles`
      );

      if (response.ok) {
        const data = await response.json();
        // Filtruj tylko opublikowane artykuły
        const publishedArticles = data.filter((article: BlogArticle) => article.published);
        setArticles(publishedArticles.length > 0 ? publishedArticles : fallbackArticles as any);
      } else {
        setArticles(fallbackArticles as any);
      }
    } catch (error) {
      console.error('Error fetching blog articles:', error);
      setArticles(fallbackArticles as any);
    } finally {
      setLoading(false);
    }
  };

  // Pokaż tylko 3 najnowsze lub wszystkie w zależności od stanu
  const displayedArticles = showAll ? articles : articles.slice(0, 3);

  // Format daty
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="text-white/60 mt-4">Ładowanie artykułów...</p>
        </div>
      </section>
    );
  }

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
            {displayedArticles.map((article, index) => (
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
                      <span>{formatDate(article.created_at || article.date)}</span>
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
          <div className="text-center mt-16 space-y-6">
            {!showAll && articles.length > 3 && (
              <motion.button
                onClick={() => setShowAll(true)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-400/30 text-white hover:from-purple-600/40 hover:to-blue-600/40 transition-all group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">Zobacz wszystkie artykuły ({articles.length})</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            )}
          </div>
        </div>
      </section>
      
      <SectionDivider variant="wave" />
    </>
  );
}