import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from 'lucide-react';

interface PerformanceMetrics {
  fps: number;
  memory?: number;
  loadTime: number;
}

export function PerformanceMonitor({ debug = false }: { debug?: boolean }) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    loadTime: 0
  });
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    // Measure initial load time
    if (window.performance) {
      const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime }));
    }

    // FPS monitoring
    let lastTime = performance.now();
    let frames = 0;
    let rafId: number;

    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        frames = 0;
        lastTime = currentTime;
      }

      rafId = requestAnimationFrame(measureFPS);
    };

    if (debug) {
      rafId = requestAnimationFrame(measureFPS);
    }

    // Memory monitoring (if available)
    const checkMemory = () => {
      if ('memory' in performance) {
        const mem = (performance as any).memory;
        const usedMemory = Math.round(mem.usedJSHeapSize / 1048576); // MB
        setMetrics(prev => ({ ...prev, memory: usedMemory }));
      }
    };

    const memoryInterval = debug ? setInterval(checkMemory, 2000) : undefined;

    // Keyboard shortcut to toggle metrics (Ctrl+Shift+P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setShowMetrics(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (memoryInterval) clearInterval(memoryInterval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [debug]);

  // Auto-show if performance is poor
  useEffect(() => {
    if (metrics.fps < 30 && debug) {
      setShowMetrics(true);
    }
  }, [metrics.fps, debug]);

  if (!debug && !showMetrics) return null;

  return (
    <AnimatePresence>
      {showMetrics && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-20 left-4 z-[100] bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3 text-white text-xs font-mono"
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/20">
            <Activity className="w-4 h-4" />
            <span>Metryki wydajności</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="opacity-60">FPS:</span>
              <span className={metrics.fps < 30 ? 'text-red-400' : metrics.fps < 50 ? 'text-yellow-400' : 'text-green-400'}>
                {metrics.fps}
              </span>
            </div>
            
            {metrics.memory !== undefined && (
              <div className="flex justify-between gap-4">
                <span className="opacity-60">Pamięć:</span>
                <span>{metrics.memory} MB</span>
              </div>
            )}
            
            <div className="flex justify-between gap-4">
              <span className="opacity-60">Ładowanie:</span>
              <span>{(metrics.loadTime / 1000).toFixed(2)}s</span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-white/20 text-[10px] opacity-40">
            Ctrl+Shift+P aby zamknąć
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Performance optimization utilities
export function prefetchImage(src: string) {
  const img = new Image();
  img.src = src;
}

export function prefetchImages(sources: string[]) {
  sources.forEach(prefetchImage);
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  callback: () => void,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, callback, options]);
}
