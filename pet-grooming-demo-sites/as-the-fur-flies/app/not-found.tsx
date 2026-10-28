import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <h1 className="section-title">Page not found</h1>
      <p className="section-lead">That URL isn’t in this demo. Head home or book an appointment.</p>
      <Link className="btn btn-primary" href="/">Back home</Link>
    </section>
  );
}
