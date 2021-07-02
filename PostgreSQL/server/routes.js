const router = require('express').Router();
const controller = require('./controllers');

// Questions Routes
router.get('/questions', controller.questions.get);
router.post('/questions', controller.questions.post);
router.put('/questions/:question_id/helpful', controller.questions.putHelpful);
router.put('/questions/:question_id/report', controller.questions.putReport);

// Answer Routes
router.get('/questions/:question_id/answers', controller.answers.get);
router.post('/questions/:question_id/answers', controller.answers.post);
router.put('/answers/:answer_id/helpful', controller.answers.putHelpful);
router.get('/answers/:answer_id/report', controller.answers.putReport);

module.exports = router;
