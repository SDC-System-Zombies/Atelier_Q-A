const model = require('../models');

module.exports = {
  get:  (req, res) => {
    let results = {
      product_id: req.query.product_id,
      // results: questionData
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
          // push each of the answers into a new array.
          let arrayOfAnswers = answers.map((data) => {
            let currentId = Number(data.id);
            let arrayObj = {};
            arrayObj[currentId] = data;
            return arrayObj
          })
          let photoData = answers.map((answer) => {
            const id = [answer.id];
            let photos = model.answers.fetchPhotos(id)
            .then((data) => {
              return data;
            })
          })

          return Promise.all(photoData)
          .then((data) => {
            let len = data.length;
            for (let i = 0; i < len; i++) {
              arrayOfAnswers[i].photos = data[i];
            }
            return arrayOfAnswers;
          })
        })
      })
      Promise.all(answerData)
      .then((data) => {
        let len = data.length;
        for (let j = 0; j < len; j++) {
          questions[j].answers = data[j]
        }
      })
    })



    res.sendStatus(202);
  },
  post: async (req, res) => {
    let date = new Date().toJSON().slice(0,10);
    let params = {
      product_id: req.body.product_id,
      body: req.body.body,
      date: date,
      name: req.body.name,
      email: req.body.email
    }
    if (params) { // need to check the data somehow here
      let data = await model.questions.postQuestion(params);
      res.sendStatus(data);
    } else {
      res.sendStatus(400);
    }
  },
  putHelpful: async (req, res) => {
    let params = { question_id: req.params.question_id }
    let data = await model.questions.updateHelpful(params);
    res.sendStatus(data);
  },
  putReport: async (req, res) => {
    let params = { question_id: req.params.question_id }
    let data = await model.questions.reportQuestion(params);
    res.sendStatus(data);
  }
};

