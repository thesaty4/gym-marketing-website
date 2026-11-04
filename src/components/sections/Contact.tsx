import type { SiteConfig } from "@/lib/site.schema";
import { Icon } from "@/components/ui/Icon";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { MapEmbed } from "@/components/contact/MapEmbed";

export function Contact({ config }: { config: SiteConfig }) {
  const { contact, business } = config;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-paper py-16 text-on-paper">
      <div className="container-brand">
        <h2 id="contact-heading" className="font-display text-[clamp(2.4rem,7vw,4.8rem)]">
          {contact.title}
        </h2>
        <p className="mt-2 max-w-xl text-on-paper-soft">{contact.lead}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <address className="not-italic space-y-6">
              <div className="flex gap-3">
                <Icon name="pin" className="h-6 w-6 shrink-0 text-brand-orange" />
                <div>
                  <p className="font-display text-sm">{contact.rows.address.label}</p>
                  <a
                    href={business.googleMapsSearchUrl || "#contact"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-on-paper-soft hover:text-brand-orange"
                  >
                    {contact.rows.address.value}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Icon name="phone" className="h-6 w-6 shrink-0 text-brand-orange" />
                <div>
                  <p className="font-display text-sm">{contact.rows.phone.label}</p>
                  {business.phone.display ? (
                    <a href={`tel:${business.phone.e164}`} className="text-sm text-on-paper-soft hover:text-brand-orange">
                      {business.phone.display}
                    </a>
                  ) : (
                    <p className="text-sm text-on-paper-soft">{contact.rows.phone.fallbackText}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Icon name="target" className="h-6 w-6 shrink-0 text-brand-orange" />
                <div>
                  <p className="font-display text-sm">{contact.rows.hours.label}</p>
                  {business.hours.rows.length > 0 ? (
                    <ul className="text-sm text-on-paper-soft">
                      {business.hours.rows.map((row) => (
                        <li key={row.day}>
                          {row.day}: {row.opens} – {row.closes}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-on-paper-soft">{contact.rows.hours.fallbackText}</p>
                  )}
                </div>
              </div>
            </address>

            {contact.upi.enabled && business.payment.upi.vpa && (
              <div className="shadow-hard-yellow mt-8 flex items-center gap-4 border-[3px] border-brand-black bg-paper-2 p-5">
                <Icon name="qr" className="h-10 w-10 shrink-0 text-brand-black" />
                <div>
                  <p className="font-display text-sm">{contact.upi.title}</p>
                  <p className="text-sm text-on-paper-soft">{contact.upi.text}</p>
                </div>
              </div>
            )}

            {business.googleMapsEmbedUrl && (
              <div className="mt-8">
                <MapEmbed embedUrl={business.googleMapsEmbedUrl} title={`Map to ${config.site.name}`} />
              </div>
            )}
          </div>

          <InquiryForm config={config} />
        </div>
      </div>
    </section>
  );
}
