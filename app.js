require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const routeRouter = require("./routes/route.route");
const scheduleRouter = require("./routes/schedule.route");
const historyRouter = require("./routes/history.route");
const notificationRouter = require("./routes/notification.route");
const reservationRouter = require("./routes/reservation.route");
const vehicleRouter = require("./routes/vehicle.route");
const userRouter = require("./routes/user.route");

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/history", historyRouter);
app.use("/api/routes", routeRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/schedules", scheduleRouter);
app.use("/api/vehicles", vehicleRouter);

const PORT = process.env.PORT || 5030;

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
