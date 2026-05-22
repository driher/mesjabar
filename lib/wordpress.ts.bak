const API = "https://mada.akarmusic.com/wp-json/wp/v2";

export async function getPosts() {
  try {
    const res = await fetch(`${API}/posts?_embed&per_page=3`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}