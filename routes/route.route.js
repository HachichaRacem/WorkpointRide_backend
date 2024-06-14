const express = require("express");
const router = express.Router();
const routeController = require("../controllers/route.controller");
const isAuth = require("../middleware/auth.middleware");

/**
 * @swagger
 * /api/routes:
 *  get:
 *    summary: Get all routes
 *    tags: [Routes]
 *    responses:
 *      200:
 *        description: Routes were retrieved successfully
 *  post:
 *    summary: Create a new route
 *    tags: [Routes]
 *    responses:
 *      200:
 *        description: Route was created successfully
 * /api/routes/nearest:
 *  get:
 *    summary: Get nearest routes
 *    tags: [Routes]
 *    responses:
 *      200:
 *        description: Routes were retrieved successfully
 * /api/routes/getByUser/{userID}:
 *  get:
 *    summary: Get routes by user
 *    tags: [Routes]
 *    responses:
 *      200:
 *        description: Routes were retrieved successfully
 * /api/routes/{id}:
 *   put:
 *     summary: Update a route
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: Route was updated successfully
 *   delete:
 *     summary: Delete a route
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: Route was deleted successfully
 */

router.post("/", isAuth, routeController.createRoute);
router.get("/", isAuth, routeController.getAllRoutes);
router.get("/nearest", isAuth, routeController.getNearestRoutes);
router.get("/getByUser/:userID", isAuth, routeController.getRouteByUser);
router.put("/:id", isAuth, routeController.updateRouteByID);
router.delete("/:id", isAuth, routeController.deleteRouteByID);

module.exports = router;
