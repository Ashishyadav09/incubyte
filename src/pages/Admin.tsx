import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useSweets } from '@/context/SweetsContext';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Package, 
  Search,
  RefreshCcw
} from 'lucide-react';
import { AddSweetDialog } from '@/components/sweets/AddSweetDialog';
import { Sweet } from '@/types';
import { toast } from 'sonner';

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const { sweets, deleteSweet, restockSweet } = useSweets();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);

  // Redirect if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (sweet: Sweet) => {
    deleteSweet(sweet.id);
    toast.success(`${sweet.name} deleted`);
  };

  const handleRestock = (sweet: Sweet) => {
    restockSweet(sweet.id, 25);
    toast.success(`Restocked ${sweet.name} with 25 units`);
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
                Admin Panel
              </h1>
              <p className="text-muted-foreground">
                Manage inventory, add products, and control stock levels
              </p>
            </div>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-5 w-5" />
              Add New Sweet
            </Button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-4 font-medium text-sm">Product</th>
                  <th className="text-left p-4 font-medium text-sm">Category</th>
                  <th className="text-left p-4 font-medium text-sm">Price</th>
                  <th className="text-left p-4 font-medium text-sm">Stock</th>
                  <th className="text-right p-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSweets.map((sweet, index) => (
                  <motion.tr
                    key={sweet.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{sweet.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                            {sweet.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">{sweet.category}</Badge>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">${sweet.price.toFixed(2)}</span>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={sweet.quantity === 0 ? "destructive" : "default"}
                        className={sweet.quantity > 0 ? "bg-accent/10 text-accent" : ""}
                      >
                        {sweet.quantity} units
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="mint" 
                          size="sm"
                          onClick={() => handleRestock(sweet)}
                        >
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(sweet)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(sweet)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSweets.length === 0 && (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No sweets found</p>
            </div>
          )}
        </motion.div>
      </div>

      <AddSweetDialog 
        isOpen={isAddDialogOpen} 
        onClose={handleCloseDialog}
        editSweet={editingSweet}
      />
    </Layout>
  );
}
