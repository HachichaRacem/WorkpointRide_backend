const notificationModel = require("../models/notification.model");
const NotificationService = require("./notification.services");
const nodemailer = require("nodemailer");

exports.getNotificationByUser = async (userID) => {
  return await notificationModel.findOne({ userId: userID });
};

exports.getAllNotifications = async () => {
  return await notificationModel.find();
};

exports.createNotification = async (params) => {
  const newNotification = new notificationModel(params);
  return await newNotification.save();
};

exports.deleteNotificationByID = async (id) => {
  return await notificationModel.findByIdAndDelete(id);
};


exports.sendMail = async (receiver, subject, textBody) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.SERVER_PORT,
      secureConnection: true,
      auth: {
        user: process.env.SERVER_USERNAME,
        pass: process.env.SERVER_PASSWORD,
      },
    });
    const message = {
      from: process.env.SERVER_MAIL,
      to: receiver.email,
      //to: 'rawen.mersani@gmail.com',
      subject: subject,
      text: `
            Hello ${receiver.firstname},
            ${textBody}
            Kind regards,
            WorkPoint Team
            `,
    };
    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  } catch (e) {
    console.log(e);
  }
};