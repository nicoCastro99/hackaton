const connection = require("../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Proposition = require("./Proposition");

class User extends Model {}

User.init(
	//Schema
	{
		playerId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		secret: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		coins: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 50,
		},
		isRevealed: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: null,
		},
	},
	{
		sequelize: connection,
		modelName: "User",
		paranoid: true,
	}
);
User.hasMany(Proposition, {
	as: "propositionAsApplicant",
	foreignKey: "applicantId",
});

User.hasMany(Proposition, {
	as: "propositionAsTarget",
	foreignKey: "targetId",
});

Proposition.belongsTo(User, { as: "applicant" });
Proposition.belongsTo(User, { as: "target" });
module.exports = User;
