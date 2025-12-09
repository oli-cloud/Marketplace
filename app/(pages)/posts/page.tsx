"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PostSchema = z.object({
  title: z.string().min(1, "Title required"),
  content: z.string().optional(),
  authorId: z.number().optional(),
});

type PostForm = z.infer<typeof PostSchema>;

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm<PostForm>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Load posts
  async function loadPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  // Create or Update
  async function onSubmit(data: PostForm) {
    if (editingId) {
      await fetch(`/api/posts/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      setEditingId(null);
    } else {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(data),
      });
    }

    form.reset();
    loadPosts();
  }

  // Edit mode
  function startEdit(post: any) {
    setEditingId(post.id);
    form.setValue("title", post.title);
    form.setValue("content", post.content || "");
  }

  // Delete
  async function deletePost(id: number) {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    loadPosts();
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Posts Management</h1>

      {/* Form */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white shadow p-4 rounded mb-8 space-y-3"
      >
        <div>
          <label className="block font-medium">Title</label>
          <input
            {...form.register("title")}
            className="border w-full p-2 rounded"
          />
          {form.formState.errors.title && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Content</label>
          <textarea
            {...form.register("content")}
            className="border w-full p-2 rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editingId ? "Update Post" : "Create Post"}
        </button>
      </form>

      {/* Table List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded shadow">
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => startEdit(post)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-500 text-center">No posts found</p>
        )}
      </div>
    </div>
  );
}
