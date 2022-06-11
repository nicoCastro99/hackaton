const { Router } = require("express");
const router = Router();

const settingController = require("../controllers/SettingController");

router.delete("/clearDatabase", settingController.clearDatabase);

module.exports = router;
