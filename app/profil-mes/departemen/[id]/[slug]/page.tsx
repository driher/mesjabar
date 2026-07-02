import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getDepartemenById } from "@/lib/departemen";

type PageProps = {
  params: Promise<{
    id: string;
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id, slug } = await params;

  const data = await getDepartemenById(id);

  if (!data) {
    notFound();
  }

  const correctSlug = data.slug;

  if (correctSlug && slug !== correctSlug) {
    redirect(`/profil-mes/departemen/${id}/${correctSlug}`);
  }

  const image =
    data?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    data?.featured_image_url ||
    "/no-image.png";

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Foto */}
        <div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border bg-gray-100">
            <Image
              src={image}
              alt={data.title?.rendered || "Departemen"}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 33vw"
              priority
            />
          </div>
        </div>

        {/* Konten */}
        <div className="md:col-span-2">
          <p className="text-green-600 font-semibold">
            {data.acf?.kategori}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {data.title?.rendered}
          </h1>

          {data.acf?.jabatan && (
            <div className="mt-4 inline-flex rounded-full bg-green-100 px-4 py-2 text-green-700 font-medium">
              {data.acf.jabatan}
            </div>
          )}

          {data.content?.rendered && (
            <div
              className="prose prose-lg max-w-none mt-8"
              dangerouslySetInnerHTML={{
                __html: data.content.rendered,
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}