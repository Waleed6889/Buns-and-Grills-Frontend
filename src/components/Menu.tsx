
import { useEffect, useState } from 'react';
import { MENU_CATEGORIES, MenuCategory, MenuItem } from '../data/menuData';
import { CartItem } from '../utils/orderHelpers';
import { MenuCard } from './MenuCard';
import { getMenu } from '../services/api';

interface MenuProps {
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (id: string, nextQty: number) => void;
}

export function Menu({ cartItems, onAddToCart, onUpdateQuantity }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu();
        setMenuItems(data);
      } catch (error) {
        setError('Unable to load menu. Please try again.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const getQuantityInCart = (id: string) => {
    const found = cartItems.find((entry) => entry.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#EA580C] mb-2">
              Fresh Off the Grill
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#141416] tracking-tight [text-wrap:balance]">
              Explore Our Signature Burger Menu
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 max-w-md">
            All prices include freshly toasted brioche buns and house seasoning. Tap any category below to filter.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Menu Categories"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-zinc-200"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 min-h-[42px] rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] ${
                  isActive
                    ? 'bg-[#141416] text-white shadow-sm'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:text-[#141416] hover:border-zinc-300'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {loading ? (
          <p className="py-16 text-center">Loading menu...</p>
        ) : error ? (
          <p className="py-16 text-center text-red-600">{error}</p>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-xl border border-zinc-200">
            <p className="text-base font-medium text-zinc-700 mb-3">
              No items found in {selectedCategory}.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#C2410C] cursor-pointer"
            >
              Show Full Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                quantityInCart={getQuantityInCart(item.id)}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
