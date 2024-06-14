const express = require("express");
const router = express.Router();
const historyController = require("../controllers/history.controller");
const isAuth = require("../middleware/auth.middleware");

/**
 * @swagger
 * /api/histories:
 *  get:
 *    summary: Get all histories
 *    tags: [Histories]
 *    responses:
 *      200:
 *        description: Histories were retrieved successfully
 *  post:
 *    summary: Create a new history
 *    tags: [Histories]
 *    responses:
 *      200:
 *        description: History was created successfully
 * /api/histories/getByUser/{userID}:
 *  get:
 *    summary: Get histories by user
 *    tags: [Histories]
 *    responses:
 *      200:
 *        description: Histories were retrieved successfully
 * /api/histories/{id}:
 *  put:
 *    summary: Update a history
 *    tags: [Histories]
 *    responses:
 *      200:
 *        description: History was updated successfully
 *  delete:
 *    summary: Delete a history
 *    tags: [Histories]
 *    responses:
 *      200:
 *        description: History was deleted successfully
 */

router.get("/", isAuth, historyController.getAllHistories);
router.get("/getByUser/:userID", historyController.getHistoryByUser);
router.post("/", historyController.createHistory);
router.put("/:id", isAuth, historyController.updateHistoryByID);
router.delete("/:id", historyController.deleteHistoryByID);

module.exports = router;
