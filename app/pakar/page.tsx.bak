"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Search, Bell } from "lucide-react";

import PakarCard from "../../components/PakarCard";
import SearchBox from "../../components/SearchBox";
import SidebarFilter from "../../components/SidebarFilter";


export default function PakarPage() {

  /**
   * STATE
   */
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /**
   * FETCH DATA
   */
  useEffect(() => {

    async function fetchData() {

      try {

        const res = await fetch(
          "https://mada.akarmusic.com/wp-json/wp/v2/pakar?_embed&per_page=100"
        );

        const json = await res.json();

        setData(json);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    }

    fetchData();

  }, []);

  /**
   * FILTER
   */
  const filtered = data.filter((item) => {

    const nama =
      item?.title?.rendered?.toLowerCase() || "";

    return nama.includes(
      search.toLowerCase()
    );
  });

  return (

    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">

     

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-900 via-green-700 to-emerald-600 pt-40 pb-16">

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>

              <h1 className="text-5xl font-bold text-white leading-tight">
                Direktori Pakar
                <br />
                MES Jawa Barat
              </h1>

              <p className="text-green-100 mt-5 text-lg">
                Temukan pakar, profesional,
                akademisi, dan praktisi terbaik.
              </p>

              <div className="mt-8">

                <SearchBox
                  value={search}
                  onChange={setSearch}
                />

              </div>

            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-5">

              <div className="bg-white rounded-2xl p-6 shadow-sm">

                <div className="text-4xl font-bold text-green-700">
                  {data.length}
                </div>

                <div className="text-gray-500 mt-2">
                  Total Pakar
                </div>

              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">

                <div className="text-4xl font-bold text-green-700">
                  100+
                </div>

                <div className="text-gray-500 mt-2">
                  Bidang Keahlian
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid lg:grid-cols-12 gap-8">

          {/* SIDEBAR */}
          <div className="lg:col-span-3">

            <SidebarFilter />

          </div>

          {/* LIST */}
          <div className="lg:col-span-9">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Hasil Pencarian
              </h2>

              <div className="text-gray-500">
                {filtered.length} pakar ditemukan
              </div>

            </div>

            {/* LOADING */}
            {loading && (

              <div className="text-gray-500">
                Loading data pakar...
              </div>

            )}

            {/* EMPTY */}
            {!loading &&
              filtered.length === 0 && (

                <div className="bg-white rounded-2xl p-10 text-center border">

                  <h3 className="text-2xl font-bold text-gray-700">
                    Data Pakar Belum Ada
                  </h3>

                  <p className="text-gray-500 mt-3">
                    Pastikan endpoint WordPress
                    sudah berisi data pakar.
                  </p>

                </div>

              )}

            {/* GRID */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filtered.map((item) => (

                <PakarCard
                  key={item.id}
                  item={item}
                />

              ))}

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}