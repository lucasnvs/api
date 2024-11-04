CREATE DATABASE IF NOT EXISTS `api-auth`;
USE `api-auth`;

CREATE TABLE usuario (
    u_id INT PRIMARY KEY,
    u_nome VARCHAR (100) NOT NULL,
    u_senha VARCHAR(255) NOT NULL,
    u_telefone VARCHAR (15),
    u_email VARCHAR (100) NOT NULL,
    u_data_nascimento DATE,
    u_crn VARCHAR(10) UNIQUE
);
