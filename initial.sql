-- password: Admin123+45
insert into "User" (email, password, role, "createdAt", "updatedAt") values ('admin@example.com', '$2a$12$yoH8ptJ4IZ5trX4dx0B2GOmzLhgDWHFftY1sV8WgZHZlF02pdiYk6', 'ADMIN', NOW(), NOW());


