import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    guid: String,
    name: String,
    email: String,
    password: String
});

const userModel = mongoose.model('User', userSchema);

export default userModel;