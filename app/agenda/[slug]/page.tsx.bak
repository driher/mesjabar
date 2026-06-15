import { notFound } from "next/navigation";

async function getAgenda(slug: string) {
  const res = await fetch(
    `https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/agenda?slug=${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();

  return data?.[0] || null;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const agenda = await getAgenda(slug);

  if (!agenda) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">

      <div className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-8 text-white">

        <h1
          className="text-3xl font-black"
          dangerouslySetInnerHTML={{
            __html: agenda.title.rendered,
          }}
        />

        <div className="mt-4 flex flex-wrap gap-4 text-sm">

          <span>
            📅 {agenda?.acf?.tanggal || "-"}
          </span>

          <span>
            🕒 {agenda?.acf?.jam || "-"}
          </span>

          <span>
            📍 {agenda?.acf?.lokasi || "-"}
          </span>

        </div>

      </div>

      <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

        {agenda?.acf?.narasumber && (
          <div className="mb-6">
            <h3 className="mb-2 font-bold">
              Narasumber
            </h3>

            <p>{agenda.acf.narasumber}</p>
          </div>
        )}

        {agenda?.acf?.kontak && (
          <div className="mb-6">
            <h3 className="mb-2 font-bold">
              Kontak
            </h3>

            <p>{agenda.acf.kontak}</p>
          </div>
        )}

        {agenda?.content?.rendered && (
          <article
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: agenda.content.rendered,
            }}
          />
        )}

      </div>

    </main>
  );
}