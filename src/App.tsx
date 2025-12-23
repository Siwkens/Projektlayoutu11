import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { MediaCoverageSection } from './components/MediaCoverageSection';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { CookieConsent } from './components/CookieConsent';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingActionButton } from './components/FloatingActionButton';
import { LoadingScreen } from './components/LoadingScreen';
import { MouseSpotlight } from './components/MouseSpotlight';
import { ChakraSystemSection } from './components/ChakraSystemSection';
import { AudioZoneSection } from './components/AudioZoneSection';
import { MoodProvider, useMood } from './components/context/MoodContext';
import { MoodSelector } from './components/MoodSelector';
import { AuthProvider } from './components/context/AuthContext';
import { UserMenu } from './components/UserMenu';
import { ChatBot } from './components/ChatBotEnhanced';
import { BookingModal } from './components/booking/BookingModal';
import { SmoothScrollContainer } from './components/SmoothScroll';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { SectionTransition } from './components/PageTransition';
import { NavigationDots } from './components/NavigationDots';
import { AdminUpdater } from './components/AdminUpdater';

// Lazy load heavy 3D components for better performance
const CosmicScene = lazy(() => 
  import('./components/canvas/CosmicBackground').then(module => ({ 
    default: module.CosmicScene 
  }))
);

// Loading fallback for 3D components
function SceneFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-purple-900/20 animate-pulse" />
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { colors } = useMood();

  useEffect(() => {
    // Check if device has mouse (not touch-only)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    setShowCursor(hasPointer);
  }, []);

  const handleChatBookingClick = () => {
    setIsChatOpen(false);
    setIsBookingOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <SmoothScrollContainer>
          <div 
            className="min-h-screen relative transition-colors duration-1000 ease-in-out"
            style={{ backgroundColor: colors.background }}
          >
          {/* 3D Background - Lazy loaded for performance */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <Suspense fallback={<SceneFallback />}>
              <CosmicScene />
            </Suspense>
          </div>
          
          {/* Overlay Gradients for readability - Dynamic based on mood */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay transition-colors duration-1000" 
            style={{ 
              background: `linear-gradient(to bottom, ${colors.background}E6, transparent, ${colors.background})` 
            }} 
          />

          {/* Background effects */}
          <MouseSpotlight />
          
          {/* Custom cursor (only on desktop) */}
          {showCursor && <CustomCursor />}
          
          {/* Scroll progress indicator */}
          <ScrollProgress />
          
          {/* Sticky Navigation */}
          <Navigation onBookingClick={() => setIsBookingOpen(true)} />
          
          {/* Floating action button */}
          <FloatingActionButton onChatClick={() => setIsChatOpen(true)} />
          
          {/* User Menu (Auth, Admin, Booking, Patient Dashboard) */}
          <UserMenu />
          
          {/* Mood Selector */}
          <MoodSelector />

          {/* Navigation Dots */}
          <NavigationDots />
          
          {/* Cookie Consent Banner */}
          <CookieConsent />
          
          {/* AI Chatbot - Inteligentny Asystent Terapeutyczny z Smart Actions */}
          <ChatBot 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)}
            onBookingClick={handleChatBookingClick}
          />

          {/* Booking Modal (can be triggered from chat) */}
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
          />

          {/* Performance Monitor (Ctrl+Shift+P to toggle) */}
          <PerformanceMonitor debug={false} />
          
          {/* Admin Updater (Ctrl+Alt+U to toggle) - Hidden Dev Tool */}
          <AdminUpdater />
          
          {/* Main content with smooth transitions */}
          <div className="relative z-10">
            <HeroSection />
            
            <SectionTransition id="about">
              <AboutSection />
            </SectionTransition>
            
            <SectionTransition id="chakra-map">
               <ChakraSystemSection />
            </SectionTransition>
            
            <SectionTransition>
              <ServicesSection />
            </SectionTransition>
            
            <SectionTransition>
              <StatsSection />
            </SectionTransition>
            
            <SectionTransition id="media">
              <MediaCoverageSection />
            </SectionTransition>

            <SectionTransition id="audio-zone">
               <AudioZoneSection />
            </SectionTransition>
            
            <SectionTransition>
              <TestimonialsSection />
            </SectionTransition>

            <SectionTransition id="blog">
              <BlogSection />
            </SectionTransition>
            
            <SectionTransition id="faq">
              <FAQSection />
            </SectionTransition>
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
        </SmoothScrollContainer>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MoodProvider>
        <AppContent />
      </MoodProvider>
    </AuthProvider>
  );
}