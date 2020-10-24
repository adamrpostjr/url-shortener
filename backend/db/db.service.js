// DB connection
const config = require("../config");
const mongoose = require("mongoose");

const DBconnection = () => {
  mongoose.connect(config.db.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  // useFindAndModify set to false for deprecation warning when using findByIdAndDelete

  // DB connection error
  mongoose.connection.on("error", function (err) {
    console.log("Error while connecting to the database: " + err);
  });

  // DB connection OK
  mongoose.connection.on("open", function () {
    console.log("Connected to database.");
  });
};

module.exports = { DBconnection };
