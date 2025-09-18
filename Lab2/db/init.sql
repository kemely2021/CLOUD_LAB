CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

INSERT INTO usuarios (nombre, email) VALUES
('Alice', 'alice@mail.com'),
('Bob', 'bob@mail.com'),
('Charlie', 'charlie@mail.com');
