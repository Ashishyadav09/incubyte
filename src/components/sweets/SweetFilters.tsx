import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSweets } from '@/context/SweetsContext';
import { CATEGORIES } from '@/types';
import { motion } from 'framer-motion';

export function SweetFilters() {
  const { filter, setFilter } = useSweets();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sweets..."
            value={filter.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant={filter.category === category ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                filter.category === category 
                  ? 'bg-primary text-primary-foreground shadow-soft' 
                  : 'hover:bg-primary/10 hover:border-primary/40'
              }`}
              onClick={() => setFilter({ category })}
            >
              {category}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
