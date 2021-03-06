const pool = require('../utils/pool');

module.exports = class Post {
  id;
  text;
  username;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
    this.username = row.username;
    this.user_id = row.user_id;
  }

  static insert({ text, user_id }) {
    return pool.query(
      `
      INSERT INTO
          posts (text, user_id)
      VALUES
          ($1, $2)
      RETURNING
          *
      `,
      [text, user_id]
    )
      .then(rows => {
        return new Post(rows.rows[0]);
      });
  }

  static getAll() {
    return pool.query(
      `
      SELECT 
        posts.id,
        posts.text,
        posts.user_id,
        users.username
      FROM 
        posts
      LEFT JOIN
        users
      ON
        posts.user_id = users.id
        `
    )
      .then(rows => {
        return rows.rows.map((row) => new Post(row));
      });

  }
};
