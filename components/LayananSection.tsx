"use client";

const layanan = [
  {
    title: "Koperasi Syariah",
    desc: "Layanan keuangan syariah untuk anggota",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pelatihan & Sertifikasi",
    desc: "Tingkatkan kompetensi dan profesionalisme",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Marketplace Anggota",
    desc: "Wadah bisnis dan produk anggota MES",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pendampingan Bisnis",
    desc: "Konsultasi dan pendampingan untuk bisnis Anda",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Donasi & ZISWAF",
    desc: "Salurkan donasi untuk kebaikan umat",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Penerbitan & Media",
    desc: "Informasi, publikasi, dan edukasi ekonomi syariah",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function LayananSection() {
  return (
    <section className="pb-14">
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-700">
           PRODUK DAN LAYANAN MES JAWA BARAT
          </span>

                   <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Beragam layanan dan unit usaha modern untuk mendukung
            pengembangan ekonomi syariah di Jawa Barat.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {layanan.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[30px] shadow-lg"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="h-[100px] w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

                <h3 className="text-2xl font-black text-white drop-shadow-lg">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-white/90">
                  {item.desc}
                </p>

              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}