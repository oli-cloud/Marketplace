import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional().nullable(),
  authorId: z.number().optional().nullable(),
});

export type PostInput = z.infer<typeof PostSchema>;
