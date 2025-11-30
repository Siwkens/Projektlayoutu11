import { motion } from 'motion/react';
import { Calendar, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { useMood } from '../context/MoodContext';

interface BookingProgressProps {
  totalBookings: number;
  completedBookings: number;
  upcomingBookings: number;
}

export function BookingProgress({ totalBookings, completedBookings, upcomingBookings }: BookingProgressProps) {
  const { colors } = useMood();
  
  const progressPercentage = totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0;
  
  // Calculate journey level based on completed sessions
  const getJourneyLevel = (completed: number) => {
    if (completed === 0) return { level: 'Początek podróży', icon: Sparkles, color: colors.accent };
    if (completed < 3) return { level: 'Odkrywca energii', icon: Sparkles, color: colors.primary };
    if (completed < 6) return { level: 'Uczeń równowagi', icon: Clock, color: colors.secondary };
    if (completed < 12) return { level: 'Strażnik harmonii', icon: CheckCircle, color: colors.primary };
    return { level: 'Mistrz energii', icon: CheckCircle, color: colors.accent };
  };

  const journey = getJourneyLevel(completedBookings);
  const JourneyIcon = journey.icon;

  return (
    <div
      className="p-6 rounded-xl relative overflow-hidden"
      style={{
        background: `${colors.primary}10`,
        border: `1px solid ${colors.primary}30`,
      }}
    >
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.primary}, transparent 70%)`
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}30, ${colors.accent}30)`,
              }}
            >
              <JourneyIcon className="w-6 h-6" style={{ color: journey.color }} />
            </div>
            <div>
              <h3 style={{ color: colors.text }}>Twoja podróż energetyczna</h3>
              <p className="text-sm opacity-60" style={{ color: colors.text }}>
                Poziom: {journey.level}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl" style={{ color: colors.primary }}>
              {completedBookings}
            </div>
            <div className="text-xs opacity-60" style={{ color: colors.text }}>
              sesji ukończonych
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-2 opacity-60" style={{ color: colors.text }}>
            <span>Postęp</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-black/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                }}
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            className="p-3 rounded-lg"
            style={{
              background: `${colors.primary}20`,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4" style={{ color: colors.accent }} />
              <span className="text-xs opacity-60" style={{ color: colors.text }}>Ukończone</span>
            </div>
            <div className="text-xl" style={{ color: colors.text }}>{completedBookings}</div>
          </motion.div>

          <motion.div
            className="p-3 rounded-lg"
            style={{
              background: `${colors.primary}20`,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4" style={{ color: colors.secondary }} />
              <span className="text-xs opacity-60" style={{ color: colors.text }}>Nadchodzące</span>
            </div>
            <div className="text-xl" style={{ color: colors.text }}>{upcomingBookings}</div>
          </motion.div>
        </div>

        {/* Next milestone */}
        {completedBookings < 12 && (
          <motion.div
            className="mt-4 p-3 rounded-lg text-center text-sm"
            style={{
              background: `${colors.accent}20`,
              border: `1px solid ${colors.accent}30`,
              color: colors.text
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="opacity-60">Następny poziom za: </span>
            <span style={{ color: colors.accent }}>
              {completedBookings < 3 ? 3 - completedBookings :
               completedBookings < 6 ? 6 - completedBookings :
               12 - completedBookings} sesji
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
