CREATE TABLE IF NOT EXISTS users(
	name varchar(100) NOT NULL,
	user_id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS sessions(
	session_id varchar(100) NOT NULL UNIQUE,
	user_id SERIAL references users(user_id) NOT NULL UNIQUE
);

