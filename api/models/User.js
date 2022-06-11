const connection = require("../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const Proposition = require("./Proposition");

class User extends Model {}

User.init(
	//Schema
	{
		playerId: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		// roomId: {
		// 	type: DataTypes.STRING,
		// 	allowNull: false,
		// },
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
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		sequelize: connection,
		modelName: "User"
	}
);
User.hasMany(Proposition, {
	as: "propositionAsApplicant",
	// foreignKey: "applicantPlayerId",
});

User.hasMany(Proposition, {
	as: "propositionAsTarget",
	// foreignKey: "targetPlayerId",
});

Proposition.belongsTo(User, {
	targetKey: "playerId",
	foreignKey: "applicantPlayerId",
	as: "applicant",
});
Proposition.belongsTo(User, {
	targetKey: "playerId",
	foreignKey: "targetPlayerId",
	as: "target",
});
module.exports = User;
