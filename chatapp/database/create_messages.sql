INSERT INTO public.messages(
	message, user_id, created_on)
	VALUES ('Hello everyone, how are you all doing?', 1, NOW());

SELECT * FROM messages;
SELECT * FROM users where id=1;
SELECT * FROM users;
SELECT id FROM users where username = 'David';

BEGIN;
DELETE FROM messages WHERE id = 2;
COMMIT;
