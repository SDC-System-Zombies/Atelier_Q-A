const router = require('express').Router();
const controller = require('./controllers');

router.get('/questions', (req, res) => {
  res.send('Received a GET request for questions');
  console.log(req.params);
})

/*
  GET
  /qa/questions
    Parameters
    product_id	integer	Specifies the product for which to retrieve questions.
    page      	integer	Selects the page of results to return. Default 1.
    count     	integer	Specifies how many results per page to return. Default 5.

  /qa/questions/:question_id/answers
    Parameters
    question_id integer	Required ID of the question for wich answers are needed

    Query Parameters
    page      	integer	Selects the page of results to return. Default 1.
    count     	integer	Specifies how many results per page to return. Default 5.

  POST - Adds a question to the product
  /qa/questions
    Body Parameters
    body      	text   	Text of question being asked
    name      	text   	Username for question asker
    email     	text   	Email address for question asker
    product_id	integer	Required ID of the Product for which the question is posted

  /qa/questions/:question_id/answers
    Parameters
    question_id	integer	Required ID of the question to post the answer for

    Body Parameters
    body      	text    	Text of question being asked
    name      	text    	Username for question asker
    email     	text    	Email address for question asker
    photos    	[text]  	An array of urls corresponding to images to display

  PUT
    /qa/questions/:question_id/helpful
    question_id	integer 	Required ID of the question to update

    /qa/questions/:question_id/report
    question_id	integer 	Required ID of the question to update

    /qa/answers/:answer_id/helpful
    answer_id  	integer 	Required ID of the answer to update

    /qa/answers/:answer_id/report
    answer_id  	integer 	Required ID of the answer to update

*/


module.exports = router;