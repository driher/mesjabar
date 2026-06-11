"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [data, setData] = useState<PakarItem[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     AUTH CHECK (MEMBER ONLY)
  ========================= */

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);
      setAuthLoading(false);
    };

    checkUser();
  }, [router]);

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
          "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/pakar?_embed&per_page=100",
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}`);
        }

        const json = await res.json();

        if (isMounted) {
          setData(Array.isArray(json) ? json : []);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Gagal mengambil data pakar"
          );
          setData([]);
        }
      } finally {
        if (isMounted) setLoading(false);
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
        item?.title?.rendered?.toLowerCase() || "";

      return title.includes(search.toLowerCase());
    });
  }, [data, search]);

  /* =========================
     LOADING AUTH STATE
  ========================= */

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-500">Memeriksa akses member...</p>
      </div>
    );
  }

  if (!user) return null;

  /* =========================
     RENDER
  ========================= */

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8faf8] to-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-r from-green-950 via-green-800 to-emerald-700">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-yellow-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 lg:pt-40">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT */}
            <div>

              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-100 backdrop-blur">
                Direktori Profesional (Member Only)
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Direktori Pakar
                <br />
                MES Jawa Barat
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-green-100 sm:text-lg">
                Akses khusus member untuk
                melihat akademisi,
                praktisi, dan profesional
                ekonomi syariah.
              </p>

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

              <div className="rounded-3xl bg-white/90 p-7 shadow-2xl backdrop-blur">
                <div className="text-4xl font-black text-green-700">
                  {data.length}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Total Pakar
                </div>
              </div>

              <div className="rounded-3xl bg-white/90 p-7 shadow-2xl backdrop-blur">
                <div className="text-4xl font-black text-green-700">
                  100+
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Bidang Keahlian
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="mx-auto max-w-7xl px-4 py-10 lg:py-14">

        <div className="grid gap-8 lg:grid-cols-12">

          {/* SIDEBAR */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <SidebarFilter />
            </div>
          </aside>

          {/* MAIN */}
          <section className="lg:col-span-9">

            {/* TOPBAR */}
            <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center">

              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  Hasil Pencarian
                </h2>
                <p className="text-sm text-gray-500">
                  Direktori pakar ekonomi syariah
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 px-5 py-3 text-sm font-semibold text-green-700">
                {filtered.length} pakar
              </div>

            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
                <p className="font-bold">Gagal Memuat Data</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-60 animate-pulse rounded-3xl bg-gray-200"
                  />
                ))}
              </div>
            )}

            {/* EMPTY */}
            {!loading && !error && filtered.length === 0 && (
              <div className="rounded-3xl border bg-white py-16 text-center">
                <h3 className="text-xl font-bold">
                  Data tidak ditemukan
                </h3>
                <p className="mt-2 text-gray-500">
                  Coba kata kunci lain
                </p>
              </div>
            )}

            {/* GRID */}
            {!loading && !error && filtered.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((item) => (
                  <PakarCard key={item.id} item={item} />
                ))}
              </div>
            )}

          </section>
        </div>

      </section>

    </main>
  );
}