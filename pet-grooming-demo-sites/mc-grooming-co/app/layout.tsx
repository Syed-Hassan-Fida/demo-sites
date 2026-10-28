import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { DemoBanner, Footer, Header, MobileBar, RetailNotice } from "./components/SiteChrome";
import { site } from "./lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Outfit({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"] });

const url = site.canonical;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${site.name} | ${site.seoTitleSuffix}`,
    template: `%s | ${site.name}`,
  },
  description: site.seoDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.owner}`,
    description: site.seoDescription,
    url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.owner}`,
    description: site.seoDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PetGroomer",
  name: site.name,
  alternateName: [site.aka, site.owner],
  description: site.seoDescription,
  url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postal,
    addressCountry: "US",
  },
  areaServed: site.areaServed,
  openingHours: "Mo-Fr 08:00-16:30",
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
        <RetailNotice />
        <main>{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
