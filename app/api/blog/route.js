import blogModel from "@/schema/blog.shema";
import { NextResponse as res } from "next/server";

export const POST = async (request) => {
  try {
    const { title, description } = await request.json();

    await blogModel.create({title, description} );

    return res.json({ success: true, message: "Successed", status: 201 });
  } catch (err) {
    return res.json({ success: false, error: err.message, status: 500 });
  }
};

export const GET = async (request) => {
  try {
    const blogs = await blogModel.find();

    return res.json(blogs);
  } catch (err) {
    return res.json({ success: false, error: err.message, status: 500 });
  }
};
