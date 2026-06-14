-- V4__Update_Admin_Password.sql
-- Correct the BCrypt password hash for admin@menumile.com to correspond to 'admin123'

UPDATE "userLogin"
SET password = '$2a$10$MpQMf62ovoVe6B1aNP9T3.eCSbqmo/sjOTUhO6H0FGj7lKRKY6O5.'
WHERE email = 'admin@menumile.com';
