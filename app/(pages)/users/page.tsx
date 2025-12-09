"use client";

import { useEffect, useState } from "react";
import { RegisterSchema } from "@/lib/validations/user";
import { z } from "zod";

type User = { id: number; name: string; email: string; role: string, password:string };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" ,password:""});
  const [errors, setErrors] = useState<any>({});
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  async function load() {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit() {
    setErrors({});

    const parsed = RegisterSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    const url = editingUserId ? `/api/users/${editingUserId}` : "/api/users";
    const method = editingUserId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setErrors(data.errors || { general: data.error });
      return;
    }

    setForm({ name: "", email: "", role: "",password:"" });
    setEditingUserId(null);
    load();
  }

  async function deleteUser(id: number) {
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete user");
      return;
    }
    load();
  }

  function editUser(user: User) {
    setForm({ name: user.name, email: user.email, role: user.role,password:user.password});
    setEditingUserId(user.id);
  }

  function cancelEdit() {
    setForm({ name: "", email: "", role: "",password:""});
    setEditingUserId(null);
    setErrors({});
  }

  return (
    <div className="p-5 space-y-3">
      <h1 className="text-xl font-bold">User CRUD (with Zod)</h1>

      <div className="space-y-2">
        <input
          className="border p-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500">{errors.name[0]}</p>}

        <input
          className="border p-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
        <input
          className="border p-2"
          placeholder="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p className="text-red-500">{errors.password[0]}</p>}

        <input
          className="border p-2"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        {errors.role && <p className="text-red-500">{errors.role[0]}</p>}

        <div className="space-x-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            {editingUserId ? "Update" : "Create"}
          </button>

          {editingUserId && (
            <button
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex justify-between border p-2 items-center"
          >
            <div>
              {u.name} — {u.email}---{u.role}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => editUser(u)}
                className="bg-yellow-500 text-white px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(u.id)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
