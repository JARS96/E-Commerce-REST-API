CREATE DATABASE testapi;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

INSERT INTO users (name, email) VALUES
    ('user1', 'user1@user.com'),
    ('user2', 'user2@user.com');