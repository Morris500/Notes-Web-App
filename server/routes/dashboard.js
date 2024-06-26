const user = require("C:/Users/DELL/Documents/web dev tutorial/Notes-App-Project/server/configDB/DB.js");
const mongoose = require("mongoose")
const Notes = user.Note

const express = require("express");
const router = express.Router();

//  To secure the dashboard route
 SecureDashboard = (req, res, next) => {
    //console.log(req.user);
    if(req.user) {
        next();
    }else{
        return res.status(401).send("Access Denied");
    }
} 

router.get("/dashboard", SecureDashboard , async(req, res) => {
    const locals = {
        title: "Dashboard",
        description: "Free NodeJs Note App"
    }

//quering data from the data base
//Notes.find({}).then ((result)=> { //console.log(result[0].title)
//     res.render("dashboard", {
//     Note: result,
//     Username: req.user.firstName,
//     locals,
//     layout: "../views/layouts/dashboard.ejs"
// } )}  )
// .catch((err) => console.log(err))


//})
try {
    let perpage = 3;
    let page = req.query.page || 1;
    console.log(page);
    console.log(req.user.id);
    Notes.aggregate([
        {
            $sort:{
                createdAt: -1
            }
    },
    {
        $match: {user: new mongoose.Types.ObjectId(req.user.id )} },
    {
        $project: {
            title: {$substr: ['$title', 0, 30]},
            body: {$substr: ['$body', 0, 100]}
        }
    }
    ])
    .skip((perpage * page) - perpage)
    .limit(perpage)
    .then((data)=> {
        Notes.countDocuments().then((count)=> {

            res.render("dashboard", {
                Note: data,
                Username: req.user.firstName,
                locals,
                layout: "../views/layouts/dashboard.ejs",
                current: page,
                pages: Math.ceil(count / perpage)
            } );
       
        })
             
        }).catch((err)=> console.log(err))

} catch (error) {
    console.log(error)
}


});

module.exports = router;
// views\layouts\dashboard.ejs
// C:\Users\DELL\Documents\web dev tutorial\Notes-App-Project\views\layouts\dashboard.ejs 