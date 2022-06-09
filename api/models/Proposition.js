const connection = require("../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const User = require("./User");

class Proposition extends Model {}

Proposition.init(
	{
		suggestion: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		result: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
	},
	{
		sequelize: connection,
		modelName: "Proposition",
		paranoid: true,
	}
	//applicantId
	//targetId
);

module.exports = Proposition;
