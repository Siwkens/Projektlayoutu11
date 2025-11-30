import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, FileText, Music, Settings, LogOut, User, HeartPulse } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PatientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PatientDashboard({ isOpen, onClose }: PatientDashboardProps) {
  const { user, signOut } = useAuth();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Dashboard Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 bg-[#0f172a] border border-white/10 rounded-3xl z-[70] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Sidebar (Desktop) / Topbar (Mobile) */}
            <div className="w-full md:w-64 bg-black/20 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                   <span className="text-white font-bold text-lg">{user?.email?.[0].toUpperCase()}</span>
                </div>
                <div className="overflow-hidden">
                  <div className="text-white font-medium truncate w-32 text-sm">{user?.email}</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Pacjent
                  </div>
                </div>
              </div>

              <nav className="space-y-2 flex-1 overflow-y-auto md:overflow-visible flex md:flex-col gap-2 md:gap-0 pb-4 md:pb-0 no-scrollbar">
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/10 text-white text-sm font-medium transition-colors whitespace-nowrap">
                  <Calendar size={18} />
                  Moje wizyty
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white text-sm font-medium transition-colors whitespace-nowrap">
                  <FileText size={18} />
                  Zalecenia
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white text-sm font-medium transition-colors whitespace-nowrap">
                  <Music size={18} />
                  Strefa Audio
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white text-sm font-medium transition-colors whitespace-nowrap">
                  <Settings size={18} />
                  Ustawienia
                </button>
              </nav>

              <div className="mt-auto border-t border-white/10 pt-4 hidden md:block">
                <button 
                  onClick={() => { signOut(); onClose(); }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  <LogOut size={18} />
                  Wyloguj się
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 relative custom-scrollbar">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="max-w-4xl mx-auto">
                <header className="mb-10">
                  <h1 className="text-3xl font-bold text-white mb-2">Witaj w swoim centrum zdrowia</h1>
                  <p className="text-white/60">
                    Tutaj znajdziesz podsumowania swoich sesji oraz materiały wspomagające proces zdrowienia.
                  </p>
                </header>

                {/* Dashboard Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  
                  {/* Next Appointment Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                          <Calendar className="text-purple-400" size={24} />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/20">
                          Nadchodząca
                        </span>
                      </div>
                      <h3 className="text-white/60 text-sm mb-1">Najbliższa wizyta</h3>
                      <p className="text-2xl font-bold text-white mb-4">Brak zaplanowanych wizyt</p>
                      <button className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors">
                        Umów spotkanie
                      </button>
                    </div>
                  </div>

                  {/* Health Status / Recommendations Summary */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                     <div className="flex items-start justify-between mb-6">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                          <HeartPulse className="text-blue-400" size={24} />
                        </div>
                      </div>
                      <h3 className="text-white/60 text-sm mb-1">Ostatnie zalecenie</h3>
                      <p className="text-xl font-medium text-white mb-4">"Pamiętaj o uziemieniu przez 15 min dziennie"</p>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                         <div className="w-3/4 h-full bg-blue-500" />
                      </div>
                      <p className="text-xs text-white/40 mt-2">Postęp terapii: 75%</p>
                  </div>

                </div>

                {/* Recent Activity / History */}
                <section>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText size={18} className="text-white/40" />
                    Historia leczenia
                  </h3>
                  
                  <div className="rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-8 text-center bg-white/[0.02]">
                      <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
                        <FileText className="text-white/20" size={32} />
                      </div>
                      <h4 className="text-white font-medium mb-2">Twoja historia jest pusta</h4>
                      <p className="text-white/40 text-sm max-w-md mx-auto">
                        Historia Twoich wizyt i zabiegów pojawi się tutaj po odbyciu pierwszej konsultacji u Wojciecha.
                      </p>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
