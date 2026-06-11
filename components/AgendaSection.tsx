import Link from "next/link";

const API =
  "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/agenda?per_page=3&_fields=id,slug,title,acf";

async function getAgenda() {
  try {
    const res = await fetch(API, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Agenda error:", error);
    return [];
  }
}

export default async function AgendaSection() {
  const agenda = await getAgenda();

  const months = [
    "JAN","FEB","MAR","APR","MEI","JUN",
    "JUL","AGU","SEP","OKT","NOV","DES",
  ];

  return (
    <section>
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">
          Agenda
        </h2>

        <Link
          href="/agenda"
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold shadow-sm hover:bg-gray-50"
        >
          Semua Agenda
        </Link>
      </div>

      {/* EMPTY */}
      {agenda.length === 0 && (
        <div className="rounded-2xl bg-white p-5 text-sm text-slate-500 shadow-sm">
          Agenda tidak tersedia
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {agenda.map((item: any) => {
          const tanggal = item?.acf?.tanggal || "";

          let day = "--";
          let month = "---";

          if (typeof tanggal === "string" && tanggal.includes("/")) {
            const split = tanggal.split("/");

            day = split[0] || "--";

            const monthIndex = Number(split[1]) - 1;

            month = months[monthIndex] || "---";
          }

          const slug = item?.slug || "#";

          return (
            <Link
              href={slug !== "#" ? `/agenda/${slug}` : "/agenda"}
              key={item?.id || Math.random()}
              className="group block overflow-hidden rounded-2xl border border-green-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex gap-4">

                {/* DATE */}
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 text-white">
                  <span className="text-2xl font-black leading-none">
                    {day}
                  </span>

                  <span className="mt-1 text-[10px] font-bold tracking-wider">
                    {month}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="flex-1">

                  <h3
                    className="text-sm font-bold leading-snug text-slate-800 transition group-hover:text-green-700"
                    dangerouslySetInnerHTML={{
                      __html: item?.title?.rendered || "Tanpa Judul",
                    }}
                  />

                  <div className="mt-3 space-y-1">

                    <p className="text-xs text-slate-500">
                      🕒 {item?.acf?.jam || "-"}
                    </p>

                    <p className="text-xs text-slate-500">
                      📍 {item?.acf?.lokasi || "-"}
                    </p>

                  </div>

                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}