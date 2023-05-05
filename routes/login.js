const express = require("express");

const loginRoutes = express.Router();

loginRoutes.post("/", (req, res) => {
  if (req.body.username === "test" && req.body.password === "test") {
    res.send({ success: true, user: { username: "test" } });
  } else {
    res.status(401).send({ success: false });
  }
});

module.exports = loginRoutes;
