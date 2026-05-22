import Image from "next/image";
import Link from "next/link";

const API = "https://mada.akarmusic.com/wp-json/wp/v2";

/* =========================
   FETCH POSTS (STABIL)
========================= */
async function getPosts() {
  const res = await fetch(`${API}/posts?_embed&per_page=10`, {
    next: { revalidate: 60 }, // 🔥 FIX: stabilkan SSR/CSR
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil berita");
  }

  return res.json();
}

/* =========================
   FORMAT DATA
========================= */
function formatPost(item: any) {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title?.rendered || "",
    excerpt:
      item.excerpt?.rendered?.replace(/<[^>]+>/g, "")?.slice(0, 120) || "",
    image:
      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "/hero.jpg",
    date: new Date(item.date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    category:
      item._embedded?.["wp:term"]?.[0]?.[0]?.name || "BERITA",
  };
}

/* =========================
   PAGE
========================= */
export default async function HomePage() {
  const rawPosts = await getPosts();
  const posts = rawPosts.map(formatPost);

  const heroNews = posts[0];
  const miniNews = posts.slice(1, 6);
  const latestNews = posts.slice(6, 9);
  const articles = posts.slice(0, 5);

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <div className="mx-auto max-w-7xl px-4 py-6">

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* ================= LEFT ================= */}
          <section className="lg:col-span-8">

            {/* HERO FIXED */}
            {heroNews && (
              <Link
                href={`/news/${heroNews.slug}`}
                className="relative block overflow-hidden rounded-2xl h-[260px] sm:h-[340px] lg:h-[420px]"
              >
                <Image
                  src={heroNews.image}
                  alt={heroNews.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-0 p-4 sm:p-6">
                  <span className="rounded bg-orange-500 px-2 py-1 text-[10px] font-semibold text-white">
                    {heroNews.category}
                  </span>

                  <h1
                    className="mt-3 text-xl font-bold text-white sm:text-2xl lg:text-3xl"
                    dangerouslySetInnerHTML={{ __html: heroNews.title }}
                  />

                  <p className="mt-2 text-xs text-gray-200">
                    {heroNews.date}
                  </p>
                </div>
              </Link>
            )}

            {/* MINI NEWS FIXED */}
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5 items-stretch">
              {miniNews.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="h-full overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={250}
                    sizes="20vw"
                    className="h-24 w-full object-cover"
                  />

                  <div className="p-2">
                    <h3
                      className="text-[12px] font-semibold line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* GRID NEWS FIXED */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 items-stretch">
              {latestNews.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="h-full overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={350}
                    sizes="33vw"
                    className="h-44 w-full object-cover"
                  />

                  <div className="p-4">
                    <span className="text-[11px] font-semibold text-orange-500">
                      {item.category}
                    </span>

                    <h3
                      className="mt-2 text-sm font-bold line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* ARTICLE LIST FIXED */}
            <div className="mt-10 space-y-5">
              {articles.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md h-full"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={180}
                    sizes="(max-width:768px) 100vw, 300px"
                    className="h-28 w-44 rounded-xl object-cover flex-shrink-0"
                  />

                  <div className="flex-1">
                    <span className="text-[11px] font-semibold text-orange-500">
                      {item.category}
                    </span>

                    <h2
                      className="mt-1 text-base font-bold"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />

                    <p className="mt-2 text-sm text-gray-600">
                      {item.excerpt}
                    </p>

                    <p className="mt-3 text-xs text-gray-400">
                      {item.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </section>

          {/* ================= SIDEBAR ================= */}
          <aside className="space-y-6 lg:col-span-4">

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Trending</h3>

              <div className="space-y-4">
                {posts.slice(0, 5).map((item: any, i: number) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="flex items-start gap-4 border-b pb-4 last:border-none"
                  >
                    <span className="text-2xl font-bold text-gray-300">
                      0{i + 1}
                    </span>

                    <div>
                      <p
                        className="text-sm font-semibold line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />

                      <p className="mt-1 text-[11px] text-gray-400">
                        {item.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}