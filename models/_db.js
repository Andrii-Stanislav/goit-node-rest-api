import { Sequelize } from "sequelize";

import "dotenv/config";

let { DB_HOST, DB_NAME, DB_USER_NAME, DB_PASSWORD, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  dialectOptions: { ssl: { require: true } },
});

export { sequelize };
