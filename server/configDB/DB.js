const mongoose = require("mongoose");
const schema = mongoose.Schema;

const url = process.env.URL_DB;

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

//note schema
const NoteSchema = new schema ({
   user: {
      type: schema.ObjectId,
      ref: "User"
   },
   title:{
      type: String
   },
   body: {
      type: String
   },
   createdAt: {
      type: Date,
      default: Date.now()
   },
   updatedAt: {
      type: Date,
      default: Date.now()
   }
});
const Note = mongoose.model("Note", NoteSchema);

const User = mongoose.model("User", Userschema);


 module.exports = {DBconn: DBconn, User: User , Note: Note  };
