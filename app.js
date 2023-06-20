import express from "express";
import bodyParser from "body-parser";

import sequelize from "./util/database.js";
import animalRouter from "./routes/animals.js";
import { ErrorMiddleware } from "./middleware/error.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/animals", animalRouter);
app.use(ErrorMiddleware);
sequelize
  //.sync({ force: true }) //during development
  .sync()

  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
