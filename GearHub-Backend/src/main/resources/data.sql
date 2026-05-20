-- ---------------------------------------------------------
-- Test Data for all tables
-- ---------------------------------------------------------

-- Users
-- Password for all mock users is 'password'.
-- Hash: $2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG
INSERT IGNORE INTO users (id, name, email, password_hash, role) VALUES 
(1, 'Admin User', 'admin@gearhub.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ADMIN'),
(2, 'Trader Bob', 'trader@gearhub.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'TRADER'),
(3, 'Customer Jane', 'customer@gearhub.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'CUSTOMER'),
(4, 'Trader Alice', 'alice_trade@gearhub.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'TRADER'),
(5, 'Customer John', 'johnny@gearhub.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'CUSTOMER');

-- Products
INSERT IGNORE INTO products (id, trader_id, name, description, price, stock_quantity, category, brand, model, manufacture_year, part_number, image_url) VALUES 
(1, 2, 'V8 Engine Block', 'High performance V8 engine block for custom builds.', 1200.00, 5, 'Engine', 'Ford', 'Mustang', 2021, 'ENG-8V-01', 'https://example.com/images/v8-engine.jpg'),
(2, 2, 'Premium Brake Pads Set', 'Ceramic brake pads for high durability and performance.', 85.50, 50, 'Brakes', 'Brembo', 'Universal GT', 2022, 'BRK-PD-02', 'https://example.com/images/brakes.jpg'),
(3, 2, 'Sport Suspension Kit', 'Adjustable sport suspension for better handling.', 850.00, 10, 'Suspension', 'Bilstein', 'Pro-Kit', 2023, 'SUS-KT-99', 'https://example.com/images/suspension.jpg'),
(4, 4, 'LED Headlight Conversion Kit', 'Bright 6000K LED headlights.', 45.99, 100, 'Lighting', 'Philips', 'X-tremeVision', 2023, 'LIG-LED-00', 'https://example.com/images/headlights.jpg'),
(5, 4, 'Performance Exhaust System', 'Stainless steel exhaust system that adds 10 horsepower.', 450.00, 15, 'Exhaust', 'MagnaFlow', 'Street Series', 2020, 'EXH-MF-55', 'https://example.com/images/exhaust.jpg');

-- Orders
INSERT IGNORE INTO orders (id, customer_id, total_price, status, payment_method) VALUES 
(1, 3, 1285.50, 'DELIVERED', 'COD'),
(2, 5, 45.99, 'PENDING', 'CREDIT_CARD');

-- Order Items
INSERT IGNORE INTO order_item (id, order_id, product_id, quantity, price) VALUES 
(1, 1, 1, 1, 1200.00),
(2, 1, 2, 1, 85.50),
(3, 2, 4, 1, 45.99);

-- Cart
INSERT IGNORE INTO cart (id, customer_id) VALUES 
(1, 3),
(2, 5);

-- Cart Items
INSERT IGNORE INTO cart_items (id, cart_id, product_id, quantity) VALUES 
(1, 1, 3, 1),
(2, 1, 5, 1),
(3, 2, 2, 2);