import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

/**
 * Komponent testowy do aktualizacji konta administratora
 * 
 * Aktywacja:
 * - Desktop: Ctrl + Alt + U
 * - Mobile: URL z parametrem ?admin=true
 * - Mobile: 5x szybkie kliknięcie w prawy górny róg ekranu
 */
export function AdminUpdater() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  // Sprawdź URL parameter ?admin=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShow(true);
    }
  }, []);

  // Pokaż przycisk po naciśnięciu Ctrl + Alt + U (desktop)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'u') {
        setShow(true);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Mobile: 5x szybkie kliknięcie w prawy górny róg (100px x 100px)
  useEffect(() => {
    let tapTimer: NodeJS.Timeout;

    const handleTap = (e: TouchEvent) => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      
      // Prawy górny róg (100px x 100px)
      if (x > window.innerWidth - 100 && y < 100) {
        setTapCount(prev => prev + 1);
        
        // Reset po 2 sekundach
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => setTapCount(0), 2000);
      }
    };

    window.addEventListener('touchstart', handleTap);
    return () => {
      window.removeEventListener('touchstart', handleTap);
      clearTimeout(tapTimer);
    };
  }, []);

  // Pokaż panel po 5 tapnięciach
  useEffect(() => {
    if (tapCount >= 5) {
      setShow(true);
      setTapCount(0);
    }
  }, [tapCount]);

  const updateAdmin = async () => {
    setLoading(true);
    setStatus('Aktualizuję konto...');

    try {
      console.log('🔄 Rozpoczynam aktualizację konta administratora...');

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/update-admin`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            oldEmail: 'admin@test.pl',
            newEmail: 'wojciech@bozemski.pl',
            newPassword: 'Wojciech123!',
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Sukces!', data);
        setStatus(`✅ Sukces! Email: ${data.newEmail}`);
      } else {
        console.error('❌ Błąd:', data);
        setStatus(`❌ Błąd: ${data.error || data.message}`);
      }
    } catch (error: any) {
      console.error('❌ Wyjątek:', error);
      setStatus(`❌ Wyjątek: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Mobile tap indicator */}
      {tapCount > 0 && tapCount < 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed top-4 right-4 z-[9999] bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          {tapCount}/5 tap
        </motion.div>
      )}

      {/* Admin panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-24 right-6 z-[9999] p-6 bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-sm"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2">Admin Updater</h3>
            <p className="text-white/60 text-sm mb-4">
              Zmień admin@test.pl → wojciech@bozemski.pl
            </p>
          </div>

          <button
            onClick={updateAdmin}
            disabled={loading}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg transition-colors"
          >
            {loading ? 'Aktualizuję...' : 'Zaktualizuj konto'}
          </button>

          {status && (
            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-white/80 text-sm break-words">{status}</p>
            </div>
          )}

          <button
            onClick={() => setShow(false)}
            className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
          >
            Zamknij
          </button>
        </div>
      </motion.div>
    </>
  );
}