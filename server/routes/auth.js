const express = require("express");
const router = express.Router();
const passport =require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require("C:/Users/DELL/Documents/web dev tutorial/Notes-App-Project/server/configDB/DB.js");
 const User = user.User;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/note-app",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    
    const newUser = {
      googleId: profile.id,
      displayNmae: profile.displayName,
      firstName: profile.name.givenName, 
      lastName: profile.name.familyName,
      profileImage: profile.photos[0].value
     }
     
User.findOne({googleId: profile.id}).then((result)=> { //console.log(result)
  if (result) { 
     cb(null, result)
  }else{
    User.create(newUser).then((data)=>{ cb(null, data)});
  }

})
.catch((err)=> console.log(err));

    // User.findOrCreate({ googleId: profile.id, username:profile.id }, function (err, user) {
    //   return cb(err, user);
    // });


//     User.findOrCreate({ googleId: profile.id }).then((data) => {return cb(data)})
//     .catch((err) )
   }
));

// google authentication route
router.get('/auth/google',
    passport.authenticate('google', { scope: ["email",'profile'] })
  );
  router.get('/auth/note-app', 
    passport.authenticate('google', {
     failureRedirect: '/',
     successRedirect: ('/dashboard')
    })
  ); 

  //logout route
  router.get("/logout", function (req, res) {
    req.logout((logout)=> {res.redirect("/");});
  
});

//persist user data from session
passport.serializeUser(function(user, done){done(null, user.id);   
});

//retrieve user data from session.
passport.deserializeUser(function(id, done){
    User.findById(id).then((data) => {done(null, data);})
    .catch((err)=> {console.log(err)})
}); 


module.exports = router;