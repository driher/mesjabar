"use client";

import { useEffect, useState } from "react";

type Agenda = {
  title: string;
  day: string;
  month: string;
  time: string;
  location: string;
};

export default function AgendaSection() {
  const [agenda, setAgenda] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mada.akarmusic.com/wp-json/wp/v2/agenda?_embed")
      .then((res) => res.json())
      .then((data) => {

        const formatted = data.map((item: any) => {

          // tanggal dari ACF
          const rawDate = item.acf?.tanggal || item.date;

          // support format 20260525 dan 2026-05-25
          const parsedDate =
            rawDate?.length === 8
              ? new Date(
                  `${rawDate.substring(0, 4)}-${rawDate.substring(4, 6)}-${rawDate.substring(6, 8)}`
                )
              : new Date(rawDate);

          return {
            title: item.title.rendered,

            day: parsedDate.toLocaleDateString("id-ID", {
              day: "2-digit",
            }),

            month: parsedDate
              .toLocaleDateString("id-ID", {
                month: "short",
              })
              .toUpperCase(),

            time: item.acf?.waktu || "08.00 WIB",

            location: item.acf?.lokasi || "Bandung",
          };
        });

        setAgenda(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section>

      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-2xl font-black text-slate-900">
          Agenda
        </h2>

        <button className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold shadow-sm transition hover:shadow-md">
          Semua Agenda
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="space-y-4">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl bg-white p-4 shadow-sm"
            >
              <div className="flex gap-4">

                <div className="h-16 w-16 rounded-xl bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-3 w-2/3 rounded bg-gray-100" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">

        {agenda.map((item, index) => (

          <div
            key={index}
            className="group overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-white via-green-50 to-emerald-50 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="flex gap-4">

              {/* DATE */}
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 text-white shadow-lg">

                <span className="text-2xl font-black leading-none">
                  {item.day}
                </span>

                <span className="mt-1 text-[10px] font-bold tracking-wider">
                  {item.month}
                </span>

              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <h3
                  className="text-sm font-bold leading-snug text-slate-800 transition group-hover:text-green-700"
                  dangerouslySetInnerHTML={{
                    __html: item.title,
                  }}
                />

                <div className="mt-3 space-y-1">

                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <span>🕒</span>
                    {item.time}
                  </p>

                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <span>📍</span>
                    {item.location}
                  </p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}