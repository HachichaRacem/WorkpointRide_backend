const polyline = require('@mapbox/polyline');
const Route = require('../models/route.model');

// Create a new route
// const createRoute = async (req, res) => {
//     try {
//         const { user, startPoint, endPoint, startTime, daysOfWeek, duration, distance, type } = req.body;

//         // Encode the polyline coordinates using Mapbox Polyline
//         const polylineEncoded = polyline.encode([
//             [startPoint.coordinates[1], startPoint.coordinates[0]],
//             [endPoint.coordinates[1], endPoint.coordinates[0]]
//         ]);

//         const route = new Route({
//             user,
//             startPoint,
//             endPoint,
//             polyline: polylineEncoded,
//             startTime,
//             daysOfWeek,
//             duration,
//             distance,
//             type
//         });

//         await route.save();

//         res.status(201).json({ message: 'Route created successfully', route });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// Create a new route
const createRoute = async (req, res) => {
    try {
        const { user, startPoint, endPoint, startTime, daysOfWeek, duration, distance, type, polyline } = req.body;

        const route = new Route({
            user,
            startPoint,
            endPoint,
            startTime,
            daysOfWeek,
            duration,
            distance,
            type,
            polyline
        });

        await route.save();

        res.status(201).json({ message: 'Route created successfully', route });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Get all routes
const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get route by ID
const getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        res.json(route);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update route by ID
const updateRouteById = async (req, res) => {
    try {
        const { startPoint, endPoint, startTime, daysOfWeek, duration, distance, type } = req.body;

        // Encode the polyline coordinates using Mapbox Polyline
        const polylineEncoded = polyline.encode([
            [startPoint.coordinates[1], startPoint.coordinates[0]],
            [endPoint.coordinates[1], endPoint.coordinates[0]]
        ]);

        const updatedRoute = await Route.findByIdAndUpdate(req.params.id, {
            startPoint,
            endPoint,
            polyline: polylineEncoded,
            startTime,
            daysOfWeek,
            duration,
            distance,
            type
        }, { new: true });

        if (!updatedRoute) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.json({ message: 'Route updated successfully', route: updatedRoute });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete route by ID
const deleteRouteById = async (req, res) => {
    try {
        const deletedRoute = await Route.findByIdAndDelete(req.params.id);
        if (!deletedRoute) {
            return res.status(404).json({ message: 'Route not found' });
        }
        res.json({ message: 'Route deleted successfully', route: deletedRoute });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRoute,
    getAllRoutes,
    getRouteById,
    updateRouteById,
    deleteRouteById
};
