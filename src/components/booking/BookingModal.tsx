import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, supabase } from '../context/AuthContext';
import { X, Calendar, Clock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "Bioterapia Energetyczna",
  "Terapia Kwantowa",
  "Uzdrawianie na odległość",
  "Oczyszczanie Przestrzeni",
];

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [serviceType, setServiceType] = useState(services[0]);
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      if (!token) throw new Error("Brak autoryzacji");

      // Combine date and time
      const dateTime = new Date(`${date}T${time}`).toISOString();

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: dateTime,
          serviceType,
          note,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Błąd rezerwacji');
      }

      setStep(2); // Show success
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Nie udało się utworzyć rezerwacji');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="bg-[#0f172a] border border-white/10 w-full max-w-lg p-8 rounded-2xl shadow-2xl pointer-events-auto relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Umów sesję</h2>
              <p className="text-white/60 mb-6">Wybierz termin i rodzaj terapii.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white/70 flex items-center gap-2">
                      <Calendar size={14} /> Data
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:border-purple-500 outline-none"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70 flex items-center gap-2">
                      <Clock size={14} /> Godzina
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:border-purple-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Rodzaj usługi</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:border-purple-500 outline-none [&>option]:text-black"
                  >
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Dodatkowe informacje (opcjonalne)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:border-purple-500 outline-none resize-none"
                    placeholder="Opisz krótko problem lub intencję..."
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-500/10 py-2 px-3 rounded flex items-center gap-2">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 className="animate-spin" size={18} />}
                  Potwierdź rezerwację
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Rezerwacja przyjęta!</h3>
              <p className="text-white/70 mb-8">
                Dziękujemy za umówienie wizyty. Otrzymasz potwierdzenie mailowe po zaakceptowaniu terminu.
              </p>
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-2 rounded-lg transition-colors"
              >
                Zamknij
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}