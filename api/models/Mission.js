const connection = require("../lib/sequelize");
const { Model, DataTypes } = require("sequelize");

class Mission extends Model {}

Mission.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        reward: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 20,
        },
    },
    {
        sequelize: connection,
        modelName: "Mission",
        paranoid: true,
    }
);

module.exports = Mission;
