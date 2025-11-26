import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ParticleSystem } from './components/ParticleSystem';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingActionButton } from './components/FloatingActionButton';
import { LoadingScreen } from './components/LoadingScreen';
import { MouseSpotlight } from './components/MouseSpotlight';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Check if device has mouse (not touch-only)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    setShowCursor(hasPointer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-[#0a0a1a] relative">
          {/* Background effects */}
          <ParticleSystem />
          <MouseSpotlight />
          
          {/* Custom cursor (only on desktop) */}
          {showCursor && <CustomCursor />}
          
          {/* Scroll progress indicator */}
          <ScrollProgress />
          
          {/* Floating action button */}
          <FloatingActionButton />
          
          {/* Main content */}
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <StatsSection />
          <ProcessSection />
          <TestimonialsSection />
        </div>
      )}
    </>
  );
}
