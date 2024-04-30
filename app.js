require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Import controllers
const userController = require("./controllers/user.controller");
const historyController = require("./controllers/history.controller");
const routeController = require("./controllers/route.controller");
const notificationController = require("./controllers/notification.controller");
const reservationController = require("./controllers/reservation.controller");
const planifController = require("./controllers/planif.controller");
const vehicleController = require("./controllers/vehicle.controller");

const app = express();
app.use(express.json());

// Controllers
app.use("/api/users", userController);
app.use("/api/history", historyController);
app.use("/api/routes", routeController);
app.use("/api/notifications", notificationController);
app.use("/api/reservations", reservationController);
app.use("/api/planifs", planifController);
app.use("/api/vehicles", vehicleController);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json("Hello World");
});

mongoose
  .connect(process.env.DB_KEY)
  .then(() => {
    console.log("DB connected!");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
