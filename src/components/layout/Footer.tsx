import { Candy, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Candy className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold text-gradient">
                Sweet Shop
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Your destination for the finest confections and sweets. Handcrafted with love, 
              delivered with care.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Browse Sweets</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Create Account</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">Chocolates</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Candies</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Gummies</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Pastries</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sweet Shop. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for sweet lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
