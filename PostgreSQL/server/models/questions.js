const db = require('../db');

module.exports = {
  getQuestions: (params) => {
    let queryStr = `SELECT id, body, date, name, reported, helpful
    FROM questions
    WHERE product_id = $1
    LIMIT $2`
    return db.query(queryStr, params)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
      return 400;
    });
  },
  postQuestion: ({ product_id, body, date ,name, email }) => {
    return db.query(
      `INSERT INTO questions(product_id, body, date, name, email, reported, helpful)
      VALUES (${product_id}, ${body}, ${date}, ${name}, ${email}, false, 0)`
    )
    .then(() => {
      return 202;
    })
    .catch((err) => {
      console.log(err)
      return 400
    });
  },
  updateHelpful: ({ question_id }) => {
    return db.query(
      `UPDATE questions
      SET helpful = helpful + 1
      WHERE id = ${question_id}`
    )
    .then(() => {
      return 202;
    })
    .catch((err) => {
      console.log(err);
      return 400;
    });
  },
  reportQuestion: ({ question_id }) => {
    return db.query(
      `UPDATE questions
      SET reported = true
      WHERE id = ${question_id}`
    )
    .then(() => {
      return 202;
    })
    .catch((err) => {
      console.log(err);
      return 400;
    });
  }

}
