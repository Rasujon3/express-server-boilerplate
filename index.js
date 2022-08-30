const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const dbConnect = require("./utils/dbConnect");
const toolsRouter = require("./routes/v1/tools.route");
const viewCount = require("./middleware/viewCount");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// app.use(viewCount);

// Apply the rate limiting middleware to all requests
// app.use(limiter);

dbConnect();

app.use("/api/v1/tools", toolsRouter);

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/public/test.html");
  res.render("home.ejs", {
    id: 2,
    user: {
      name: "test",
    },
  });
});

app.all("*", (req, res) => {
  res.send("No route found");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
