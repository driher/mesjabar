export async function GET() {

  try {

    const res = await fetch(
      "https://mada.akarmusic.com/wp-json/wp/v2/agenda?_embed",
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    return Response.json(data);

  } catch (error) {

    return Response.json(
      {
        error: "Gagal fetch agenda",
      },
      {
        status: 500,
      }
    );
  }
}