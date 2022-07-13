CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR,
    user_name VARCHAR UNIQUE,
    password VARCHAR
);