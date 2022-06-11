const express = require("express");
const UserRouter = require("./routes/UserRouter");
const SettingRouter = require("./routes/SettingRouter");
const PropositionRouter = require("./routes/PropositionRouter");
const MissionRouter = require("./routes/MissionRouter");
const app = express();
const cors = require("cors");
const { Router } = require("express");
const router = Router();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// prefix all routes
app.use("/api", router);

// routes
router.use("/settings", SettingRouter);
router.use("/users", UserRouter);
router.use("/missions", MissionRouter);
router.use("/propositions", PropositionRouter);

app.listen(process.env.PORT || 3000, () => console.log("server is listening"));
