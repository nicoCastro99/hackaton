const { prettifyErrors } = require("../lib/utils");
const User = require("../models/User");
const Proposition = require("../models/Proposition");

exports.clearDatabase = async (req, res) => {
	try {
		await User.destroy({
			where: {}
		});
		await Proposition.destroy({
			where: {}
		});
		res.sendStatus(204);
	} catch (error) {
		res.status(500).send(prettifyErrors(error));
	}
};