import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string;
  height?: string;
  count?: number;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  count = 1 
}: SkeletonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded h-4';
      case 'card':
        return 'rounded-xl';
      default:
        return 'rounded-lg';
    }
  };

  const skeletonElement = (
    <motion.div
      className={`bg-gradient-to-r from-white/5 via-white/10 to-white/5 ${getVariantClasses()} ${className}`}
      style={{ width, height }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 100%',
        ...{ width, height },
      }}
    />
  );

  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i}>{skeletonElement}</div>
        ))}
      </>
    );
  }

  return skeletonElement;
}

// Predefined skeleton layouts for common use cases

export function BookingCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton variant="text" width="60%" className="mb-2" />
          <Skeleton variant="text" width="40%" />
        </div>
        <Skeleton variant="rectangular" width="80px" height="28px" />
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="70%" />
      </div>
      <Skeleton variant="rectangular" width="100%" height="40px" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="circular" width="48px" height="48px" />
        <Skeleton variant="text" width="60px" />
      </div>
      <Skeleton variant="text" width="80%" className="mb-2" />
      <Skeleton variant="text" width="40%" height="32px" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton variant="circular" width="64px" height="64px" />
          <div>
            <Skeleton variant="text" width="200px" className="mb-2" />
            <Skeleton variant="text" width="150px" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        <Skeleton variant="text" width="200px" height="28px" />
        <BookingCardSkeleton />
        <BookingCardSkeleton />
        <BookingCardSkeleton />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 pb-3 border-b border-white/10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="text" width="100%" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-4 py-3">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <Skeleton key={colIndex} variant="text" width="100%" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      <Skeleton variant="rectangular" width="100%" height="256px" />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton variant="circular" width="40px" height="40px" />
          <div className="flex-1">
            <Skeleton variant="text" width="60%" className="mb-1" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
        <Skeleton variant="text" width="100%" className="mb-2" />
        <Skeleton variant="text" width="90%" className="mb-4" />
        <div className="space-y-2">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Skeleton variant="circular" width="96px" height="96px" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="200px" height="24px" />
          <Skeleton variant="text" width="300px" />
          <Skeleton variant="text" width="250px" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton variant="text" width="100px" />
            <Skeleton variant="rectangular" width="100%" height="44px" />
          </div>
        ))}
      </div>

      <Skeleton variant="rectangular" width="200px" height="44px" />
    </div>
  );
}

// Loading overlay component
export function LoadingOverlay({ message = 'Ładowanie...' }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl"
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-purple-600/30 border-t-purple-400 rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-white/80">{message}</p>
      </div>
    </motion.div>
  );
}
