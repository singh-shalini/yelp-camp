const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//this adds on a field of username, makes sure they are unique
//also adds hashed pw, salt value
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
