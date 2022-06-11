const { prettifyErrors } = require("../lib/utils");
const { User } = require("../models");
const Proposition = require("../models/Proposition");

exports.getAll = async (req, res) => {
	try {
		const propositions = await Proposition.findAll();
		res.status(200).json(propositions);
	} catch (error) {
		res.status(500).json(prettifyErrors(error));
	}
};

exports.last = async (req, res) => {
	try {
		const proposition = await Proposition.findOne({
			where: { isCorrect: null },
			order: [["createdAt", "DESC"]],
			include: ["applicant", "target"],
			attributes: {
				exclude: ["UserId", "applicantPlayerId", "targetPlayerId"],
			},
		});
		res.status(200).json(proposition);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.post = async (req, res) => {
	const { applicantPlayerId, targetPlayerId, suggestion } = req.body;

	try {
		//check if target and applicant exist
		const [applicant, target, propPending] = await Promise.all([
			User.findOne({
				where: { playerId: applicantPlayerId },
			}),
			User.findOne({
				where: { playerId: targetPlayerId },
			}),
			Proposition.findOne({
				where: { isCorrect: null },
			}),
		]);

		if (!applicant || !target)
			return res.status(404).json({
				error:
					"One or severals playerId from target/applicant doesn't exist in table user",
			});
		if (propPending)
			return res.status(403).json({
				error:
					"Création impossible, une proposition est déjà en attente de validation",
			});
		//check if has enought coins to buzz
		if (applicant.coins < 40)
			return res.status(403).json({
				forbidden: "The applicant has not enought coins to buzz !",
			});
		//remove 20 coins from the user
		applicant.coins -= 40;
		await applicant.save();

		Proposition.create(req.body).then((resp) => res.status(201).send(resp));
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.applyDecision = async (req, res) => {
	const { id } = req.params;
	const { isCorrect } = req.body;

	if (isCorrect === undefined)
		return res.status(400).json({
			error:
				"Le body de la requete doit contenir un clé 'isCorrect' avec une valeur true ou false",
		});

	try {
		//check if id proposition exist
		const currentProp = await Proposition.findByPk(id, {
			include: ["applicant", "target"],
		});
		//return 404
		if (!currentProp) return res.status(404).send();

		let { applicant, target } = currentProp;
		if (isCorrect) {
			//Winner earn loser coins
			applicant.coins += target.coins;
			target.coins = 0;
			//change loser status to revealed
			target.isRevealed = true;
		} else target.coins += 40;

		//save user changes
		await applicant.save();
		await target.save();

		//save proposition changes
		currentProp.isCorrect = isCorrect;
		await currentProp.save();

		res.status(200).json(currentProp);
	} catch (error) {
		res.status(500).json(error.message);
	}
};
