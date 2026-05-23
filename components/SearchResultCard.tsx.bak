import Image from "next/image";
import Link from "next/link";

import { Post } from "@/types/post";

/* =========================
   TYPES
========================= */
interface Props {
  post: Post;
}

/* =========================
   CLEAN HTML
========================= */
function stripHtml(
  html: string = ""
) {
  return html.replace(
    /<[^>]*>?/gm,
    ""
  );
}

/* =========================
   COMPONENT
========================= */
export default function SearchResultCard({
  post,
}: Props) {
  const image =
    post?._embedded?.[
      "wp:featuredmedia"
    ]?.[0]?.source_url ||
    "/placeholder.jpg";

  const title =
    post?.title?.rendered ||
    "Tanpa Judul";

  const excerpt = stripHtml(
    post?.excerpt?.rendered || ""
  ).slice(0, 140);

  return (
    <Link
      href={`/news/${post.slug}`}
      className="
        group
        flex
        gap-4
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-4
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:border-green-100
        hover:shadow-lg
      "
    >

      {/* IMAGE */}
      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">

        <Image
          src={image}
          alt={stripHtml(title)}
          fill
          sizes="120px"
          className="
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

      </div>

      {/* CONTENT */}
      <div className="min-w-0 flex-1">

        <h3
          className="
            line-clamp-2
            text-sm
            font-bold
            leading-6
            text-gray-900
            transition-colors
            group-hover:text-green-700
            sm:text-base
          "
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {excerpt}
        </p>

      </div>

    </Link>
  );
}