import {
  Flame,
  Award,
  Truck,
  Tag,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';
import { restaurantData, WhyChooseUsItem } from '../data/restaurantData';

const ICON_MAP: Record<WhyChooseUsItem['iconName'], typeof Flame> = {
  Flame,
  Award,
  Truck,
  Tag,
  ShieldCheck,
  HeartHandshake,
};

export function WhyChooseUs() {
  const { whyChooseUs } = restaurantData;

  return (
    <section className="py-16 sm:py-20 bg-[#FAFAFA] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-[#EA580C] mb-2">
            {whyChooseUs.eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#141416] tracking-tight [text-wrap:balance] mb-3">
            {whyChooseUs.heading}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            {whyChooseUs.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.items.map((item) => {
            const IconComponent = ICON_MAP[item.iconName];
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-zinc-200 p-6 transition-shadow duration-150 hover:shadow-sm"
              >
                <div className="w-11 h-11 rounded-lg bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center mb-4">
                  <IconComponent className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#141416] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
