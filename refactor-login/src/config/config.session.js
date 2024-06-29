import mongoStore from "connect-mongo";
import 'dotenv/config';

export const configSession = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000,
  },
  store: new mongoStore({
    mongoUrl: process.env.MONGO_URL ,
    ttl: 180,
  }),
};
