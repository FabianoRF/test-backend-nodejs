import express from 'express';

const app = express();

app.use('/', (request, response) => {
  response.json('Heloo');
});

app.listen(3333, () => {
  console.log('*** Server started on port 3333');
});
