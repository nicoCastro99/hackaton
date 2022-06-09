const { prettifyErrors } = require("../lib/utils");
const { User } = require("../models");
const Proposition = require("../models/Proposition");

exports.getAll = async (req, res) => {
	try {
		const propositions = await Proposition.findAll();
		res.status(200).send(propositions);
	} catch (error) {
		res.status(500).send(prettifyErrors(error));
	}
};

exports.post = async (req, res) => {
	try {
		Proposition.create(req.body).then((resp) => res.status(201).send(resp));
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.put = async (req, res) => {
	const { body } = req;
	const { id } = req.params;
	try {
		const proposition = await Proposition.findByPk(id);
		if (!proposition) res.sendStatus(404);

		const newProposition = await Proposition.update(
			body,
			{
				where: { id },
				returning: true,
			},
			{
				include: {
					model: User,
					as: "target",
				},
				include: {
					model: User,
					as: "applicant",
				},
			}
		);
		res.status(200).send(newProposition);
	} catch (error) {
		res.status(500).send(error);
	}
};
