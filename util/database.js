import Sequelize from 'sequelize'
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize("node-complete", "root", process.env.DATABASE_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});
export default sequelize