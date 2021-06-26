const model = require('../models');

module.exports = {
  get: async (req, res) => {
    let params = {
      product_id: req.query.product_id,
      page: req.query.page,
      count: req.query.count};

    let questionData = await model.questions.getQuestions(params);
    let len = questionData.length;
    for (let i = 0; i < len; i++) {
      let answers = await model.answers.getAnswers([questionData[i].id, 5])
    }

    let results = {
      product_id: req.req.query.product_id,
      results: questionData
    }
    res.send(results);

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

