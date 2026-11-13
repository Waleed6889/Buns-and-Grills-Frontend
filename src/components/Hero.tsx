import { ArrowRight, ChevronDown } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onOrderNow: () => void;
}

export function Hero({ onOrderNow }: HeroProps) {
  const { hero } = restaurantData;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#121215] text-white border-b border-white/10"
    >
      {/* Subtle warm ember atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[34rem] h-[34rem] rounded-full bg-[#EA580C]/15 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 lg:pt-16 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-[#FB923C] tracking-wide mb-4">
              {hero.kicker}
            </p>

            <h1 className="font-display text-[clamp(2.35rem,4.5vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance] mb-5">
              {hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl mb-8">
              {hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOrderNow}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg text-base font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] transition-all duration-150 shadow-lg shadow-orange-950/40 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg text-base font-semibold text-zinc-100 bg-white/5 border border-white/15 hover:bg-white/10 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
              >
                <span>{hero.secondaryCta}</span>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Burger Photography */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:min-h-[390px] rounded-xl overflow-hidden border border-white/10 bg-[#1B1B1F]">
              <SafeImage
                src={hero.image}
                alt={hero.imageAlt}
                loading="eager"
                fallbackLabel={restaurantData.brand.name}
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121215]/70 via-transparent to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-xs sm:text-sm text-zinc-200">
                <span className="font-medium">Double Charcoal Smash &amp; Masala Fries</span>
                <span className="font-semibold text-[#FBBF24] tabular-nums">From Rs. 780</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Highlights Strip */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {hero.highlights.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-400">{item.label}</span>
              <span className="font-display text-lg sm:text-xl font-semibold text-white tabular-nums">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
