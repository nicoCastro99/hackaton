const { prettifyErrors } = require("../lib/utils");
const { Op } = require("sequelize");
const User = require("../models/User");

exports.getPlayers = async (req, res) => {
	const { playerId } = req.params;
	try {
		const users = await User.findAll({
			where: {
				[Op.and]: [{ isRevealed: false }, { playerId: { [Op.not]: playerId } }],
			},
		});
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send(prettifyErrors(error));
	}
};

exports.getAll = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json(prettifyErrors(error));
	}
};

exports.getOne = async (req, res) => {
	const { playerId } = req.params;
	try {
		const user = await User.findOne({ where: { playerId } });
		if (!user) return res.status(404).json();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(prettifyErrors(error));
	}
};

exports.post = async (req, res) => {
	const user = req.body;

	try {
		await User.create(user);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json(prettifyErrors(error));
	}
};

exports.patch = async (req, res) => {
	const { playerId } = req.params;
	const { isRevealed, coins } = req.body;

	const isIncorrecctBody = false;

	if (!coins === undefined && !isRevealed === undefined)
		return res.status(400).json({
			error:
				"Le body de la requete doit contenir les clés 'isCorrect' et/ou 'coins'",
		});

	try {
		const user = await User.findOne({ where: { playerId } });
		if (!user) return res.status(404).send();
		const userUpdated = await User.update(
			{
				isRevealed,
				coins,
			},
			{
				where: { playerId },
				returning: true,
			}
		);
		res.status(200).json(...userUpdated[1]);
	} catch (error) {
		res.status(500).json(prettifyErrors(error));
	}
};

exports.assignPoints = async (req, res) => {
	const { playerId } = req.params;
	const { coins } = req.body;
	console.log(playerId)
	if (coins === undefined)
		return res.status(400).json({
			error:
				"Le body de la requete doit contenir la clé 'coins'",
		});

	try {
		const user = await User.findOne({ where: { playerId } });
		console.log(user.coins + coins)
		const total = user.coins + coins;
		if (!user) return res.status(404).send();
		const userUpdated = await User.update(
			{
				"coins": total
			},
			{
				where: { playerId },
				returning: true,
			}
		);
		res.status(200).json(...userUpdated[1]);
	} catch (error) {
		res.status(500).json(prettifyErrors(error));
	}
};
