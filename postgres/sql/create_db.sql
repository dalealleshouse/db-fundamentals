CREATE DATABASE okr;

\c okr;

CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    abbreviation VARCHAR(5)
);

CREATE TABLE objectives (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER NOT NULL REFERENCES portfolios(id),
    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL,
    objective TEXT
);

CREATE TABLE key_results (
    id SERIAL PRIMARY KEY,
    objective_id INTEGER NOT NULL REFERENCES objectives(id),
    result TEXT,
    percent_achieved FLOAT(4)
);
