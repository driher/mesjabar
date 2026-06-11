import Link from "next/link";

const API =
  "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/agenda?per_page=100&_fields=id,slug,title,acf";

async function getAgenda() {
  const res = await fetch(API, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function AgendaPage() {
  const agenda = await getAgenda();

  const months = [
    "JAN","FEB","MAR","APR","MEI","JUN",
    "JUL","AGU","SEP","OKT","NOV","DES",
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900">
          Agenda Kegiatan
        </h1>

        <p className="mt-2 text-slate-500">
          Jadwal kegiatan dan acara MES Jawa Barat
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {agenda.map((item: any) => {

          const tanggal = item?.acf?.tanggal || "";

          let day = "--";
          let month = "---";

          if (tanggal.includes("/")) {
            const split = tanggal.split("/");

            day = split[0];

            const monthIndex = Number(split[1]) - 1;

            month = months[monthIndex] || "---";
          }

          return (
            <Link
              key={item.id}
              href={`/agenda/${item.slug}`}
              className="group rounded-3xl border bg-white p-5 shadow-sm hover:shadow-xl transition"
            >
              <div className="flex gap-4">

                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 text-white">
                  <span className="text-3xl font-black">
                    {day}
                  </span>

                  <span className="text-xs font-bold">
                    {month}
                  </span>
                </div>

                <div className="flex-1">

                  <h2
                    className="font-bold text-slate-800 group-hover:text-green-700"
                    dangerouslySetInnerHTML={{
                      __html: item.title.rendered,
                    }}
                  />

                  <div className="mt-3 space-y-2 text-sm text-slate-500">

                    <p>
                      🕒 {item?.acf?.jam || "-"}
                    </p>

                    <p>
                      📍 {item?.acf?.lokasi || "-"}
                    </p>

                  </div>

                </div>

              </div>
            </Link>
          );
        })}
      </div>

    </main>
  );
}