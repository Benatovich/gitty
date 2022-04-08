-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    photo_url TEXT NOT NULL
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    user_id BIGINT REFERENCES users(id)
);



INSERT INTO 
    users (username, photo_url)
VALUES
    ('mockUser', 'mockPhotoUrl');

INSERT INTO
    posts (text, user_id)
VALUES
    ('test post', 1);