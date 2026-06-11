// app/profil-mes/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil MES Jawa Barat",
  description: "Profil Masyarakat Ekonomi Syariah Jawa Barat",
};

async function getProfile() {
  const res = await fetch(
    "https://cms.ekonomisyariahjabar.id/wp-json/wp/v2/pages?slug=profil-masyarakat-ekonomi-syariah-mes-jawa-barat",
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Gagal mengambil data profil");
  }

  return res.json();
}

export default async function ProfilMesPage() {
  const data = await getProfile();
  const page = data?.[0];

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <article className="bg-white rounded-2xl shadow-sm p-8">
        <h1
          className="text-3xl font-bold mb-6"
          dangerouslySetInnerHTML={{
            __html: page?.title?.rendered || "Profil MES Jawa Barat",
          }}
        />

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: page?.content?.rendered || "",
          }}
        />
      </article>
    </main>
  );
}