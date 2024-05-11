INSERT INTO accounts (username, password, email, created_at, last_login) VALUES ('sol', 'zero', 'patteesolomon@gmail.com', '2024-3-5 22:29:00', '2024-3-5 22:29:00');

INSERT INTO accounts (username, password, email, created_at, last_login) VALUES
('taro', 'raylyn', 'scytokiris@gmail.com', '2024-3-5 22:32:00', '2024-3-5 22:32:00');

ALTER TABLE accounts ADD cartInv VARCHAR ARRAY[] DEFAULT null;

