-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
    github_username TEXT NOT NULL PRIMARY KEY,
    github_photo_url TEXT NOT NULL
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text TEXT NOT NULL,
    username TEXT REFERENCES users(github_username)
);


INSERT INTO 
    users (github_username, github_photo_url)
VALUES
    ('mockUser', 'mockPhotoUrl');

INSERT INTO
    posts (text, username)
VALUES
    ('test post', 'mockUser');