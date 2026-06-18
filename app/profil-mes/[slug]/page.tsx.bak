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
            prose
            prose-lg
            max-w-none
            prose-img:rounded-2xl
            prose-headings:font-bold
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