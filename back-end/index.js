const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/user");
const microorganismRouter = require("./src/routes/microorganism");
const cors = require("cors");

env.config();

mongoose
  .connect(
    `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-shard-00-00.heiyw.mongodb.net:27017,cluster0-shard-00-01.heiyw.mongodb.net:27017,cluster0-shard-00-02.heiyw.mongodb.net:27017/${process.env.MONGO_DB_DATABASE}?ssl=true&replicaSet=atlas-1h4t8y-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  });

app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", microorganismRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
