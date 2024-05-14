const scheduleModel = require("../models/schedule.model");
const routeModel = require("../models/route.model");
const Reservation = require("../models/reservation.model");

exports.getAllSchedule = async () => {
  return await scheduleModel.find().populate("user").populate("routes");
};

exports.getScheduleByUser = async (userID) => {
  if (!userID || userID.length != 24) throw Error("Invalid ID was sent");
  return await scheduleModel.findOne({ userId: userID });
};

exports.getSchedulesWithReservationsByDate = async (date, userID) => {
  // Create date objects to cover the whole day from start to end
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  // Fetch schedules for the given user and date range
  const schedules = await scheduleModel
    .find({
      user: userID,
      scheduledDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
    .exec(); // Make sure to call exec() to properly execute the query
  // Attach reservations to each schedule
  const schedulesWithReservations = await Promise.all(
    schedules.map(async (schedule) => {
      const reservations = await resModel
        .find({ schedule: schedule._id })
        .populate("user")
        .exec();
      return {
        ...schedule.toObject(), // Convert mongoose document to a plain object
        reservations,
      };
    })
  );
  return schedulesWithReservations;
};

exports.createSchedule = async (params) => {
  try {
    console.log("params", params);

    if (params.routeId == undefined) {
      console.log("params", params);
      console.log("routesId", params.routeId);
      var route = await routeModel.create({
        user: params.user,
        startPoint: params.startPoint,
        endPoint: params.endPoint,
        duration: params.duration,
        distance: params.distance,
        type: params.routeType,
        polyline: params.polyline,
      });
    }
    const schedules = [];
    for (const date of params.scheduledDate) {
      const schedule = new scheduleModel({
        user: params.user,
        routes: params.routeId ? params.routeId : route._id,
        startTime: params.startTime,
        scheduledDate: date,
        availablePlaces: params.availablePlaces,
      });
      await schedule.save();
      schedules.push(schedule);
    }
    return schedules;
  } catch (error) {
    console.error("Error creating schedule:", error);
    throw new Error("Failed to create schedule.");
  }
};

exports.updateScheduleByID = async (id, updates) => {
  if (!id || id.length != 24 || !updates)
    Error("Request was sent with missing params");
  return await scheduleModel.findByIdAndUpdate(id, updates);
};
exports.deleteScheduleByID = async (id) => {
  if (!id || id.length != 24) Error("Request was sent with missing params");
  return await scheduleModel.findByIdAndDelete(id);
};
exports.findNearestPolyline = async (body) => {
  try {
    const point = {
      longitude: 36.67292,
      latitude: 10.95815,
    }; // Example point coordinates
    const startDate = new Date("2023-01-01"); // Example scheduled date
    const endDate = new Date("2026-01-01");
    console.log("startDate", startDate);

    const nearestRoute = await scheduleModel.aggregate([
      {
        $match: {
          scheduledDate: { $gte: startDate, $lte: endDate }, // Filter by scheduled date between two dates
        },
      },
      {
        $lookup: {
          from: "routes",
          localField: "routes",
          foreignField: "_id",
          as: "route",
        },
      },
      {
        $unwind: "$route",
      },
      {
        $addFields: {
          distances: {
            $map: {
              input: "$route.polyline",
              as: "point",
              in: {
                $let: {
                  vars: {
                    lon1: { $arrayElemAt: ["$$point", 0] },
                    lat1: { $arrayElemAt: ["$$point", 1] },
                    lon2: point.longitude,
                    lat2: point.latitude,
                    earthRadius: 6371, // Earth radius in kilometers
                  },
                  in: {
                    $multiply: [
                      {
                        $multiply: [
                          {
                            $sin: {
                              $degreesToRadians: {
                                $divide: [
                                  { $subtract: ["$$lat2", "$$lat1"] },
                                  2,
                                ],
                              },
                            },
                          },
                          {
                            $sin: {
                              $degreesToRadians: {
                                $divide: [
                                  { $subtract: ["$$lon2", "$$lon1"] },
                                  2,
                                ],
                              },
                            },
                          },
                        ],
                      },
                      2,
                      "$$earthRadius",
                    ],
                  },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          user: 1,
          routes: 1,
          startTime: 1,
          scheduledDate: 1,
          availablePlaces: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          route: 1,
          distance: { $min: "$distances" }, // Find the minimum distance from the distances array
        },
      },
      {
        $sort: { distance: 1 }, // Sort by distance in ascending order
      },
    ]);

    console.log("nnnnnnn", nearestRoute);
    // Return the nearest polyline
    return nearestRoute;
  } catch (error) {
    console.error("Error finding nearest polyline:", error);
    throw error;
  }
};
exports.getSchedulesWithReservationsByDate = async (date, userID) => {
  // Create date objects to cover the whole day from start to end
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  newDate.setDate(newDate.getDate() + 1);

  const schedules = await scheduleModel
    .find({
      user: userID,
      scheduledDate: newDate,
    })
    .exec();
  console.log("schedules", schedules);
  // Make sure to call exec() to properly execute the query
  // Attach reservations to each schedule
  const schedulesWithReservations = await Promise.all(
    schedules.map(async (schedule) => {
      const reservations = await Reservation.find({ schedule: schedule._id })
        .populate("user")
        .exec();
      console.log("reservations", reservations);

      return {
        ...schedule.toObject(), // Convert mongoose document to a plain object
        reservations,
      };
    })
  );
  return schedulesWithReservations;
};
