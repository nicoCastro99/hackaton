const { Router } = require("express");
const router = Router();

const MissionController = require("../controllers/MissionController");

router.get("/", MissionController.getAll);
router.post("/", MissionController.post);
router.get("/:name", MissionController.getMission);
router.put("/:name", MissionController.patch);

module.exports = router;
