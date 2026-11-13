export type FulfillmentMode = 'delivery' | 'pickup';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryLabel: string;
  quantity: number;
}

export interface DeliveryFormState {
  customerName: string;
  phone: string;
  area: string;
  address: string;
  notes: string;
}

export interface PickupFormState {
  customerName: string;
  phone: string;
  branchId: string;
  pickupTime: string;
  notes: string;
}

export interface OrderPreviewPayload {
  orderReference: string;
  createdAtIso: string;
  fulfillmentMode: FulfillmentMode;
  customer: {
    name: string;
    phone: string;
    area?: string;
    address?: string;
    branchId?: string;
    branchName?: string;
    pickupTime?: string;
    notes?: string;
  };
  items: Array<{
    id: string;
    name: string;
    unitPricePkr: number;
    quantity: number;
    lineTotalPkr: number;
  }>;
  pricing: {
    subtotalPkr: number;
    deliveryFeePkr: number;
    totalPkr: number;
    currency: 'PKR';
  };
}

export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateDeliveryFee(
  subtotal: number,
  mode: FulfillmentMode,
  baseFee: number,
  freeThreshold: number
): number {
  if (mode === 'pickup' || subtotal === 0) {
    return 0;
  }
  return subtotal >= freeThreshold ? 0 : baseFee;
}

export function calculateTotal(subtotal: number, deliveryFee: number): number {
  return subtotal + deliveryFee;
}

/**
 * Validates common Pakistani mobile/landline formats:
 * e.g., +92 300 1234567, 03001234567, 0300-1234567, +923001234567
 */
export function validatePakistaniPhone(rawPhone: string): boolean {
  const cleaned = rawPhone.replace(/[\s\-()]/g, '');
  return /^(\+92|92|0)?3\d{9}$/.test(cleaned) || /^(\+92|0)\d{9,10}$/.test(cleaned);
}

/**
 * Generates a structured JSON payload ready for a future Express / MongoDB / WhatsApp API endpoint.
 * Note: Frontend-only demo; does not transmit or persist orders.
 */
export function buildOrderPayloadPreview(params: {
  mode: FulfillmentMode;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryForm: DeliveryFormState;
  pickupForm: PickupFormState;
  branchName?: string;
}): OrderPreviewPayload {
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  return {
    orderReference: `BG-DEMO-${randomCode}`,
    createdAtIso: new Date().toISOString(),
    fulfillmentMode: params.mode,
    customer:
      params.mode === 'delivery'
        ? {
            name: params.deliveryForm.customerName.trim(),
            phone: params.deliveryForm.phone.trim(),
            area: params.deliveryForm.area,
            address: params.deliveryForm.address.trim(),
            notes: params.deliveryForm.notes.trim() || undefined,
          }
        : {
            name: params.pickupForm.customerName.trim(),
            phone: params.pickupForm.phone.trim(),
            branchId: params.pickupForm.branchId,
            branchName: params.branchName,
            pickupTime: params.pickupForm.pickupTime,
            notes: params.pickupForm.notes.trim() || undefined,
          },
    items: params.items.map((item) => ({
      id: item.id,
      name: item.name,
      unitPricePkr: item.price,
      quantity: item.quantity,
      lineTotalPkr: item.price * item.quantity,
    })),
    pricing: {
      subtotalPkr: params.subtotal,
      deliveryFeePkr: params.deliveryFee,
      totalPkr: params.total,
      currency: 'PKR',
    },
  };
}
