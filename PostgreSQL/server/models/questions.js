const db = require('../db');

module.exports = {
  getQuestions: (params) => {
    let queryStr = `SELECT question_id, question_body, question_date, asker_name, helpfulness
    FROM questions
    WHERE product_id = $1
    AND reported = 'false'
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
  postQuestion: (params) => {
    let queryStr = `INSERT INTO questions(product_id, question_body, question_date, asker_name, asker_email, reported, helpfulness)
    VALUES ($1, $2, $3, $4, $5, false, 0)`
    return db.query(queryStr, params)
    .then(() => {
      return 202;
    })
    .catch((err) => {
      console.log(err)
      return 400
    });
  },
  updateHelpful: (params) => {
    let queryStr =`UPDATE questions
    SET helpfulness = helpfulness + 1
    WHERE question_id = $1`
    return db.query(queryStr, params)
    .then(() => {
      return 202;
    })
    .catch((err) => {
      console.log(err);
      return 400;
    });
  },
  reportQuestion: (params) => {
    let queryStr = `UPDATE questions
    SET reported = true
    WHERE question_id = $1`
    return db.query(queryStr, params)
    .then(() => {
      return 202;
    })
    .catch((err) => {
      console.log(err);
      return 400;
    });
  }

}
