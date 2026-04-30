-- Seed Data for Marshal Store

-- Clear existing data
TRUNCATE users, items, transactions RESTART IDENTITY CASCADE;

-- Ensure schema is correct
ALTER TABLE items ADD COLUMN IF NOT EXISTS description TEXT;

-- Insert Users
INSERT INTO users (name, username, email, phone, password, balance) VALUES
('Marshal Aufa', 'marshal', 'marshal@example.com', '+628123456789', '$2b$10$wN1GfU.qYvL7D7eXqZ6S6O6O6O6O6O6O6O6O6O6O6O6O6O6O6O6', 100000000), -- password123
('Alice Smith', 'alice', 'alice@example.com', '+628123456781', '$2b$10$wN1GfU.qYvL7D7eXqZ6S6O6O6O6O6O6O6O6O6O6O6O6O6O6O6O6', 10000000),
('Bob Johnson', 'bob', 'bob@example.com', '+628123456782', '$2b$10$wN1GfU.qYvL7D7eXqZ6S6O6O6O6O6O6O6O6O6O6O6O6O6O6O6O6', 500000);

-- Insert 50 Premium Items
INSERT INTO items (name, description, price, stock) VALUES
('Keychron Q1 Pro', 'Wireless Custom Mechanical Keyboard', 2800000, 15),
('Logitech G Pro X Superlight 2', 'Ultra-lightweight wireless gaming mouse', 2300000, 25),
('LG UltraFine 5K', '27-inch 5K high-resolution monitor', 18500000, 10),
('Sony WH-1000XM5', 'Industry-leading noise canceling headphones', 5200000, 30),
('Apple MacBook Pro M3 Max', '14-inch Space Black, 64GB RAM', 54000000, 5),
('Herman Miller Aeron', 'Ergonomic office chair - Onyx Black', 24000000, 8),
('BenQ ScreenBar Halo', 'Monitor light bar with wireless controller', 2900000, 20),
('Glorious Model O 2', 'Lightweight ambidextrous gaming mouse', 1200000, 40),
('Ducky One 3 TKL', 'Hot-swappable mechanical keyboard', 1900000, 22),
('Dell UltraSharp U2723QE', '27-inch 4K USB-C Hub Monitor', 9500000, 12),
('SteelSeries Arctis Nova Pro', 'Premium multi-system gaming headset', 5500000, 18),
('Secretlab TITAN Evo', '2024 Series ergonomic gaming chair', 8500000, 15),
('Razer DeathAdder V3 Pro', 'Ergonomic wireless gaming mouse', 2100000, 28),
('ASUS ROG Swift OLED', '27-inch 240Hz OLED gaming monitor', 16000000, 7),
('Blue Yeti X', 'Professional USB microphone for streaming', 2800000, 25),
('Elgato Stream Deck MK.2', 'Studio controller with 15 macro keys', 2400000, 20),
('Bose QuietComfort Ultra', 'Over-ear noise-cancelling headphones', 5800000, 22),
('Varmilo VA87M', 'Summit themed mechanical keyboard', 2500000, 10),
('Samsung Odyssey Neo G9', '49-inch curved DQHD gaming monitor', 28000000, 5),
('Zowie EC2-CW', 'Wireless ergonomic mouse for esports', 2300000, 15),
('Nanoleaf Lines', 'Smarter RGB backlight bars', 3200000, 12),
('Shure SM7B', 'Cardioid dynamic vocal microphone', 6500000, 10),
('Focusrite Scarlett 2i2', '4th Gen USB Audio Interface', 3100000, 20),
('Audio-Technica ATH-M50x', 'Professional monitor headphones', 2400000, 35),
('NuPhy Air75 V2', 'Ultra-slim wireless mechanical keyboard', 2200000, 18),
('HyperX QuadCast S', 'USB condenser gaming microphone', 2600000, 25),
('NZXT Capsule', 'Cardioid USB streaming microphone', 1800000, 30),
('Wooting 60HE', 'Analog mechanical gaming keyboard', 3500000, 5),
('Sennheiser HD 660S2', 'Open-back audiophile headphones', 8500000, 10),
('Wacom Intuos Pro', 'Medium creative pen tablet', 5400000, 15),
('Lian Li Uni Fan SL120', '3-pack RGB 120mm case fans', 1400000, 40),
('Govee Glide Hexa', 'RGBIC light panels', 2800000, 20),
('Keychron K2 V2', 'Wireless mechanical keyboard', 1200000, 50),
('Razer Viper V2 Pro', 'Ultra-lightweight wireless esports mouse', 2200000, 25),
('Alienware AW3423DW', '34-inch QD-OLED curved gaming monitor', 19500000, 6),
('Elgato Facecam Pro', '4K60 Ultra-HD webcam', 4800000, 12),
('Logitech MX Master 3S', 'Advanced wireless business mouse', 1500000, 45),
('Corsair K100 RGB', 'Optical-mechanical gaming keyboard', 3800000, 15),
('Philips Hue Play', 'Smart light bar 2-pack', 2500000, 20),
('Oura Ring Gen3', 'Heritage Silver smart ring', 5200000, 15),
('Kindle Paperwhite', '16GB with 6.8-inch display', 2400000, 30),
('Fujifilm X100V', 'Premium compact digital camera', 24000000, 3),
('Steam Deck OLED', '1TB handheld gaming computer', 12000000, 10),
('iPad Pro M2', '12.9-inch Space Gray, 256GB', 19500000, 8),
('AirPods Pro Gen 2', 'Wireless noise cancelling earbuds', 3500000, 50),
('Sony Alpha a7 IV', 'Full-frame mirrorless camera', 36000000, 5),
('Peak Design Everyday Backpack', '20L V2 - Charcoal', 4200000, 15),
('Belkin BoostCharge Pro', '3-in-1 Wireless Charger with MagSafe', 2200000, 25),
('Nomad Base Station', 'Apple Watch Mount Edition', 2800000, 20),
('Twelve South Curve', 'Desktop stand for MacBook', 900000, 40);