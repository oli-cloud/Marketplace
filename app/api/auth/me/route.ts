import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);

    return NextResponse.json({
      loggedIn: true,
      user,
    });
  } catch (err) {
    return NextResponse.json({ loggedIn: false });
  }
}
