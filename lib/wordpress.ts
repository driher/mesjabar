const API = "https://mada.akarmusic.com/wp-json/wp/v2";

/**
 * Latest Posts
 */
export async function getPosts() {
  try {
    const res = await fetch(
      `${API}/posts?_embed&per_page=3`,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("GET POSTS ERROR:", error);
    return [];
  }
}

/**
 * Direktori Pakar
 */
export async function getPakar() {
  try {
    const res = await fetch(
      `${API}/pakar?per_page=100`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("GET PAKAR ERROR:", error);
    return [];
  }
}

/**
 * Detail Pakar by Slug
 */
export async function getPakarBySlug(
  slug: string
) {
  try {
    const res = await fetch(
      `${API}/pakar?slug=${slug}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data[0] || null;
  } catch (error) {
    console.error(
      "GET DETAIL PAKAR ERROR:",
      error
    );

    return null;
  }
}