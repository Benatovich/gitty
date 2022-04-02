const pool = require('../utils/pool');

module.exports = class User {
  username;
  photoUrl;

  constructor(row) {
    this.username = row.username;
    this.photoUrl = row.photo_url;
  }

  static async insert({ username, photoUrl }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                users (username, photo_url)
            VALUES
                ($1, $2)
            RETURNING
                *
            `,
      [username, photoUrl]
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
