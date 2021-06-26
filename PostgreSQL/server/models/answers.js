const db = require('../db');

module.exports = {
  getAnswers: (params) => {
    let queryStr = `SELECT id, body, date, name, reported, helpful
    FROM answers
    WHERE question_id = $1
    LIMIT $2`
    let answers = db.query(queryStr, params)
    .then((data) => {
      var answersWPhotos = data.rows.map( entry => {
        let queryStr2 = `SELECT url FROM answers_photos WHERE answer_id = $1`;
        let photoUrls = db.query(queryStr2, [entry.id])
        .then( data => {
          let arrayOfPhotos = [];
          let len = data.rows.length;
          for (let i = 0; i < len; i++) {
            arrayOfPhotos.push(data.rows[i].url);
          }
          return arrayOfPhotos;
        })
        .catch( err => {
          console.log(err);
          return 400;
        })
        entry.photos = photoUrls;
        return entry;
      })
      console.log(answersWPhotos)
      return answersWPhotos;
    })
    .catch((err) => {
      console.log(err);
      return 400;
    });
    return answers;
  },
  postAnswer: (params, photos) => {
    let queryStr = `
    INSERT INTO answers(question_id, body, date, name, email, reported, helpful)
    VALUES ($1, $2, $3, $4, $5, false, 0)
    RETURNING id
    `
    let data = db.query(queryStr, params)
    .then((data) => {
      let answerID = data.rows[0].id;
      let queryStr2 = `
      INSERT INTO answers_photos(answer_id, url)
      VALUES(${answerID}, $1)
      `;
      let len = photos.length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          let done = db.query(queryStr2, [photos[i]])
        }
      }
      return 202
    })
    .catch((err) => {
      console.log(err);
      return 400;
    });
    return data;
  },
  updateHelpful: (params) => {
    let queryStr =
    `UPDATE answers
    SET helpful = helpful + 1
    WHERE id = $1`;
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
    WHERE id = $1`;
    return db.query(queryStr, params)
    .then(() => {
      return 202;
    })
    .catch((err) => {
      return err;
    });
  }

}
