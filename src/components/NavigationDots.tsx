import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMood } from './context/MoodContext';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Start' },
  { id: 'about', label: 'O mnie' },
  { id: 'chakra-map', label: 'Czakry' },
  { id: 'services', label: 'Usługi' },
  { id: 'media', label: 'Media' },
  { id: 'audio-zone', label: 'Audio' },
  { id: 'blog', label: 'Blog' },
  { id: 'faq', label: 'FAQ' },
];

export function NavigationDots() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const { colors } = useMood();
  
  // Use IntersectionObserver for performance instead of scroll listener
  useEffect(() => {
    // Show dots after a small delay/scroll (handled via simple scroll listener for visibility only, throttled)
    const handleScrollVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    let timeoutId: any = null;
    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScrollVisibility();
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledScroll);
    
    // Observer for active section
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Activate when section is in middle 20% of screen
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) || 
                   document.querySelector(`section[id="${sectionId}"]`);
    
    if (element) {
      const offset = 80; // Header offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        >
          <div className="flex flex-col gap-4">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              
              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="group relative flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Dot */}
                  <div
                    className="w-3 h-3 rounded-full transition-all duration-300 relative"
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                        : `${colors.primary}40`,
                      transform: isActive ? 'scale(1.3)' : 'scale(1)',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <motion.span
                    className="absolute right-full mr-4 px-3 py-1 rounded-lg text-sm whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    style={{
                      background: `${colors.background}F5`,
                      border: `1px solid ${colors.primary}40`,
                      color: colors.text,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {section.label}
                  </motion.span>
                </motion.button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}