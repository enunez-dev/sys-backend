-- Crear la base de datos
--CREATE DATABASE dbpos;


-- Crear las tablas

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  hire_date DATE NOT NULL,
  job_title VARCHAR(100),
  salary DECIMAL(10,2),
  department_id INT,
  manager_id INT,
  status VARCHAR(20) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  ci_nit VARCHAR(20) UNIQUE NOT NULL,
  document_type VARCHAR(5) NOT NULL,
  email VARCHAR(100),
  status VARCHAR(20) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pay_conditions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  client_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  pay_condition_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

INSERT INTO pay_conditions (name)
VALUES 
('Efectivo'),
('Tarjeta');

INSERT INTO department (name, location) 
VALUES 
    ('Desarrollo', 'Oficina Central'),
    ('Recursos Humanos', 'Edificio B'),
    ('Finanzas', 'Planta Baja'),
    ('Marketing', 'Oficina Central'),
    ('Soporte Técnico', 'Edificio C');


INSERT INTO employee (first_name, last_name, email, phone, hire_date, job_title, salary, department_id, manager_id, status)
VALUES 
    ('Juan', 'Pérez', 'juan.perez@email.com', '555-1234', '2024-01-15', 'Desarrollador', 4500.00, 1, NULL, 'Active'),
    ('Ana', 'García', 'ana.garcia@email.com', '555-5678', '2023-06-10', 'Gerente de Proyecto', 7500.00, 1, NULL, 'Active'),
    ('Carlos', 'López', 'carlos.lopez@email.com', '555-8765', '2022-09-20', 'Analista Financiero', 5200.00, 3, 2, 'Active'),
    ('María', 'Fernández', 'maria.fernandez@email.com', '555-4321', '2021-03-05', 'Especialista en Recursos Humanos', 4800.00, 2, 2, 'Active'),
    ('Luis', 'Martínez', 'luis.martinez@email.com', '555-6789', '2020-12-01', 'Administrador de Sistemas', 6000.00, 5, 2, 'Active'),
    ('Elena', 'Torres', 'elena.torres@email.com', '555-1111', '2019-07-21', 'Diseñadora Gráfica', 4700.00, 4, 2, 'Active'),
    ('Pedro', 'Ramírez', 'pedro.ramirez@email.com', '555-2222', '2022-05-10', 'Soporte IT', 4100.00, 5, 5, 'Active'),
    ('Laura', 'Mendoza', 'laura.mendoza@email.com', '555-3333', '2023-08-14', 'Asistente Administrativo', 3800.00, 3, 3, 'Active');


INSERT INTO clients (name, ci_nit, document_type, email, status)
VALUES 
    ('Juan Pérez', '12345678', 'CI', 'juan.perez@email.com', 'Active'),
    ('Ana García', '98765432', 'NIT', 'ana.garcia@email.com', 'Active'),
    ('Carlos López', '56781234', 'CI', 'carlos.lopez@email.com', 'Inactive'),
    ('María Fernández', '43218765', 'NIT', 'maria.fernandez@email.com', 'Active'),
    ('Luis Martínez', '87654321', 'CI', 'luis.martinez@email.com', 'Active');

INSERT INTO products (code, name, price, status)
VALUES 
    ('P001', 'Laptop HP Pavilion', 850.00, 'Active'),
    ('P002', 'Monitor Samsung 24"', 220.50, 'Active'),
    ('P003', 'Teclado Mecánico RGB', 75.99, 'Active'),
    ('P004', 'Mouse Inalámbrico Logitech', 45.00, 'Active'),
    ('P005', 'Impresora Epson EcoTank', 320.00, 'Inactive'),
    ('P006', 'Disco Duro Externo 1TB', 110.00, 'Active'),
    ('P007', 'Auriculares Bluetooth Sony', 90.00, 'Active'),
    ('P008', 'Silla Ergonómica para Oficina', 150.00, 'Active'),
    ('P009', 'Webcam Full HD Logitech', 60.00, 'Active'),
    ('P010', 'Memoria RAM 16GB DDR4', 130.00, 'Active'),
    ('P011', 'Tarjeta Gráfica NVIDIA RTX 3060', 450.00, 'Inactive'),
    ('P012', 'Procesador Intel Core i7 12700K', 350.00, 'Active'),
    ('P013', 'Placa Base ASUS B550', 180.00, 'Active'),
    ('P014', 'Fuente de Poder 750W 80 Plus Gold', 120.00, 'Active'),
    ('P015', 'Caja para PC ATX con RGB', 90.00, 'Active'),
    ('P016', 'Router WiFi 6 TP-Link', 140.00, 'Active'),
    ('P017', 'Tablet Samsung Galaxy Tab S7', 650.00, 'Inactive'),
    ('P018', 'Smartphone iPhone 14', 999.00, 'Active'),
    ('P019', 'Cámara de Seguridad Xiaomi', 55.00, 'Active'),
    ('P020', 'Micrófono USB para Streaming', 85.00, 'Active'),
    ('P021', 'Smartwatch Garmin Venu 2', 420.00, 'Active'),
    ('P022', 'SSD NVMe 1TB Kingston', 130.00, 'Active'),
    ('P023', 'Hub USB-C con HDMI y Ethernet', 60.00, 'Active'),
    ('P024', 'Lector de Tarjetas SD y MicroSD', 25.00, 'Active'),
    ('P025', 'Cable HDMI 2.1 4K 3m', 20.00, 'Active'),
    ('P026', 'Estabilizador de Voltaje 1200VA', 95.00, 'Active'),
    ('P027', 'Parlantes Bluetooth JBL', 150.00, 'Active'),
    ('P028', 'Escáner de Documentos Epson', 210.00, 'Inactive'),
    ('P029', 'Ventilador RGB para PC', 35.00, 'Active'),
    ('P030', 'Base Refrigerante para Laptop', 40.00, 'Active');

