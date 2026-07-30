"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  "Software Engineering",
  "AI & Automation",
  "Cloud & DevOps",
  "Growth Systems",
  "Strategy",
  "Other",
];

export default function ContactPage() {
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const toggleService = (service) => {
    setSelected((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="contact-page">
      <section className="contact-shell">
        <div className="contact-art" aria-hidden="true">
          <span className="orb orb-one" />
          <span className="orb orb-two" />
          <span className="light-trail trail-one" />
          <span className="light-trail trail-two" />
        </div>

        <div className="contact-copy">
          <p className="contact-eyebrow">GOHIGH / CONTACT</p>
          <h1>
            Get in touch for your
            <br />
            next digital system.
          </h1>

          <div className="contact-details">
            <a href="mailto:hello@gohightechnology.com">
              <span>hello@gohightechnology.com</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <p className="contact-location">
            Based in Kolkata, India —
            <br />
            working with ambitious teams globally.
          </p>
        </div>

        <div className="contact-form-wrap">
          <span className="contact-form-label">LET&apos;S TALK</span>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="line-field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
                required
              />
            </label>

            <div className="contact-field-grid">
              <label className="line-field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@company.com"
                  required
                />
              </label>

              <label className="line-field">
                <span>Mobile</span>
                <input
                  type="tel"
                  name="mobile"
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.mobile}
                  onChange={update("mobile")}
                  placeholder="+91"
                />
              </label>
            </div>

            <fieldset>
              <legend>What can we help with?</legend>
              <div className="service-options">
                {services.map((service) => {
                  const active = selected.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      className={active ? "is-selected" : ""}
                      aria-pressed={active}
                      onClick={() => toggleService(service)}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="message-field">
              <span>Project details</span>
              <textarea
                name="message"
                autoComplete="off"
                value={form.message}
                onChange={update("message")}
                placeholder="Tell us briefly about the challenge"
                rows={3}
                required
              />
            </label>

            <div className="form-footer">
              <p>We usually reply within 24 hours.</p>
              <button className="submit-button" type="submit">
                Send enquiry
                <ArrowUpRight aria-hidden="true" />
              </button>
            </div>
          </form>

        </div>
      </section>

      <style jsx>{`
        .contact-page {
          min-height: 100svh;
          background: #f4f7f9;
          color: #1a2a3a;
          font-family: var(--font-montserrat), sans-serif;
        }

        .contact-shell {
          position: relative;
          min-height: 100svh;
          overflow-x: clip;
          isolation: isolate;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(460px, 0.92fr);
        }

        .contact-art {
          position: absolute;
          inset: 0;
          z-index: -2;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 4% 82%,
              rgba(0, 200, 200, 0.12),
              transparent 30%
            ),
            radial-gradient(
              circle at 48% 8%,
              rgba(58, 171, 212, 0.09),
              transparent 28%
            ),
            linear-gradient(135deg, #ffffff 0%, #f4f7f9 68%, #edf5f6 100%);
        }

        .contact-art::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(26, 42, 58, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 42, 58, 0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: linear-gradient(to right, #000, transparent 62%);
          opacity: 0.45;
        }

        .orb {
          display: none;
        }

        .orb-one {
          width: 36vw;
          height: 24vw;
          left: -8vw;
          top: 24%;
          background: #2414c8;
        }

        .orb-two {
          width: 34vw;
          height: 20vw;
          right: -10vw;
          bottom: -3vw;
          background: #a405c2;
        }

        .light-trail {
          display: none;
        }

        .trail-one {
          left: 10vw;
          bottom: 3vw;
          rotate: 15deg;
        }

        .trail-two {
          right: -20vw;
          top: 5vw;
          rotate: 12deg;
        }

        .contact-copy {
          align-self: center;
          padding: 9rem clamp(2rem, 5vw, 5rem) 4rem;
          max-width: 720px;
        }

        .contact-eyebrow,
        .contact-form-label {
          margin: 0;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
        }

        .contact-copy h1 {
          margin: 1.2rem 0 2.5rem;
          max-width: 650px;
          font-size: clamp(2.25rem, 4.4vw, 4.5rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.055em;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.6rem;
          margin-bottom: clamp(3rem, 8vh, 6rem);
        }

        .contact-details a {
          max-width: 100%;
          min-height: 2.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #1a2a3a;
          font-family: Georgia, serif;
          font-size: clamp(1.2rem, 2.1vw, 2rem);
          text-decoration: none;
        }

        .contact-details a span {
          min-width: 0;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .contact-details a :global(svg) {
          flex: 0 0 auto;
        }

        .contact-details a :global(svg) {
          width: 1.1em;
          height: 1.1em;
        }

        .contact-location {
          margin: 0;
          max-width: 580px;
          font-family: Georgia, serif;
          font-size: clamp(1.35rem, 2.4vw, 2.3rem);
          line-height: 1.35;
        }

        .contact-form-wrap {
          position: relative;
          align-self: center;
          margin: 5.5rem clamp(1.25rem, 3vw, 3rem) 2rem 0;
          padding: clamp(2rem, 4vw, 3.5rem);
          background: #101820;
          color: #f3f0f4;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 70px rgba(26, 42, 58, 0.12);
        }

        .contact-form-label {
          position: absolute;
          left: 0;
          top: -1.4rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: clamp(1.4rem, 3vh, 2rem);
        }

        .contact-field-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(1rem, 2vw, 1.75rem);
        }

        .line-field,
        .message-field {
          display: block;
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          color: #f3f0f4;
          transition: border-color 180ms ease;
        }

        .line-field span,
        .message-field span,
        fieldset legend {
          display: block;
          color: rgba(255, 255, 255, 0.52);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        input,
        textarea {
          width: 100%;
          min-width: 0;
          padding: 0.55rem 0 0.9rem;
          border: 0;
          outline: 0;
          background: transparent;
          color: #fff;
          font: inherit;
          font-size: clamp(0.95rem, 1.3vw, 1.08rem);
        }

        .line-field:focus-within,
        .message-field:focus-within {
          border-color: #00d6d6;
        }

        input:focus-visible,
        textarea:focus-visible {
          outline: none;
        }

        .service-options button:focus-visible,
        .submit-button:focus-visible {
          outline: 2px solid #00d6d6;
          outline-offset: 3px;
        }

        input::placeholder,
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.32);
          font-size: 0.82rem;
        }

        .message-field {
          display: block;
        }

        textarea {
          display: block;
          min-height: 6rem;
          resize: vertical;
          line-height: 1.5;
        }

        fieldset {
          margin: 0;
          padding: 0;
          border: 0;
        }

        fieldset legend {
          margin-bottom: 0.9rem;
        }

        .service-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .service-options button {
          min-height: 2.75rem;
          padding: 0.65rem 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 2px;
          background: transparent;
          color: rgba(255, 255, 255, 0.58);
          font: inherit;
          font-size: 0.68rem;
          cursor: pointer;
          transition: 180ms ease;
        }

        .service-options button.is-selected {
          border-color: #00d6d6;
          background: #00c8c8;
          color: #071717;
        }

        @media (hover: hover) {
          .service-options button:not(.is-selected):hover {
            background: rgba(0, 214, 214, 0.08);
            color: #fff;
          }
        }

        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-top: 0.25rem;
        }

        .form-footer p {
          margin: 0;
          color: rgba(255, 255, 255, 0.35);
          font-size: 0.68rem;
        }

        .submit-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 2.75rem;
          padding: 0.8rem 1.15rem;
          border: 1px solid #00c8c8;
          border-radius: 2px;
          background: #00c8c8;
          color: #071717;
          font: inherit;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 180ms ease, color 180ms ease;
        }

        .submit-button:hover {
          background: transparent;
          color: #00d6d6;
        }

        .submit-button :global(svg) {
          width: 1rem;
          height: 1rem;
        }

        @media (max-width: 1100px) {
          .contact-shell {
            grid-template-columns: 1fr;
          }

          .contact-copy {
            max-width: 760px;
            padding: 8rem clamp(1.5rem, 6vw, 4rem) 3.5rem;
          }

          .contact-form-wrap {
            width: auto;
            margin: 1.5rem clamp(1rem, 5vw, 3rem) 4rem;
            padding: clamp(2rem, 5vw, 3.5rem);
          }

          .contact-location {
            font-size: 1.45rem;
          }
        }

        @media (max-width: 767px) {
          .contact-copy {
            padding: 7rem 1.25rem 2.5rem;
          }

          .contact-copy h1 {
            margin: 1rem 0 2rem;
            font-size: clamp(2.25rem, 11vw, 3.5rem);
          }

          .contact-copy h1 br,
          .contact-location br {
            display: none;
          }

          .contact-details {
            margin-bottom: 2.5rem;
          }

          .contact-details a {
            font-size: clamp(1.05rem, 5.5vw, 1.5rem);
          }

          .contact-location {
            font-size: clamp(1.2rem, 6vw, 1.45rem);
          }

          .contact-form-wrap {
            margin: 1.5rem 0.75rem 3rem;
            padding: 1.75rem 1rem;
          }

          .contact-field-grid {
            grid-template-columns: 1fr;
          }

          .form-footer {
            align-items: flex-start;
            flex-direction: column;
          }

          .submit-button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-height: 600px) and (max-width: 1100px) {
          .contact-copy {
            padding-top: 6rem;
            padding-bottom: 2rem;
          }

          .contact-form-wrap {
            margin-top: 1rem;
          }
        }
      `}</style>
    </main>
  );
}
