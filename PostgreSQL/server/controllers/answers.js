const model = require('../models');

module.exports = {
  get: async (req, res) => {
    let params = [
      req.params.question_id,
      // req.query.page,
      req.query.count
    ];
    let data = await model.answers.getAnswers(params);
    res.send(data);
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
  post: async (req, res) => {
    let date = new Date().toJSON().slice(0,10);
    let params =  [ req.params.question_id, req.body.body, date, req.body.name, req.body.email]
    let response = await model.answers.postAnswer(params, req.body.photos);
    res.sendStatus(response);
  },
  putHelpful: async (req, res) => {
    let params = [ req.params.answer_id ];
    let response = model.answers.updateHelpful(params);
    res.sendStatus(response);
  /*
    PUT
      /qa/answers/:answer_id/helpful
      answer_id  	integer 	Required ID of the answer to update
  */
  },
  putReport: async (req, res) => {
    let params = [ req.params.answer_id ];
    let response = model.answers.reportAnswer(params);
    res.sendStatus(response);
    /*
    /qa/answers/:answer_id/report
    answer_id  	integer 	Required ID of the answer to update  */
  }
};

