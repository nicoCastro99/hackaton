const connection = require("../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const User = require("./User");

class Proposition extends Model {}

Proposition.init(
	{
		roomId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		suggestion: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		isCorrect: {
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
