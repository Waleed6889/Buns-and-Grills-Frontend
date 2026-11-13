
import { useEffect, useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { SpecialDeal } from '../data/dealsData';
import { CartItem, formatPKR } from '../utils/orderHelpers';
import { SafeImage } from './SafeImage';
import { getDeals } from '../services/api';

interface DealsProps {
  cartItems: CartItem[];
  onAddDeal: (deal: SpecialDeal) => void;
}

export function Deals({ cartItems, onAddDeal }: DealsProps) {
  const [deals, setDeals] = useState<SpecialDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals();
        setDeals(data);
      } catch (error) {
        console.error('Failed to load deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const getQuantity = (id: string) => {
    const item = cartItems.find((entry) => entry.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <section
      id="offers"
      className="py-16 sm:py-20 bg-[#141417] text-white border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#FB923C] mb-2">
              Value Combos &amp; Feast Boxes
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
              Special Deals Made for Sharing
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md">
            Save up to Rs. 860 on curated solo, duo, and family boxes—prepared fresh on every order.
          </p>
        </div>

        {loading ? (
          <p className="py-16 text-center text-zinc-300">Loading deals...</p>
        ) : deals.length === 0 ? (
          <p className="py-16 text-center text-zinc-300">
            No deals are currently available.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {deals.map((deal) => {
              const qty = getQuantity(deal.id);
              const savings = deal.originalPrice - deal.discountedPrice;

              return (
                <article
                  key={deal.id}
                  className="flex flex-col sm:flex-row bg-[#1C1C21] rounded-xl border border-white/10 overflow-hidden transition-all duration-150 hover:border-white/20"
                >
                  <div className="relative sm:w-56 md:w-64 shrink-0 aspect-[4/3] sm:aspect-auto bg-[#121215] overflow-hidden">
                    <SafeImage
                      src={deal.image}
                      alt={deal.alt}
                      loading="lazy"
                      fallbackLabel={deal.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EA580C] text-white shadow-sm">
                      {deal.promoLabel}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <p className="text-xs font-medium text-[#FBBF24] mb-1 tabular-nums">
                      You Save {formatPKR(savings)}
                    </p>

                    <h3 className="font-display text-xl font-bold text-white leading-snug mb-2">
                      {deal.name}
                    </h3>

                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                      {deal.description}
                    </p>

                    <ul className="space-y-1.5 mb-5 flex-1">
                      {deal.includedItems.map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300"
                        >
                          <Check
                            className="w-4 h-4 text-[#FB923C] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-display text-xl font-bold text-white tabular-nums">
                          {formatPKR(deal.discountedPrice)}
                        </span>
                        <span className="text-sm text-zinc-400 line-through tabular-nums">
                          {formatPKR(deal.originalPrice)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onAddDeal(deal)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>{qty > 0 ? `Add Another (${qty})` : 'Add Deal'}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
