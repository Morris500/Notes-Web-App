

const express = require("express");
const router = express.Router();

//  To secure the dashboard route
 SecureDashboard = (req, res, next) => {
    console.log(req.user);
    if(req.user) {
        next();
    }else{
        return res.status(401).send("Access Denied");
    }
} 

router.get("/dashboard", SecureDashboard , (req, res) => {
    const locals = {
        title: "Dashboard",
        description: "Free NodeJs Note App"
    }

res.render("dashboard", {
    locals,
    layout: "../views/layouts/dashboard.ejs"
} )
})


module.exports = router;
// views\layouts\dashboard.ejs
// C:\Users\DELL\Documents\web dev tutorial\Notes-App-Project\views\layouts\dashboard.ejs 