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

  static async insert({ text, username, user_id }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                posts (text, username, user_id)
            VALUES
                ($1, $2, $3)
            RETURNING
                *
            `,
      [text, username, user_id]
    );

    return new Post(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');

    return rows.map((row) => new Post(row));
  }
};
