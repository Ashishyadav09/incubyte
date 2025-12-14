import { motion } from 'framer-motion';
import { SweetCard } from './SweetCard';
import { useSweets } from '@/context/SweetsContext';
import { Candy } from 'lucide-react';
import { Sweet } from '@/types';

interface SweetGridProps {
  onEditSweet?: (sweet: Sweet) => void;
}

export function SweetGrid({ onEditSweet }: SweetGridProps) {
  const { filteredSweets, isLoading } = useSweets();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="aspect-[3/4] rounded-2xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (filteredSweets.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <Candy className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2">No sweets found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      {filteredSweets.map((sweet) => (
        <SweetCard key={sweet.id} sweet={sweet} onEdit={onEditSweet} />
      ))}
    </motion.div>
  );
}
