"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="relative w-12 h-12">

              <Image
                src="/logo-mes-jabar.png"
                alt="MES Jabar"
                fill
                priority
                className="object-contain"
              />

            </div>

            <div>

              <div className="text-lg font-bold text-gray-900 leading-none">
                MES Jabar
              </div>

              <div className="text-xs text-gray-500 mt-1">
                Masyarakat Ekonomi Syariah
              </div>

            </div>

          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex items-center gap-8">

            <Link
              href="/"
              className="text-gray-700 hover:text-green-700 transition font-medium"
            >
              Beranda
            </Link>

            <Link
              href="/profil-mes"
              className="text-gray-700 hover:text-green-700 transition font-medium"
            >
              Profil MES
            </Link>

            <Link
              href="/pengurus"
              className="text-gray-700 hover:text-green-700 transition font-medium"
            >
              Pengurus
            </Link>

            <Link
              href="/database-anggota"
              className="text-gray-700 hover:text-green-700 transition font-medium"
            >
              Database Anggota
            </Link>

            <Link
              href="/agenda"
              className="text-gray-700 hover:text-green-700 transition font-medium"
            >
              Agenda
            </Link>

            <Link
              href="/berita"
              className="text-gray-700 hover:text-green-700 transition font-medium"
            >
              Berita
            </Link>

          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <Link
              href="/pakar"
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 text-sm font-semibold transition shadow-sm"
            >
              Direktori Pakar
            </Link>

            {/* MOBILE MENU */}
            <button
              className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center"
              aria-label="Menu"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />

              </svg>

            </button>

          </div>

        </div>

      </div>

    </header>
  );
}