"use client";

import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";

import SearchResultCard from "./SearchResultCard";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );

        const data = await response.json();

        setResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

        <input
          type="text"
          placeholder="Cari berita ekonomi syariah..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-emerald-600" />
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-6 grid gap-4">
          {results.map((post: any) => (
            <SearchResultCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Tidak ada hasil ditemukan.
        </div>
      )}
    </div>
  );
}