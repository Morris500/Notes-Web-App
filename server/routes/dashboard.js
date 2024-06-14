

const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
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