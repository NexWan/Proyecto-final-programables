CREATE DATABASE basurero with owner = 'wan';

\c basurero;

CREATE TABLE BasureroTable (
    id SERIAL PRIMARY KEY,
    fechaactualizacion DATE,
    lleno INT,
    nombre_basurero VARCHAR(255)
);

insert into BasureroTable (fechaactualizacion, lleno, nombre_basurero) values ('2021-01-01', 0, 'Basurero 1');