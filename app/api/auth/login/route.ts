import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { LoginSchema } from "@/lib/validations/user";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY:", body);

    const data = LoginSchema.safeParse(body);
    if (!data.success) {
      console.log("ZOD ERROR:", data.error);
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: data.data.email }
    });

    console.log("USER FOUND:", user);

    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const match = await bcrypt.compare(data.data.password, user.password);
    console.log("PASSWORD MATCH:", match);

    if (!match) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT
    let token;
    try {
      token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,  // <-- must exist
      });
    } catch (e) {
      console.log("JWT ERROR:", e);
      return NextResponse.json({ error: "Token creation failed" }, { status: 500 });
    }

    console.log("TOKEN CREATED:", token);

    const res = NextResponse.json({ success: true });

    res.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
    );

    return res;

  } catch (err) {
    console.log("SERVER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
