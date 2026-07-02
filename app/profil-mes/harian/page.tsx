import Link from "next/link";
import Image from "next/image";

type Pengurus = {
  id: number;
  date: string;
  slug: string;

  title?: {
    rendered?: string;
  };

  jabatan_organisasi?: string;
  kategori_organisasi?: string;
  urutan?: string;

  _embedded?: {
    ["wp:featuredmedia"]?: {
      source_url: string;
    }[];
  };
};

async function getPengurus(): Promise<Pengurus[]> {
  try {
    const res = await fetch(
      "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/pengurus?_embed&per_page=100",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

export default async function PengurusPage() {
  const data = await getPengurus();

  // GROUP BY KATEGORI
  const grouped = data.reduce<
    Record<string, Pengurus[]>
  >((acc, item) => {
    const kategori =
      item.kategori_organisasi?.trim() ||
      "Lainnya";

    if (!acc[kategori]) {
      acc[kategori] = [];
    }

    acc[kategori].push(item);

    return acc;
  }, {});

  // SORT ISI
  Object.keys(grouped).forEach((kategori) => {
    grouped[kategori].sort(
      (a, b) =>
        Number(a.urutan || 99999) -
        Number(b.urutan || 99999)
    );
  });

  // PRIORITAS KATEGORI
  const prioritas = [
    "Pengurus Harian",
    "Sekretaris Bidang",
    "Bendahara",
    "Ketua Bidang",
  ];

  const sortedKategori = Object.keys(grouped).sort(
    (a, b) => {
      const ia = prioritas.indexOf(a);
      const ib = prioritas.indexOf(b);

      if (ia !== -1 && ib !== -1)
        return ia - ib;

      if (ia !== -1) return -1;
      if (ib !== -1) return 1;

      return a.localeCompare(b, "id");
    }
  );

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-4 py-16 text-center">

          <span className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            Struktur Organisasi
          </span>

          <h1 className="mt-5 text-4xl md:text-5xl font-black text-slate-900">
            Pengurus Harian MES Jawa Barat
          </h1>

          <p className="mt-3 text-slate-500">
            Masyarakat Ekonomi Syariah Jawa Barat
          </p>

          <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border shadow-sm">
            <span className="text-3xl font-black text-green-600">
              {data.length}
            </span>

            <span className="text-sm text-slate-500">
              Total Pengurus
            </span>
          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-12 ">

        <div className="space-y-16">

          {sortedKategori.map((kategori) => (

            <section key={kategori}>

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-8">

                <div className="w-2 h-10 rounded-full bg-green-600 justify-items-center"></div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {kategori}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {grouped[kategori].length} Pengurus
                  </p>
                </div>

              </div>

              {/* GRID */}
<div
  className="
    flex
    flex-wrap
    justify-center
    gap-6
  "
>
  {grouped[kategori].map((item) => {
    const nama =
      item.title?.rendered ||
      "Pengurus";

    const jabatan =
      item.jabatan_organisasi ||
      "-";

    const image =
      item?._embedded?.[
        "wp:featuredmedia"
      ]?.[0]?.source_url;

    return (
      <Link
        key={item.id}
        href={`/profil-mes/pengurus/${item.id}/${item.slug}`}
        className="
          group
          w-[220px]
          bg-white
          rounded-3xl
          border
          border-slate-200
          hover:border-green-300
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
          duration-300
          overflow-hidden
        "
      >
        <div
          className="
            p-5
            flex
            flex-col
            items-center
            text-center
            h-full
          "
        >
          {/* FOTO */}
          <div className="flex justify-center">

            {image ? (
              <div className="relative w-28 h-28">

                <Image
                  src={image}
                  alt={nama}
                  fill
                  className="
                    rounded-full
                    object-cover
                    border-4
                    border-white
                    shadow
                  "
                />

              </div>
            ) : (
              <div
                className="
                  w-28
                  h-28
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
                "
              >
                {nama.charAt(0)}
              </div>
            )}

          </div>

          {/* NAMA */}
          <div className="mt-5 w-full">

            <h3
              className="
                text-base
                font-bold
                text-slate-900
                leading-snug
                min-h-[56px]
                flex
                items-center
                justify-center
              "
            >
              {nama}
            </h3>

            <div className="mt-3 flex justify-center">

              <span
                className="
                  inline-block
                  px-3
                  py-1.5
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

          </div>

          {/* BUTTON */}
          <div className="mt-5 flex justify-center w-full">

            <span
              className="
                inline-flex
                items-center
                px-4
                py-2
                rounded-full
                text-xs
                font-medium
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