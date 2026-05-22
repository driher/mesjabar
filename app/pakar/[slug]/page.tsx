import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET DETAIL PAKAR
 */
async function getPakar(id: string) {
  try {

    const res = await fetch(
      `https://mada.akarmusic.com/wp-json/wp/v2/pakar/${id}?_embed`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();

  } catch (error) {

    console.error(error);

    return null;
  }
}

export default async function DetailPakar({
  params,
}: PageProps) {

  /**
   * PARAMS
   */
  const { slug } = await params;

  /**
   * FETCH DATA
   */
  const data = await getPakar(slug);

  /**
   * NOT FOUND
   */
  if (!data) {
    notFound();
  }

  /**
   * CUSTOM FIELDS
   */
  const custom =
    data?.custom_fields || {};

  /**
   * NAMA
   */
  const nama =
    custom?.nama ||
    data?.title?.rendered ||
    "Tanpa Nama";

  /**
   * FOTO CUSTOM (HARUS URL)
   */
  const customFoto =
    typeof custom?.foto === "string" &&
    custom.foto.startsWith("http")
      ? custom.foto
      : null;

  /**
   * FEATURED IMAGE WORDPRESS
   */
  const wpFeatured =
    data?._embedded?.["wp:featuredmedia"]?.[0]
      ?.source_url || null;

  /**
   * AVATAR FALLBACK
   */
  const avatar =
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      nama
    )}&background=15803d&color=ffffff&size=400`;

  /**
   * FOTO FINAL
   */
  const foto =
    customFoto ||
    wpFeatured ||
    avatar;

  return (
    <div className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-6xl mx-auto px-4">

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">

          {/* HEADER */}
          <div className="h-64 bg-gradient-to-r from-green-900 via-green-700 to-emerald-500 relative">

            <div className="absolute inset-0 bg-black/10"></div>

          </div>

          {/* CONTENT */}
          <div className="px-8 pb-10 relative">

            {/* FOTO */}
            <div className="absolute -top-24 left-8">

              <img
                src={foto}
                alt={nama}
                className="w-44 h-44 rounded-full border-[8px] border-white object-cover shadow-2xl bg-white"
              />

            </div>

            {/* INFO */}
            <div className="pt-28">

              {/* BADGE */}
              <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                Pakar MES Jawa Barat
              </span>

              {/* NAMA */}
              <h1
                className="text-4xl font-bold text-gray-900 mt-5"
                dangerouslySetInnerHTML={{
                  __html: nama,
                }}
              />

              {/* BIDANG */}
              <p className="text-xl text-green-700 mt-3 font-medium">
                {custom?.bidang ||
                  "Bidang belum tersedia"}
              </p>

              {/* GRID */}
              <div className="grid lg:grid-cols-3 gap-8 mt-10">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">

                  {/* SPESIALISASI */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">

                    <h2 className="text-2xl font-bold mb-4">
                      Spesialisasi
                    </h2>

                    <p className="text-gray-600 leading-8 whitespace-pre-line">
                      {custom?.spesialisasi ||
                        "Data spesialisasi belum tersedia."}
                    </p>

                  </div>

                  {/* ALAMAT */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">

                    <h2 className="text-2xl font-bold mb-4">
                      Alamat
                    </h2>

                    <p className="text-gray-600 leading-8 whitespace-pre-line">
                      {custom?.alamat ||
                        "Data alamat belum tersedia."}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}
                <div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-5">

                    <h2 className="text-2xl font-bold mb-5">
                      Kontak & Informasi
                    </h2>

                    <div className="space-y-5">

                      {/* EMAIL */}
                      <div>

                        <div className="text-gray-400 text-sm mb-1">
                          Email
                        </div>

                        <div className="font-medium text-gray-800 break-all">
                          {custom?.email || "-"}
                        </div>

                      </div>

                      {/* HP */}
                      <div>

                        <div className="text-gray-400 text-sm mb-1">
                          No HP
                        </div>

                        <div className="font-medium text-gray-800">
                          {custom?.no_hp || "-"}
                        </div>

                      </div>

                      {/* ID */}
                      <div>

                        <div className="text-gray-400 text-sm mb-1">
                          ID Pakar
                        </div>

                        <div className="font-medium text-gray-800">
                          #{data?.id}
                        </div>

                      </div>

                      {/* SLUG */}
                      <div>

                        <div className="text-gray-400 text-sm mb-1">
                          Slug
                        </div>

                        <div className="font-medium text-gray-800">
                          {data?.slug}
                        </div>

                      </div>

                      {/* STATUS */}
                      <div>

                        <div className="text-gray-400 text-sm mb-1">
                          Status
                        </div>

                        <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
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

      </div>

    </div>
  );
}