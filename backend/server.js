const express = require("express");
const cors = require("cors");
const app = express();
const options = {
  origin: "http://localhost:3000/",
  useSuccessStatus: 200,
};

app.use(cors(options));

app.get("/", (req, res) => {
  res.send("welcome to clone");
});

app.listen(8000, (req, res) => {
  console.log("Server is up on port 8000");
});
