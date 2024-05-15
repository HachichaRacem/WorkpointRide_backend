const resModel = require("../models/reservation.model");
const schedModel = require("../models/schedule.model");
const routeModel = require("../models/route.model");
const NotificationService = require("./notification.services");
const {
  reservationCancellationMail,
  scheduleCancellationMail
  
} = require("../template");

exports.getAllReservations = async () => {
  return await resModel.find();
};

exports.getReservationByUser = async (userID) => {
  if (!userID || userID.length != 24) throw Error("Invalid ID was sent");
  return await resModel
    .find({ user: userID })
    .populate("user")  //Amira : ajouter select
    .populate("schedule");
};

exports.getReservationsByDate = async (userID, date) => {
  try {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  const reservations = await resModel
    .find({
      user: userID,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
    .populate({
      path : "user",
      select : {firstName:1, lastName:1, phoneNumber:1}
    })
    .populate({
      path : "schedule",
      populate: {
        path: "routes",
      },
    })
    //.populate("user") 
    //.populate("schedule")
    .exec();
    console.log('reservations',reservations)
  return reservations;
} catch (e) {
  console.log(e);
  throw Error(e.message);
}
};

exports.createReservation = async (params) => {
  try {
   console.log(params);
   schedule= await schedModel.findById(params.schedule).populate({
      path: "routes",
      select: { type: 1 },
   });
   
   console.log("schedule", schedule)
   var reservations = await resModel.find({
    schedule : params.schedule
   }
   )
   var resNumber = reservations.length;
   if (resNumber >= schedule.availablePlaces){
      console.log("no available seats")
      throw new Error('Sorry, someone else booked the last seat'); 
   }else{
    await resModel.create({
      user : params.user,
      schedule : params.schedule,
      status : 'pending',
      pickupTime : params.pickupTime,
      date : schedule.scheduledDate,
      routeDirection : schedule.routes.type,
      
    }
    );
    return 200          
     
   }
   
  } catch (e) {
    console.log(e);
    throw Error(e.message);
  }
};

exports.updateReservationByID = async (id, updates) => {
  if (!id || id.length != 24 || !updates)
    throw new Error("Requesst was sent with missing params");
  return await resModel.findByIdAndUpdate(id, updates);
};

exports.deleteReservationByID = async (id) => {
 try {
  if (!id || id.length != 24)
    throw new Error("Requesst was sent with missing params");
  reservation = await resModel.findById(
    id).populate({
    path : "user",
    select : {firstName:1, lastName:1, email:1}
    }).populate({
      path : "schedule",
      select : {user:1, scheduledDate:1, startTime:1},
      populate: ("user")
      });


    var text = await reservationCancellationMail(     
        reservation.user.firstName,
        reservation.user.lastName,
        reservation.schedule.scheduledDate,
        reservation.schedule.startTime
      );

    await NotificationService.sendMail(
        reservation.schedule.user,
        "WorkPoint Ride Cancellation",
        text
      );
    await resModel.findByIdAndDelete(id);
  return 200;
} catch (e) {
  console.log(e);
  throw Error(e.message);
}
};
