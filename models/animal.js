import Sequelize from "sequelize";
import sequelize from "../util/database.js";
const Animal = sequelize.define("animal", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  chip: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  years: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  examination: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  requested: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

export default Animal;
