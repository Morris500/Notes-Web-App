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

const  note = new Note ({
   user: "6672da82cbeda54a7f3023b4",
   title: "wiki-api biubub module" ,
   body: "learning api nfidnvfodbdfn foivbfdovnfo lorenjnv nebafoibnf  nfoidfodin bfdinbnnb onbfduhodb ihnf dfvnfdov"
   })

//note.save();
 module.exports = {DBconn: DBconn, User: User , Note: Note  };
