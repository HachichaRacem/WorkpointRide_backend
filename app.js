require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./routes/user.route");
const historyRouter = require("./routes/history.route");
const routeRouter = require('./routes/route.route');
const notificationRouter = require('./routes/notification.route'); 
const reservationRouter = require('./routes/reservation.route');
const planifRoutes = require('./routes/planif.route');
const vehicleRoutes = require('./routes/vehicle.route');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', historyRouter); 
app.use('/', routeRouter);// Use the history route middleware
app.use('/notifications', notificationRouter);
app.use('/', reservationRouter);
app.use('/api/planifs', planifRoutes);
app.use('/api/vehicles', vehicleRoutes);




const PORT = process.env.PORT || 5000;

app.get('', (req, res) => {
    res.json("Hello Word");
});

mongoose.connect(process.env.DB_KEY)
    .then(() => {
        console.log('db connected !');
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });
