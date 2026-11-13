import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { formatPKR } from '../utils/orderHelpers';
import { SafeImage } from './SafeImage';

interface MenuCardProps {
  item: MenuItem;
  quantityInCart: number;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (id: string, nextQty: number) => void;
}

export function MenuCard({
  item,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
}: MenuCardProps) {
  return (
    <article className="group flex flex-col bg-white rounded-xl border border-zinc-200/90 overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
      {/* Product Photography (4:3) */}
      <div className="relative aspect-[4/3] w-full bg-[#18181B] overflow-hidden">
        <SafeImage
          src={item.image}
          alt={item.alt}
          loading="lazy"
          fallbackLabel={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {item.discountBadge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EA580C] text-white shadow-sm">
            {item.discountBadge}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Clean unboxed metadata */}
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-1.5">
          <span>{item.category}</span>
          {item.spiceLevel && (
            <>
              <span aria-hidden="true">·</span>
              <span>{item.spiceLevel}</span>
            </>
          )}
        </div>

        <h3 className="font-display text-lg font-semibold text-[#141416] leading-snug mb-2">
          {item.name}
        </h3>

        <p className="text-sm text-zinc-600 leading-relaxed mb-5 flex-1">
          {item.description}
        </p>

        {/* Price Baseline & Cart Action */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-[#141416] tabular-nums">
              {formatPKR(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-zinc-400 line-through tabular-nums">
                {formatPKR(item.originalPrice)}
              </span>
            )}
          </div>

          {quantityInCart === 0 ? (
            <button
              type="button"
              onClick={() => onAddToCart(item)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-lg text-sm font-semibold text-white bg-[#141416] hover:bg-[#EA580C] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
              aria-label={`Add ${item.name} to cart`}
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1"
              aria-label={`Quantity controls for ${item.name}`}
            >
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, quantityInCart - 1)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-zinc-700 hover:bg-white hover:text-[#141416] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
                aria-label={`Decrease ${item.name} quantity`}
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="w-7 text-center text-sm font-semibold text-[#141416] tabular-nums">
                {quantityInCart}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, quantityInCart + 1)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#EA580C] text-white hover:bg-[#C2410C] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
                aria-label={`Increase ${item.name} quantity`}
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
