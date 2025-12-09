import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validations/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = RegisterSchema.parse(body);

    // Check if user exists
    const exist = await prisma.user.findUnique({ where: { email: data.email } });
    if (exist) return NextResponse.json({ error: "Email already exists" }, { status: 400 });

    // Hash password
    const hashed = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: { ...data, password: hashed },
    });

    return NextResponse.json({
      message: "User registered successfully",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid input or server error" }, { status: 400 });
  }
}
