import Image from "next/image";
import Link from "next/link";

const API =
  "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/program?per_page=100&_embed=1";

async function getProgram() {
  try {
    const res = await fetch(API, {
      next: {
        revalidate: 300,
      },
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Program error:", error);
    return [];
  }
}

function excerpt(html: string, length = 180) {
  const text = html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= length) {
    return text;
  }

  return text.substring(0, length) + "...";
}

export default async function ProgramPage() {
  const programs = await getProgram();

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      {/* HERO */}
      <section className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-8 md:p-12 text-white">

        <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
          PROGRAM STRATEGIS
        </span>

        <h1 className="mt-4 text-4xl md:text-5xl font-black">
          Program MES Jawa Barat
        </h1>

        <p className="mt-4 max-w-3xl text-green-50 leading-relaxed">
          Program strategis Masyarakat Ekonomi Syariah Jawa Barat
          untuk memperkuat literasi, inklusi, industri halal,
          pemberdayaan UMKM, ekonomi pesantren, wakaf produktif,
          dan pengembangan ekosistem ekonomi syariah.
        </p>

      </section>

      {/* EMPTY */}
      {programs.length === 0 && (
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500">
            Data program belum tersedia.
          </p>
        </div>
      )}

      {/* GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {programs.map((item: any) => {
          const image =
            item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/no-image.jpg";

          return (
            <Link
              key={item.id}
              href={`/program/${item.slug}`}
              className="group overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* IMAGE */}
              <div className="relative h-56 w-full overflow-hidden">

                <Image
                  src={image}
                  alt={item?.title?.rendered || "Program"}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h2
                  className="text-xl font-bold leading-snug text-slate-800 group-hover:text-green-700 transition"
                  dangerouslySetInnerHTML={{
                    __html: item?.title?.rendered || "Tanpa Judul",
                  }}
                />

                <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-4">
                  {excerpt(item?.content?.rendered || "")}
                </p>

                <div className="mt-5">
                  <span className="inline-flex items-center font-semibold text-green-700">
                    Selengkapnya →
                  </span>
                </div>

              </div>

            </Link>
          );
        })}

      </div>

    </main>
  );
}