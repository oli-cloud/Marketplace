"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout";
export default function MainNavBar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) =>
    pathname === path ? "text-[#4263EB] font-semibold" : "hover:text-gray-300";

  return (
    <header className="w-full">
      {/* Top navigation */}
      <div className="border-b border-gray-200">
        <div className="container flex items-center justify-between py-2 text-sm">
          <nav className="hidden space-x-6 sm:flex">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Order Tracking
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Contact Us
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              FAQs
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-gray-600"
                >
                  English <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-gray-600"
                >
                  USD <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>EUR</DropdownMenuItem>
                <DropdownMenuItem>GBP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b border-gray-200 py-2">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center text-2xl font-bold text-[#4263EB]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4263EB] text-white">
                W
              </span>
              <span className="ml-2">WalinMart.</span>
            </div>
          </Link>

          {/* Search */}
          <div className="mx-4 flex max-w-xl flex-1 items-center justify-center">
            <div className="relative flex w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-r-none border-r-0 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    All categories <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Mens</DropdownMenuItem>
                  <DropdownMenuItem>Womans</DropdownMenuItem>
                  <DropdownMenuItem>Kids</DropdownMenuItem>
                  <DropdownMenuItem>Electronic Items</DropdownMenuItem>
                  <DropdownMenuItem>Kitchen Accessories</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="I'm shopping for..."
                  className="h-10 w-full rounded-none border border-gray-300 pr-10 pl-4 focus:border-[#4263EB] focus:outline-none"
                />
              </div>
              <Button className="rounded-l-none bg-[#4263EB] hover:bg-[#3651c9]">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-6">
            <div className="hidden items-center sm:flex">
              <div className="text-right">
                <p className="text-sm font-medium">Need Help?</p>
                <p className="text-sm text-gray-600">+2519-2286-4122</p>
              </div>
            </div>
            <Link href="#" className="hidden sm:block">
             <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="hidden sm:flex flex-col items-center text-gray-700">
      <User className="h-6 w-6" />
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-52">

    {/* WHEN USER IS NOT LOGGED IN */}
    {!user && (
      <>
        <DropdownMenuItem asChild>
          <Link
            href="/auth/login"
            className={`text-lg w-full ${isActive("/auth/login")}`}
          >
            Login
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/auth/register"
            className={`text-lg w-full ${isActive("/auth/register")}`}
          >
            Sign Up
          </Link>
        </DropdownMenuItem>
      </>
    )}

    {/* WHEN USER IS LOGGED IN */}
    {user && (
      <>
        <div className="px-3 py-2 text-sm">
         {user.name}
        </div>

        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </>
    )}

  </DropdownMenuContent>
</DropdownMenu>

            </Link>
            <Link href="#" className="relative">
              <Heart className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#4263EB] text-xs text-white">
                3
              </span>
            </Link>
            <Link href="#" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#4263EB] text-xs text-white">
                1
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container flex items-center">
          <div className="relative">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 bg-[#4263EB] hover:bg-[#3651c9] md:min-w-[220px]"
            >
              <Menu className="h-5 w-5" />
              <span className="hidden md:inline">All categories</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            {isMenuOpen && (
              <div className="absolute top-full left-0 z-50 w-full min-w-[220px] bg-white shadow-lg">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">Mens</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Womans</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Kids</li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    Electronic Items
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    Kitchen Accessories
                  </li>
                </ul>
              </div>
            )}
          </div>
          <nav className="hidden md:flex">
            <ul className="flex space-x-8 px-6 py-4">
              <li>
                <Link href="#" className="text-gray-700 hover:text-[#4263EB]">
                  Mens
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-[#4263EB]">
                  Womans
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-[#4263EB]">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-[#4263EB]">
                  Electronic Items
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-[#4263EB]">
                  Kitchen Accessories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-[#4263EB]">
                  News & Blogs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-[#4263EB]">
                  Contact Us
                </Link>
              </li>
          
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
