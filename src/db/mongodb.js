import mongoose from 'mongoose';
import config from '../config';

const mongoConnect = () => {
  let url = config.MONGO_URL;
  let option = {
    user: config.MONGO_DB_USER,
    pass: config.MONGO_DB_PASS,
    useNewUrlParser: true
  };
  mongoose.connect(url, option);
};

export default mongoConnect();
