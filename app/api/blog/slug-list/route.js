import { connectDB } from "@/lib/bd";
import blogModel from "@/schema/blog.shema";
import { NextResponse as res } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB()
    const title = await blogModel.distinct("title");
    const slugs = title.map((item) => item.split(" ").join("-"));
    return res.json(slugs);
  } catch (err) {
    return res.json({ success: false, error: err.message, status: 500 });
  }
};
