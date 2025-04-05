import { connectDB } from "@/lib/bd";
import blogModel from "@/schema/blog.shema";
import { NextResponse as res } from "next/server";

export const POST = async (request) => {
  try {
    await connectDB();
    const { title, description } = await request.json();

    await blogModel.create({ title, description });

    return res.json({ success: true, message: "Successed", status: 201 });
  } catch (err) {
    return res.json({ success: false, error: err.message, status: 500 });
  }
};

export const GET = async (request) => {
  try {
    await connectDB();
    const blogs = await blogModel.find({}).sort({createdAt:-1});

    if (blogs) {
      return res.json(blogs);
    }
  } catch (err) {
    return res.json({ success: false, error: err.message, status: 500 });
  }
};
