import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, supabase } from '../context/AuthContext';
import { X, Check, RefreshCw, Loader2, Filter } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Booking {
  id: string;
  user_name: string;
  user_email: string;
  date: string;
  serviceType: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  note?: string;
}

export function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending'>('all');

  // NOTE: Add admin emails here
  const ADMIN_EMAILS = ["wojciech@bozemski.pl", "patryk.siwkens@gmail.com", "admin@test.pl"];

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      // Optimistic update
      setBookings(bookings.map(b => b.id === id ? { ...b, status: status as any } : b));
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  // Simple admin protection
  if (!user?.email || !ADMIN_EMAILS.includes(user.email)) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
         <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl text-center max-w-md">
            <h2 className="text-red-400 text-xl font-bold mb-2">Brak dostępu</h2>
            <p className="text-white/70 mb-4">Ten panel jest dostępny tylko dla administratorów.</p>
            <button onClick={onClose} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-white">Zamknij</button>
         </div>
      </div>
    );
  }

  const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === 'pending');

  return (
    <div className="fixed inset-0 z-[60] bg-[#0a0a1a] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0f172a]">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Panel Administratora
          <span className="text-xs bg-purple-600 px-2 py-0.5 rounded-full font-normal">BETA</span>
        </h2>
        <div className="flex gap-4">
          <button onClick={fetchBookings} className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5">
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <div className="text-white/50 text-sm mb-1">Wszystkie rezerwacje</div>
              <div className="text-3xl font-bold text-white">{bookings.length}</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">
              <div className="text-purple-300 text-sm mb-1">Oczekujące</div>
              <div className="text-3xl font-bold text-purple-400">{bookings.filter(b => b.status === 'pending').length}</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
              <div className="text-green-300 text-sm mb-1">Potwierdzone</div>
              <div className="text-3xl font-bold text-green-400">{bookings.filter(b => b.status === 'confirmed').length}</div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex gap-4 mb-6">
             <button 
               onClick={() => setFilter('all')}
               className={`px-4 py-2 rounded-lg text-sm transition-colors ${filter === 'all' ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
             >
               Wszystkie
             </button>
             <button 
               onClick={() => setFilter('pending')}
               className={`px-4 py-2 rounded-lg text-sm transition-colors ${filter === 'pending' ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
             >
               Tylko oczekujące
             </button>
          </div>

          {/* List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 text-white/30">
                Brak rezerwacji w tej kategorii.
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <motion.div 
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded uppercase font-bold tracking-wide 
                        ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 
                          booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 
                          'bg-yellow-500/20 text-yellow-400'}`}>
                        {booking.status === 'pending' ? 'Oczekuje' : booking.status === 'confirmed' ? 'Potwierdzona' : 'Anulowana'}
                      </span>
                      <span className="text-white/50 text-sm">
                        {new Date(booking.date).toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <h3 className="text-white font-medium text-lg">{booking.serviceType}</h3>
                    <div className="text-white/70 mt-1">
                      {booking.user_name} ({booking.user_email})
                    </div>
                    {booking.note && (
                      <div className="mt-3 bg-black/30 p-3 rounded text-sm text-white/60 italic">
                        "{booking.note}"
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {booking.status !== 'confirmed' && (
                      <button 
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Check size={16} /> Potwierdź
                      </button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <button 
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                        className="px-4 py-2 bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 border border-white/10 hover:border-red-500/50 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <X size={16} /> Anuluj
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}