export async function getPengurusById(id: string) {
  try {
    const res = await fetch(
      `https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/pengurus/${id}?_embed=1`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}