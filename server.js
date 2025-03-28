require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./data/db");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
  });
app.use("/", require("./routes"));

db.initDb((err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1); // Exit if database connection fails
  } else {
    app.listen(port, () => {
      console.log(`Database is connected and server running on port ${port}`);
    });
  }
});
