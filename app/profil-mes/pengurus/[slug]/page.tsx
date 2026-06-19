import Image from "next/image";
import { notFound } from "next/navigation";

async function getPengurus(slug: string) {
  try {
    const res = await fetch(
      `https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/pengurus?slug=${slug}&_embed=1`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.[0] || null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const pengurus = await getPengurus(slug);

  if (!pengurus) {
    notFound();
  }

  const image =
    pengurus?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/no-image.png";

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-8">

        <div className="relative h-[400px]">
          <Image
            src={image}
            alt={pengurus?.title?.rendered || "Pengurus"}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-6">
            {pengurus?.title?.rendered}
          </h1>

          <div
            className="prose prose-lg max-w-none text-gray-700
            prose-headings:text-gray-900
            prose-headings:font-bold
            prose-p:leading-8
            prose-a:text-green-700
            prose-img:rounded-2xl
            prose-img:shadow-md
            [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold
            [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold"
            dangerouslySetInnerHTML={{
              __html: pengurus?.content?.rendered || "",
            }}
          />
        </div>

      </div>
    </main>
  );
}