CREATE TABLE IF NOT EXISTS Users (
	id serial PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	date_created TIMESTAMP NOT NULL default NOW(),
	last_active_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Messages(
	id serial PRIMARY KEY,
	message VARCHAR(500),
	user_id INT NOT NULL REFERENCES Users(id),
	created_on TIMESTAMP NOT NULL default NOW()
);