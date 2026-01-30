import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, Facebook, MapPin, Star, ChevronRight } from 'lucide-react';

// Google Business Profile icon (custom SVG)
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

interface SocialWidgetProps {
  // Google Business Profile
  googleBusinessUrl?: string;
  googlePlaceId?: string;
  googleRating?: number;
  googleReviewCount?: number;
  
  // Facebook
  facebookPageUrl?: string;
  facebookPageName?: string;
  facebookFollowers?: number;
  
  // Display options
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showOnMobile?: boolean;
}

export function SocialWidget({
  googleBusinessUrl = 'https://g.page/r/YOUR_PLACE_ID',
  googlePlaceId = 'YOUR_PLACE_ID',
  googleRating = 4.9,
  googleReviewCount = 127,
  facebookPageUrl = 'https://www.facebook.com/WojciechBozemski',
  facebookPageName = 'Wojciech Bożemski - Terapia Energetyczna',
  facebookFollowers = 1542,
  position = 'bottom-left',
  showOnMobile = true,
}: SocialWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-24 right-6',
    'bottom-left': 'bottom-24 left-6',
    'top-right': 'top-24 right-6',
    'top-left': 'top-24 left-6',
  };

  if (isMinimized) return null;

  return (
    <motion.div
      className={`
        fixed ${positionClasses[position]} z-40
        ${showOnMobile ? '' : 'hidden md:block'}
      `}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: 2, 
        duration: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Collapsed state - Floating button
          <motion.button
            key="collapsed"
            onClick={() => setIsExpanded(true)}
            className="
              relative group
              backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5
              border border-white/20
              rounded-2xl p-4
              shadow-2xl
              hover:shadow-purple-500/20
              transition-all duration-300
              hover:scale-105
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            
            <div className="relative flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                  <GoogleIcon className="w-5 h-5" />
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white/20">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="text-left">
                <p className="text-white text-sm font-semibold">Obserwuj nas</p>
                <p className="text-white/60 text-xs">Google & Facebook</p>
              </div>
              
              <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </div>

            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-purple-500/50"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: 999999,
                ease: "easeInOut"
              }}
            />
          </motion.button>
        ) : (
          // Expanded state - Full widget
          <motion.div
            key="expanded"
            className="
              relative
              backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5
              border border-white/20
              rounded-2xl
              shadow-2xl
              overflow-hidden
              w-80
            "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">Znajdź nas online</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Google Business Profile Card */}
            <motion.a
              href={googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border-b border-white/10 hover:bg-white/5 transition-colors group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <GoogleIcon className="w-7 h-7" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-semibold text-sm">Google Business</h4>
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(googleRating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white text-sm font-bold">{googleRating}</span>
                  </div>
                  
                  <p className="text-white/60 text-xs">
                    {googleReviewCount} opinii klientów
                  </p>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <div className="px-2 py-1 bg-white/10 rounded-full">
                      <span className="text-white/80 text-xs font-medium">Zobacz na mapie</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-white/40 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.a>

            {/* Facebook Page Card */}
            <motion.a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 hover:bg-white/5 transition-colors group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm mb-1">Facebook</h4>
                  
                  <p className="text-white/70 text-xs mb-2 line-clamp-1">
                    {facebookPageName}
                  </p>
                  
                  <p className="text-white/60 text-xs mb-2">
                    {facebookFollowers.toLocaleString('pl-PL')} obserwujących
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 bg-blue-600/30 rounded-full">
                      <span className="text-white/80 text-xs font-medium">Polub stronę</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-white/40 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.a>

            {/* Footer */}
            <div className="bg-white/5 p-3 text-center border-t border-white/10">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white/50 hover:text-white/80 text-xs transition-colors"
              >
                Ukryj na zawsze
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
