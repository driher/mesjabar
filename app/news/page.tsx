import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 300;

const API = "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2";

/* =========================================
   TYPE
========================================= */
type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
};

/* =========================================
   SEO METADATA
========================================= */
export const metadata: Metadata = {
  title: "MES Jabar - Ekonomi Syariah Jawa Barat",
  description:
    "Portal resmi Masyarakat Ekonomi Syariah Jawa Barat. Berita ekonomi syariah, halal, UMKM, fintech syariah, dan kegiatan MES Jabar.",
  keywords: [
    "MES Jabar",
    "Ekonomi Syariah",
    "Berita Syariah",
    "UMKM Halal",
    "Fintech Syariah",
  ],
  openGraph: {
    title: "MES Jabar - Ekonomi Syariah Jawa Barat",
    description: "Portal resmi MES Jawa Barat.",
    images: ["/hero.jpg"],
    type: "website",
  },
};

/* =========================================
   FETCH POSTS
========================================= */
async function getPosts(): Promise<any[]> {
  try {
    const res = await fetch(
      `${API}/posts?_embed&categories=4&per_page=20&orderby=date&order=desc`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch {
    return [];
  }
}

/* =========================================
   FORMAT POST
========================================= */
function formatPost(item: any): Post {
  const cleanExcerpt =
    item?.excerpt?.rendered
      ?.replace(/<[^>]*>?/gm, "")
      ?.replace(/&nbsp;/g, " ")
      ?.trim()
      ?.slice(0, 140) || "";

  return {
    id: item?.id ?? 0,
    slug: item?.slug ?? "#",
    title: item?.title?.rendered ?? "Tanpa Judul",
    excerpt: cleanExcerpt,
    image:
      item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      "/hero.jpg",
    date: item?.date
      ? new Date(item.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "",
    category:
      item?._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "BERITA",
  };
}

/* =========================================
   PAGE
========================================= */
export default async function HomePage() {
  const rawPosts = await getPosts();

  const posts: Post[] = rawPosts.map(formatPost);

  const heroNews: Post | undefined = posts[0];
  const miniNews: Post[] = posts.slice(1, 5);
  const latestNews: Post[] = posts.slice(5, 8);
  const articles: Post[] = posts.slice(0, 5);

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <div className="mx-auto max-w-7xl px-4 py-5 lg:px-6">

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* ================= HERO ================= */}
          <section className="lg:col-span-8">

            {heroNews && (
              <Link
                href={`/news/${heroNews.slug}`}
                className="group relative block overflow-hidden rounded-3xl"
              >
                <Image
                  src={heroNews.image}
                  alt={heroNews.title}
                  width={1200}
                  height={700}
                  priority
                  unoptimized
                  className="h-[260px] w-full object-cover transition group-hover:scale-105 sm:h-[340px] lg:h-[460px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-0 p-5 sm:p-7">
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-[11px] font-semibold uppercase text-white">
                    {heroNews.category}
                  </span>

                  <h1 className="mt-4 text-2xl font-black text-white sm:text-3xl lg:text-5xl">
                    {heroNews.title}
                  </h1>

                  <p className="mt-3 text-xs text-gray-200">
                    {heroNews.date}
                  </p>
                </div>
              </Link>
            )}

            {/* ================= MINI NEWS ================= */}
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">

              {miniNews.map((item: Post) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={260}
                    unoptimized
                    className="h-28 w-full object-cover transition group-hover:scale-105"
                  />

                  <div className="p-3">
                    <h3 className="line-clamp-3 text-sm font-bold text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}

            </div>

            {/* ================= GRID NEWS ================= */}
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

              {latestNews.map((item: Post) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={350}
                    unoptimized
                    className="h-52 w-full object-cover transition group-hover:scale-105"
                  />

                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase text-orange-500">
                      {item.category}
                    </span>

                    <h2 className="mt-2 text-lg font-bold">
                      {item.title}
                    </h2>
                  </div>
                </Link>
              ))}

            </div>

            {/* ================= ARTICLES ================= */}
            <div className="mt-10 space-y-5">

              {articles.map((item: Post) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm transition hover:-translate-y-1 sm:flex-row"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={320}
                    height={220}
                    unoptimized
                    className="h-52 w-full object-cover sm:h-36 sm:w-52"
                  />

                  <div className="flex-1">
                    <span className="text-xs font-semibold uppercase text-orange-500">
                      {item.category}
                    </span>

                    <h2 className="mt-2 text-lg font-black">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm text-gray-600">
                      {item.excerpt}
                    </p>

                    <p className="mt-4 text-xs text-gray-400">
                      {item.date}
                    </p>
                  </div>
                </Link>
              ))}

            </div>

          </section>

          {/* ================= SIDEBAR ================= */}
          <aside className="space-y-6 lg:col-span-4">

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <h3 className="mb-5 text-xl font-black">
                Trending News
              </h3>

              <div className="space-y-5">

                {posts.slice(0, 5).map((item: Post, i: number) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="flex gap-4 border-b pb-5 last:border-none"
                  >
                    <span className="text-3xl font-black text-gray-200">
                      0{i + 1}
                    </span>

                    <div>
                      <h4 className="text-sm font-bold">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs text-gray-400">
                        {item.date}
                      </p>
                    </div>
                  </Link>
                ))}

              </div>
            </div>

            {/* FEATURE */}
            {posts[2] && (
              <Link
                href={`/news/${posts[2].slug}`}
                className="block overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <Image
                  src={posts[2].image}
                  alt={posts[2].title}
                  width={800}
                  height={500}
                  unoptimized
                  className="h-64 w-full object-cover transition group-hover:scale-105"
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold">
                    {posts[2].title}
                  </h3>
                </div>
              </Link>
            )}

          </aside>

        </div>
      </div>
    </main>
  );
}