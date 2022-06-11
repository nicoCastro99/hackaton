const User = require("./User");
const Proposition = require("./Proposition");
const Mission = require("./Mission");
const connection = require("../lib/sequelize");

connection.sync({ alter: true }).then((_) => console.log("Database synced"));

module.exports = {
	User,
	Proposition,
	Mission,
};
