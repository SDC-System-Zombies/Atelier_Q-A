const models = require('../models');

module.exports = {
  get: async (req, res) => {
    let params = {
      question_id: req.params.question_id,
      page: req.query.page,
      count: req.query.count
    };
    let data = await models.answers.getAnswers(params);
    res.send(data);
  },
  post: (req, res) => {

  },
  putHelpful: (req, res) => {

  },
  putReport: (req, res) => {

  }
};

/*
  GET
  /qa/questions/:question_id/answers
    Parameters
    question_id integer	Required ID of the question for wich answers are needed

    Query Parameters
    page      	integer	Selects the page of results to return. Default 1.
    count     	integer	Specifies how many results per page to return. Default 5.

  /qa/questions/:question_id/answers
    Parameters
    question_id	integer	Required ID of the question to post the answer for

    Body Parameters
    body      	text    	Text of question being asked
    name      	text    	Username for question asker
    email     	text    	Email address for question asker
    photos    	[text]  	An array of urls corresponding to images to display

  PUT

    /qa/answers/:answer_id/helpful
    answer_id  	integer 	Required ID of the answer to update

    /qa/answers/:answer_id/report
    answer_id  	integer 	Required ID of the answer to update

*/