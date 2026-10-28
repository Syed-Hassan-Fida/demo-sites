"use client";
import { useState, type FormEvent } from "react";
import { site } from "../lib/site";

export function ContactForm({ intent = "general" }: { intent?: string }) {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("company") || "").trim()) return; // honeypot
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const neighborhood = String(fd.get("neighborhood") || "").trim();
    const dog = String(fd.get("dog") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const consent = fd.get("consent");
    if (!name || !email || !message) {
      setErr("Please fill name, email, and message.");
      return;
    }
    if (!consent) {
      setErr("Please agree to the privacy notice so we can reply.");
      return;
    }
    const subject = encodeURIComponent(`[${site.name}] ${intent} — ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Neighborhood / area: ${neighborhood || "(not provided)"}`,
        `Dog breed / coat / size: ${dog || "(not provided)"}`,
        `Intent: ${intent}`,
        "",
        message,
      ].join("\n")
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setOk(true);
  }

  if (ok) {
    return (
      <div className="form-success" role="status">
        Thanks — your mail app should open with the details. If it doesn’t, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={`tel:${site.phoneTel}`}>{site.phone}</a>.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label>
        Name
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        Neighborhood / area
        <input
          name="neighborhood"
          autoComplete="address-level2"
          placeholder="e.g. South Congress, Cedar Park"
        />
      </label>
      <label>
        Dog breed / coat / size
        <input name="dog" placeholder="e.g. Goldendoodle, medium, curly" />
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows={5}
          required
          placeholder={
            intent === "booking"
              ? "Preferred days, sensitivities, and anything else for the van route…"
              : undefined
          }
        />
      </label>
      <label className="hp" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <label style={{ fontWeight: 500 }}>
        <span style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start" }}>
          <input name="consent" type="checkbox" required style={{ marginTop: "0.2rem" }} />
          <span>
            I agree that {site.name} may use these details to respond. See the{" "}
            <a href="/privacy" style={{ textDecoration: "underline" }}>privacy policy</a>.
          </span>
        </span>
      </label>
      {err ? <p className="form-note" role="alert" style={{ color: "#8a2a2a" }}>{err}</p> : null}
      <button className="btn btn-primary" type="submit">Send request</button>
      <p className="form-note">Demo form opens your email client — no data is stored on this demo host.</p>
    </form>
  );
}
