"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-[9999] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo-mes-jabar.png"
            alt="MES Jabar"
            width={200}
            height={100}
            className="h-24 w-auto"
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
            aria-label="Toggle menu"
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
    {open && (
  <div className="lg:hidden fixed inset-0 top-16 z-[99999] bg-white overflow-y-auto">
    
    <div className="flex flex-col gap-2 px-4 py-4 text-sm font-medium">

      {menus.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setOpen(false)}
          className="block w-full rounded-lg px-3 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-green-700"
        >
          {item.label}
        </Link>
      ))}

      <div className="mt-3 flex gap-3 border-t pt-4">

        <button className="rounded-full p-2 hover:bg-gray-100">
          <Search size={18} />
        </button>

        <button className="rounded-full p-2 hover:bg-gray-100">
          <Bell size={18} />
        </button>

        <button className="w-full rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white">
          Login / Daftar
        </button>

      </div>

    </div>
  </div>
)}
    </header>
  );
}