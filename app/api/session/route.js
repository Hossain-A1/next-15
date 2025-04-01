import { NextResponse as res } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/bd";

export const POST = async (request) => {
  try {
    await connectDB()
    const { token } = await request.json();
    console.log(token);
    if (!token) {
      return res.json({ success: false, error: "Token is required" }, { status: 400 });
    }

    const session = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return res.json(session);
  } catch (error) {
    return res.json({ success: false, error: "Invalid or expired token" }, { status: 401 });
  }
};
