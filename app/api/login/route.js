import { connectDB } from "@/lib/bd";
import bcrypt from "bcrypt";
import { NextResponse as res } from "next/server";
import userModel from "@/schema/user.schema";
import { createToken } from "@/helpers/jwt";

export const POST = async (req) => {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const isExisted = await userModel.findOne({ email });

    if (!isExisted) {
      return res.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, isExisted.password);
    if (!isMatch) {
      return res.json(
        { success: false, error: "Invalid password" },
        { status: 400 }
      );
    }

    const token = createToken({
      _id: isExisted._id,
      fullname: isExisted.fullname,
      email: isExisted.email,
    });

    const result = res.json({ success: true });

    result.cookies.set("accessToken", token.accessToken, {
      httpOnly: true,
      secure: false,
      path: "/",
    });
    result.cookies.set("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    return result;
  } catch (error) {
    res.json({ error: error.message }, { status: 500 });
    console.error("Signup Error:", error);
  }
};
