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

  static insert({ username, photo_url }) {
    return pool.query(
      `
      INSERT INTO
          users (username, photo_url)
      VALUES
          ($1, $2)
      RETURNING
          *
      `,
      [username, photo_url]
    )
      .then(rows => {
        return new User(rows[0]);
      });


  }

  static findByUsername(username) {
    return pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        username=$1
      `,
      [username]
    )
      .then(rows => {
        if (rows.length < 1) return null;
        return new User(rows.rows[0]);
      });

  }

  toJSON(){
    return { ...this };
  }

    
};
