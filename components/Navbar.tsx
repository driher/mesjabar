import { Search, Bell } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const menus: string[] = [
    "Beranda",
    "Profil MES",
    "Database Anggota",
    "Akademi",
    "Pendamping Halal",
    "Unit Usaha",
    "Agenda",
    "Berita",
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src="/logo-mes.png" className="h-10 w-10" alt="MES Jabar" />

          <div className="leading-tight">
            <div className="font-bold text-green-800 text-sm">
              MES JAWA BARAT
            </div>
            <div className="text-[11px] text-gray-500">
              Masyarakat Ekonomi Syariah
            </div>
          </div>
        </div>

        {/* MENU */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {menus.map((item) => (
            <Link
              key={item}
              href="#"
              className="text-gray-600 hover:text-green-700 transition"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Search size={18} />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={18} />
          </button>

          <button className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-800 transition">
            Login / Daftar
          </button>
        </div>

      </div>
    </header>
  );
}