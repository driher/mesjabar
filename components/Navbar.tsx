"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GoogleTranslate from "@/components/GoogleTranslate";

import {
  Menu,
  X,
  Search,
  ChevronDown,
} from "lucide-react";

const menus = [
  {
    label: "Beranda",
    href: "/",
  },
  {
    label: "Profil MES",
    href: "#",
    submenu: [
      {
        label: "Sejarah",
        href: "/profil-mes/sejarah",
      },
      {
        label: "Pengurus",
        href: "/profil-mes/pengurus",
      },
      {
        label: "Anggota",
        href: "/profil-mes/anggota",
      },
      {
        label: "Legalitas",
        href: "/profil-mes/legalitas",
      },
    ],
  },
  {
    label: "Program",
    href: "/program",
  },
  {
    label: "Agenda",
    href: "/agenda",
  },
  {
    label: "Berita",
    href: "/news",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

         {/* LOGO */}
<Link
  href="/"
  className="flex items-center gap-3"
>
  <div className="relative w-[170px] h-[80px] md:w-[220px] md:h-[95px] shrink-0">

    <Image
      src="/logo-mes-jabar.png"
      alt="MES Jabar"
      fill
      priority
      sizes="220px"
      className="object-contain"
    />

  </div>
</Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8">

            {menus.map((menu) => (

              <div
                key={menu.label}
                className="relative group"
              >

                {/* MENU WITHOUT SUBMENU */}
                {!menu.submenu ? (
                  <Link
                    href={menu.href}
                    className="text-gray-700 hover:text-green-700 transition font-medium text-sm"
                  >
                    {menu.label}
                  </Link>
                ) : (

                  <>
                    {/* MENU WITH SUBMENU */}
                    <button
                      className="flex items-center gap-1 text-gray-700 hover:text-green-700 transition font-medium text-sm"
                    >
                      {menu.label}

                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* DROPDOWN */}
                    <div className="absolute top-full left-0 mt-3 w-56 rounded-2xl bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">

                      {menu.submenu.map((sub) => (

                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition border-b border-gray-50 last:border-b-0"
                        >
                          {sub.label}
                        </Link>

                      ))}

                    </div>

                  </>

                )}

              </div>

            ))}

            <div className="flex items-center gap-4">
              <GoogleTranslate />
            </div>

          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            {/* SEARCH */}
            <Link
              href="/search"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </Link>

            {/* BUTTON */}
            <Link
              href="/pakar"
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 text-sm font-semibold transition shadow-sm"
            >
              Direktori Pakar
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center"
              aria-label="Menu"
            >

              {open ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}

            </button>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open
            ? "max-h-[700px] border-t border-gray-100"
            : "max-h-0"
        }`}
      >

        <div className="px-4 py-4 bg-white">

          {/* SEARCH MOBILE */}
          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 mb-4"
          >

            <Search className="w-5 h-5 text-gray-500" />

            <span className="text-gray-500 text-sm">
              Cari berita...
            </span>

          </Link>

          {/* MENU */}
          <div className="flex flex-col">

            {menus.map((menu) => (

              <div key={menu.label}>

                {/* MENU BIASA */}
                {!menu.submenu ? (
                  <Link
                    href={menu.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 border-b border-gray-100 text-gray-700 font-medium hover:text-green-700 transition"
                  >
                    {menu.label}
                  </Link>
                ) : (

                  <>
                    {/* BUTTON SUBMENU */}
                    <button
                      onClick={() => setOpenSubmenu(!openSubmenu)}
                      className="w-full flex items-center justify-between py-3 border-b border-gray-100 text-gray-700 font-medium hover:text-green-700 transition"
                    >
                      <span>{menu.label}</span>

                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openSubmenu ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* SUBMENU MOBILE */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openSubmenu
                          ? "max-h-96"
                          : "max-h-0"
                      }`}
                    >

                      <div className="pl-4 pb-2">

                        {menu.submenu.map((sub) => (

                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => {
                              setOpen(false);
                              setOpenSubmenu(false);
                            }}
                            className="block py-3 text-sm text-gray-600 hover:text-green-700 transition border-b border-gray-50"
                          >
                            {sub.label}
                          </Link>

                        ))}

                      </div>

                    </div>

                  </>

                )}

              </div>

            ))}

          </div>

          {/* BUTTON MOBILE */}
          <Link
            href="/pakar"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-green-700 hover:bg-green-800 text-white px-5 py-3 text-sm font-semibold transition"
          >
            Direktori Pakar
          </Link>

        </div>

      </div>

    </header>
  );
}


