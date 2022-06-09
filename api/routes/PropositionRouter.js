const { Router } = require("express");
const router = Router();

const PropositionController = require("../controllers/PropositionController");

router.get("/", PropositionController.getAll);
// router.get("/:playerId", PropositionController.getOne);
router.post("/", PropositionController.post);
router.put("/:id", PropositionController.put);

module.exports = router;
