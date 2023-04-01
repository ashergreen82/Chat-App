INSERT INTO public.messages(
	message, user_id, created_on)
	VALUES ('Hello everyone, how are you all doing?', 1, NOW());

SELECT * FROM messages;
SELECT * FROM users where id=1;
