const db = require('../db');

module.exports = {
  fetchAnswers: (params) => {
    let queryStr = `SELECT answer_id, body, date, answerer_name, helpfulness
    FROM answers
    WHERE question_id = $1
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
  fetchPhotos: (params) => {
    let queryStr = `SELECT url
    FROM answers_photos
    where answer_id = $1`
    return db.query(queryStr, params)
    .then((data) => {
      let arrayOfPhotos = [];
      data.rows.forEach(url => {
        arrayOfPhotos.push(url.url);
      })
      return arrayOfPhotos;
    })
  },
  postAnswer: (params, photos) => {
    let queryStr = `
    INSERT INTO answers(question_id, body, date, answerer_name, email, reported, helpfulness)
    VALUES ($1, $2, $3, $4, $5, false, 0)
    RETURNING answer_id
    `;
    return db.query(queryStr, params)
    .then((data) => {
      let answerID = data.rows[0].answer_id;
      let queryStr2 = `
      INSERT INTO answers_photos(answer_id, url)
      VALUES(${answerID}, $1)
      `;
      let len = photos.length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          let photoParams = [photos[i]];
          db.query(queryStr2, photoParams)
          .catch((err) => {
            console.log(err);
          })
        }
        return 202;
      } else {
        return 202;
      }
    })
    .catch((err) => {
      console.log(err);
      return 400;
    });
  },
  updateHelpful: (params) => {
    let queryStr =
    `UPDATE answers
    SET helpfulness = helpfulness + 1
    WHERE answer_id = $1`;
    return db.query(queryStr, params)
    .then(() => {
      return 202;
    })
    .catch((err) => {
      return err;
    });
  },
  reportAnswer: (params) => {
    let queryStr =
    `UPDATE answers
    SET reported = true
    WHERE answer_id = $1`;
    return db.query(queryStr, params)
    .then(() => {
      return 202;
    })
    .catch((err) => {
      return err;
    });
  }

}
