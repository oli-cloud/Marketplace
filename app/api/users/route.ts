import prisma from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validations/user";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.parse(body);

    const user = await prisma.user.create({ data: parsed });
    return Response.json(user);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
