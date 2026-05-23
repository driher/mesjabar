import SearchBox from "@/components/SearchBox";

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            Pencarian Konten MES Jabar
          </h1>

          <p className="text-gray-500 mt-2">
            Cari berita, ekonomi syariah, UMKM, halal, fintech,
            dan artikel terbaru.
          </p>
        </div>

        <SearchBox />
      </section>
    </main>
  );
}