import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { DemoBanner, Footer, Header, MobileBar } from "./components/SiteChrome";
import { site } from "./lib/site";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});
const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const url = site.canonical;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${site.name} | ${site.seoTitleSuffix}`,
    template: `%s | ${site.name}`,
  },
  description: site.seoDescription,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: site.name,
    description: site.seoDescription,
    url,
    siteName: site.legalName,
    type: "website",
    locale: "en_US",
    images: [{ url: "/logo.png", alt: `${site.legalName} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.seoDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PetGroomer",
  name: site.legalName,
  description: site.seoDescription,
  url,
  telephone: site.phone,
  email: site.email,
  image: `${url}/logo.png`,
  sameAs: [site.instagramUrl],
  areaServed: site.areaServed,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postal,
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <DemoBanner />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
