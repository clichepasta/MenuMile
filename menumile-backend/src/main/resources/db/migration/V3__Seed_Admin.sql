-- V3__Seed_Admin.sql
-- Seed default system roles and a master admin user

-- 1. Insert default roles
INSERT INTO "rolesMaster" (uuid, role_name) VALUES 
('9f0f42b3-e608-4e1e-bb36-9e8cbb0c5d01', 'admin'),
('9f0f42b3-e608-4e1e-bb36-9e8cbb0c5d02', 'delivery_partner'),
('9f0f42b3-e608-4e1e-bb36-9e8cbb0c5d03', 'restaurant_staff'),
('9f0f42b3-e608-4e1e-bb36-9e8cbb0c5d04', 'customer')
ON CONFLICT (role_name) DO NOTHING;

-- 2. Insert default admin userInfo
INSERT INTO "userInfo" (id, "firstName", "middleName", "surname", "contactNumber", "whatsappNumber", email) VALUES
('b3017a42-7a5b-4dbe-8451-b8555e714150', 'System', NULL, 'Admin', '1234567890', '1234567890', 'admin@menumile.com')
ON CONFLICT ("contactNumber") DO NOTHING;

-- 3. Insert default admin userLogin
-- Password is BCrypt hash for: admin123
INSERT INTO "userLogin" (id, email, password, "phoneNumber", "isFirstLogin") VALUES
('b3017a42-7a5b-4dbe-8451-b8555e714150', 'admin@menumile.com', '$2a$10$8.ZpDy8ybX690Z.Gz6W1Vu8O.bF/k/fE59G6gC3VbFvQ8J5q.ZgV2', '1234567890', FALSE)
ON CONFLICT (email) DO NOTHING;

-- 4. Map Admin role to user
INSERT INTO "userRoleMapping" (id, "schoolId", "roleId", "userId", "isActive") VALUES
('a123bc45-def6-7890-abcd-ef1234567890', NULL, '9f0f42b3-e608-4e1e-bb36-9e8cbb0c5d01', 'b3017a42-7a5b-4dbe-8451-b8555e714150', TRUE)
ON CONFLICT (id) DO NOTHING;
