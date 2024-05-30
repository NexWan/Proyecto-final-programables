CREATE DATABASE basurero with owner = 'wan';
SET timezone = 'UTC';

\c basurero;

CREATE TABLE BasureroTable (
    id SERIAL PRIMARY KEY,
    fechaactualizacion TIMESTAMPTZ,
    lleno INT,
    nombre_basurero VARCHAR(255)
);

INSERT INTO BasureroTable (fechaactualizacion, lleno, nombre_basurero) 
VALUES (TO_TIMESTAMP('01-01-2021:00-00-00', 'DD-MM-YYYY:HH24-MI-SS') AT TIME ZONE 'UTC', 0, 'Basurero 1');