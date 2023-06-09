const express = require("express");
const cron = require("node-cron");
const rssParser = require("./services/rss-parser");
const apiRoutes = require("./routes/index");
const { Sequelize } = require("sequelize");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
const sequelize = new Sequelize("db", "root", "1111", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});
const app = express();
const port = 3000;

app.use("/api", jsonParser, apiRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

cron.schedule("* 30 * * * *", rssParser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
