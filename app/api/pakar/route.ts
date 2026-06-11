export async function GET() {
  try {
    const res = await fetch(
      "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/pakar?per_page=100&_embed",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch" },
        { status: 500 }
      );
    }

    const data = await res.json();

    const clean = (Array.isArray(data) ? data : []).map((item: any) => ({
      id: item.id,
      slug: item.slug,
      name: item.title?.rendered || "Tanpa Nama",

      // tetap pakai slug untuk routing Next.js
      link: `/pakar/${item.slug}`,

      bidang: item?.custom_fields?.bidang || "",

      foto:
        item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        null,
    }));

    return Response.json(clean);
  } catch (e) {
    return Response.json(
      { error: "failed to fetch pakar" },
      { status: 500 }
    );
  }
}