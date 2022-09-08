CREATE DATABASE testapi;

--tabla usuarios
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

--tabla productos
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description TEXT,
    price VARCHAR(50)
);

--insertar 2 usuarios de prueba
INSERT INTO users (name, email) VALUES
    ('user1', 'user1@user.com'),
    ('user2', 'user2@user.com');

--insertar 2 productos de prueba
INSERT INTO products (name, description, price) VALUES
    ('product1', 'Desecription for first product', '30'),
    ('product2', 'Desecription for second product', '50');
