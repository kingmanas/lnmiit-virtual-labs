const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRouter = require("./routes/auth.route");
const apiRouter = require("./routes/api.route");
const {
  tokenVerificationMiddleware,
} = require("./middlewares/auth.middleware");

const port = process.env.PORT || 8001;

var corsOptions = {
  // we might run the backend on a different server someday tomorrow
  // so it is better to have https between all hops
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
app.use("/auth", authRouter);
app.use("/api", tokenVerificationMiddleware, apiRouter);

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port ${port}`);
});
