require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const connDB = require("./server/configDB/DB.js");
const mongostore =require("connect-mongo");
const passport = require("passport");
const session = require("express-session")


const app = express();
const port = 3000;

// middle ware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: "ourlittlesecret",
    resave: false,
    saveUnintialized: false,

}));

app.use(passport.initialize());
app.use(passport.session());


//templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/main"); 
app.set("view engine", "ejs");

//static files
app.use(express.static("public"));

//routes
app.use("/", require("./server/routes/index"))
app.use("/", require("./server/routes/auth"))
app.use("/", require("./server/routes/dashboard"))


// handling 404 errors
app.get("*", (req, res) => {
    res.status(404).render("404")
})

app.listen(port, (req, res)=>{console.log(`App is running on port ${port}`) 
})