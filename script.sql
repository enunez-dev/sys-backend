-- Crear la base de datos
--CREATE DATABASE dbpos;


-- Crear las tablas
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  ci_nit VARCHAR(20) UNIQUE NOT NULL,
  document_type VARCHAR(5) NOT NULL,
  email VARCHAR(100)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

CREATE TABLE pay_conditions (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  status SMALLINT
);

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  client_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  pay_condition_id INT NOT NULL,
  CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES clients(id),
  CONSTRAINT fk_pay_condition FOREIGN KEY (pay_condition_id) REFERENCES pay_conditions(id)
);

CREATE TABLE sales_products (
  sale_id INT NOT NULL,
  product_id INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  sub_total DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (sale_id, product_id),
  CONSTRAINT fk_sale FOREIGN KEY (sale_id) REFERENCES sales(id),
  CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO pay_conditions (id, name, status) VALUES 
(1, 'Efectivo', 1),
(2, 'Tarjeta', 1);

INSERT INTO clients (name, ci_nit, document_type, email) VALUES 
('User Demo', '1234567', 'CI', 'demo@correo.com');

-- Insertar datos en la tabla de productos
INSERT INTO products (code, name, price) VALUES 
('1', 'Pil Leche Fresca Natural X 946Ml', 6.4),
('2', 'Act Ii Pipocas Queso Cheddar Bolsa X 96G', 21.2),
('3', 'Pil Mantequilla Pasteurizada Con Sal X 200G', 17.7),
('4', 'Pan Hogar Cunapecitos X 200G', 17.6),
('5', 'Arcor Paneton Tradicional Con Frutas X 500G', 40),
('6', 'Biogurt Probiótico Frutilla X 1 L', 17),
('7', 'Pil Leche Con Cafe X 800Ml', 8.7),
('8', 'Oreo Galletas Cookies And Cream X 36G', 3.1);
