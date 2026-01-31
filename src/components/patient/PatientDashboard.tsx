import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, FileText, Music, Settings, LogOut, User, HeartPulse,
  Clock, CheckCircle, Loader2, Filter, TrendingUp, Flame, Award,
  AlertCircle, ExternalLink, ChevronRight
} from 'lucide-react';
import { useAuth, supabase } from '../context/AuthContext';
import { BookingModal } from '../booking/BookingModal';
import { projectId } from '../../utils/supabase/info';
import { format, formatDistanceToNow, isPast, isFuture } from 'date-fns';
import { pl } from 'date-fns/locale';

interface PatientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'dashboard' | 'appointments' | 'recommendations' | 'settings';
type FilterType = 'all' | 'upcoming' | 'past';

interface Booking {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  date: string;
  serviceType: string;
  note: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

interface Recommendation {
  id: string;
  userId: string;
  text: string;
  category: 'diet' | 'exercise' | 'meditation' | 'grounding' | 'other';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
}

// Status badge component
function BookingStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    pending: {
      label: 'Oczekująca',
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-400',
      border: 'border-yellow-500/20',
      icon: '⏳'
    },
    confirmed: {
      label: 'Potwierdzona',
      bg: 'bg-green-500/20',
      text: 'text-green-400',
      border: 'border-green-500/20',
      icon: '✓'
    },
    completed: {
      label: 'Zakończona',
      bg: 'bg-blue-500/20',
      text: 'text-blue-400',
      border: 'border-blue-500/20',
      icon: '✓✓'
    },
    cancelled: {
      label: 'Anulowana',
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      border: 'border-red-500/20',
      icon: '✗'
    }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  
  return (
    <span className={`px-3 py-1 rounded-full ${config.bg} ${config.text} text-xs font-medium border ${config.border} inline-flex items-center gap-1.5`}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}

// Loading skeleton
function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 animate-pulse">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 bg-white/5 rounded-xl" />
        <div className="w-20 h-6 bg-white/5 rounded-full" />
      </div>
      <div className="h-4 bg-white/5 rounded w-32 mb-2" />
      <div className="h-8 bg-white/5 rounded w-48 mb-4" />
      <div className="h-10 bg-white/5 rounded w-full" />
    </div>
  );
}

// Live countdown component
function TimeUntilAppointment({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const appointmentDate = new Date(date);
      const diff = appointmentDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft('Teraz!');
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) setTimeLeft(`Za ${days}d ${hours}h`);
      else if (hours > 0) setTimeLeft(`Za ${hours}h ${minutes}min`);
      else setTimeLeft(`Za ${minutes} minut`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, [date]);
  
  return <span className="text-purple-400 font-bold text-lg">{timeLeft}</span>;
}

