const swaggerJSDoc = require("swagger-jsdoc");
/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: list of users
 *    name: Routes
 *    description: list of routes
 *    name: Vehicles
 *    description: list of vehicles
 *    name: Schedules
 *    description: list of schedules
 *    name: Reservations
 *    description: list of reservations
 *    name: Notifications
 *    description: list of notifications
 *    name: Histories
 *    description: list of histories
 */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "My API Description",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
