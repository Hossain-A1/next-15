import { connectDB } from "@/lib/bd";
import bcrypt from "bcrypt";
import { NextResponse as res } from "next/server";
import userModel from "@/schema/user.schema";

export const POST = async (req) => {
  try {
    await connectDB();

    const { fullname, email, password } = await req.json();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await userModel.create({ fullname, email, password: hash });

    return res.json({ success: true, status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.json({ error: error.message }, { status: 500 });
  }
};
