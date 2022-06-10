const { Router } = require("express");
const router = Router();

const PropositionController = require("../controllers/PropositionController");

router.get("/", PropositionController.getAll);
router.get("/last", PropositionController.last);
router.post("/", PropositionController.post);
router.put("/:id", PropositionController.applyDecision);

module.exports = router;
