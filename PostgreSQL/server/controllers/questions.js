const model = require('../models');

module.exports = {
  get: async (req, res) => {
    let params = {
      product_id: req.query.product_id,
      page: req.query.page,
      count: req.query.count};
    if (params) { // need to check the data somehow here
      let data = await model.questions.getQuestions(params);
      res.send(data)
    } else {
      res.sendStatus(400);
    }

  /*
    GET
    /qa/questions
      Parameters
      product_id	integer	Specifies the product for which to retrieve questions.
      page      	integer	Selects the page of results to return. Default 1.
      count     	integer	Specifies how many results per page to return. Default 5.
  */
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
  /*
  POST - Adds a question to the product
  /qa/questions
    Body Parameters
    body      	text   	Text of question being asked
    name      	text   	Username for question asker
    email     	text   	Email address for question asker
    product_id	integer	Required ID of the Product for which the question is posted
    */
  },
  putHelpful: async (req, res) => {
    let params = { question_id: req.params.question_id }
    let data = await model.questions.updateHelpful(params);
    res.sendStatus(data)
  /*
    PUT
    /qa/questions/:question_id/helpful
    question_id	integer 	Required ID of the question to update
*/
  },
  putReport: async (req, res) => {
    let params = { question_id: req.params.question_id }
    let data = await model.questions.reportQuestion(params);
    res.sendStatus(data)
      /*
    PUT
    /qa/questions/:question_id/report
    question_id	integer 	Required ID of the question to update
*/
  }
};

