import prisma from "@/lib/prisma";
import { PostSchema } from "@/lib/validations/post";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return Response.json(posts);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = PostSchema.parse(body);

    const post = await prisma.post.create({ data: parsed });
    return Response.json(post);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
