export interface TestimonialItem {
  id: string;
  customerName: string;
  neighborhood: string;
  rating: number;
  orderedItem: string;
  reviewText: string;
  initials: string;
}

export const testimonialsNote =
  'Sample customer feedback shown for demonstration — easily editable by the restaurant team in testimonialsData.ts.';

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'review-1',
    customerName: 'Hamza Siddiqui',
    neighborhood: 'DHA Phase 6, Karachi',
    rating: 5,
    orderedItem: 'Double Charcoal Smash',
    reviewText:
      'Finally a smash burger in Karachi that actually has crispy seared edges and arrives piping hot. The ember sauce balances the double cheddar without feeling heavy.',
    initials: 'HS',
  },
  {
    id: 'review-2',
    customerName: 'Ayesha Tariq',
    neighborhood: 'Clifton Block 4, Karachi',
    rating: 5,
    orderedItem: 'Karachi Crunch Zinger & Mint Margarita',
    reviewText:
      'Ordered the Zinger Combo for lunch at work and it reached in 30 minutes still crunchy. The brioche bun holds together right till the last bite.',
    initials: 'AT',
  },
  {
    id: 'review-3',
    customerName: 'Bilal Mehmood',
    neighborhood: 'PECHS Block 2, Karachi',
    rating: 5,
    orderedItem: 'Family Burger Box',
    reviewText:
      'We grabbed the Family Burger Box on Friday night. Generous portions, clean tamper-sealed packaging, and the loaded masala fries were gone in five minutes.',
    initials: 'BM',
  },
  {
    id: 'review-4',
    customerName: 'Zainab Farooq',
    neighborhood: 'Bahadurabad, Karachi',
    rating: 5,
    orderedItem: 'Molten Triple Cheese Burger',
    reviewText:
      'Takeaway pickup from the Bahadurabad counter was super quick. You can see the open grill from the counter and everything looks spotless.',
    initials: 'ZF',
  },
];
