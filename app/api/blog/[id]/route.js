import { connectDB } from "@/lib/bd";
import blogModel from "@/schema/blog.shema";
import mongoose from "mongoose";
import { NextResponse as res } from "next/server";
const isMongoId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
export const PUT = async (request, { params }) => {
  try {
    await connectDB()
    const body = await request.json();
    const blog = await blogModel.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!blog) {
      return res.json({ success: false, message: "failed", status: 404 });
    }
    return res.json(blog);
  } catch (err) {
    return res.json({ success: false, error: err.message, status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDB()
    const id = await params.id;

    const blog = await blogModel.findByIdAndDelete(id);

    if (!blog) {
      return res.json({ success: false, message: "failed", status: 404 });
    }

    return res.json({ success: true, message: "Successed", status: 200 });
  } catch (err) {
    return res.json({ success: false, error: err.message, status: 500 });
  }
};

export const GET = async (request, { params }) => {
  try {
await connectDB()
    const id = isMongoId(params.id);

    const query = id
      ? { _id: params.id }
      : { title: params.id.split("-").join(" ") };
    const blog = await blogModel.findOne(query);

    if (!blog) {
      return res.json({ success: false, message: "failed", status: 404 });
    }

    return res.json(blog);
  } catch (err) {
    return res.json({ success: false, error: err.message, status: 500 });
  }
};
