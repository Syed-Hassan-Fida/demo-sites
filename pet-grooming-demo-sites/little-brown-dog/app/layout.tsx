import type { Metadata } from "next";
import { Quattrocento, Quattrocento_Sans } from "next/font/google";
import { DemoBanner, Footer, Header, MobileBar } from "./components/SiteChrome";
import { site } from "./lib/site";
import "./globals.css";

const display = Quattrocento({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
});
const body = Quattrocento_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
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
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    title: site.name,
    description: site.seoDescription,
    url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/logo.png", alt: `${site.name} wordmark` }],
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
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postal,
    addressCountry: "US",
  },
  areaServed: "Denver Lower Highland / Navajo Art District",
  sameAs: [
    "https://instagram.com/lil_brn_dog",
    "https://www.facebook.com/littlebrowndogpetgroomingstudio",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <DemoBanner />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
