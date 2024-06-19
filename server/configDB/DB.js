const mongoose = require("mongoose");
const schema = mongoose.Schema;

const url = "mongodb://localhost:27017/NOTES-APP";

const DBconn = mongoose.connect(url).then((result) => {console.log("data-base connected")})
.catch((err) => {console.log(err)});


const Userschema = new schema ({
   googleId: {
    type: String,
    //required: true
   },
   displayName: {
    type: String,
    //required: true
   },
  firstName: {
    type: String,
   // required: true
   },
   lastName: {
    type: String,
    //required: true
   },
   profileImage: {
    type: String,
    //required: true
   },
   createdAt: {
    type: Date,
    default: Date.now
   }
});

const User = mongoose.model("User", Userschema);


 module.exports = {DBconn: DBconn, User: User  };
