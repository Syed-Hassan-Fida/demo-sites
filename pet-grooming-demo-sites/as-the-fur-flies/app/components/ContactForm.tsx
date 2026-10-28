"use client";

import { useMemo, useState, type FormEvent } from "react";
import { site } from "../lib/site";

type Props = {
  intent?: string;
  defaultSalon?: "north" | "south" | "";
  showSalon?: boolean;
};

export function ContactForm({
  intent = "general",
  defaultSalon = "",
  showSalon = false,
}: Props) {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [salon, setSalon] = useState(defaultSalon);

  const mailto = useMemo(() => {
    if (salon === "north") return "North@AsTheFurFliesAustin.com";
    if (salon === "south") return "Info@AsTheFurFliesAustin.com";
    return site.email;
  }, [salon]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("company") || "").trim()) return;
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const pet = String(fd.get("pet") || "").trim();
    const consent = fd.get("consent");
    const chosen = String(fd.get("salon") || salon || "").trim();

    if (showSalon && !chosen) {
      setErr("Please choose North or South salon.");
      return;
    }
    if (!name || !email || !message) {
      setErr("Please fill name, email, and message.");
      return;
    }
    if (!consent) {
      setErr("Please agree to the privacy notice so we can reply.");
      return;
    }

    const subject = encodeURIComponent(
      `[${site.name}] ${intent}${chosen ? ` · ${chosen}` : ""} — ${name}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPet: ${pet}\nSalon: ${chosen || "n/a"}\nIntent: ${intent}\n\n${message}`
    );
    const to = chosen === "north"
      ? "North@AsTheFurFliesAustin.com"
      : chosen === "south"
        ? "Info@AsTheFurFliesAustin.com"
        : mailto;
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setOk(true);
  }

  if (ok) {
    return (
      <div className="form-success" role="status">
        Thanks — your mail app should open with the details. If it doesn’t, email{" "}
        <a href={`mailto:${mailto}`}>{mailto}</a> or call{" "}
        <a href={`tel:${site.phoneTel}`}>{site.phone}</a>.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {showSalon ? (
        <fieldset style={{ border: 0, padding: 0 }}>
          <legend style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--brand)", marginBottom: "0.45rem" }}>
            Salon
          </legend>
          <div className="salon-toggle">
            <label>
              <input
                type="radio"
                name="salon"
                value="north"
                checked={salon === "north"}
                onChange={() => setSalon("north")}
                required
              />
              North Austin
            </label>
            <label>
              <input
                type="radio"
                name="salon"
                value="south"
                checked={salon === "south"}
                onChange={() => setSalon("south")}
                required
              />
              South Austin
            </label>
          </div>
        </fieldset>
      ) : null}
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
        Pet name &amp; breed
        <input name="pet" autoComplete="off" />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required placeholder="Service, preferred days, coat notes…" />
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
      {err ? (
        <p className="form-note" role="alert" style={{ color: "#8a2a2a" }}>{err}</p>
      ) : null}
      <button className="btn btn-primary" type="submit">Send request</button>
      <p className="form-note">
        Demo form opens your email client — no data is stored on this demo host.
      </p>
    </form>
  );
}
