import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Loader2, CheckCircle, XCircle, UserPlus } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function AdminSetup() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<'test' | 'patryk'>('patryk');
  const [connectionStatus, setConnectionStatus] = useState<string>('');

  const adminOptions = {
    test: {
      email: 'admin@test.pl',
      password: 'Admin123!',
      name: 'Administrator Testowy'
    },
    patryk: {
      email: 'patryk.siwkens@gmail.com',
      password: 'PatrykAdmin2024!',
      name: 'Patryk Siwkens'
    }
  };

  const testConnection = async () => {
    try {
      setConnectionStatus('Testowanie połączenia...');
      console.log('🔌 Test połączenia z backendem...');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/health`,
        { method: 'GET' }
      );
      
      console.log('📡 Status health check:', response.status);
      const data = await response.json();
      console.log('📦 Odpowiedź health:', data);
      
      if (response.ok && data.status === 'ok') {
        setConnectionStatus('✅ Backend działa poprawnie');
      } else {
        setConnectionStatus('⚠️ Backend odpowiada, ale status nieoczekiwany');
      }
    } catch (err: any) {
      console.error('❌ Błąd połączenia:', err);
      setConnectionStatus(`❌ Brak połączenia: ${err.message}`);
    }
  };

  const initializeAdmin = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const admin = adminOptions[selectedAdmin];
      
      console.log('🔧 Tworzenie konta administratora:', admin.email);
      console.log('🌐 URL:', `https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/create-admin`);
      console.log('🔑 Używam publicAnonKey dla autoryzacji');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/create-admin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            email: admin.email,
            password: admin.password,
            name: admin.name
          })
        }
      );

      console.log('📡 Odpowiedź serwera - status:', response.status);
      console.log('📡 Headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log('📦 Dane z serwera:', data);

      if (!response.ok) {
        const errorMsg = data.error || data.message || `HTTP ${response.status}`;
        console.error('❌ Szczegóły błędu:', errorMsg, data);
        throw new Error(errorMsg);
      }

      setResult({ ...data, email: admin.email, password: admin.password });
    } catch (err: any) {
      console.error('❌ Błąd tworzenia konta:', err);
      const errorMessage = err.message || 'Wystąpił nieoczekiwany błąd';
      console.error('❌ Pełny obiekt błędu:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 shadow-2xl max-w-md backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Shield className="text-purple-400" size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold">Inicjalizacja Admina</h3>
            <p className="text-white/50 text-xs">Utwórz konto administratora</p>
          </div>
        </div>

        {!result && !error && (
          <>
            {/* Admin Selection */}
            <div className="space-y-2 mb-4">
              <label className="text-white/70 text-sm font-medium">Wybierz administratora:</label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedAdmin('patryk')}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedAdmin === 'patryk'
                      ? 'bg-purple-600 text-white border-2 border-purple-400'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserPlus size={16} />
                    <div>
                      <div className="font-medium text-sm">Patryk Siwkens</div>
                      <div className="text-xs opacity-70">patryk.siwkens@gmail.com</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setSelectedAdmin('test')}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedAdmin === 'test'
                      ? 'bg-purple-600 text-white border-2 border-purple-400'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserPlus size={16} />
                    <div>
                      <div className="font-medium text-sm">Konto Testowe</div>
                      <div className="text-xs opacity-70">admin@test.pl</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <button
              onClick={initializeAdmin}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Tworzenie...
                </>
              ) : (
                'Stwórz Konto Admina'
              )}
            </button>
            
            {/* Connection test button */}
            <button
              onClick={testConnection}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-xs transition-colors mt-2"
            >
              🔌 Test Połączenia
            </button>
            
            {connectionStatus && (
              <div className="mt-2 text-xs text-white/60 bg-black/30 p-2 rounded">
                {connectionStatus}
              </div>
            )}
          </>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle className="text-green-400 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-green-400 text-sm font-medium">
                  {result.message}
                </p>
                {!result.alreadyExists && (
                  <div className="mt-3 space-y-1 text-xs">
                    <div className="text-white/70">
                      <span className="text-white/50">Email:</span>{' '}
                      <span className="text-white font-mono bg-black/30 px-2 py-0.5 rounded">
                        {result.email}
                      </span>
                    </div>
                    <div className="text-white/70">
                      <span className="text-white/50">Hasło:</span>{' '}
                      <span className="text-white font-mono bg-black/30 px-2 py-0.5 rounded">
                        {result.password}
                      </span>
                    </div>
                    <p className="text-yellow-400 mt-2 text-xs">
                      ⚠️ Zapisz te dane i zmień hasło po zalogowaniu!
                    </p>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setResult(null)}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors"
            >
              Zamknij
            </button>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <XCircle className="text-red-400 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-red-400 text-sm font-medium">Błąd</p>
                <p className="text-white/60 text-xs mt-1">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors"
            >
              Spróbuj ponownie
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}