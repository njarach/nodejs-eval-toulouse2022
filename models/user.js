const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const userSchema = new Schema ({
    email : {type:String, require:true},
    password : {type:String, require:true}
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };
  userSchema.methods.validPassword = async (candidatePassword, oldPassword) => {
    const result = await bcrypt.compare(candidatePassword, oldPassword);
    return result;
  };

const User = mongoose.model("User", userSchema);
module.exports = User;