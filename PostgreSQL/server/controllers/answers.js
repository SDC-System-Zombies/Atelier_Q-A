const model = require('../models');

module.exports = {
  get: (req, res) => {
    var results = {
      question: req.params.question_id,
      page: req.query.page,
      count: req.query.count
    };
    let params = [
      req.params.question_id,
      // req.query.page,
      req.query.count
    ];
    let data = model.answers.fetchAnswers(params)
    .then(data => {
      let answerData = data;

      let photoData = answerData.map( (answer) => {
        const id = [answer.id];
        return model.answers.fetchPhotos(id)
        .then((data) => {
          return data;
        })
      })

      return Promise.all(photoData)
      .then((data) => {
        let len = data.length;
        for (let i = 0; i < len; i++) {
          answerData[i].photos = data[i];
        }
        results.results = answerData;
        res.send(results);
      })
    })
    /*
    GET
    /qa/questions/:question_id/answers
      Parameters
      question_id integer	Required ID of the question for wich answers are needed

      Query Parameters
      page      	integer	Selects the page of results to return. Default 1.
      count     	integer	Specifies how many results per page to return. Default 5.
    */
  },
  post: (req, res) => {
    let date = new Date().toJSON().slice(0,10);
    let params =  [ req.params.question_id, req.body.body, date, req.body.name, req.body.email ]
    model.answers.postAnswer(params, req.body.photos)
    .then(response => res.sendStatus(response));
  },
  putHelpful: (req, res) => {
    let params = [ req.params.answer_id ];
    model.answers.updateHelpful(params)
    .then(response => res.sendStatus(response));

  },
  putReport: (req, res) => {
    let params = [ req.params.answer_id ];
    model.answers.reportAnswer(params)
    .then(response => res.sendStatus(response));
  }
};

