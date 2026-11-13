import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Deals } from './components/Deals';
import { Checkout } from './components/Checkout';
import { WhyChooseUs } from './components/WhyChooseUs';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { MenuItem } from './data/menuData';
import { SpecialDeal } from './data/dealsData';
import { CartItem, calculateSubtotal } from './utils/orderHelpers';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(() => calculateSubtotal(cartItems), [cartItems]);

  const handleAddMenuItem = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          categoryLabel: item.category,
          quantity: 1,
        },
      ];
    });
  };

  const handleAddDeal = (deal: SpecialDeal) => {
    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.id === deal.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === deal.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [
        ...prev,
        {
          id: deal.id,
          name: deal.name,
          price: deal.discountedPrice,
          image: deal.image,
          categoryLabel: 'Special Deal',
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, nextQty: number) => {
    if (nextQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: nextQty } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleHeroOrderNow = () => {
    if (cartItems.length > 0) {
      setIsCartOpen(true);
      return;
    }
    const menuEl = document.getElementById('menu');
    menuEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    const checkoutEl = document.getElementById('order');
    checkoutEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#141416] overflow-x-hidden">
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <Hero onOrderNow={handleHeroOrderNow} />
        <Menu
          cartItems={cartItems}
          onAddToCart={handleAddMenuItem}
          onUpdateQuantity={handleUpdateQuantity}
        />
        <Deals cartItems={cartItems} onAddDeal={handleAddDeal} />
        <Checkout
          items={cartItems}
          subtotal={subtotal}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
        <WhyChooseUs />
        <About />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        items={cartItems}
        subtotal={subtotal}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />
    </div>
  );
}
