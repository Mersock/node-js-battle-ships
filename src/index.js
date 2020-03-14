import express from 'express';
import bodyParser from 'body-parser';
import './db/mongodb';
import router from './routes';

const PORT = 3000;
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

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});

export default app;
