const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { readdirSync } = require("fs");
const app = express();
app.use(express.json());
app.use(cors());

/// routes

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

/// database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to database Successfully"))
  .catch((err) => console.log("error in connected to database"));

app.listen(8000, (req, res) => {
  console.log("Server is up on port 8000");
});
