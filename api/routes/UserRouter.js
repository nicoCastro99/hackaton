const { Router } = require("express");
const router = Router();

const userController = require("../controllers/UserController");

router.get("/", userController.getAll);
router.get("/:playerId", userController.getOne);
router.post("/", userController.post);

module.exports = router;
