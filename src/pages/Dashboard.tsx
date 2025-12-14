import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SweetGrid } from '@/components/sweets/SweetGrid';
import { SweetFilters } from '@/components/sweets/SweetFilters';
import { AddSweetDialog } from '@/components/sweets/AddSweetDialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useSweets } from '@/context/SweetsContext';
import { Plus, Package, TrendingUp, ShoppingBag } from 'lucide-react';
import { Sweet } from '@/types';

export default function Dashboard() {
  const { user } = useAuth();
  const { sweets, filteredSweets } = useSweets();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  
  const isAdmin = user?.role === 'admin';
  const totalValue = sweets.reduce((acc, s) => acc + s.price * s.quantity, 0);
  const outOfStock = sweets.filter(s => s.quantity === 0).length;

  const handleEditSweet = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingSweet(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                Sweet Collection
              </h1>
              <p className="text-muted-foreground">
                {isAdmin 
                  ? 'Manage your inventory and track sales' 
                  : 'Browse and purchase your favorite sweets'}
              </p>
            </div>
            {isAdmin && (
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-5 w-5" />
                Add Sweet
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats Cards for Admin */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{sweets.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                  <p className="text-2xl font-bold">{sweets.length - outOfStock}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold">{outOfStock}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-5 shadow-card border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-caramel/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-caramel" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Inventory Value</p>
                  <p className="text-2xl font-bold">${totalValue.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <SweetFilters />
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredSweets.length} of {sweets.length} sweets
          </p>
        </div>

        {/* Sweet Grid */}
        <SweetGrid onEditSweet={isAdmin ? handleEditSweet : undefined} />
      </div>

      {/* Add/Edit Dialog */}
      <AddSweetDialog 
        isOpen={isAddDialogOpen} 
        onClose={handleCloseDialog}
        editSweet={editingSweet}
      />
    </Layout>
  );
}
