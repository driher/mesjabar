import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ekonomisyariahjabar.id"),

  title: {
    default: "MES Jawa Barat",
    template: "%s | MES Jawa Barat",
  },

  description: "Masyarakat Ekonomi Syariah Jawa Barat",

  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "MES Jawa Barat",
    title: "MES Jawa Barat",
    description: "Masyarakat Ekonomi Syariah Jawa Barat",
    images: ["/og-image.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "MES Jawa Barat",
    description: "Masyarakat Ekonomi Syariah Jawa Barat",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}