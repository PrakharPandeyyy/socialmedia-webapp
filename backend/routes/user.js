const express = require("express");
const { home } = require("../controller/user");
const router = express();

router.get("/user", home);

module.exports = router;
