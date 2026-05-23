"use client";

import { useEffect, useState } from "react";

import SearchBox from "@/components/SearchBox";
import SearchResultCard from "@/components/SearchResultCard";

const API = "https://mada.akarmusic.com/wp-json/wp/v2";

export default function SearchPage() {
  const [search, setSearch] = useState("");

  const [posts, setPosts] = useState<any[]>([]);
  const [pakar, setPakar] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    async function fetchSearch() {
      if (!search.trim()) {
        setPosts([]);
        setPakar([]);
        return;
      }

      try {
        setLoading(true);

        /* POSTS */
        const postRes = await fetch(
          `${API}/posts?_embed&search=${encodeURIComponent(search)}&per_page=10`,
          {
            cache: "no-store",
          }
        );

        const postData = await postRes.json();

        /* PAKAR */
        const pakarRes = await fetch(
          `${API}/pakar?_embed&search=${encodeURIComponent(search)}&per_page=10`,
          {
            cache: "no-store",
          }
        );

        const pakarData = await pakarRes.json();

        setPosts(Array.isArray(postData) ? postData : []);
        setPakar(Array.isArray(pakarData) ? pakarData : []);
      } catch (error) {
        console.error(error);

        setPosts([]);
        setPakar([]);
      } finally {
        setLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      fetchSearch();
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="max-w-5xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-3xl font-black text-gray-900">
            Pencarian MES Jabar
          </h1>

          <p className="mt-2 text-gray-500">
            Cari berita, pakar, ekonomi syariah,
            UMKM, halal, fintech, dan lainnya.
          </p>

        </div>

        {/* SEARCH */}
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Cari berita, pakar, artikel..."
        />

        {/* LOADING */}
        {loading && (
          <div className="mt-6 text-sm text-gray-500">
            Mencari data...
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          search &&
          posts.length === 0 &&
          pakar.length === 0 && (
            <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">

              <h3 className="text-xl font-bold text-gray-700">
                Data tidak ditemukan
              </h3>

              <p className="mt-2 text-gray-500">
                Coba gunakan kata kunci lain.
              </p>

            </div>
          )}

        {/* POSTS */}
        {posts.length > 0 && (
          <section className="mt-10">

            <h2 className="mb-5 text-2xl font-bold text-gray-900">
              Berita & Artikel
            </h2>

            <div className="space-y-4">

              {posts.map((post) => (
                <SearchResultCard
                  key={post.id}
                  post={post}
                />
              ))}

            </div>

          </section>
        )}

        {/* PAKAR */}
        {pakar.length > 0 && (
          <section className="mt-12">

            <h2 className="mb-5 text-2xl font-bold text-gray-900">
              Direktori Pakar
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              {pakar.map((item) => (

                <a
                  key={item.id}
                  href={`/pakar/${item.slug}`}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <h3
                    className="font-bold text-gray-900"
                    dangerouslySetInnerHTML={{
                      __html:
                        item?.title?.rendered ||
                        "Tanpa Nama",
                    }}
                  />

                </a>

              ))}

            </div>

          </section>
        )}

      </section>

    </main>
  );
}