export async function GET() {
  try {
    const res = await fetch(
      "https://mada.akarmusic.com/wp-json/wp/v2/pakar?per_page=100",
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await res.json();

    const clean = data.map((item: any) => ({
      id: item.id,
      name: item.title?.rendered,
      link: item.link,
      slug: item.slug,
    }));

    return Response.json(clean);
  } catch (e) {
    return Response.json({ error: "failed" }, { status: 500 });
  }
}