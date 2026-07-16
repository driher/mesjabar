import Link from "next/link";
import Image from "next/image";

type Pengurus = {
  id: number;
  slug: string;

  title?: {
    rendered?: string;
  };

  acf?: {
    jabatan?: string;
    kategori?: string;
    urutan?: string;
  };

  _embedded?: {
    ["wp:featuredmedia"]?: {
      source_url: string;
    }[];
  };
};

async function getPengurus(): Promise<Pengurus[]> {
  try {
    const res = await fetch(
      "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/departemen?_embed&per_page=100",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function PengurusPage() {
  const data = await getPengurus();

  /**
   * URUTAN DEPARTEMEN
   */
  const kategoriOrder = [
    "Bidang Keuangan Departemen IKNB Syariah & Keuangan Digital",
    "Bidang Keuangan Departemen Keuangan Sosial Islam",
    "Bidang Keuangan Departemen Perbankan",

    "Bidang Ekosistem Halal Departemen Industri Makanan, Minuman, & Modest Fashion",
    "Bidang Ekosistem Halal Departemen Pariwisata Halal & Logistik Rantai Pasok (Halal Supply Chain)",
    "Bidang Ekosistem Halal Departemen Pendampingan & Akselerasi Sertifikasi Halal",

    "Bidang Bisnis Syariah & Ekonomi Kreatif Departemen Bisnis Digital & Teknologi Informasi",
    "Bidang Bisnis Syariah & Ekonomi Kreatif Departemen Ekonomi Kreatif & Properti Syariah",
    "Bidang Bisnis Syariah & Ekonomi Kreatif Departemen Pemberdayaan UMKM",

    "Bidang Pemberdayaan Departemen Ekonomi Hijau dan Lingkungan Hidup",
    "Bidang Pemberdayaan Departemen Generasi Muda dan Pemberdayaan Perempuan",
    "Bidang Pemberdayaan Departemen Pemberdayaan Ekonomi Pesantren dan Ekonomi Masjid",

    "Bidang Sumber Daya Insani Departemen Pelatihan",
    "Bidang Sumber Daya Insani Departemen Penelitian dan Pengembangan",

    "Bidang Keorganisasian Departemen Kerjasama dan Kemitraan",
    "Bidang Keorganisasian Departemen Media dan Publikasi",
    "Bidang Keorganisasian Departemen Organisasi dan Kelembagaan",

    "Lainnya",
  ];

  /**
   * GROUP BERDASARKAN DEPARTEMEN (ACF KATEGORI)
   */
  const grouped = data.reduce<Record<string, Pengurus[]>>(
    (acc, item) => {
      const kategori =
        item.acf?.kategori?.trim() || "Lainnya";

      if (!acc[kategori]) {
        acc[kategori] = [];
      }

      acc[kategori].push(item);

      return acc;
    },
    {}
  );

  /**
   * SORT ANGGOTA BERDASARKAN FIELD URUTAN
   */
  Object.keys(grouped).forEach((kategori) => {
    grouped[kategori].sort(
      (a, b) =>
        Number(a.acf?.urutan || 9999) -
        Number(b.acf?.urutan || 9999)
    );
  });

  /**
   * SORT DEPARTEMEN SESUAI STRUKTUR ORGANISASI
   */
  const sortedKategori = [
    ...kategoriOrder.filter(
      (kategori) => grouped[kategori]
    ),

    ...Object.keys(grouped)
      .filter(
        (kategori) =>
          !kategoriOrder.includes(kategori)
      )
      .sort(),
  ];

  return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">

      {/* HERO */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            Struktur Organisasi
          </span>

          <h1 className="mt-5 text-4xl md:text-5xl font-black text-gray-900">
            Pengurus Departemen
          </h1>

          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Masyarakat Ekonomi Syariah Jawa Barat
          </p>

          <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border shadow-sm">

            <span className="text-3xl font-black text-green-600">
              {data.length}
            </span>

            <span className="text-sm text-gray-500">
              Total Pengurus
            </span>

          </div>

        </div>
      </section>

     {/* CONTENT */}
<section className="max-w-[1200px]  mx-auto px-4 pb-20">

  <div className="space-y-14">

    {sortedKategori.map((kategori) => (

      <section key={kategori}>

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-3">

          <div className="w-2 h-10 rounded-full bg-green-600"></div>

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              {kategori}
            </h2>

            <p className="text-sm text-gray-500">
              {grouped[kategori].length} Pengurus
            </p>

          </div>

        </div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-5
          "
        >

          {grouped[kategori].map((item) => {

            const nama =
              item.title?.rendered || "Pengurus";

            const jabatan =
              item.acf?.jabatan || "Anggota";

            const image =
              item?._embedded?.["wp:featuredmedia"]?.[0]
                ?.source_url;

            return (

              <Link
                key={item.id}
                href={`/profil-mes/departemen/${item.id}/${item.slug}`}
                className="
                  group
                  bg-white
                  rounded-3xl
                  border
                  border-gray-100
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  overflow-hidden
                "
              >

                <div className="p-5">

                  {/* FOTO */}
                  <div className="flex justify-center">

                    {image ? (

                      <div className="relative w-24 h-24">

                        <Image
                          src={image}
                          alt={nama}
                          fill
                          className="
                            object-cover
                            rounded-full
                            border-4
                            border-white
                            shadow-md
                            group-hover:scale-105
                            transition
                          "
                        />

                      </div>

                    ) : (

                      <div
                        className="
                          w-24
                          h-24
                          rounded-full
                          bg-gradient-to-br
                          from-green-600
                          to-emerald-500
                          flex
                          items-center
                          justify-center
                          text-white
                          text-3xl
                          font-black
                          shadow-lg
                        "
                      >
                        {nama.charAt(0).toUpperCase()}
                      </div>

                    )}

                  </div>

                  {/* NAMA */}
                  <div className="mt-4 text-center">

                    <h3
                      className="
                        font-bold
                        text-sm
                        text-gray-900
                        leading-tight
                        min-h-[42px]
                      "
                    >
                      {nama}
                    </h3>

                    <span
                      className="
                        inline-block
                        mt-2
                        px-3
                        py-1
                        rounded-full
                        bg-green-100
                        text-green-700
                        text-xs
                        font-semibold
                      "
                    >
                      {jabatan}
                    </span>

                  </div>

                  {/* BUTTON */}
                  <div className="mt-4 flex justify-center">

                    <span
                      className="
                        text-xs
                        font-medium
                        px-4
                        py-2
                        rounded-full
                        bg-slate-100
                        text-slate-600
                        group-hover:bg-green-600
                        group-hover:text-white
                        transition
                      "
                    >
                      Lihat Profil
                    </span>

                  </div>

                </div>

              </Link>

            );

          })}

        </div>

      </section>

    ))}

     </div>

      </section>

    </main>

  );
}