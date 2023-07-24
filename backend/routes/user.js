const express = require("express");
const { register } = require("../controller/user");
const router = express();

router.post("/register", register);

module.exports = router;
