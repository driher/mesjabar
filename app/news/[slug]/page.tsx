import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const API = "https://mada.akarmusic.com/wp-json/wp/v2";

/* =========================
   ISR NEXT 16
========================= */
export const revalidate = 300;

/* =========================
   FORMAT TANGGAL
========================= */
function formatTanggalIndonesia(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

/* =========================
   CLEAN HTML
========================= */
function stripHtml(html: string = "") {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

/* =========================
   FETCH DETAIL POST
========================= */
async function getPost(slug: string) {
  try {
    const res = await fetch(
      `${API}/posts?slug=${encodeURIComponent(slug)}&_embed`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    return Array.isArray(data) ? data[0] : null;
  } catch (error) {
    console.error("DETAIL POST ERROR:", error);
    return null;
  }
}

/* =========================
   FETCH RELATED POSTS
========================= */
async function getRelatedPosts(currentId: number) {
  try {
    const res = await fetch(
      `${API}/posts?_embed&per_page=5`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return Array.isArray(data)
      ? data.filter((item) => item.id !== currentId)
      : [];
  } catch (error) {
    console.error("RELATED POSTS ERROR:", error);
    return [];
  }
}

/* =========================
   METADATA SEO
========================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Berita Tidak Ditemukan | MES Jabar",
    };
  }

  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/hero.jpg";

  const title = stripHtml(post?.title?.rendered);
  const description = stripHtml(
    post?.excerpt?.rendered || ""
  ).slice(0, 160);

  return {
    title: `${title} | MES Jabar`,
    description,
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/news/${slug}`,
      siteName: "MES Jabar",
      locale: "id_ID",
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* =========================
   PAGE
========================= */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id);

  const featuredMedia =
    post?._embedded?.["wp:featuredmedia"]?.[0];

  const image =
    featuredMedia?.source_url || "/hero.jpg";

  const imageCaption =
    stripHtml(featuredMedia?.caption?.rendered || "") ||
    stripHtml(post?.title?.rendered);

  const title =
    stripHtml(post?.title?.rendered) ||
    "Tanpa Judul";

  const content =
    post?.content?.rendered || "";

  const currentUrl = `https://yourdomain.com/news/${slug}`;

  return (
    <main className="min-h-screen bg-[#f5f7f6]">

      {/* ================= HERO IMAGE ================= */}
      <section className="relative">

        <div className="relative h-[240px] sm:h-[320px] lg:h-[500px] overflow-hidden">

          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        </div>

      </section>

     {/* ================= ARTICLE ================= */}
<article className="relative z-10 mx-auto -mt-10 max-w-4xl rounded-[32px] bg-white px-5 py-7 shadow-xl sm:px-8 lg:px-10">

  {/* TITLE */}
  <h1
    className="text-3xl font-black leading-tight text-gray-900 lg:text-5xl"
    dangerouslySetInnerHTML={{
      __html: post.title.rendered,
    }}
  />

  {/* META */}
  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-500">

    <span>
      {formatTanggalIndonesia(post.date)}
    </span>

    <span>•</span>

    <span>
      MES Jawa Barat
    </span>

  </div>

  {/* SHARE */}
  <div className="mt-6 flex flex-wrap gap-3">

    <a
      href={`https://wa.me/?text=${encodeURIComponent(
        `${title} ${currentUrl}`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
    >
      WhatsApp
    </a>

    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${currentUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
    >
      X
    </a>

    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
    >
      Facebook
    </a>

  </div>

  {/* FEATURE IMAGE */}
  <div className="relative mt-8 overflow-hidden rounded-3xl">

    <Image
      src={image}
      alt={title}
      width={1200}
      height={700}
      priority
      sizes="100vw"
      className="h-auto w-full object-cover"
    />

  </div>

  {/* CAPTION */}
  {imageCaption && (
    <div className="mt-3 text-center text-xs italic text-gray-500">
      Foto: {imageCaption}
    </div>
  )}

  {/* CONTENT */}
  <div
    className="
      prose prose-lg mt-10 max-w-none text-gray-700
      prose-headings:text-gray-900
      prose-headings:font-bold
      prose-p:leading-8
      prose-p:text-gray-700
      prose-a:text-green-700
      prose-img:rounded-2xl
      prose-img:shadow-md
      prose-strong:text-gray-900
      prose-blockquote:border-green-600
      prose-blockquote:text-gray-700
      prose-li:marker:text-green-700
      [&>*]:mb-4
            [&>p]:mb-5

            [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold
            [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold

            [&>ul]:mb-5 [&>ul]:pl-5 [&>ul]:list-disc
            [&>ol]:mb-5 [&>ol]:pl-5 [&>ol]:list-decimal

            [&_img]:rounded-xl
            [&_img]:w-full

            [&>p>a]:text-orange-500 [&>p>a]:underline
    "
    dangerouslySetInnerHTML={{
      __html: content,
    }}
  />

  {/* ================= BACA JUGA ================= */}
  {relatedPosts.length > 0 && (
    <section className="mt-14 border-t border-gray-200 pt-10">

      <div className="mb-6 flex items-center gap-3">

        <div className="h-8 w-1 rounded-full bg-green-700" />

        <h2 className="text-2xl font-black text-gray-900">
          Baca Juga
        </h2>

      </div>

      <div className="space-y-5">

        {relatedPosts.slice(0, 2).map((item: any) => (

          <Link
            key={item.id}
            href={`/news/${item.slug}`}
            className="group block rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-green-200 hover:bg-white hover:shadow-md"
          >

            <h3
              className="text-lg font-bold leading-snug text-gray-900 transition group-hover:text-green-700"
              dangerouslySetInnerHTML={{
                __html:
                  item?.title?.rendered ||
                  "Tanpa Judul",
              }}
            />

            <p className="mt-2 text-sm text-gray-500">
              {formatTanggalIndonesia(item.date)}
            </p>

          </Link>

        ))}

      </div>

    </section>
  )}

</article>

    </main>
  );
}