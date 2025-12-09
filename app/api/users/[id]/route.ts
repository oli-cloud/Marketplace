// app/api/users/[id]/route.ts
import prisma  from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validations/user";

// ------------------- GET single user -------------------
export async function GET(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // <- await params
    if (!id) return Response.json({ error: "User ID missing" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) return Response.json({ error: "User not found" }, { status: 404 });

    return Response.json(user);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ------------------- UPDATE user -------------------
export async function PUT(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // <- await params
    if (!id) return Response.json({ error: "User ID missing" }, { status: 400 });

    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: parsed.data,
    });

    return Response.json(user);
  } catch (error: any) {
    if (error.code === "P2025") return Response.json({ error: "User not found" }, { status: 404 });
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ------------------- DELETE user -------------------
export async function DELETE(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // <- await params
    if (!id) return Response.json({ error: "User ID missing" }, { status: 400 });

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return Response.json({ message: "Deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") return Response.json({ error: "User not found" }, { status: 404 });
    return Response.json({ error: error.message }, { status: 500 });
  }
}
