import blogModel from "@/schema/blog.shema";
import { NextResponse as res } from "next/server";

export const PUT = async (request, { params }) => {
  try {
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
    const id = params?.id;

    const blog = await blogModel.findByIdAndDelete(id);

    if (!blog) {
      return res.json({ success: false, message: "failed", status: 404 });
    }

    return res.json({ success: true, message: "Successed", status: 200 });
  } catch (err) {
    return res.json({ success: false, error: err.message, status: 500 });
  }
};
