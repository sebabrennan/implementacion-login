import express from "express";
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import handlebars from 'express-handlebars';
import morgan from 'morgan';
import userRouter from "./routes/user.router.js";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/product.router.js";
import { __dirname } from './utils.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./data/database.js";
import 'dotenv/config';

const storeConfig = {
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        //crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));
app.use(morgan("dev"));

app.use(errorHandler);


app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


initMongoDB();

app.use("/api/users", userRouter);
app.use("/api/users", viewsRouter);
app.use("/api/products", productRouter);
app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));