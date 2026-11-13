import zingerImg from '../assets/images/menu_zinger_burger_1794583257181.jpg';
import beefSmashImg from '../assets/images/menu_beef_smash_1794583257161.jpg';
import cheeseBurgerImg from '../assets/images/menu_cheese_burger_1794583258016.jpg';
import loadedFriesImg from '../assets/images/menu_loaded_fries_1794583258999.jpg';
import dealsComboImg from '../assets/images/menu_deals_combo_1794583258895.jpg';
import drinksShakesImg from '../assets/images/menu_drinks_shakes_1794583258601.jpg';

export type MenuCategory =
  | 'All'
  | 'Zinger Burgers'
  | 'Beef Burgers'
  | 'Chicken Burgers'
  | 'Cheese Burgers'
  | 'Loaded Fries'
  | 'Deals & Combos'
  | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  description: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy' | 'Extra Spicy';
  image: string;
  alt: string;
  popular?: boolean;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  'All',
  'Zinger Burgers',
  'Beef Burgers',
  'Chicken Burgers',
  'Cheese Burgers',
  'Loaded Fries',
  'Deals & Combos',
  'Drinks',
];

export const menuData: MenuItem[] = [
  {
    id: 'zinger-karachi-crunch',
    name: 'Karachi Crunch Zinger',
    category: 'Zinger Burgers',
    description:
      'Extra-crispy buttermilk fried chicken thigh, cheddar slice, shredded iceberg lettuce, and smoky garlic mayo on sesame brioche.',
    price: 780,
    originalPrice: 890,
    discountBadge: 'Save 12%',
    spiceLevel: 'Spicy',
    image: zingerImg,
    alt: 'Karachi Crunch Zinger crispy fried chicken burger with melted cheddar and garlic mayo',
    popular: true,
  },
  {
    id: 'zinger-fiery-peri',
    name: 'Fiery Peri-Peri Zinger',
    category: 'Zinger Burgers',
    description:
      'Crunchy spiced chicken fillet tossed in house peri-peri glaze, jalapeños, pepper jack cheese, and cool herb ranch.',
    price: 850,
    spiceLevel: 'Extra Spicy',
    image: zingerImg,
    alt: 'Fiery Peri-Peri Zinger burger topped with jalapeños and spicy glaze',
  },
  {
    id: 'beef-double-smash',
    name: 'Double Charcoal Smash',
    category: 'Beef Burgers',
    description:
      'Two 100% halal prime beef patties smashed crispy on the flat-top with double cheddar, caramelized onions, dill pickles, and ember sauce.',
    price: 1150,
    originalPrice: 1290,
    discountBadge: 'Best Seller',
    spiceLevel: 'Mild',
    image: beefSmashImg,
    alt: 'Double Charcoal Smash halal beef burger with double melted cheddar and caramelized onions',
    popular: true,
  },
  {
    id: 'beef-oklahoma-onion',
    name: 'Oklahoma Onion Smash',
    category: 'Beef Burgers',
    description:
      'Paper-thin sweet onions pressed directly into seared halal beef patties with American cheddar and tangy mustard mayo.',
    price: 980,
    spiceLevel: 'Mild',
    image: beefSmashImg,
    alt: 'Oklahoma Onion Smash beef burger with seared onions and cheddar cheese',
  },
  {
    id: 'chicken-chargrill-jalapeno',
    name: 'Chargrilled Jalapeño Chicken',
    category: 'Chicken Burgers',
    description:
      'Flame-grilled marinated chicken breast fillet, pickled jalapeños, sautéed mushrooms, and smoky chipotle aioli.',
    price: 790,
    spiceLevel: 'Medium',
    image: zingerImg,
    alt: 'Chargrilled Jalapeño Chicken burger on toasted brioche bun',
  },
  {
    id: 'chicken-butter-garlic',
    name: 'Creamy Garlic Herb Chicken',
    category: 'Chicken Burgers',
    description:
      'Juicy crispy chicken fillet glazed with roasted garlic butter, melted mozzarella, crisp lettuce, and creamy herb dressing.',
    price: 820,
    spiceLevel: 'Mild',
    image: zingerImg,
    alt: 'Creamy Garlic Herb Chicken burger with melted cheese',
  },
  {
    id: 'cheese-molten-triple',
    name: 'Molten Triple Cheese Burger',
    category: 'Cheese Burgers',
    description:
      'Beef patty + crispy chicken fillet stacked with cheddar, mozzarella, and warm house cheese sauce with crispy onion straws.',
    price: 1250,
    originalPrice: 1450,
    discountBadge: 'Save Rs. 200',
    spiceLevel: 'Mild',
    image: cheeseBurgerImg,
    alt: 'Molten Triple Cheese Burger overflowing with warm cheddar cheese sauce',
    popular: true,
  },
  {
    id: 'cheese-smoky-cheddar-melt',
    name: 'Smoky Cheddar Beef Melt',
    category: 'Cheese Burgers',
    description:
      'Juicy single smash beef patty drenched in warm aged cheddar fondue, smoked turkey strips, and toasted brioche.',
    price: 960,
    spiceLevel: 'Mild',
    image: cheeseBurgerImg,
    alt: 'Smoky Cheddar Beef Melt burger with rich melted cheese sauce',
  },
  {
    id: 'fries-zinger-loaded',
    name: 'Zinger Loaded Masala Fries',
    category: 'Loaded Fries',
    description:
      'Crispy skin-on masala fries topped with chopped crunch zinger bites, warm cheddar sauce, jalapeños, and chipotle drizzle.',
    price: 690,
    originalPrice: 780,
    discountBadge: 'Fan Favorite',
    spiceLevel: 'Spicy',
    image: loadedFriesImg,
    alt: 'Zinger Loaded Masala Fries with crispy chicken chunks, melted cheese, and jalapeños',
    popular: true,
  },
  {
    id: 'fries-smoky-beef',
    name: 'Smoky Beef & Cheese Fries',
    category: 'Loaded Fries',
    description:
      'Golden crinkle-and-skin fries loaded with minced seared smash beef, caramelized onions, and double cheese drizzle.',
    price: 790,
    spiceLevel: 'Medium',
    image: loadedFriesImg,
    alt: 'Smoky Beef and Cheese Loaded Fries in a matte black tray',
  },
  {
    id: 'combo-solo-zinger',
    name: 'Solo Zinger Feast Combo',
    category: 'Deals & Combos',
    description:
      '1 Karachi Crunch Zinger + Regular Masala Fries + Garlic Mayo Dip + 1 Chilled 345ml Drink.',
    price: 1050,
    originalPrice: 1260,
    discountBadge: 'Save Rs. 210',
    spiceLevel: 'Spicy',
    image: dealsComboImg,
    alt: 'Solo Zinger Feast Combo with crispy zinger burger, fries, dip, and chilled drink',
  },
  {
    id: 'combo-duo-smash',
    name: 'Duo Smash & Zinger Box',
    category: 'Deals & Combos',
    description:
      '1 Double Charcoal Smash + 1 Karachi Crunch Zinger + Large Sharing Fries + 2 Garlic Dips + 2 Chilled Drinks.',
    price: 2250,
    originalPrice: 2700,
    discountBadge: 'Save 17%',
    spiceLevel: 'Medium',
    image: dealsComboImg,
    alt: 'Duo Smash and Zinger Box meal with two burgers, fries, dips, and two chilled drinks',
    popular: true,
  },
  {
    id: 'drink-mint-margarita',
    name: 'Fresh Mint Margarita',
    category: 'Drinks',
    description:
      'Zesty freshly squeezed lime blended with garden mint leaves, black salt, and crushed ice.',
    price: 350,
    image: drinksShakesImg,
    alt: 'Fresh Mint Margarita cooler with crushed ice and lime slices',
  },
  {
    id: 'drink-belgian-shake',
    name: 'Belgian Chocolate Malt Shake',
    category: 'Drinks',
    description:
      'Thick hand-spun dark chocolate ice cream shake finished with cocoa dust and chocolate shavings.',
    price: 550,
    image: drinksShakesImg,
    alt: 'Belgian Chocolate Malt Shake topped with cocoa and chocolate shavings',
  },
];
