export async function getDepartemenById(id: string) {
  try {
    const res = await fetch(
      `https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/departemen/${id}?_embed=1`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}