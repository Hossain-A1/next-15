import { NextResponse as res } from "next/server";
export const config = {
  matcher:"/admin/:path*",
};
export const middleware = async (request) => {
  const accessTkn = request.cookies.get("accessToken");

  if (!accessTkn) {
    return res.redirect(new URL("/login", request.url));
  }


  const api = await fetch(`${process.env.SERVER}/api/session`, {
    method: "post",
    body: JSON.stringify({ token: accessTkn.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!api.ok) {
    return res.redirect(new URL("/login", request.url));
  }
  return  res.next();
};
