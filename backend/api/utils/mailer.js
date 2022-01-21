const nodemailer = require("nodemailer");
const config = require("../config/mailer.config");

let smtp = null;

function createSMTPTransporter() {
  smtp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${config.smtp_email}`,
      pass: `${config.smtp_passwd}`,
    },
  });
  smtp.verify((err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Server is ready to send messages.");
    }
  });
  return smtp;
}

module.exports = {
  smtp: smtp ? smtp : createSMTPTransporter(),
};
