import Image from "next/image";
import { notFound } from "next/navigation";

async function getProgram(slug: string) {
  try {
    const res = await fetch(
      `https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/program?slug=${slug}&_embed=1`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data?.[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const program = await getProgram(slug);

  if (!program) {
    return {
      title: "Program Tidak Ditemukan",
    };
  }

  const image =
    program?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title: program.title?.rendered,
    description:
      program.content?.rendered
        ?.replace(/<[^>]*>/g, "")
        ?.substring(0, 160) || "",

    openGraph: {
      title: program.title?.rendered,
      description:
        program.content?.rendered
          ?.replace(/<[^>]*>/g, "")
          ?.substring(0, 160) || "",
      images: image ? [image] : [],
    },
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const program = await getProgram(slug);

  if (!program) {
    notFound();
  }

  const image =
    program?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="mb-8">

        <span className="inline-flex rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
          Program MES Jawa Barat
        </span>

        <h1
          className="mt-4 text-3xl md:text-5xl font-black leading-tight text-slate-900"
          dangerouslySetInnerHTML={{
            __html: program.title?.rendered,
          }}
        />

      </div>

      {/* FEATURED IMAGE */}
      {image && (
        <div className="relative mb-10 h-[250px] md:h-[500px] overflow-hidden rounded-3xl">

          <Image
            src={image}
            alt={program.title?.rendered}
            fill
            priority
            className="object-cover"
          />

        </div>
      )}

      {/* CONTENT */}
      <article
        className="
          prose
          prose-lg
          max-w-none

          prose-headings:font-bold
          prose-headings:text-slate-900

          prose-p:text-slate-700
          prose-p:leading-8

          prose-a:text-green-700

          prose-img:rounded-xl
          prose-img:shadow-md

          prose-blockquote:border-green-600
          prose-blockquote:text-slate-600
        "
        dangerouslySetInnerHTML={{
          __html: program.content?.rendered || "",
        }}
      />

    </main>
  );
}