import { connectDB } from "@/lib/bd";
import { revalidatePath } from "next/cache";
import { NextResponse as res } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB()
    const body = await req.json();
    // ['/blog','/product']
    body.paths.map((route) => {
      revalidatePath(route);
      return {
        path: route,
        deleteAt: Date.now(),
      };
    });

    return res.json({ success: true });
  } catch (error) {
    error.message;
  }
};
