import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
}

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Initialize stars
    const starCount = 800;
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      size: Math.random() * 2,
    }));

    // Animation loop
    let rotation = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rotation += 0.0002;

      starsRef.current.forEach((star) => {
        // Move star towards viewer
        star.z -= 0.5;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        // Calculate 3D perspective
        const scale = 1000 / star.z;
        const x = (star.x - canvas.width / 2) * scale + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = star.size * scale;

        // Only draw if on screen
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          const opacity = Math.min(1, (1000 - star.z) / 1000);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#0a0a1a' }}
    />
  );
}

function FloatingGeometry() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated geometric shapes using pure CSS */}
      <div 
        className="absolute top-[20%] left-[15%] w-32 h-32 opacity-10 animate-float-slow"
        style={{
          animation: 'float 20s ease-in-out infinite, rotate 30s linear infinite',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon 
            points="50,5 95,75 5,75" 
            fill="none" 
            stroke="#a78bfa" 
            strokeWidth="1"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div 
        className="absolute top-[60%] right-[20%] w-24 h-24 opacity-10"
        style={{
          animation: 'float 15s ease-in-out infinite reverse, rotate 25s linear infinite reverse',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="#a78bfa" 
            strokeWidth="1"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="30" 
            fill="none" 
            stroke="#a78bfa" 
            strokeWidth="1"
          />
        </svg>
      </div>

      <div 
        className="absolute top-[40%] right-[10%] w-28 h-28 opacity-10"
        style={{
          animation: 'float 18s ease-in-out infinite, rotate 20s linear infinite',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect 
            x="10" 
            y="10" 
            width="80" 
            height="80" 
            fill="none" 
            stroke="#a78bfa" 
            strokeWidth="1"
            transform="rotate(45 50 50)"
          />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(-10px) translateX(-10px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export function CosmicScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <StarField />
      <FloatingGeometry />
    </div>
  );
}
