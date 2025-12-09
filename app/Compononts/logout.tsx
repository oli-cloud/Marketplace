"use client";

import { Label } from "@radix-ui/react-dropdown-menu";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/auth/login";
  }

  return (
  
    <Label onClick={handleLogout} className="hover:cursor-pointer hover:text-[#4263EB]">Logout</Label>
  );
}
