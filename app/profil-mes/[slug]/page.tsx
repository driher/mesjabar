import { notFound } from "next/navigation";
import Image from "next/image";

const API =
  "https://cms.ekonomisyariahjabar.id";

async function getPage(slug: string) {
  try {
    const res = await fetch(
      `${API}/?rest_route=/wp/v2/pages&slug=${slug}&_embed`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    return data?.[0] || null;
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props) {
  const { slug } = await params;

  const page = await getPage(slug);

  return {
    title:
      page?.title?.rendered ||
      "Profil MES",
    description:
      page?.excerpt?.rendered
        ?.replace(/<[^>]+>/g, "")
        ?.slice(0, 160) ||
      "Profil MES Jawa Barat",
  };
}

export default async function ProfilMesPage({
  params,
}: Props) {
  const { slug } = await params;

  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  const featuredImage =
    page?._embedded?.[
      "wp:featuredmedia"
    ]?.[0]?.source_url;

  return (
    <main className="bg-white">

      <div className="mx-auto max-w-5xl px-4 py-10">

        <h1 className="mb-8 text-4xl font-black">
          {page.title.rendered}
        </h1>

        {featuredImage && (
          <div className="mb-8 overflow-hidden rounded-3xl">

            <Image
              src={featuredImage}
              alt={page.title.rendered}
              width={1200}
              height={700}
              unoptimized
              className="w-full object-cover"
            />

          </div>
        )}

        <article
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
            __html:
              page.content.rendered,
          }}
        />

      </div>

    </main>
  );
}