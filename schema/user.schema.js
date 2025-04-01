import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: 1,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const userModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default userModel;
