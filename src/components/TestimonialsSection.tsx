import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { SectionDivider } from './SectionDivider';

const testimonials = [
  {
    text: "Totalnie została wyczyszone. Silnie angażuło kiedy na nowicji usta w próbie poprawności, myśl jak prawstwo cieszydacja i wydarzenia",
    author: "Zosia",
    rating: 5
  },
  {
    text: "Niesamowite doświadczenie. Poczułam ogromną ulgę i spokój. Wojciech to prawdziwy profesjonalista z wielkim sercem.",
    author: "Anna K.",
    rating: 5
  },
  {
    text: "Sesja przekroczyła moje oczekiwania. Energia zaczęła swobodnie przepływać, a ja odzyskałem równowagę wewnętrzną.",
    author: "Marek P.",
    rating: 5
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <>
      <SectionDivider variant="wave" />
      
      <section className="relative py-24 px-6 mb-16 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white text-center mb-16"
          >
            Opinie
          </motion.h2>

          <div className="relative" style={{ perspective: '2000px' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  rotateY: { duration: 0.4 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="relative bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-lg p-12 cursor-grab active:cursor-grabbing"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Quote icon with glow */}
                <motion.div 
                  className="absolute top-8 left-8 opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Quote className="w-16 h-16 text-purple-300" />
                  <div className="absolute inset-0 blur-xl bg-purple-400/30" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Star rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </motion.div>
                    ))}
                  </div>

                  <motion.p 
                    className="text-white/80 mb-8 italic leading-relaxed" 
                    style={{ fontSize: '1.1rem', lineHeight: '2' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    "{testimonials[currentIndex].text}"
                  </motion.p>
                  <motion.p 
                    className="text-white/60" 
                    style={{ fontSize: '1rem' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    — {testimonials[currentIndex].author}
                  </motion.p>
                </div>

                {/* Decorative glow */}
                <motion.div 
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/10 blur-3xl rounded-full pointer-events-none"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-purple-600/20 hover:bg-purple-600/40 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white transition-all"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 bg-purple-600/20 hover:bg-purple-600/40 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white transition-all"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-purple-400 w-8' : 'bg-white/20'
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
