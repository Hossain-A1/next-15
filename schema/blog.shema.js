import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    require: true,
  },
},{timestamps:true});

const blogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);
export default blogModel;
