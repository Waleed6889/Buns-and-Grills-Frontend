import { MapPin, Phone, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';

export function Contact() {
  const { contact, brand } = restaurantData;
  const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    `Assalam-o-Alaikum ${brand.name}, I would like to inquire about placing a burger order.`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-[#EA580C] mb-2">
            {contact.eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#141416] tracking-tight [text-wrap:balance] mb-3">
            {contact.heading}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            {contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Information Card */}
          <div className="lg:col-span-5 rounded-xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#141416] mb-1">
                    Flagship Kitchen Address
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#141416] mb-1">
                    Call for Takeaway &amp; Info
                  </h3>
                  <a
                    href={contact.phoneHref}
                    className="text-sm font-semibold text-[#141416] hover:text-[#EA580C] transition-colors tabular-nums"
                  >
                    {contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#141416] mb-1.5">
                    Opening Hours
                  </h3>
                  <ul className="space-y-1 text-sm text-zinc-600">
                    {contact.openingHours.map((slot) => (
                      <li key={slot.days} className="flex items-center justify-between gap-4">
                        <span>{slot.days}</span>
                        <span className="font-medium text-[#141416] tabular-nums">
                          {slot.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 space-y-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-lg text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Chat on WhatsApp ({contact.whatsappDisplay})</span>
              </a>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-600">
                {contact.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#EA580C] transition-colors"
                  >
                    {social.name} · {social.handle}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Google Maps Embed Placeholder Card */}
          <div className="lg:col-span-7 rounded-xl border border-zinc-200 bg-[#141416] text-white overflow-hidden flex flex-col justify-between min-h-[340px] relative">
            {/* Clean architectural grid backdrop */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />

            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between gap-4 border-b border-white/10">
              <div>
                <p className="text-xs font-medium text-[#FB923C] mb-1">
                  Google Maps Embed Placeholder
                </p>
                <h3 className="font-display text-lg font-semibold text-white">
                  {brand.name} — DHA Phase 6 Flagship
                </h3>
              </div>
              <span className="text-xs text-zinc-400 hidden sm:inline">
                Karachi, Pakistan
              </span>
            </div>

            <div className="relative z-10 p-6 sm:p-8 flex flex-col items-center text-center my-auto">
              <div className="w-12 h-12 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-lg mb-4">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <p className="font-display text-base sm:text-lg font-semibold text-white mb-1">
                {contact.address}
              </p>
              <p className="text-xs text-zinc-400 mb-6 tabular-nums">
                {contact.mapCoordinatesLabel}
              </p>
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[42px] rounded-lg text-sm font-semibold text-[#141416] bg-white hover:bg-zinc-100 transition-colors"
              >
                <span>Open Directions in Google Maps</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="relative z-10 px-6 py-3 bg-white/5 border-t border-white/10 text-xs text-zinc-400 flex flex-wrap items-center justify-between gap-2">
              <span>Replace with live Google Maps iframe embed in production</span>
              <span>Free Parking Available Outside Lane 4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
