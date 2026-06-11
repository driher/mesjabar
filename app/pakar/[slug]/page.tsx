import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * FETCH BY SLUG
 */
async function getPakarBySlug(slug: string) {
  const res = await fetch(
    `https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/pakar?slug=${slug}&_embed`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();

  return data?.[0] || null;
}

export default async function DetailPakar({ params }: PageProps) {
  const { slug } = await params; // 🔥 FIX UTAMA

  const data = await getPakarBySlug(slug);

  if (!data) {
    notFound();
  }

  const custom = data?.custom_fields || {};

  const nama =
    custom?.nama ||
    data?.title?.rendered ||
    "Tanpa Nama";

  const wpImage =
    data?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    nama
  )}&background=15803d&color=fff&size=400`;

  const foto =
    typeof custom?.foto === "string" && custom.foto.startsWith("http")
      ? custom.foto
      : wpImage || avatar;

 return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border">

          {/* HEADER */}
          <div className="h-64 bg-gradient-to-r from-green-900 via-green-700 to-emerald-500" />

          {/* CONTENT */}
          <div className="px-8 pb-10 relative">

            {/* FOTO */}
            <div className="absolute -top-24 left-8">
              <img
                src={foto}
                alt={nama}
                className="w-44 h-44 rounded-full border-8 border-white object-cover shadow-xl"
              />
            </div>

            {/* INFO */}
            <div className="pt-28">

              <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                Pakar MES Jawa Barat
              </span>

              <h1
                className="text-4xl font-bold mt-5 text-gray-900"
                dangerouslySetInnerHTML={{ __html: nama }}
              />

              <p className="text-xl text-green-700 mt-3 font-medium">
                {custom?.bidang || "Bidang belum tersedia"}
              </p>

              <div className="grid lg:grid-cols-3 gap-8 mt-10">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">

                  <div className="bg-gray-50 rounded-2xl p-6 border">
                    <h2 className="text-2xl font-bold mb-4">
                      Spesialisasi
                    </h2>
                    <p className="text-gray-600 whitespace-pre-line">
                      {custom?.spesialisasi || "-"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border">
                    <h2 className="text-2xl font-bold mb-4">
                      Alamat
                    </h2>
                    <p className="text-gray-600 whitespace-pre-line">
                      {custom?.alamat || "-"}
                    </p>
                  </div>

                </div>

                {/* RIGHT */}
                <div className="bg-gray-50 rounded-2xl p-6 border sticky top-5">

                  <h2 className="text-2xl font-bold mb-5">
                    Kontak & Informasi
                  </h2>

                  <div className="space-y-3 text-gray-700">

                    <p><b>Email:</b> {custom?.email || "-"}</p>
                    <p><b>No HP:</b> {custom?.no_hp || "-"}</p>
                    <p><b>ID:</b> #{data?.id}</p>
                    <p><b>Slug:</b> {data?.slug}</p>

                    <div className="mt-4 inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      Aktif
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}