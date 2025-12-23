import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './context/AuthContext';
import { User, LogIn, Calendar, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { AuthModal } from './auth/AuthModal';
import { BookingModal } from './booking/BookingModal';
import { AdminDashboard } from './admin/AdminDashboard';
import { PatientDashboard } from './patient/PatientDashboard';

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPatientDashboardOpen, setIsPatientDashboardOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ADMIN_EMAILS = ['wojciech@bozemski.pl', 'patryk.siwkens@gmail.com', 'admin@test.pl'];
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('[data-user-menu]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <div className="fixed top-6 right-6 z-50" data-user-menu>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => user ? setIsMenuOpen(!isMenuOpen) : setIsAuthOpen(true)}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-2 pl-2 pr-4 text-white shadow-lg hover:bg-white/20 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
              {user ? (
                <span className="text-xs font-bold">{user.email?.[0].toUpperCase()}</span>
              ) : (
                <User size={14} />
              )}
            </div>
            <span className="text-sm font-medium hidden sm:block">
              {user ? 'Moje konto' : 'Zaloguj się'}
            </span>
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && user && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-56 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1"
              >
                <div className="px-4 py-3 border-b border-white/5">
                  <div className="text-sm text-white font-medium truncate">{user.email}</div>
                  <div className="text-xs text-white/50">Zalogowany</div>
                </div>
                
                <button 
                  onClick={() => { setIsPatientDashboardOpen(true); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-2"
                >
                  <LayoutDashboard size={16} /> Mój panel
                </button>

                <button 
                  onClick={() => { setIsBookingOpen(true); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-2"
                >
                  <Calendar size={16} /> Umów sesję
                </button>

                {isAdmin && (
                  <button 
                    onClick={() => { setIsAdminOpen(true); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-purple-400 hover:bg-white/10 hover:text-purple-300 flex items-center gap-2"
                  >
                    <Settings size={16} /> Panel Administratora
                  </button>
                )}

                <button 
                  onClick={() => { signOut(); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 hover:text-red-300 flex items-center gap-2 border-t border-white/5 mt-1"
                >
                  <LogOut size={16} /> Wyloguj się
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <PatientDashboard isOpen={isPatientDashboardOpen} onClose={() => setIsPatientDashboardOpen(false)} />
    </>
  );
}