import prisma from "@/lib/prisma";
import { PostSchema } from "@/lib/validations/post";

export async function GET(req: Request, context: any) {
  const { id } = await context.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) return Response.json({ error: "Not found" }, { status: 404 });

    return Response.json(post);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, context: any) {
  const { id } = await context.params;

  try {
    const body = await req.json();
    const parsed = PostSchema.parse(body);

    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: parsed,
    });

    return Response.json(updated);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  const { id } = await context.params;

  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    return Response.json({ message: "Post deleted" });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
