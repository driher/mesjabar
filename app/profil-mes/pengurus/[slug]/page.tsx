import Image from "next/image";
import { notFound } from "next/navigation";

async function getPengurus(slug: string) {
  const res = await fetch(
    `https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/pengurus?slug=${slug}&_embed=1`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data?.[0] || null;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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
            alt={pengurus.title.rendered}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-6">
            {pengurus.title.rendered}
          </h1>

          <div
            className=" prose prose-lg mt-10 max-w-none text-gray-700
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

            [&>p>a]:text-orange-500 [&>p>a]:underline"
            dangerouslySetInnerHTML={{
              __html: pengurus.content.rendered,
            }}
          />
        </div>

      </div>
    </main>
  );
}