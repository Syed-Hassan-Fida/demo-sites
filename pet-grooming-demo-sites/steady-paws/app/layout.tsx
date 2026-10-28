import type { Metadata } from "next";
import { Spectral, Mulish } from "next/font/google";
import { DemoBanner, Footer, Header, MobileBar } from "./components/SiteChrome";
import { site } from "./lib/site";
import "./globals.css";

const display = Spectral({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});
const body = Mulish({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
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
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: site.name,
    description: site.seoDescription,
    url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-logo.png", width: 1200, height: 849, alt: `${site.name} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.seoDescription,
    images: ["/og-logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PetGroomer",
  name: site.name,
  alternateName: site.legalName,
  description: site.seoDescription,
  url,
  telephone: site.phone,
  email: site.email,
  image: `${url}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postal,
    addressCountry: "US",
  },
  areaServed: site.city,
  sameAs: [site.instagramUrl, site.facebook],
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
        <main>{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
