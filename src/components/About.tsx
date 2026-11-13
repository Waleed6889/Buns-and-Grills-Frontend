import { Check } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';
import { SafeImage } from './SafeImage';

export function About() {
  const { about } = restaurantData;

  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Kitchen Craft Image */}
          <div className="lg:col-span-6 flex">
            <div className="w-full aspect-[4/3] lg:aspect-auto lg:min-h-[420px] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-900">
              <SafeImage
                src={about.image}
                alt={about.imageAlt}
                loading="lazy"
                fallbackLabel="Open Kitchen Grill"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Story & Quality Commitments */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#EA580C] mb-2">
              {about.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#141416] tracking-tight [text-wrap:balance] mb-5">
              {about.heading}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed mb-7">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.commitments.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-medium text-[#141416]">
                  <span className="w-5 h-5 rounded-full bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
