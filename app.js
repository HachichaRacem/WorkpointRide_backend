require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Import routes
const userRouter = require('./routes/user.route');
const historyRouter = require('./routes/history.route');
const routeRouter = require('./routes/route.route');
const notificationRouter = require('./routes/notification.route');
const reservationRouter = require('./routes/reservation.route');
const planifRoutes = require('./routes/planif.route');
const vehicleRoutes = require('./routes/vehicle.route');

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/history', historyRouter);
app.use('/api/routes', routeRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/planifs', planifRoutes);
app.use('/api/vehicles', vehicleRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json("Hello World");
});

mongoose.connect(process.env.DB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB connected!');
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });
