"use client";

import { useId, useState } from "react";
import type { SiteConfig } from "@/lib/site.schema";
import { whatsappLink } from "@/lib/links";

type Status = "idle" | "submitting" | "success" | "error";

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key: string) => values[key] ?? "");
}

export function InquiryForm({ config }: { config: SiteConfig }) {
  const { form } = config.contact;
  const formId = useId();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<Status>("idle");

  const hasWhatsapp = Boolean(config.business.phone.e164);

  function validate() {
    const next: { name?: string; phone?: string } = {};
    if (form.fields.name.required && !name.trim()) next.name = form.fields.name.errorMessage;
    if (form.fields.phone.required && !phone.trim()) next.phone = form.fields.phone.errorMessage;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return; // silently drop bot submissions
    if (!validate()) return;

    if (form.mode === "whatsapp") {
      if (!hasWhatsapp) {
        setStatus("error");
        return;
      }
      const text = fillTemplate(form.whatsappTemplate, { name, phone, message });
      window.open(whatsappLink(config, text), "_blank", "noopener,noreferrer");
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, honeypot }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="shadow-hard-yellow border-[3px] border-brand-black bg-paper-2 p-6">
      <h3 className="font-display text-xl">{form.title}</h3>

      {form.mode === "whatsapp" && !hasWhatsapp && (
        <p role="status" className="mt-3 text-sm text-brand-red">
          {form.noPhoneMessage}
        </p>
      )}

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Honeypot field: hidden from sighted/keyboard users, bots often fill every field. */}
        <div aria-hidden="true" className="absolute left-[-9999px]">
          <label htmlFor={`${formId}-company`}>Company</label>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-name`} className="block text-sm font-semibold">
            {form.fields.name.label}
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={form.fields.name.placeholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className="mt-1 w-full border-[3px] border-brand-black bg-paper px-3 py-2"
          />
          {errors.name && (
            <p id={`${formId}-name-error`} className="mt-1 text-sm text-brand-red">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold">
            {form.fields.phone.label}
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={form.fields.phone.placeholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            className="mt-1 w-full border-[3px] border-brand-black bg-paper px-3 py-2"
          />
          {errors.phone && (
            <p id={`${formId}-phone-error`} className="mt-1 text-sm text-brand-red">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-message`} className="block text-sm font-semibold">
            {form.fields.message.label}
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={3}
            placeholder={form.fields.message.placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full border-[3px] border-brand-black bg-paper px-3 py-2"
          />
        </div>

        <button type="submit" className="btn btn-yellow w-full" disabled={status === "submitting"}>
          {form.submitLabel}
        </button>

        <div aria-live="polite">
          {status === "success" && <p className="text-sm text-green-700">{form.successMessage}</p>}
          {status === "error" && form.mode === "api" && <p className="text-sm text-brand-red">{form.errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}
