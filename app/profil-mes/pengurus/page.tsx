import Link from "next/link";
import Image from "next/image";

type Pengurus = {
  id: number;
  slug: string;
  jabatan_organisasi?: string;
  kategori_organisasi?: string;
  urutan?: string;
  title?: {
    rendered?: string;
  };
  excerpt?: {
    rendered?: string;
  };
  _embedded?: {
    ["wp:featuredmedia"]?: {
      source_url: string;
    }[];
  };
};

async function getPengurus(): Promise<Pengurus[]> {
  const res = await fetch(
    "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/pengurus?_embed=1&per_page=100",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Gagal mengambil data pengurus");
  }

  const data = await res.json();

  return Array.isArray(data) ? data : [];
}

export default async function PengurusPage() {
  const data = await getPengurus();

  // =========================
  // GROUP BY KATEGORI
  // =========================
  const grouped = data.reduce<Record<string, Pengurus[]>>(
    (acc, item) => {
      const kategori =
        item.kategori_organisasi?.trim() || "Pengurus";

      if (!acc[kategori]) {
        acc[kategori] = [];
      }

      acc[kategori].push(item);

      return acc;
    },
    {}
  );

  // =========================
  // SORT BERDASARKAN URUTAN ASC
  // =========================
  Object.keys(grouped).forEach((kategori) => {
    grouped[kategori].sort(
      (a, b) =>
        Number(a.urutan || 9999) -
        Number(b.urutan || 9999)
    );
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* HEADER */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Struktur Pengurus
        </h1>

        <p className="text-gray-500 mt-2">
          Masyarakat Ekonomi Syariah Jawa Barat
        </p>
      </section>

      {/* LIST KATEGORI */}
      <div className="space-y-12">
        {Object.keys(grouped).map((kategori) => (
          <section key={kategori}>
            {/* JUDUL KATEGORI */}
            <h2 className="text-xl font-bold mb-6 border-l-4 border-green-600 pl-3">
              {kategori}
            </h2>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {grouped[kategori].map((item) => {
                const image =
                  item?._embedded?.["wp:featuredmedia"]?.[0]
                    ?.source_url;

                return (
                  <Link
                    key={item.id}
                    href={`/pengurus/${item.slug}`}
                    className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group"
                  >
                    {/* JABATAN */}
                    <div className="py-3 px-4 text-center border-b bg-gray-50">
                      <h4 className="font-black text-lg uppercase text-gray-900 leading-tight">
                        {item.jabatan_organisasi || "Pengurus"}
                      </h4>
                    </div>

                    {/* FOTO */}
                    <div className="relative w-full h-[260px] bg-gray-100">
                      <Image
                        src={image || "/no-image.png"}
                        alt={item.title?.rendered || "Pengurus"}
                        fill
                        sizes="(max-width:768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* INFO */}
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-gray-800 text-lg group-hover:text-green-700 transition">
                        {item.title?.rendered}
                      </h3>

                      <span className="inline-block mt-4 text-xs bg-green-100 text-green-700 px-4 py-2 rounded-full">
                        Lihat Profil
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}