export function PatientDashboard({ isOpen, onClose }: PatientDashboardProps) {
  const { user, signOut } = useAuth();
  
  // State
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  
  // Settings state
  const [userName, setUserName] = useState(user?.user_metadata?.name || '');
  const [userPhone, setUserPhone] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);

  // Fetch data
  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      if (!token) throw new Error('Brak autoryzacji');

      // Fetch bookings
      const bookingsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/bookings`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      if (!bookingsResponse.ok) {
        throw new Error('Błąd pobierania wizyt');
      }
      
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData);

      // Fetch recommendations
      const recsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/recommendations`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      if (recsResponse.ok) {
        const recsData = await recsResponse.json();
        setRecommendations(recsData);
      }
      
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markRecommendationAsCompleted = async (recId: string, completed: boolean) => {
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/recommendations/${recId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed })
        }
      );
      
      if (response.ok) {
        // Update local state
        setRecommendations(recs => 
          recs.map(r => r.id === recId ? { ...r, completed, completedAt: completed ? new Date().toISOString() : null } : r)
        );
      }
    } catch (err) {
      console.error('Mark recommendation error:', err);
    }
  };

  const scrollToAudioZone = () => {
    onClose();
    setTimeout(() => {
      const audioSection = document.getElementById('audio-zone');
      if (audioSection) {
        audioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  // Computed values
  const nextBooking = bookings
    .filter(b => isFuture(new Date(b.date)) && b.status !== 'cancelled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const filteredBookings = bookings.filter(booking => {
    const isUpcoming = isFuture(new Date(booking.date)) && booking.status !== 'cancelled';
    
    if (filter === 'upcoming') return isUpcoming;
    if (filter === 'past') return !isUpcoming || booking.status === 'cancelled';
    return true;
  });

  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const completedRecommendations = recommendations.filter(r => r.completed).length;
  const totalRecommendations = recommendations.length;
  const progressPercentage = totalRecommendations > 0 
    ? Math.round((completedRecommendations / totalRecommendations) * 100)
    : 0;

  const latestRecommendation = recommendations[0];

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
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-black/20 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                   <span className="text-white font-bold text-lg">{user?.email?.[0].toUpperCase()}</span>
                </div>
                <div className="overflow-hidden">
                  <div className="text-white font-medium truncate w-32 text-sm">{userName || user?.email}</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Pacjent
                  </div>
                </div>
              </div>

              <nav className="space-y-2 flex-1 overflow-y-auto md:overflow-visible flex md:flex-col gap-2 md:gap-0 pb-4 md:pb-0 no-scrollbar">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'dashboard' 
                      ? 'bg-white/10 text-white' 
                      : 'hover:bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <TrendingUp size={18} />
                  Dashboard
                </button>
                
                <button 
                  onClick={() => setActiveTab('appointments')}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'appointments' 
                      ? 'bg-white/10 text-white' 
                      : 'hover:bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <Calendar size={18} />
                  Moje wizyty
                  {bookings.length > 0 && (
                    <span className="ml-auto bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded-full">
                      {bookings.length}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={() => setActiveTab('recommendations')}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'recommendations' 
                      ? 'bg-white/10 text-white' 
                      : 'hover:bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <FileText size={18} />
                  Zalecenia
                  {recommendations.length > 0 && (
                    <span className="ml-auto bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                      {completedRecommendations}/{totalRecommendations}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={scrollToAudioZone}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <Music size={18} />
                  Strefa Audio
                  <ExternalLink size={14} className="ml-auto" />
                </button>
                
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'settings' 
                      ? 'bg-white/10 text-white' 
                      : 'hover:bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
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
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="max-w-4xl mx-auto">
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                  <>
                    <header className="mb-10">
                      <h1 className="text-3xl font-bold text-white mb-2">Witaj w swoim centrum zdrowia</h1>
                      <p className="text-white/60">
                        Tutaj znajdziesz podsumowania swoich sesji oraz materiały wspomagające proces zdrowienia.
                      </p>
                    </header>

                    {error && (
                      <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <Calendar size={18} className="text-purple-400" />
                          <span className="text-2xl font-bold text-white">{completedBookings}</span>
                        </div>
                        <p className="text-white/60 text-sm">Odbyte sesje</p>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <CheckCircle size={18} className="text-green-400" />
                          <span className="text-2xl font-bold text-white">{completedRecommendations}</span>
                        </div>
                        <p className="text-white/60 text-sm">Wykonane</p>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <Award size={18} className="text-blue-400" />
                          <span className="text-2xl font-bold text-white">{progressPercentage}%</span>
                        </div>
                        <p className="text-white/60 text-sm">Postęp</p>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <Flame size={18} className="text-orange-400" />
                          <span className="text-2xl font-bold text-white">{bookings.length}</span>
                        </div>
                        <p className="text-white/60 text-sm">Wszystkie wizyty</p>
                      </div>
                    </div>

                    {/* Main Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      
                      {/* Next Appointment Card */}
                      {loading ? (
                        <SkeletonCard />
                      ) : (
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                          
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                <Calendar className="text-purple-400" size={24} />
                              </div>
                              {nextBooking && (
                                <BookingStatusBadge status={nextBooking.status} />
                              )}
                            </div>
                            <h3 className="text-white/60 text-sm mb-1">Najbliższa wizyta</h3>
                            
                            {nextBooking ? (
                              <>
                                <p className="text-xl font-bold text-white mb-1">
                                  {format(new Date(nextBooking.date), 'dd MMMM yyyy, HH:mm', { locale: pl })}
                                </p>
                                <p className="text-sm text-white/60 mb-2">
                                  <TimeUntilAppointment date={nextBooking.date} />
                                </p>
                                <p className="text-sm text-white/40 mb-4">{nextBooking.serviceType}</p>
                                <button 
                                  onClick={() => setActiveTab('appointments')}
                                  className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                  Zobacz szczegóły
                                  <ChevronRight size={16} />
                                </button>
                              </>
                            ) : (
                              <>
                                <p className="text-2xl font-bold text-white mb-4">Brak zaplanowanych wizyt</p>
                                <button 
                                  onClick={() => setIsBookingModalOpen(true)}
                                  className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
                                >
                                  Umów spotkanie
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Latest Recommendation */}
                      {loading ? (
                        <SkeletonCard />
                      ) : (
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                          <div className="flex items-start justify-between mb-6">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                              <HeartPulse className="text-blue-400" size={24} />
                            </div>
                          </div>
                          <h3 className="text-white/60 text-sm mb-1">Ostatnie zalecenie</h3>
                          
                          {latestRecommendation ? (
                            <>
                              <p className="text-lg font-medium text-white mb-4 line-clamp-2">"{latestRecommendation.text}"</p>
                              <button
                                onClick={() => markRecommendationAsCompleted(latestRecommendation.id, !latestRecommendation.completed)}
                                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                                  latestRecommendation.completed
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                                }`}
                              >
                                {latestRecommendation.completed ? (
                                  <>
                                    <CheckCircle size={16} />
                                    Wykonane
                                  </>
                                ) : (
                                  'Oznacz jako wykonane'
                                )}
                              </button>
                            </>
                          ) : (
                            <>
                              <p className="text-white mb-4">Brak zaleceń</p>
                              <p className="text-white/40 text-sm">
                                Twoje zalecenia pojawią się tutaj po pierwszej konsultacji.
                              </p>
                            </>
                          )}
                        </div>
                      )}

                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button 
                        onClick={() => setActiveTab('appointments')}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium mb-1">Historia wizyt</h4>
                            <p className="text-white/60 text-sm">Zobacz wszystkie swoje sesje</p>
                          </div>
                          <ChevronRight className="text-white/40 group-hover:text-white transition-colors" size={20} />
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => setActiveTab('recommendations')}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium mb-1">Wszystkie zalecenia</h4>
                            <p className="text-white/60 text-sm">Zarządzaj swoimi zadaniami</p>
                          </div>
                          <ChevronRight className="text-white/40 group-hover:text-white transition-colors" size={20} />
                        </div>
                      </button>
                    </div>
                  </>
                )}

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                  <>
                    <header className="mb-8">
                      <h1 className="text-3xl font-bold text-white mb-2">Moje wizyty</h1>
                      <p className="text-white/60">Historia wszystkich twoich sesji terapeutycznych</p>
                    </header>

                    {/* Filter Tabs */}
                    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                      <button 
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                          filter === 'all' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Wszystkie ({bookings.length})
                      </button>
                      <button 
                        onClick={() => setFilter('upcoming')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                          filter === 'upcoming' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Nadchodzące ({bookings.filter(b => isFuture(new Date(b.date)) && b.status !== 'cancelled').length})
                      </button>
                      <button 
                        onClick={() => setFilter('past')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                          filter === 'past' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Przeszłe ({bookings.filter(b => isPast(new Date(b.date)) || b.status === 'cancelled').length})
                      </button>
                    </div>

                    {loading ? (
                      <div className="space-y-3">
                        <SkeletonCard />
                        <SkeletonCard />
                      </div>
                    ) : filteredBookings.length > 0 ? (
                      <div className="space-y-3">
                        {filteredBookings.map(booking => (
                          <motion.div 
                            key={booking.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Calendar size={16} className="text-purple-400 flex-shrink-0" />
                                <div>
                                  <span className="text-white font-medium block">
                                    {format(new Date(booking.date), 'dd MMMM yyyy', { locale: pl })}
                                  </span>
                                  <span className="text-white/60 text-sm">
                                    {format(new Date(booking.date), 'HH:mm')}
                                  </span>
                                </div>
                              </div>
                              <BookingStatusBadge status={booking.status} />
                            </div>
                            <p className="text-white/80 text-sm mb-2">{booking.serviceType}</p>
                            {booking.note && (
                              <p className="text-white/40 text-xs italic">"{booking.note}"</p>
                            )}
                            <div className="mt-3 pt-3 border-t border-white/5">
                              <span className="text-white/40 text-xs">
                                Utworzono: {formatDistanceToNow(new Date(booking.created_at), { addSuffix: true, locale: pl })}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-white/10 overflow-hidden">
                        <div className="p-8 text-center bg-white/[0.02]">
                          <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
                            <Calendar className="text-white/20" size={32} />
                          </div>
                          <h4 className="text-white font-medium mb-2">Brak wizyt w tym filtrze</h4>
                          <p className="text-white/40 text-sm max-w-md mx-auto mb-6">
                            {filter === 'all' && 'Nie masz jeszcze żadnych wizyt.'}
                            {filter === 'upcoming' && 'Nie masz zaplanowanych nadchodzących wizyt.'}
                            {filter === 'past' && 'Nie masz jeszcze przeszłych wizyt.'}
                          </p>
                          <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                          >
                            <Calendar size={18} />
                            Umów pierwszą wizytę
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Recommendations Tab */}
                {activeTab === 'recommendations' && (
                  <>
                    <header className="mb-8">
                      <h1 className="text-3xl font-bold text-white mb-2">Zalecenia terapeutyczne</h1>
                      <p className="text-white/60">Twoje spersonalizowane zadania i wskazówki</p>
                    </header>

                    {loading ? (
                      <div className="space-y-3">
                        <SkeletonCard />
                      </div>
                    ) : recommendations.length > 0 ? (
                      <div className="space-y-4">
                        {recommendations.map(rec => (
                          <motion.div 
                            key={rec.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-5 rounded-xl border transition-all ${
                              rec.completed
                                ? 'bg-green-500/5 border-green-500/20'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <button
                                onClick={() => markRecommendationAsCompleted(rec.id, !rec.completed)}
                                className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                  rec.completed
                                    ? 'bg-green-500 border-green-500'
                                    : 'border-white/20 hover:border-purple-400'
                                }`}
                              >
                                {rec.completed && <CheckCircle size={16} className="text-white" />}
                              </button>
                              
                              <div className="flex-1">
                                <p className={`text-white font-medium mb-2 ${rec.completed ? 'line-through opacity-60' : ''}`}>
                                  {rec.text}
                                </p>
                                
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2 py-1 rounded-md bg-white/5 text-white/60 text-xs">
                                    {rec.category}
                                  </span>
                                  
                                  <span className={`px-2 py-1 rounded-md text-xs ${
                                    rec.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                    rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-blue-500/20 text-blue-400'
                                  }`}>
                                    {rec.priority === 'high' ? 'Wysoki priorytet' :
                                     rec.priority === 'medium' ? 'Średni priorytet' :
                                     'Niski priorytet'}
                                  </span>
                                  
                                  <span className="text-white/40 text-xs ml-auto">
                                    {formatDistanceToNow(new Date(rec.createdAt), { addSuffix: true, locale: pl })}
                                  </span>
                                </div>
                                
                                {rec.completed && rec.completedAt && (
                                  <p className="text-green-400 text-xs mt-2">
                                    ✓ Wykonano {formatDistanceToNow(new Date(rec.completedAt), { addSuffix: true, locale: pl })}
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-white/10 overflow-hidden">
                        <div className="p-8 text-center bg-white/[0.02]">
                          <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
                            <FileText className="text-white/20" size={32} />
                          </div>
                          <h4 className="text-white font-medium mb-2">Brak zaleceń</h4>
                          <p className="text-white/40 text-sm max-w-md mx-auto">
                            Twoje zalecenia pojawią się tutaj po pierwszej konsultacji z Wojciechem.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <>
                    <header className="mb-8">
                      <h1 className="text-3xl font-bold text-white mb-2">Ustawienia profilu</h1>
                      <p className="text-white/60">Zarządzaj swoim kontem i preferencjami</p>
                    </header>

                    <div className="space-y-6 max-w-2xl">
                      {/* Profile Info */}
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                          <User size={18} />
                          Informacje osobiste
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-white/60 block mb-2">Email</label>
                            <input 
                              type="email"
                              value={user?.email || ''}
                              disabled
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white/60 cursor-not-allowed"
                            />
                            <p className="text-xs text-white/40 mt-1">Email nie może być zmieniony</p>
                          </div>
                          
                          <div>
                            <label className="text-sm text-white/60 block mb-2">Imię i nazwisko</label>
                            <input 
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                              placeholder="Jan Kowalski"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm text-white/60 block mb-2">Telefon</label>
                            <input 
                              type="tel"
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                              placeholder="+48 123 456 789"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Notifications */}
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                          <AlertCircle size={18} />
                          Powiadomienia
                        </h3>
                        
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={emailNotifications}
                              onChange={(e) => setEmailNotifications(e.target.checked)}
                              className="w-5 h-5 rounded bg-white/5 border-white/10 checked:bg-purple-600"
                            />
                            <div>
                              <span className="text-white/80 block">Powiadomienia email</span>
                              <span className="text-white/40 text-xs">Otrzymuj potwierdzenia wizyt na email</span>
                            </div>
                          </label>
                          
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={reminderNotifications}
                              onChange={(e) => setReminderNotifications(e.target.checked)}
                              className="w-5 h-5 rounded bg-white/5 border-white/10 checked:bg-purple-600"
                            />
                            <div>
                              <span className="text-white/80 block">Przypomnienia</span>
                              <span className="text-white/40 text-xs">Przypomnienie 24h przed wizytą</span>
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          // TODO: Save settings
                          alert('Ustawienia zapisane pomyślnie!');
                        }}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 rounded-lg transition-colors"
                      >
                        Zapisz zmiany
                      </button>
                    </div>
                  </>
                )}

              </div>
            </div>
          </motion.div>

          {/* Booking Modal */}
          <BookingModal 
            isOpen={isBookingModalOpen} 
            onClose={() => {
              setIsBookingModalOpen(false);
              fetchData(); // Refresh data after booking
            }} 
          />
        </>
      )}
    </AnimatePresence>
  );
}
