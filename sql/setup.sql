-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
    username TEXT NOT NULL PRIMARY KEY,
    photo_url TEXT NOT NULL
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    username TEXT REFERENCES users(username)
);


INSERT INTO 
    users (username, photo_url)
VALUES
    ('mockUser', 'mockPhotoUrl');

INSERT INTO
    posts (text, username)
VALUES
    ('test post', 'mockUser');