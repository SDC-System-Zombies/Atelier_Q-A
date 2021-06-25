const db = require('../db');

module.exports = {
  getAnswers: ({question_id, page, count}) => {
    return db.query(
    `SELECT body, date, name, reported, helpful
    FROM answers
    WHERE question_id = ${question_id}
    LIMIT ${count}`)
    //need to filter all the reported ones
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
      return 400;
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
