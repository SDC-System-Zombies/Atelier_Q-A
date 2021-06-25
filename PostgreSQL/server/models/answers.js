const db = require('../db');

module.exports = {
  getAnswers: ({question_id, page, count}) => {
    return db.query(
    `SELECT body, date_written, asker_name, reported, helpful
    FROM questions
    WHERE product_id = ${product_id}
    LIMIT ${count}`)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      return err;
    });
  },
  postAnswer: () => {
    return db.query(

    )
    .then(() => {
      return 202;
    })
    .catch((err) => {
      return err
    });
  },
  updateHelpful: () => {
    return db.query(

    )
    .then(() => {
      return 202;
    })
    .catch((err) => {
      return err;
    });
  },
  reportAnswer: () => {
    return db.query(

    )
    .then(() => {
      return 202;
    })
    .catch((err) => {
      return err;
    });
  }

}
