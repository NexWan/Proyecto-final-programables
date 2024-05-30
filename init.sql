CREATE DATABASE basurero with owner = 'wan';

\c basurero;

CREATE TABLE BasureroTable (
    id SERIAL PRIMARY KEY,
    fechaactualizacion DATE,
    lleno INT,
    nombre_basurero VARCHAR(255)
);