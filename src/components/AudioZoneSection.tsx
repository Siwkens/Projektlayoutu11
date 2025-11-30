import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward, Music, Headphones } from 'lucide-react';
import { SectionDivider } from './SectionDivider';

interface Track {
  id: number;
  title: string;
  duration: string; // Display string like "10:00"
  category: string;
  color: string;
}

const tracks: Track[] = [
  { id: 1, title: "Głębokie Uziemienie", duration: "12:00", category: "Medytacja", color: "#EF4444" },
  { id: 2, title: "Oczyszczanie Aury", duration: "08:30", category: "Relaksacja", color: "#A855F7" },
  { id: 3, title: "Dźwięki Natury", duration: "15:45", category: "Sen", color: "#22C55E" },
  { id: 4, title: "Cisza Umysłu", duration: "05:00", category: "Mindfulness", color: "#3B82F6" },
];

export function AudioZoneSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [progress, setProgress] = useState(0);
  const visualizerRef = useRef<HTMLDivElement>(null);

  // Simulate progress when playing
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5; // Speed simulation
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
      <SectionDivider variant="wave" />
      <section className="relative py-24 px-6 overflow-hidden bg-black/20">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Column: Text & Intro */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-300 mb-4">
              <Headphones size={14} />
              <span>Strefa Audio</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ukojenie dla <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Twoich Zmysłów</span>
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Zatrzymaj się na chwilę. Załóż słuchawki i pozwól, aby dźwięki przywróciły Ci wewnętrzną równowagę. 
              Darmowe próbki moich sesji medytacyjnych.
            </p>
            
            <div className="hidden lg:block p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Music className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Pełna biblioteka</h4>
                  <p className="text-xs text-white/40">Dostępna w Panelu Pacjenta</p>
                </div>
              </div>
              <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm transition-colors">
                Zaloguj się aby uzyskać dostęp
              </button>
            </div>
          </div>

          {/* Right Column: Player Interface */}
          <div className="lg:w-2/3 w-full">
            <div className="relative bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden group">
              
              {/* Dynamic Glow based on track color */}
              <motion.div 
                animate={{ backgroundColor: currentTrack.color }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 blur-[100px] opacity-20 transition-colors duration-1000" 
              />

              <div className="relative z-10 flex flex-col md:flex-row gap-8">
                
                {/* Visualizer / Album Art */}
                <div className="w-full md:w-1/3 aspect-square rounded-2xl bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center relative">
                  {/* Bars Visualizer Simulation */}
                  <div className="flex items-end justify-center gap-1 h-32 w-full px-4" ref={visualizerRef}>
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 rounded-t-full bg-gradient-to-t from-white/80 to-white/20"
                        animate={{ 
                          height: isPlaying ? [20, Math.random() * 100 + 20, 20] : 10 
                        }}
                        transition={{ 
                          duration: 0.5, 
                          repeat: Infinity, 
                          delay: i * 0.05,
                          ease: "easeInOut"
                        }}
                        style={{ 
                          backgroundColor: currentTrack.color 
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Play Overlay Icon */}
                  {!isPlaying && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                       <Play className="w-12 h-12 text-white opacity-80" />
                     </div>
                  )}
                </div>

                {/* Controls & Playlist */}
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* Current Track Info */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold tracking-wider text-white/40 uppercase">{currentTrack.category}</span>
                      <span className="text-xs text-white/40">{isPlaying ? 'Odtwarzanie...' : 'Pauza'}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{currentTrack.title}</h3>
                    <p className="text-sm text-white/60">Wojciech Bożemski - Sesje</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-white/30 font-mono">
                      <span>{Math.floor((progress/100) * parseInt(currentTrack.duration.split(':')[0]))}:{Math.floor((progress/100) * 60).toString().padStart(2, '0')}</span>
                      <span>{currentTrack.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between mb-8">
                    <button className="text-white/40 hover:text-white transition-colors">
                      <Volume2 size={20} />
                    </button>
                    
                    <div className="flex items-center gap-6">
                      <button className="text-white hover:text-purple-400 transition-colors">
                        <SkipBack size={24} />
                      </button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      >
                        {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                      </button>
                      <button className="text-white hover:text-purple-400 transition-colors">
                        <SkipForward size={24} />
                      </button>
                    </div>

                    <button className="text-white/40 hover:text-white transition-colors">
                       {/* Placeholder for loop/shuffle */}
                       <div className="w-5 h-5 rounded-full border border-white/30" />
                    </button>
                  </div>

                  {/* Playlist (Mini) */}
                  <div className="border-t border-white/10 pt-4">
                    <div className="text-xs font-bold text-white/30 uppercase mb-3">Następne utwory</div>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                      {tracks.filter(t => t.id !== currentTrack.id).map(track => (
                        <div 
                          key={track.id}
                          onClick={() => { setCurrentTrack(track); setIsPlaying(true); setProgress(0); }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer group/track transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] text-white/50 group-hover/track:text-white">
                              {track.id}
                            </div>
                            <span className="text-sm text-white/70 group-hover/track:text-white transition-colors">
                              {track.title}
                            </span>
                          </div>
                          <span className="text-xs text-white/30">{track.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
