import { restaurantData } from '../data/restaurantData';

export function Footer() {
  const { brand, contact } = restaurantData;

  return (
    <footer className="bg-[#121215] text-zinc-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <a
              href="#home"
              className="font-display text-xl font-bold text-white tracking-tight inline-block mb-3"
            >
              {brand.name}
            </a>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              {brand.footerDescription}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Burger Menu
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-white transition-colors">
                  Special Deals
                </a>
              </li>
              <li>
                <a href="#order" className="hover:text-white transition-colors">
                  Online Checkout
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-semibold text-white mb-3">
              Karachi Kitchen
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>{contact.address}</li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="text-zinc-200 hover:text-[#FB923C] transition-colors tabular-nums"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>{contact.email}</li>
              <li className="pt-2 flex flex-wrap gap-4">
                {contact.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; {brand.copyrightYear} {brand.name}. All rights reserved.
          </p>
          <p>
            Sample storefront built for Pakistani burger &amp; fast-food restaurants.
          </p>
        </div>
      </div>
    </footer>
  );
}
