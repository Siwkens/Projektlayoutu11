import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInWithPassword, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        const { error } = await signInWithPassword(email, password);
        if (error) throw error;
        onClose();
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        
        // Auto login after successful signup (since we auto-confirm)
        const { error: loginError } = await signInWithPassword(email, password);
        if (loginError) {
           setSuccess('Konto zostało utworzone. Zaloguj się.');
           setIsLogin(true);
        } else {
           onClose();
        }
      }
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[61] pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0f172a] border border-white/10 w-full max-w-md p-8 rounded-2xl shadow-2xl pointer-events-auto relative overflow-hidden"
            >
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <h2 className="text-2xl font-bold text-white mb-2 text-center">
                {isLogin ? 'Witaj ponownie' : 'Dołącz do nas'}
              </h2>
              <p className="text-white/60 text-center mb-8">
                {isLogin ? 'Zaloguj się, aby zarządzać rezerwacjami' : 'Utwórz konto, aby umawiać sesje'}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-white/40" size={18} />
                    <input
                      type="email"
                      placeholder="Adres Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-white/40" size={18} />
                    <input
                      type="password"
                      placeholder="Hasło"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="text-green-400 text-sm text-center bg-green-500/10 py-2 rounded">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 className="animate-spin" size={18} />}
                  {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
                </button>
              </form>

              {/* Toggle */}
              <div className="mt-6 text-center text-white/60 text-sm">
                {isLogin ? 'Nie masz konta?' : 'Masz już konto?'}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-400 hover:text-purple-300 ml-2 font-medium"
                >
                  {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}