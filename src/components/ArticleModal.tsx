import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Newspaper } from 'lucide-react';
import { useEffect } from 'react';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    source: string;
    sourceType: string;
    title: string;
    date: string;
    category: string;
    fullContent: string;
    image?: string;
  } | null;
}

export function ArticleModal({ isOpen, onClose, article }: ArticleModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card with 3D effect */}
              <div className="relative bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />

                {/* Close button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                  <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/40 to-blue-600/40 border border-white/20 flex items-center justify-center"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                          <Newspaper className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-white" style={{ fontSize: '1.2rem' }}>
                            {article.source}
                          </h3>
                          <p className="text-white/50 text-sm">
                            {article.sourceType}
                          </p>
                        </div>
                        <motion.div 
                          className="ml-auto px-4 py-1.5 rounded-full bg-purple-600/30 border border-purple-400/30"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-purple-200 text-sm">{article.category}</span>
                        </motion.div>
                      </div>

                      <h2 className="text-white mb-4" style={{ fontSize: '1.8rem', lineHeight: '1.3' }}>
                        {article.title}
                      </h2>

                      <div className="flex items-center gap-2 text-white/50">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{article.date}</span>
                      </div>
                    </div>

                    {/* Article Image */}
                    {article.image && (
                      <motion.div 
                        className="mb-8 rounded-xl overflow-hidden border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-auto"
                        />
                      </motion.div>
                    )}

                    {/* Article Content */}
                    <motion.div 
                      className="prose prose-invert max-w-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div 
                        className="text-white/80 space-y-4 leading-relaxed"
                        style={{ fontSize: '1.05rem', lineHeight: '1.8' }}
                        dangerouslySetInnerHTML={{ __html: article.fullContent }}
                      />
                    </motion.div>

                    {/* Footer */}
                    <motion.div 
                      className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="text-white/50 text-sm">
                        © {article.source} • {article.date}
                      </div>
                      <motion.button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600/40 to-blue-600/40 border border-white/20 text-white hover:from-purple-600/60 hover:to-blue-600/60 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Zamknij
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
