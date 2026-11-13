import heroBurgerImg from '../assets/images/hero_smash_burger_1794583256591.jpg';
import aboutKitchenImg from '../assets/images/about_kitchen_grill_1794583260191.jpg';

export interface RestaurantBranch {
  id: string;
  name: string;
  address: string;
  pickupEstimate: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Flame' | 'Award' | 'Truck' | 'Tag' | 'ShieldCheck' | 'HeartHandshake';
}

export const restaurantData = {
  brand: {
    name: 'Buns & Grills',
    tagline: 'Hand-Smashed Halal Beef & Crispy Zinger House',
    copyrightYear: '2026',
    footerDescription:
      'Freshly ground 100% halal beef, hand-breaded spicy zinger fillets, and house-baked brioche buns served hot across Karachi until 2:00 AM.',
  },
  theme: {
    accentHex: '#EA580C',
    accentHoverHex: '#C2410C',
    darkSurfaceHex: '#121215',
    lightSurfaceHex: '#FAFAFA',
  },
  hero: {
    kicker: '100% Fresh Halal Beef & Chicken · Made to Order in Karachi',
    headline: 'Smashed to Perfection. Crisp Beyond Compare.',
    description:
      'Juicy double-seared beef patties with lacy crispy edges, fiery Karachi-style zinger fillets, and molten cheddar on warm toasted brioche.',
    primaryCta: 'Order Now',
    secondaryCta: 'Explore Menu',
    image: heroBurgerImg,
    imageAlt:
      'Double smashed halal beef burger with melted cheddar, caramelized onions, and golden masala fries on dark slate',
    highlights: [
      { label: 'Delivery Time', value: '30–40 Mins' },
      { label: 'Meat Sourcing', value: '100% Halal' },
      { label: 'Patty Prep', value: 'Never Frozen' },
      { label: 'Late Night', value: 'Open Till 2 AM' },
    ],
  },
  ordering: {
    currencyLabel: 'PKR',
    deliveryFee: 150,
    freeDeliveryThreshold: 2500,
    deliveryAreas: [
      'DHA Phase 1 – Phase 8',
      'Clifton Block 1 – Block 9',
      'PECHS & Bahadurabad',
      'Gulshan-e-Iqbal',
      'Gulistan-e-Johar',
      'North Nazimabad',
    ],
    pickupBranches: [
      {
        id: 'dha-phase-6',
        name: 'DHA Phase 6 Flagship (Bukhari Commercial)',
        address: 'Plot 14-C, Bukhari Commercial Lane 4, DHA Phase 6, Karachi',
        pickupEstimate: 'Ready in 15–20 mins',
      },
      {
        id: 'clifton-block-4',
        name: 'Clifton Block 4 Express',
        address: 'Shop 7, Marine Arcade, Clifton Block 4, Karachi',
        pickupEstimate: 'Ready in 15–20 mins',
      },
      {
        id: 'bahadurabad',
        name: 'Bahadurabad Grill Counter',
        address: 'Plot 22-B, Char Minar Chowrangi Road, Bahadurabad, Karachi',
        pickupEstimate: 'Ready in 20–25 mins',
      },
    ] as RestaurantBranch[],
    pickupTimeSlots: [
      'As Soon As Possible (15–20 mins)',
      'In 30 Minutes',
      'In 45 Minutes',
      'In 1 Hour',
    ],
  },
  whyChooseUs: {
    eyebrow: 'The Buns & Grills Standard',
    heading: 'Built Around Freshness, Speed & Honest Flavors',
    subheading:
      'Every burger starts on a 450°F flat-top grill after you order—never sitting under heat lamps.',
    items: [
      {
        id: 'fresh-ingredients',
        title: 'Fresh Ingredients',
        description:
          'Daily locally sourced halal chuck beef, crisp iceberg lettuce, and brioche buns baked fresh each morning.',
        iconName: 'Flame',
      },
      {
        id: 'premium-quality',
        title: 'Premium Quality',
        description:
          'Signature buttermilk-marinated zinger thighs and aged cheddar slices—no fillers, no shortcuts.',
        iconName: 'Award',
      },
      {
        id: 'fast-delivery',
        title: 'Fast Delivery',
        description:
          'Insulated thermal dispatch boxes keep your fries crisp and cheese molten across Karachi in 30–40 minutes.',
        iconName: 'Truck',
      },
      {
        id: 'affordable-prices',
        title: 'Affordable Prices',
        description:
          'Honest PKR pricing with generous solo combos, student deals, and family feast boxes.',
        iconName: 'Tag',
      },
      {
        id: 'hygienic-preparation',
        title: 'Hygienic Preparation',
        description:
          'Open-view stainless steel kitchen with strict food-safety gloves, temperature logs, and sanitized prep stations.',
        iconName: 'ShieldCheck',
      },
      {
        id: 'customer-satisfaction',
        title: 'Customer Satisfaction',
        description:
          'Customized spice levels and careful order verification before every rider leaves the counter.',
        iconName: 'HeartHandshake',
      },
    ] as WhyChooseUsItem[],
  },
  about: {
    eyebrow: 'Our Kitchen Story',
    heading: 'Crafted in Karachi for True Burger Lovers',
    paragraphs: [
      'Buns & Grills began with one simple frustration: too many fast-food burgers looked big in photos yet arrived lukewarm, soggy, and short on flavor. We set out to build a neighborhood burger house in Karachi where craft smash techniques meet bold Pakistani spice profiles.',
      'Our beef patties are ground fresh daily from 100% halal prime cuts and pressed onto a blazing flat-top for deep Maillard crust. Our chicken zingers are marinated overnight in spiced buttermilk and hand-breaded to order for an unmistakable crunch.',
      'Whether you are grabbing a quick late-night zinger after work, ordering dinner for family in DHA or Clifton, or hanging out with university friends, every box leaves our kitchen hot, clean, and generously portioned.',
    ],
    commitments: [
      '100% Zabiha Halal Certified Meat',
      'Zero Frozen Beef Patties',
      'Hand-Cut Skin-On Masala Fries',
      'Tamper-Evident Delivery Packaging',
    ],
    image: aboutKitchenImg,
    imageAlt: 'Chef searing fresh smash beef patties on an open stainless steel flat-top grill at Buns & Grills',
  },
  contact: {
    eyebrow: 'Visit or Reach Us',
    heading: 'Hungry Now? Drop By or Order Direct',
    subheading:
      'Dine in at our Bukhari Commercial flagship, pick up hot from the counter, or place an online order for doorstep delivery.',
    address: 'Plot 14-C, Bukhari Commercial Lane 4, DHA Phase 6, Karachi, Pakistan',
    phoneDisplay: '+92 300 5550192',
    phoneHref: 'tel:+923005550192',
    whatsappNumber: '923005550192',
    whatsappDisplay: '+92 300 5550192',
    email: 'orders@bunsandgrills.pk',
    openingHours: [
      { days: 'Monday – Thursday', hours: '12:00 PM – 1:00 AM' },
      { days: 'Friday – Sunday', hours: '12:00 PM – 2:00 AM' },
    ],
    mapCoordinatesLabel: '24.7937° N, 67.0645° E · DHA Phase 6, Karachi',
    googleMapsUrl: 'https://maps.google.com/?q=Bukhari+Commercial+DHA+Phase+6+Karachi',
    socialLinks: [
      { name: 'Instagram', href: 'https://instagram.com', handle: '@bunsandgrills.pk' },
      { name: 'Facebook', href: 'https://facebook.com', handle: 'Buns & Grills Karachi' },
      { name: 'TikTok', href: 'https://tiktok.com', handle: '@bunsandgrills' },
    ],
  },
} as const;
