"use client";

import { useEffect, useMemo, useState } from "react";

import PakarCard from "../../components/PakarCard";
import SearchBox from "../../components/SearchBox";
import SidebarFilter from "../../components/SidebarFilter";

/* =========================
   TYPES
========================= */

interface PakarItem {
  id: number;
  slug?: string;

  title?: {
    rendered?: string;
  };

  excerpt?: {
    rendered?: string;
  };

  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url?: string;
    }>;
  };
}

/* =========================
   PAGE
========================= */

export default function PakarPage() {
  const [data, setData] = useState<PakarItem[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  /* =========================
     FETCH DATA
  ========================= */

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://mada.akarmusic.com/wp-json/wp/v2/pakar?_embed&per_page=100",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            `HTTP Error ${res.status}`
          );
        }

        const json = await res.json();

        if (!Array.isArray(json)) {
          throw new Error(
            "Format data API tidak valid"
          );
        }

        if (isMounted) {
          setData(json);
        }
      } catch (err: unknown) {
        console.error(
          "ERROR FETCH PAKAR:",
          err
        );

        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(
              "Gagal mengambil data pakar"
            );
          }

          setData([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================
     FILTER DATA
  ========================= */

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const title =
        item?.title?.rendered?.toLowerCase() ||
        "";

      return title.includes(
        search.toLowerCase()
      );
    });
  }, [data, search]);

  /* =========================
     RENDER
  ========================= */

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8faf8] to-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-r from-green-950 via-green-800 to-emerald-700">

        {/* BACKGROUND */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />

          <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-yellow-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 lg:pt-40">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT */}
            <div>

              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-100 backdrop-blur">
                Direktori Profesional
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Direktori Pakar
                <br />
                MES Jawa Barat
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-green-100 sm:text-lg">
                Temukan akademisi,
                praktisi, konsultan,
                profesional, dan tokoh
                ekonomi syariah terbaik di
                Jawa Barat.
              </p>

              {/* SEARCH */}
              <div className="mt-8 max-w-2xl">
                <SearchBox
                  value={search}
                  onChange={setSearch}
                  placeholder="Cari nama pakar..."
                />
              </div>

            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-3xl border border-white/10 bg-white/90 p-7 shadow-2xl backdrop-blur">

                <div className="text-4xl font-black text-green-700">
                  {data.length}
                </div>

                <div className="mt-2 text-sm font-medium text-gray-500">
                  Total Pakar
                </div>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/90 p-7 shadow-2xl backdrop-blur">

                <div className="text-4xl font-black text-green-700">
                  100+
                </div>

                <div className="mt-2 text-sm font-medium text-gray-500">
                  Bidang Keahlian
                </div>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/90 p-7 shadow-2xl backdrop-blur">

                <div className="text-4xl font-black text-green-700">
                  Jawa Barat
                </div>

                <div className="mt-2 text-sm font-medium text-gray-500">
                  Jaringan Profesional
                </div>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/90 p-7 shadow-2xl backdrop-blur">

                <div className="text-4xl font-black text-green-700">
                  MES
                </div>

                <div className="mt-2 text-sm font-medium text-gray-500">
                  Ekosistem Syariah
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CONTENT ================= */}

      <section className="mx-auto max-w-7xl px-4 py-10 lg:py-14">

        <div className="grid gap-8 lg:grid-cols-12">

          {/* ================= SIDEBAR ================= */}

          <aside className="lg:col-span-3">

            <div className="sticky top-24">

              <SidebarFilter />

            </div>

          </aside>

          {/* ================= MAIN ================= */}

          <section className="lg:col-span-9">

            {/* TOPBAR */}
            <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-2xl font-black text-gray-900">
                  Hasil Pencarian
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Menampilkan data pakar
                  ekonomi syariah MES Jawa
                  Barat
                </p>

              </div>

              <div className="inline-flex items-center rounded-2xl bg-green-50 px-5 py-3 text-sm font-semibold text-green-700">
                {filtered.length} pakar
                ditemukan
              </div>

            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">

                <div className="text-lg font-bold">
                  Gagal Memuat Data
                </div>

                <p className="mt-2 text-sm">
                  {error}
                </p>

              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {Array.from({
                  length: 6,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
                  >

                    <div className="h-52 animate-pulse rounded-2xl bg-gray-200" />

                    <div className="mt-5 h-5 animate-pulse rounded bg-gray-200" />

                    <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-gray-100" />

                  </div>
                ))}

              </div>
            )}

            {/* EMPTY */}
            {!loading &&
              !error &&
              filtered.length === 0 && (
                <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

                  <h3 className="text-2xl font-black text-gray-800">
                    Data Pakar Tidak
                    Ditemukan
                  </h3>

                  <p className="mx-auto mt-4 max-w-xl text-gray-500">
                    Coba gunakan kata
                    kunci lain atau pastikan
                    data WordPress tersedia
                    dan endpoint API aktif.
                  </p>

                </div>
              )}

            {/* GRID */}
            {!loading &&
              !error &&
              filtered.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                  {filtered.map(
                    (item: PakarItem) => (
                      <PakarCard
                        key={item.id}
                        item={item}
                      />
                    )
                  )}

                </div>
              )}

          </section>

        </div>

      </section>

    </main>
  );
}