const express = require("express");
const router = express.Router();
const passport =require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/note-app",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile.id);
    User.findOrCreate({ googleId: profile.id, username:profile.id }, function (err, user) {
      return cb(err, user);
    });

   }
));

// google authentication route
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );
  router.get('/auth/note-app', 
    passport.authenticate('google', {
     failureRedirect: '/',
     successRedirect: ('/dashboard')
    })
  ); 

module.exports = router;