import Link from "next/link";
import Image from "next/image";

import {
  GraduationCap,
} from "lucide-react";

import NewsSection from "@/components/NewsSection";
import AgendaSection from "@/components/AgendaSection";
import LayananSection from "@/components/LayananSection";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";



/* ================= DATA ================= */

const programs = [
  {
    title: "Akademi Ekonomi Syariah",
    desc: "Pengembangan SDM unggul di bidang ekonomi syariah",
    color:
      "bg-green-100 text-green-700",
  },
  {
    title: "Pendamping Halal",
    desc: "Pendampingan sertifikasi halal untuk UMKM dan industri",
    color:
      "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Koperasi Syariah",
    desc: "Koperasi modern berbasis syariah",
    color:
      "bg-blue-100 text-blue-700",
  },
  {
    title: "Donasi & ZISWAF",
    desc: "Pemberdayaan ekonomi umat",
    color:
      "bg-violet-100 text-violet-700",
  },
];

/* ================= PAGE ================= */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7f6]">

      {/* ================= HERO ================= */}
      <section className="relative">
        <div className="relative h-[560px] overflow-hidden rounded-b-[50px]">

          <Image
            src="/hero.jpg"
            alt="Hero MES Jabar"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-black/10" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-6 pt-12 lg:grid-cols-2">

              <div className="max-w-xl">
                <h1 className="mt-5 text-4xl font-black leading-tight text-green-900 lg:text-5xl">
                  Membangun Ekosistem
                  <br />
                  Ekonomi Syariah
                  <br />
                  Jawa Barat
                </h1>

                <p className="mt-5 max-w-lg text-base leading-8 text-slate-700">
                  Bersama memberdayakan umat dan memperkuat ekonomi syariah
                  melalui kolaborasi, inovasi, dan pengembangan SDM unggul.
                </p>

                <div className="mt-7 flex gap-3">
                  <button className="rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600">
                    Jelajahi Program
                  </button>

                  <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    Tentang MES
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

   {/* ================= STATS ================= */}
<section className="relative z-20 -mt-10">
  <div className="mx-auto max-w-7xl px-4">
    <Stats />
  </div>
</section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-12">

          {/* PROGRAM */}
          <div className="lg:col-span-6">
            <h2 className="mb-5 text-2xl font-black text-slate-900">
              Program Unggulan
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {programs.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AGENDA */}
          <div className="lg:col-span-3">
            <AgendaSection />
          </div>

          {/* NEWS */}
          <div className="lg:col-span-3">
            <NewsSection />
          </div>

        </div>
      </section>

      {/* ================= LAYANAN ================= */}
  
      <LayananSection />

          {/* ================= NEWSLETTER ================= */}
<section className="pb-14">
  <div className="mx-auto max-w-7xl px-4 sm:px-6">

    <div className="rounded-3xl bg-gradient-to-r from-green-900 via-green-800 to-emerald-700 px-5 py-6 sm:px-8 sm:py-7 shadow-xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* TEXT */}
        <div className="max-w-xl">

          <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
            Dapatkan informasi terbaru dari MES Jawa Barat
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-green-100">
            Berlangganan newsletter untuk update program terbaru
          </p>

        </div>

       {/* FORM */}
<div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">

  <input
    type="email"
    placeholder="Masukkan email Anda"
    className="h-14 w-full rounded-2xl border border-white/20 bg-white px-5 text-sm shadow-sm outline-none placeholder:text-gray-400 sm:h-14"
  />

  <button className="h-14 rounded-2xl bg-yellow-500 px-6 text-sm font-semibold text-white transition hover:bg-yellow-400 whitespace-nowrap">
    Berlangganan
  </button>

</div>
      </div>

    </div>

  </div>
</section>

{/* ================= MITRA ================= */}
<section className="pb-14">

  <div className="max-w-7xl mx-auto px-6">

    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <div className="text-center">

        <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-700">
          Mitra Strategis
        </span>

        <h2 className="mt-4 text-3xl font-black text-slate-900">
          Kolaborasi Bersama Mitra
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Bersinergi membangun ekosistem ekonomi syariah yang kuat dan berkelanjutan.
        </p>

      </div>

      {/* LOGO */}
      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">

        {[
          {
            name: "Bank Indonesia",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BI_Logo.png/1920px-BI_Logo.png",
          },
          {
            name: "OJK",
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/OJK_Logo.png",
          },
          {
            name: "BJB Syariah",
            logo: "https://www.icdx.co.id/cms/img/9d20f3ec-f97d-40c0-a237-c9a450e280dd/bjb-syariah.png",
          },
          {
            name: "Rumah Zakat",
            logo: "https://www.rumahzakat.org/wp-content/uploads/2023/10/logo-rumah-zakat-1.png",
          },
          {
            name: "UIN SGD",
            logo: "https://uinsgd.ac.id/wp-content/uploads/2023/03/Logo-uinsgd_official.png",
          },
	  {
            name: "UPI",
            logo: "https://images.seeklogo.com/logo-png/33/2/upi-universitas-pendidikan-indonesia-logo-png_seeklogo-332580.png",
	    },
          {
            name: "BUMN",
            logo: "https://png.pngtree.com/png-clipart/20230627/original/pngtree-soya-logo-for-indonesia-horizontally-vector-png-image_9229872.png",
          },
        ].map((item) => (

          <div
            key={item.name}
            className="flex h-28 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >

            <img
              src={item.logo}
              alt={item.name}
              className="max-h-14 w-auto object-contain grayscale transition hover:grayscale-0"
            />

          </div>

        ))}

      </div>

    </div>

  </div>

</section>
<Footer />
    </main>
  );
}