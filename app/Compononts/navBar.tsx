"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout";
import { useAuth } from "@/app/context/AuthContext";

export default function NavBar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) =>
    pathname === path ? "text-sky-300 font-semibold" : "hover:text-gray-300";

  return (
    <nav className="w-full bg-blue-900 text-white shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">

        <div className="flex items-center space-x-6">
          <Link href="/" className={`text-lg ${isActive("/")}`}>Home</Link>
          <Link href="/posts" className={`text-lg ${isActive("/posts")}`}>Posts</Link>
          <Link href="/users" className={`text-lg ${isActive("/users")}`}>Users</Link>
        </div>

        <div className="flex items-center space-x-6">
          {!user && (
            <>
              <Link href="/auth/login" className={`text-lg ${isActive("/auth/login")}`}>Login</Link>
              <Link href="/auth/register" className={`text-lg ${isActive("/auth/register")}`}>Sign Up</Link>
            </>
          )}

          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">
                Hello, <span className="text-sky-300">{user.name}</span>
              </span>
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
