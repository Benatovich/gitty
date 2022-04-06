const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;
  photo_url;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.photo_url = row.photo_url;
  }

  static async insert({ username, photo_url }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                users (username, photo_url)
            VALUES
                ($1, $2)
            RETURNING
                *
            `,
      [username, photo_url]
    );

    return new User(rows[0]);
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        username=$1
      `,
      [username]
    );

    if (rows.length < 1) return null;
    return new User(rows[0]);
  }

  toJSON(){
    return { ...this };
  }

    
};
