SELECT * FROM users;
SELECT * FROM messages;
SELECT Messages.id, Users.username, Messages.message, Messages.timestamp FROM Messages JOIN Users ON Messages.user_id = Users.id;
SELECT Messages.id, Users.username, Users.id, Messages.message, Messages.timestamp FROM Messages JOIN Users ON Messages.user_id = Users.id;

SELECT username, last_active_at FROM users WHERE last_active_at > NOW() - INTERVAL '1 hour';

SELECT username, last_active_at;
            FROM users;
            WHERE last_active_at > NOW() - INTERVAL '1 hour';
ALTER TABLE Users ALTER COLUMN last_active_at SET DEFAULT NOW();

UPDATE users SET last_active_at = DEFAULT WHERE id = 12;
UPDATE users SET last_active_at = NOW() WHERE id = 12;

INSERT INTO Messages (username, message, timestamp) VALUES (Jack,"Hello", NOW())
SELECT id FROM Users WHERE username = 'Asher';