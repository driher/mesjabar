const API =
  process.env.NEXT_PUBLIC_WORDPRESS_API ||
  "https://mcms.ekonomisyariahjabar.id/wp-json/wp/v2";

/**
 * Helper Fetch
 */
async function fetchAPI(
  endpoint: string,
  options?: RequestInit
) {
  try {
    const res = await fetch(
      `${API}${endpoint}`,
      options
    );

    if (!res.ok) {
      throw new Error(
        `Fetch error: ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("WORDPRESS API ERROR:", error);
    return null;
  }
}

/**
 * Latest Posts
 */
export async function getPosts(
  limit = 6
) {
  const data = await fetchAPI(
    `/posts?_embed&per_page=${limit}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  return data || [];
}

/**
 * Detail Post by Slug
 */
export async function getPostBySlug(
  slug: string
) {
  const data = await fetchAPI(
    `/posts?slug=${slug}&_embed`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  return data?.[0] || null;
}

/**
 * Search Posts
 */
export async function searchPosts(
  keyword: string
) {
  if (!keyword) return [];

  const data = await fetchAPI(
    `/posts?search=${encodeURIComponent(
      keyword
    )}&_embed&per_page=20`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  return data || [];
}

/**
 * Direktori Pakar
 */
export async function getPakar() {
  const data = await fetchAPI(
    `/pakar?per_page=100`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  return data || [];
}

/**
 * Detail Pakar
 */
export async function getPakarBySlug(
  slug: string
) {
  const data = await fetchAPI(
    `/pakar?slug=${slug}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  return data?.[0] || null;
}