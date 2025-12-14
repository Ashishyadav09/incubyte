import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Candy, Sparkles, ShoppingBag, Shield, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';

const features = [
  {
    icon: ShoppingBag,
    title: 'Wide Selection',
    description: 'From chocolates to gummies, we have sweets for every taste.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'All products are sourced from premium confectioners.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your treats delivered fresh to your doorstep.',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Sweet Enthusiast',
    content: 'The best chocolate truffles I\'ve ever tasted! Will definitely order again.',
    rating: 5,
  },
  {
    name: 'James K.',
    role: 'Candy Collector',
    content: 'Amazing variety and the gummy bears are absolutely divine.',
    rating: 5,
  },
  {
    name: 'Emma R.',
    role: 'Pastry Lover',
    content: 'The French macarons are authentic and beautifully made.',
    rating: 5,
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-cream -z-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Welcome to Sweet Shop</span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Indulge in{' '}
              <span className="text-gradient">Sweet Bliss</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Discover our exquisite collection of handcrafted chocolates, 
              artisanal candies, and delightful treats from around the world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register">
                <Button variant="hero" size="xl">
                  <Candy className="h-5 w-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating candy icons */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-32 left-[15%] hidden lg:block"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-strawberry to-primary flex items-center justify-center shadow-float rotate-12">
            <Candy className="h-8 w-8 text-primary-foreground" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute top-48 right-[12%] hidden lg:block"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-mint flex items-center justify-center shadow-float -rotate-12">
            <Star className="h-7 w-7 text-accent-foreground" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 left-[20%] hidden lg:block"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-caramel to-chocolate flex items-center justify-center shadow-float rotate-6">
            <ShoppingBag className="h-6 w-6 text-primary-foreground" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to bringing you the finest confections with exceptional service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-float transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-5">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied sweet lovers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-caramel fill-caramel" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
              Ready to Satisfy Your Sweet Tooth?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Join thousands of happy customers and discover your new favorite treats today.
            </p>
            <Link to="/register">
              <Button 
                size="xl" 
                className="bg-background text-foreground hover:bg-background/90 shadow-float"
              >
                <Candy className="h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
