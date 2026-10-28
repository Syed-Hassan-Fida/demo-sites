import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Products",
  description: `Recommended grooming products and in-shop favorites at ${site.namePlain}.`,
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Products</p>
      <h1 className="section-title">Salon recommendations</h1>
      <p className="section-lead">
        Favorites we carry or recommend — ask in shop for current stock and ordering links.
      </p>
      <div className="grid-2">
        {site.products.map((p) => (
          <article className="card" key={p.title}>
            <h2 style={{ color: "var(--rose)", fontSize: "1.25rem", marginBottom: "0.45rem" }}>{p.title}</h2>
            <p>{p.blurb}</p>
          </article>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/contact">Ask about products</Link>
      </p>
    </section>
  );
}
