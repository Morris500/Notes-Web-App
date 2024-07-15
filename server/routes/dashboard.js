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

router.get("/dashboard", SecureDashboard , async (req, res) => {
    const locals = {
        title: "Dashboard",
        description: "Free NodeJs Note App"
    }

//quering data from the data base
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
            var boy =(Number(page) > 5 ? Number(page) - 4 : 1)
            console.log(boy);
            console.log(Number(page));
            console.log(page);
            

        })
             
        }).catch((err)=> console.log(err))

} catch (error) {
    console.log(error)
}
});
  
router.get("/item/:id", SecureDashboard ,  (req, res) => {
    
        const id = req.params.id;
        const user_id = req.user.id;
        
Notes.findById({_id: id}).where({user: user_id }).lean().then((note)=> {

    res.render("view-notes",{
        noteID: id,
        note,
        layout: "../views/layouts/dashboard.ejs"
    })
}).catch((err)=> { console.log(err)
    res.send("Something went wrong...")
})

 });
 router.put("/item/:id", SecureDashboard , async (req, res) => {
try {
    await Notes.findOneAndUpdate(
        {_id : req.params.id},
        {title: req.body.title, body:req.body.body}
    ).where({user: req.user.id});

res.redirect("/dashboard");
} catch (error) {
    console.log(error);
}


 });
 router.delete("/deleteItem/:id", SecureDashboard, async (req, res)=> { 
    try{
    await Notes.deleteOne({_id: req.params.id}).where({user: req.user.id});
    res.redirect("/dashboard");
    } catch(err){
        console.log(err);
    }
 });

 router.get("/addNote", SecureDashboard, async (req, res)=>{
res.render("addNote",{
    
    layout: "../views/layouts/dashboard.ejs"})
 });
 router.post("/addNote", SecureDashboard, async (req, res)=>{
    try {
        if (!req.body.title && req.body.body) {
           res.send("please fill in the note correctly" ) 
        }
        await Notes.create({
            user: req.user.id,
           title: req.body.title,
            body : req.body.body
         })
         res.redirect('/dashboard')
        
    } catch (error) {
        console.log(error);
    }
     });
     router.post("/dashboard/search", SecureDashboard, async (req, res)=> {

try {
    const searchNoSpecialChar = req.body.searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const searchResults = await Notes.find({
        $or:[
            {title: {$regex: new RegExp(searchNoSpecialChar, "i")}},
            {body: {$regex: new RegExp(searchNoSpecialChar,"i")}}
        ]
    }).where({user: req.user.id});

    res.render("search",{
        searchResults,
        layout: "../views/layouts/dashboard.ejs"})
} catch (error) {
    console.log(error);
}
     });
module.exports = router;
// views\layouts\dashboard.ejs
// C:\Users\DELL\Documents\web dev tutorial\Notes-App-Project\views\layouts\dashboard.ejs 