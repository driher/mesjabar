"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Post = {
  title: string;
  date: string;
  image: string;
  slug: string;
};

export default function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://mada.akarmusic.com/wp-json/wp/v2/posts?_embed&per_page=5"
        );

        const data = await res.json();

        const formatted = data.map((item: any) => ({
          title: item.title?.rendered || "",
          date: new Date(item.date).toLocaleDateString("id-ID"),
          image:
            item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/hero.jpg",
          slug: item.slug,
        }));

        setPosts(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section>

      <h2 className="text-2xl font-bold mb-4">Berita MES</h2>

      {loading && <p>Loading...</p>}

      <div className="space-y-4">
        {posts.map((item) => (
          <Link
            key={item.slug}
            href={`/news/${item.slug}`}
            className="flex gap-4 p-3 bg-white rounded-xl shadow-sm"
          >

            <div className="relative h-20 w-28 overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3
                className="font-semibold text-sm line-clamp-2"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <p className="text-xs text-gray-500 mt-1">
                {item.date}
              </p>
            </div>

          </Link>
        ))}
      </div>

    </section>
  );
}