import { motion } from 'framer-motion';
import { ShoppingCart, Package, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sweet } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useSweets } from '@/context/SweetsContext';
import { useState } from 'react';
import { toast } from 'sonner';

interface SweetCardProps {
  sweet: Sweet;
  onEdit?: (sweet: Sweet) => void;
}

export function SweetCard({ sweet, onEdit }: SweetCardProps) {
  const { user } = useAuth();
  const { purchaseSweet, restockSweet, deleteSweet } = useSweets();
  const [imageError, setImageError] = useState(false);
  const isOutOfStock = sweet.quantity === 0;
  const isAdmin = user?.role === 'admin';

  const handlePurchase = () => {
    if (sweet.quantity > 0) {
      purchaseSweet(sweet.id, 1);
      toast.success(`Purchased ${sweet.name}!`);
    }
  };

  const handleRestock = () => {
    restockSweet(sweet.id, 10);
    toast.success(`Restocked ${sweet.name} with 10 units`);
  };

  const handleDelete = () => {
    deleteSweet(sweet.id);
    toast.success(`Deleted ${sweet.name}`);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Chocolates: 'bg-chocolate/10 text-chocolate border-chocolate/20',
      Candies: 'bg-strawberry/10 text-strawberry border-strawberry/20',
      Gummies: 'bg-accent/10 text-accent border-accent/20',
      Lollipops: 'bg-caramel/10 text-caramel border-caramel/20',
      Cookies: 'bg-chocolate/10 text-chocolate border-chocolate/20',
      Pastries: 'bg-primary/10 text-primary border-primary/20',
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  // Generate a gradient placeholder based on category
  const getPlaceholderGradient = (category: string) => {
    const gradients: Record<string, string> = {
      Chocolates: 'from-amber-900 to-amber-700',
      Candies: 'from-pink-400 to-rose-500',
      Gummies: 'from-emerald-400 to-teal-500',
      Lollipops: 'from-orange-400 to-amber-500',
      Cookies: 'from-amber-600 to-yellow-600',
      Pastries: 'from-rose-300 to-pink-400',
    };
    return gradients[category] || 'from-primary to-accent';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col shadow-card hover:shadow-float transition-all duration-300 border-border/50">
        <div className="relative aspect-[4/3] overflow-hidden">
          {imageError ? (
            <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderGradient(sweet.category)} flex items-center justify-center`}>
              <Package className="h-12 w-12 text-primary-foreground/70" />
            </div>
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderGradient(sweet.category)} flex items-center justify-center`}>
              <Package className="h-12 w-12 text-primary-foreground/70" />
            </div>
          )}
          
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className={`${getCategoryColor(sweet.category)} border`}>
              {sweet.category}
            </Badge>
          </div>
          
          {isOutOfStock && (
            <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
              <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-semibold text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <CardContent className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-lg leading-tight line-clamp-2">
              {sweet.name}
            </h3>
            <span className="text-primary font-bold text-lg whitespace-nowrap">
              ${sweet.price.toFixed(2)}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {sweet.description}
          </p>
          
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className={`font-medium ${isOutOfStock ? 'text-destructive' : 'text-accent'}`}>
              {sweet.quantity} in stock
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex flex-col gap-2">
          <Button 
            variant={isOutOfStock ? "outline" : "hero"}
            className="w-full"
            onClick={handlePurchase}
            disabled={isOutOfStock}
          >
            <ShoppingCart className="h-4 w-4" />
            {isOutOfStock ? 'Out of Stock' : 'Purchase'}
          </Button>
          
          {isAdmin && (
            <div className="flex gap-2 w-full">
              <Button variant="mint" size="sm" className="flex-1" onClick={handleRestock}>
                <Plus className="h-4 w-4" />
                Restock
              </Button>
              {onEdit && (
                <Button variant="outline" size="sm" onClick={() => onEdit(sweet)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
