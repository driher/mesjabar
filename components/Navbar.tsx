"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menus = [
    { label: "Beranda", href: "/" },
    { label: "Profil MES", href: "/news/profil-mes" },
    { label: "Database Pakar", href: "/pakar" },
    { label: "Akademi", href: "/akademi" },
    { label: "Pendamping Halal", href: "/pendamping-halal" },
    { label: "Unit Usaha", href: "/unit-usaha" },
    { label: "Agenda", href: "/agenda" },
    { label: "Berita", href: "/news" },
  ];

  return (
    <header className="sticky top-0 z-[9999] bg-white/80 backdrop-blur-md border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="/logo-mes-jabar.png"
            className="h-25 w-auto"
            alt="MES Jabar"
          />
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {menus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-green-700 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-2">

          <div className="hidden lg:flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search size={18} />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell size={18} />
            </button>
          </div>

          <button className="hidden lg:block bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-800 transition">
            Login / Daftar
          </button>

          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-[9998] border-t overflow-y-auto">

          <div className="px-4 py-4 flex flex-col gap-2 text-sm font-medium">

            {menus.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block w-full py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-700 transition"
              >
                {item.label}
              </Link>
            ))}

            <div className="flex gap-3 pt-4 border-t mt-3">

              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search size={18} />
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={18} />
              </button>

              <button className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold w-full">
                Login / Daftar
              </button>

            </div>

          </div>
        </div>
      )}

    </header>
  );
}