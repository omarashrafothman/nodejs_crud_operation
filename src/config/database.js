import { Sequelize } from "sequelize";

const sequelize = new Sequelize("crud_db", "root", "851995", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
