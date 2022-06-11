const { prettifyErrors } = require("../lib/utils");
const Mission = require("../models/Mission");
const {Op} = require("sequelize");
const User = require("../models/User");

exports.getAll = async (req, res) => {
    try {
        const missions = await Mission.findAll();
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json(prettifyErrors(error));
    }
};


exports.post = async (req, res) => {
    const { name, state, reward } = req.body;
    try {
        const mission = await Mission.findOne({ where: { name } });
        if (mission) return res.status(404).json();

        Mission.create(req.body).then((resp) => res.status(201).send(resp));
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getMission = async (req, res) => {
    const { name } = req.params;
    try {
        const mission = await Mission.findOne({ where: { name } });
        if (!mission) return res.status(404).json();

        res.status(200).send(mission);
    } catch (error) {
        res.status(500).send(prettifyErrors(error));
    }
};

exports.patch = async (req, res) => {
    const { name } = req.params;
    const { state } = req.body;

    try {
        const mission = await Mission.findOne({ where: { name } });
        if (!mission) return res.status(404).send();
        const missionUpdate = await Mission.update(
            {
                state,
            },
            {
                where: { name },
                returning: true,
            }
        );

        res.status(200).json(...missionUpdate[1]);
    } catch (error) {
        res.status(500).json(prettifyErrors(error));
    }
};
