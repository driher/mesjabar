import Link from "next/link";

interface PakarCardProps {
  item: any;
}

export default function PakarCard({
  item,
}: PakarCardProps) {

  /**
   * NAMA
   */
  const nama =
    item?.title?.rendered ||
    "Tanpa Nama";

  /**
   * SLUG
   */
  const slug =
    item?.slug || item?.id;

  /**
   * FOTO WORDPRESS
   */
  const featuredImage =
    item?._embedded?.["wp:featuredmedia"]?.[0]
      ?.source_url;

  /**
   * INISIAL
   */
  const initials = nama
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">

      {/* HEADER */}
      <div className="h-28 bg-gradient-to-r from-green-800 via-green-700 to-emerald-500"></div>

      {/* CONTENT */}
      <div className="px-6 pb-6 relative">

        {/* FOTO / AVATAR */}
        <div className="flex justify-center">

          {featuredImage ? (

            <img
              src={featuredImage}
              alt={nama}
              className="w-28 h-28 rounded-full border-[6px] border-white object-cover shadow-lg absolute -top-14 bg-white"
            />

          ) : (

            <div className="w-28 h-28 rounded-full border-[6px] border-white bg-green-700 text-white flex items-center justify-center text-4xl font-bold shadow-lg absolute -top-14">
              {initials}
            </div>

          )}

        </div>

        {/* INFO */}
        <div className="pt-20 text-center">

          <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-xs font-medium text-green-700">
            Pakar MES
          </span>

          <h3
            className="text-xl font-bold mt-4 text-gray-900"
            dangerouslySetInnerHTML={{
              __html: nama,
            }}
          />

          <p className="text-sm text-gray-500 mt-3 leading-6">
            Direktori pakar, profesional,
            akademisi, dan praktisi
            MES Jawa Barat.
          </p>

          {/* BUTTON */}
          <Link
            href={`/pakar/${slug}`}
            className="mt-6 inline-flex items-center justify-center w-full rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Lihat Profil
          </Link>

        </div>

      </div>

    </div>
  );
}