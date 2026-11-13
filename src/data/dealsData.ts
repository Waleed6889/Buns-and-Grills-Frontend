import zingerImg from '../assets/images/menu_zinger_burger_1794583257181.jpg';
import beefSmashImg from '../assets/images/menu_beef_smash_1794583257161.jpg';
import dealsComboImg from '../assets/images/menu_deals_combo_1794583258895.jpg';
import cheeseBurgerImg from '../assets/images/menu_cheese_burger_1794583258016.jpg';

export interface SpecialDeal {
  id: string;
  name: string;
  promoLabel: string;
  description: string;
  includedItems: string[];
  originalPrice: number;
  discountedPrice: number;
  image: string;
  alt: string;
}

export const dealsData: SpecialDeal[] = [
  {
    id: 'deal-zinger-trio',
    name: 'Zinger Burger + Fries + Drink',
    promoLabel: 'Save Rs. 260',
    description:
      'Our everyday student and office lunch favorite—crispy zinger fillet paired with masala fries and a chilled drink.',
    includedItems: [
      '1x Karachi Crunch Zinger',
      '1x Regular Masala Fries',
      '1x House Garlic Mayo Dip',
      '1x Chilled Drink (345ml)',
    ],
    originalPrice: 1250,
    discountedPrice: 990,
    image: zingerImg,
    alt: 'Zinger burger combo with golden fries and chilled drink',
  },
  {
    id: 'deal-double-beef-smash',
    name: 'Double Beef Burger Deal',
    promoLabel: 'Best Value · 20% Off',
    description:
      'Two Double Charcoal Smash beef burgers with golden sharing fries and two drinks—made for serious cravings.',
    includedItems: [
      '2x Double Charcoal Smash Beef Burgers',
      '1x Large Masala Sharing Fries',
      '2x Signature Ember Dips',
      '2x Chilled Drinks',
    ],
    originalPrice: 2950,
    discountedPrice: 2350,
    image: beefSmashImg,
    alt: 'Double Beef Burger Deal featuring two double smash patties with fries',
  },
  {
    id: 'deal-family-burger-box',
    name: 'Family Burger Box',
    promoLabel: 'Family Feast',
    description:
      'Feed the whole table at home—four full-size signature burgers, loaded fries platter, and a 1.5L chilled drink.',
    includedItems: [
      '2x Karachi Crunch Zinger Burgers',
      '2x Double Charcoal Smash Burgers',
      '1x Zinger Loaded Fries Platter',
      '1x 1.5 Litre Cold Drink & 4 Dips',
    ],
    originalPrice: 4650,
    discountedPrice: 3790,
    image: dealsComboImg,
    alt: 'Family Burger Box containing four gourmet burgers, fries, dips, and drinks',
  },
  {
    id: 'deal-buy-2-get-1',
    name: 'Buy 2 Get 1 Free (Zinger / Cheese)',
    promoLabel: 'Buy 2 Get 1 Free',
    description:
      'Order two full-price signature burgers and get a third Classic Crispy Zinger or Smoky Cheese Melt absolutely free.',
    includedItems: [
      '2x Molten Triple Cheese or Double Smash',
      '1x Classic Crispy Zinger (FREE)',
      '3x House Garlic & Chipotle Dips',
    ],
    originalPrice: 2980,
    discountedPrice: 2150,
    image: cheeseBurgerImg,
    alt: 'Buy 2 Get 1 Free gourmet burger deal with molten cheese',
  },
];
