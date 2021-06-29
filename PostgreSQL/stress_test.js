import http from 'k6/http';

import { sleep, check } from 'k6';

export let options = {
//   scenarios: {
//     open_model: {
//       executor: 'constant-arrival-rate',
//       rate: 10,
//       timeUnit: '1s',
//       duration: '30s',
//       preAllocatedVUs: 500
//     }
//   }
  vus: 100,
  duration: '30s'
}

export default function () {
  let productId = Math.floor(Math.random() * 1000000 + 1);
  let questionId = Math.floor(Math.random() * 1000000 + 1);
  let answerId = Math.floor(Math.random() * 1000000 + 1);
  let page = Math.floor(Math.random() * 5 + 1);
  let count = Math.floor(Math.random() * 5 + 1);

  // let url = `http://127.0.0.1:3000/qa/questions?product_id=${productId}&[age=${page}&count=${count}` // Questions
  let url = `http://127.0.0.1:3000/qa/questions/${questionId}/answers?page=${page}&count=${count}` // Answers


  let res = http.get(url);
  check(res, {
    'is status code 200': (r) => r.status === 200,
  });
  sleep(.01);
}