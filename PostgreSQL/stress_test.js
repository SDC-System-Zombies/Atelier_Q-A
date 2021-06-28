import http from 'k6/http';

import { sleep } from 'k6';

export default function () {
  let productId = Math.floor(Math.random() * 1000000 + 1);
  let questionId = Math.floor(Math.random() * 1000000 + 1);
  let answerId = Math.floor(Math.random() * 1000000 + 1);
  let page = Math.floor(Math.random() * 5 + 1);
  let count = Math.floor(Math.random() * 5 + 1);


  let url = `http://127.0.0.1:3000/qa/questions?product_id=${productId}&[age=${page}&count=${count}` // Questions
  // let url = `http://127.0.0.1:3000/qa/questions/${questionId}/answers?page=${page}&count=${count}` // Answers

  http.get(url);

  // http.get(`https://localhost:3000/qa/questions/`);
  // http.get(`https://localhost:3000/qa/questions/`);
  // http.get(`https://localhost:3000/qa/questions/`);
  sleep(.1);
}