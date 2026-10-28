import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { DemoBanner, Footer, Header, MobileBar } from "./components/SiteChrome";
import { site } from "./lib/site";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});
const body = DM_Sans({
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
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: "/icon.png",
  },
  openGraph: {
    title: site.name,
    description: site.seoDescription,
    url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/logo.png", alt: `${site.name} logo` }],
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
  name: site.name,
  description: site.seoDescription,
  url,
  telephone: site.phone,
  email: site.email,
  image: `${url}/logo.png`,
  sameAs: [site.instagramUrl, site.facebook],
  areaServed: site.areaServed,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postal,
    addressCountry: "US",
  },
  department: site.locations.map((l) => ({
    "@type": "PetGroomer",
    name: `${site.name} — ${l.name}`,
    telephone: l.phoneTel,
    email: l.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: l.address,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "US",
    },
  })),
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
