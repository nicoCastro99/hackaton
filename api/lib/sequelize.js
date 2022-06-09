const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.DATABASE_URL, {});

connection
  .authenticate()
  .then((_) => console.log("postgres connected"))
  .catch((e) => console.error(e));

module.exports = connection;
