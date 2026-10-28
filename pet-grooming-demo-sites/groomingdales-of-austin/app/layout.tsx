import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Outfit } from "next/font/google";
import { DemoBanner, Footer, Header, MobileBar } from "./components/SiteChrome";
import { site } from "./lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Outfit({ subsets: ["latin"], variable: "--font-body" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-script" });

const url = site.canonical;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${site.namePlain} | ${site.seoTitleSuffix}`,
    template: `%s | ${site.namePlain}`,
  },
  description: site.seoDescription,
  alternates: { canonical: "/" },
  icons: {
    icon: site.favicon,
    apple: site.favicon,
  },
  openGraph: {
    title: site.name,
    description: site.seoDescription,
    url,
    siteName: site.namePlain,
    type: "website",
    locale: "en_US",
    images: [{ url: site.logo }],
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
  image: `${url}${site.logo}`,
  sameAs: [site.facebook, site.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postal,
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: site.city,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${script.variable}`}>
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
