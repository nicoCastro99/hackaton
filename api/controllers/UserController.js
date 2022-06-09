const { prettifyErrors } = require("../lib/utils");
const User = require("../models/User");

exports.getAll = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send(prettifyErrors(error));
	}
};

exports.getOne = async (req, res) => {
	const { playerId } = req.params;
	try {
		const user = await User.findOne({ where: { playerId } });
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send(prettifyErrors(error));
	}
};

exports.post = async (req, res) => {
	const user = req.body;

	try {
		await User.create(user);
		res.status(201).send(user);
	} catch (error) {
		res.status(500).send(prettifyErrors(error));
	}
};

exports.patch = async (req, res) => {
	const { body } = req;
	try {
		const user = await User.update(body);
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send(prettifyErrors(error));
	}
};
