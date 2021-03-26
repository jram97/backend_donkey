DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(10) UNIQUE
);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(60),
    usuario VARCHAR (50) UNIQUE,
    correo TEXT UNIQUE,
    contrasena TEXT,
    telefono VARCHAR (30),
    intentos INTEGER,
    rol_id INTEGER,
    activo BOOLEAN,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT LOCALTIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT LOCALTIMESTAMP,
    CONSTRAINT fk_role FOREIGN KEY (rol_id) REFERENCES rol(id)
);


INSERT INTO rol(nombre) VALUES ('admin');
INSERT INTO rol(nombre) VALUES ('user');
INSERT INTO rol(nombre) VALUES ('motorista');
INSERT INTO rol(nombre) VALUES ('publico');