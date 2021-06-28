const model = require('../models');

module.exports = {
  get:  (req, res) => {
    let results = {
      product_id: req.query.product_id,
    }
    let params = [
      req.query.product_id,
      // req.query.page,
      req.query.count
    ]

    var questionData = model.questions.getQuestions(params)
    .then((questions) => {
      let answerData = questions.map((question) => {
        return model.answers.fetchAnswers([question.id, 2])
        .then((answers) => {
          let arrayOfAnswers = answers.map((data) => {
            let currentId = Number(data.id);
            let arrayObj = {};
            arrayObj[currentId] = data;
            return arrayObj
          })
          let photoData = answers.map((answer) => {
            const id = [answer.id];
            return photos = model.answers.fetchPhotos(id)
            .then((data) => {
              return data;
            })
          })

          return Promise.all(photoData)
          .then((data) => {
            let len = data.length;
            for (let i = 0; i <= len; i++) {
              for (key in arrayOfAnswers[i]) {
                arrayOfAnswers[i][key].photos = data[i];
              }
            }
            return arrayOfAnswers;
          })
        })
      })
      Promise.all(answerData)
      .then((data) => {
        let len = data.length;
        for (let i = 0; i < len; i++) {
          let answersObj = {};
          data[i].forEach( answerObj => {
            Object.assign(answersObj, answerObj);
          })
          questions[i].answers = answersObj;
        }
        return questions;
      })
      .then((questions) => {
        results.results = questions;
        res.send(results)
      })
    })
  },
  post: (req, res) => {
    let date = new Date().toJSON().slice(0,10);
    let params = [ req.body.product_id, req.body.body, date, req.body.name, req.body.email ]
    if (params) { // need to check the data somehow here
      model.questions.postQuestion(params)
      .then((data) => res.sendStatus(data));
    } else {
      res.sendStatus(400);
    }
  },
  putHelpful: (req, res) => {
    let params = [ req.params.question_id ]
    model.questions.updateHelpful(params)
    .then((data) => res.sendStatus(data));
  },
  putReport: (req, res) => {
    let params = [ req.params.question_id ]
    model.questions.reportQuestion(params)
    .then((data) => res.sendStatus(data));
  }
};

