const express = require("express");
const router = express.Router();
const historyController = require("../controllers/history.controller");
const isAuth = require("../middleware/auth.middleware");

router.get("/", isAuth, historyController.getAllHistories);
router.get("/:userID", isAuth, historyController.getHistoryByUser);
router.post("/", isAuth, historyController.createHistory);
router.put("/:id", isAuth, historyController.updateHistoryByID);
router.delete("/:id", isAuth, historyController.deleteHistoryByID);

module.exports = router;
