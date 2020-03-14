import express from 'express';
import bodyParser from 'body-parser';
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

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});

export default app;
