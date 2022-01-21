const { smtp } = require("./mailer");
const fs = require("fs");
const handlebars = require("handlebars");

const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};

readHTMLFile(__dirname + "/mailer_content/index.html", function (err, html) {
  if (err) console.log(err);
  var template = handlebars.compile(html);
  var replacements = {
    username: "Manas Singh",
  };
  var htmlToSend = template(replacements);

  const message = {
    from: "18ucs016@lnmiit.ac.in",
    to: "18ucs016@lnmiit.ac.in",
    subject: "Virtual Labs - Mailer Test",
    html: htmlToSend,
  };

  smtp.sendMail(message, function (error, response) {
    if (error) {
      console.log(error);
    }
  });
});
