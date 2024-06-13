

const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
    const locals = {
        title: "Dashboard",
        description: "Free NodeJs Note App"
    }

res.render("dashboard", locals )
})


module.exports = router;