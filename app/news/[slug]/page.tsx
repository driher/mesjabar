import Image from "next/image";
import Link from "next/link";
import { Search, Bell } from "lucide-react";

const menus = [
    "Beranda",
    "Profil MES",
    "Database Anggota",
    "Akademi",
    "Agenda",
    "Berita",
  ];

export default function NewsDetail() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green to-gray-50">

   {/* HEADER */}
     <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-xl shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-0">

          {/* LOGO */}

          <div className="flex items-center">
            <img
              src="/logo-mes-jabar.png"
              alt="MES Jabar"
              className="h-25 w-auto"
            />
          </div>

          {/* MENU */}
         <nav className="hidden gap-8 text-sm font-semibold text-green-900 lg:flex">
            {menus.map((item, i) => (
              <Link
                key={i}
                href="#"
                className="transition hover:text-green-600"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* ICON */}
          <div className="flex items-center gap-4 text-green-900">
            <Search className="h-5 w-5" />
            <Bell className="h-5 w-5" />

            <button className="rounded-xl bg-green-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-800">
              Login
            </button>
          </div>

        </div>
      </header>
      {/* CONTENT */}
      <article className="max-w-4xl mx-auto px-2 py-10">
      <div className="h-[82px]" />

        {/* CATEGORY */}
        <p className="text-sm text-blue-600 font-medium">
          Ekonomi Syariah
        </p>

        {/* TITLE */}
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mt-2">
          Ekonomi Syariah Jawa Barat Tumbuh Pesat di 2026
        </h1>

        {/* META */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-4">
          <span>21 Mei 2026</span>
          <span>•</span>
          <span>5 menit membaca</span>
        </div>

        {/* IMAGE */}
        <div className="relative w-full h-[320px] lg:h-[420px] mt-8 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
            alt="news"
            fill
            className="object-cover"
          />
        </div>

        {/* CONTENT BODY */}
        <div className="mt-10 space-y-5 text-gray-700 leading-relaxed text-[15px]">

          <p>
            Ekonomi syariah di Jawa Barat menunjukkan pertumbuhan signifikan pada tahun 2026,
            didorong oleh meningkatnya kolaborasi antara pemerintah, pesantren, dan pelaku UMKM.
          </p>

          <p>
            Program-program seperti penguatan koperasi syariah dan digitalisasi UMKM
            menjadi faktor utama dalam percepatan ekosistem ekonomi halal.
          </p>

          <p>
            MES Jawa Barat juga terus mendorong inovasi berbasis digital untuk memperluas
            jangkauan ekonomi syariah ke seluruh kabupaten dan kota.
          </p>

          {/* QUOTE BOX */}
          <div className="border-l-4 border-blue-500 pl-4 italic text-gray-600 bg-blue-50/40 p-4 rounded-lg">
            “Ekonomi syariah bukan hanya konsep, tetapi gerakan nyata untuk kesejahteraan umat.”
          </div>

          <p>
            Ke depan, MES Jabar menargetkan integrasi penuh antara sektor pendidikan,
            ekonomi, dan teknologi dalam satu ekosistem yang berkelanjutan.
          </p>

        </div>

        {/* TAGS */}
        <div className="mt-10 flex flex-wrap gap-2">
          {["Ekonomi", "Syariah", "UMKM", "Jawa Barat"].map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* RELATED */}
        <div className="mt-14">

          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Berita Terkait
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            {[
              "UMKM Syariah Naik Kelas di 2026",
              "Digitalisasi Pesantren di Jawa Barat",
            ].map((item) => (
              <div
                key={item}
                className="p-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100 hover:shadow-md transition"
              >
                <p className="text-sm font-semibold text-gray-800">
                  {item}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Baca selengkapnya →
                </p>
              </div>
            ))}

          </div>

        </div>

      </article>

    </main>
  );
}