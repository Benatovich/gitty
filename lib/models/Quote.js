const pool = require('../utils/pool');

module.exports = class Quote {
  id;
  author;
  content;

  constructor(row) {
    this.id = row.id;
    this.author = row.author;
    this.content = row.content;
  }

  static async insert({ author, content }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            quotes(author, content)
        VALUES 
            ($1, $2)
        RETURNING 
            *
        `,
      [author, content]
    );

    return new Quote(rows[0]);
  }

};
