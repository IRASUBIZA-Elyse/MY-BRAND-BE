import mongoose, { Schema, model } from "mongoose";
const UserSchema = new Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = model("user", UserSchema);
export default User;
