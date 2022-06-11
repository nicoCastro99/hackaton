const { Router } = require("express");
const router = Router();

const userController = require("../controllers/UserController");

router.get("/players/:playerId", userController.getPlayers);
router.get("/", userController.getAll);
router.get("/:playerId", userController.getOne);
router.post("/", userController.post);
router.patch("/:playerId", userController.patch);
router.put("/assignPoints/:playerId", userController.assignPoints);

module.exports = router;
