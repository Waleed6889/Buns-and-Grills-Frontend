import { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { restaurantData } from '../data/restaurantData';
import { CartItem, formatPKR } from '../utils/orderHelpers';
import { SafeImage } from './SafeImage';

interface CartProps {
  isOpen: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onUpdateQuantity: (id: string, nextQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export function Cart({
  isOpen,
  items,
  subtotal,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { freeDeliveryThreshold } = restaurantData.ordering;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-white text-[#141416] h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#EA580C]" aria-hidden="true" />
            <h2
              id="cart-drawer-title"
              className="font-display text-lg font-bold text-[#141416]"
            >
              Your Order Bag ({totalCount})
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-zinc-500 hover:text-[#141416] hover:bg-zinc-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
            aria-label="Close order bag"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Free Delivery Progress Notice */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-200 text-xs sm:text-sm text-zinc-700">
            {remainingForFreeDelivery === 0 ? (
              <span className="font-medium text-emerald-700">
                Free Home Delivery unlocked on your order.
              </span>
            ) : (
              <span>
                Add{' '}
                <strong className="font-semibold text-[#141416] tabular-nums">
                  {formatPKR(remainingForFreeDelivery)}
                </strong>{' '}
                more for free home delivery (Orders {formatPKR(freeDeliveryThreshold)}+).
              </span>
            )}
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-zinc-400" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#141416] mb-1.5">
                Your bag is empty
              </h3>
              <p className="text-sm text-zinc-500 max-w-xs mb-6">
                Add crispy zingers, smash burgers, loaded fries, or a combo deal to begin your order.
              </p>
              <a
                href="#menu"
                onClick={onClose}
                className="inline-flex items-center justify-center px-5 py-2.5 min-h-[42px] rounded-lg text-sm font-semibold text-white bg-[#141416] hover:bg-[#EA580C] transition-colors"
              >
                Browse Menu
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-200">
              {items.map((item) => (
                <li key={item.id} className="py-4 flex gap-3.5">
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      fallbackLabel={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-zinc-500">{item.categoryLabel}</p>
                        <h3 className="font-display text-sm font-semibold text-[#141416] truncate">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-zinc-400 hover:text-red-600 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md text-zinc-700 hover:bg-white cursor-pointer"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md text-zinc-700 hover:bg-white cursor-pointer"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <span className="font-display text-sm font-bold text-[#141416] tabular-nums">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-200 bg-zinc-50 space-y-4">
            <div className="flex items-center justify-between text-sm text-zinc-600">
              <span>Subtotal</span>
              <span className="font-display text-lg font-bold text-[#141416] tabular-nums">
                {formatPKR(subtotal)}
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              Choose Home Delivery or Takeaway Pickup on checkout.
            </p>
            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-lg text-base font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
