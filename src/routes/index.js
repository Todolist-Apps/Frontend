const express = require("express");
const router = express.Router();
const taskRouter = require("./task.js");

router.use("/tasks", taskRouter);

module.exports = router;