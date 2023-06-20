import express from "express";
import bodyParser from "body-parser";
import Sequelize from "sequelize";
import * as dotenv from "dotenv";
import sequelize from "./util/database.js";
import animalRouter from "./routes/animals.js";
import auth from "./routes/auth.js";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import { ErrorMiddleware } from "./middleware/error.js";
dotenv.config();
const store = MySQLStore(session);
const options = {
  connectionLimit: 10,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.USER,
  database: process.env.DB,
  createDatabaseTable: true,
};
const sessionStore = new store(options);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: "my secret",
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/", auth);
app.use("/animals", animalRouter);

app.use(ErrorMiddleware);
sequelize
  //.sync({ force: true }) //during development
  .sync()

  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
