const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/NOTES-APP";

const DBconn = mongoose.connect(url).then((result) => {console.log("data-base connected")})
.catch((err) => {console.log(err)});

module.export = DBconn;