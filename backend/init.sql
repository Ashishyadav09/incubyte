-- Sweet Shop Database Initialization

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sweets table
CREATE TABLE IF NOT EXISTS sweets (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_sweets_category ON sweets(category);
CREATE INDEX IF NOT EXISTS idx_sweets_name ON sweets(name);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert sample sweets data
INSERT INTO sweets (id, name, category, price, quantity, description, image) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Belgian Dark Chocolate Truffles', 'Chocolates', 12.99, 50, 'Luxurious dark chocolate truffles handcrafted with premium Belgian cocoa.', '/sweets/chocolate-truffles.jpg'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Rainbow Gummy Bears', 'Gummies', 5.99, 120, 'Colorful assortment of fruity gummy bears in six delicious flavors.', '/sweets/gummy-bears.jpg'),
    ('550e8400-e29b-41d4-a716-446655440003', 'Strawberry Swirl Lollipops', 'Lollipops', 2.49, 0, 'Classic spiral lollipops with a sweet strawberry cream taste.', '/sweets/lollipops.jpg'),
    ('550e8400-e29b-41d4-a716-446655440004', 'Salted Caramel Bonbons', 'Candies', 8.99, 75, 'Buttery caramel candies with a hint of sea salt.', '/sweets/caramel-bonbons.jpg'),
    ('550e8400-e29b-41d4-a716-446655440005', 'Double Chocolate Chip Cookies', 'Cookies', 6.99, 40, 'Freshly baked cookies loaded with dark and milk chocolate chips.', '/sweets/chocolate-cookies.jpg'),
    ('550e8400-e29b-41d4-a716-446655440006', 'French Macarons Assortment', 'Pastries', 15.99, 30, 'Delicate French macarons in raspberry, vanilla, pistachio, and chocolate.', '/sweets/macarons.jpg'),
    ('550e8400-e29b-41d4-a716-446655440007', 'Milk Chocolate Hearts', 'Chocolates', 9.99, 85, 'Heart-shaped milk chocolates perfect for gifting or self-indulgence.', '/sweets/chocolate-hearts.jpg'),
    ('550e8400-e29b-41d4-a716-446655440008', 'Sour Worm Gummies', 'Gummies', 4.49, 100, 'Tangy and chewy sour worms coated in sweet-sour sugar.', '/sweets/sour-worms.jpg')
ON CONFLICT (id) DO NOTHING;

-- Insert default admin user (password: admin123)
INSERT INTO users (id, email, password, name, role) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'admin@sweetshop.com', '$2a$10$rDkPvvAFV6kR0VPYaHnQe.Vt6Rl6YpF8N6vqK3dO.8Qa0dZKxmT4m', 'Admin User', 'admin')
ON CONFLICT (id) DO NOTHING;
