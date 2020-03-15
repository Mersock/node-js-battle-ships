import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import './db/mongodb';

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('This is Battle Ship APIs.');
});

app.use(router);

export default app;
