import Sequelize from "sequelize";
import sequelize from "../util/database.js";
const User = sequelize.define("user", {
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
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "Pending",
  },
  confirmationCode: {
    type: Sequelize.STRING,
    unique: true,
  },
  resetToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  resetTokenExpiration: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});
export default User;
