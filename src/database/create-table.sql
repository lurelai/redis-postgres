CREATE TABLE IF NOT EXISTS users(
	nickname varchar(50) NOT NULL UNIQUE,
	name varchar(200) NOT NULL,
	password varchar(100) NOT NULL,
	user_id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS sessions(
	session_id varchar(100) NOT NULL UNIQUE,
	user_id SERIAL references users(user_id) NOT NULL UNIQUE
);

