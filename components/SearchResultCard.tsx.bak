import Link from "next/link";
import { Post } from "@/types/post";

interface Props {
  post: Post;
}

export default function SearchResultCard({ post }: Props) {
  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/placeholder.jpg";

  return (
    <Link
      href={`/berita/${post.slug}`}
      className="group flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all"
    >
      <img
        src={image}
        alt={post.title.rendered}
        className="w-28 h-24 object-cover rounded-xl shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3
          className="font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors"
          dangerouslySetInnerHTML={{
            __html: post.title.rendered,
          }}
        />

        <div
          className="text-sm text-gray-500 mt-2 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: post.excerpt.rendered,
          }}
        />
      </div>
    </Link>
  );
}