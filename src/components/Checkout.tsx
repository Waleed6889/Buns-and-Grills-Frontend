
import { useState } from 'react';
import {
  Truck,
  Store,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ShoppingBag,
} from 'lucide-react';

import { restaurantData } from '../data/restaurantData';
import { createOrder } from '../services/api';

import {
  CartItem,
  DeliveryFormState,
  FulfillmentMode,
  OrderPreviewPayload,
  PickupFormState,
  buildOrderPayloadPreview,
  calculateDeliveryFee,
  calculateTotal,
  formatPKR,
  validatePakistaniPhone,
} from '../utils/orderHelpers';

interface CheckoutProps {
  items: CartItem[];
  subtotal: number;
  onUpdateQuantity: (id: string, nextQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function Checkout({
  items,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CheckoutProps) {
  const { ordering } = restaurantData;

  const [mode, setMode] = useState<FulfillmentMode>('delivery');

  const [deliveryForm, setDeliveryForm] = useState<DeliveryFormState>({
    customerName: '',
    phone: '',
    area: ordering.deliveryAreas[0],
    address: '',
    notes: '',
  });

  const [pickupForm, setPickupForm] = useState<PickupFormState>({
    customerName: '',
    phone: '',
    branchId: ordering.pickupBranches[0].id,
    pickupTime: ordering.pickupTimeSlots[0],
    notes: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submittedOrder, setSubmittedOrder] =
    useState<OrderPreviewPayload | null>(null);

  const deliveryFee = calculateDeliveryFee(
    subtotal,
    mode,
    ordering.deliveryFee,
    ordering.freeDeliveryThreshold
  );

  const totalAmount = calculateTotal(subtotal, deliveryFee);

  const selectedBranch = ordering.pickupBranches.find(
    (branch) => branch.id === pickupForm.branchId
  );

  const handleModeSwitch = (nextMode: FulfillmentMode) => {
    setMode(nextMode);
    setErrorMessage(null);
  };

  // Submit order to the backend
  const handleSubmitOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage(
        'Please add at least one item from the menu before placing your order.'
      );
      return;
    }

    const form = mode === 'delivery' ? deliveryForm : pickupForm;

    if (!form.customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!validatePakistaniPhone(form.phone)) {
      setErrorMessage(
        'Please enter a valid Pakistani mobile number (e.g., +92 300 1234567 or 0300-1234567).'
      );
      return;
    }

    if (
      mode === 'delivery' &&
      deliveryForm.address.trim().length < 10
    ) {
      setErrorMessage(
        'Please enter a complete street/house delivery address so our rider can find you.'
      );
      return;
    }

    if (
      mode === 'pickup' &&
      (!pickupForm.branchId || !pickupForm.pickupTime)
    ) {
      setErrorMessage('Please select a pickup branch and time.');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createOrder({
        fulfillmentMode: mode,

        customer: {
          name: form.customerName.trim(),
          phone: form.phone.trim(),

          ...(mode === 'delivery'
            ? {
                area: deliveryForm.area,
                address: deliveryForm.address.trim(),
                notes: deliveryForm.notes,
              }
            : {
                branchId: pickupForm.branchId,
                branchName: selectedBranch?.name,
                pickupTime: pickupForm.pickupTime,
                notes: pickupForm.notes,
              }),
        },

        // Send only item IDs and quantities.
        // The backend calculates prices using MongoDB data.
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      // Build the confirmation using the backend's actual prices.
      const preview = buildOrderPayloadPreview({
        mode,
        items,
        subtotal: order.pricing.subtotalPkr,
        deliveryFee: order.pricing.deliveryFeePkr,
        total: order.pricing.totalPkr,
        deliveryForm,
        pickupForm,
        branchName: selectedBranch?.name,
      });

      setSubmittedOrder({
        ...preview,
        orderReference: order.orderReference,

        // Use item prices calculated by the backend.
        items: order.items.map((item: {
          id: string;
          name: string;
          quantity: number;
          lineTotalPkr: number;
        }) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          lineTotalPkr: item.lineTotalPkr,
        })),
      });

      onClearCart();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to place your order. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNewOrder = () => {
    setSubmittedOrder(null);
    setErrorMessage(null);
  };

  return (
    <section
      id="order"
      className="py-16 sm:py-20 bg-white border-b border-zinc-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-[#EA580C] mb-2">
            Online Ordering &amp; Checkout
          </p>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#141416] tracking-tight [text-wrap:balance] mb-3">
            Complete Your Delivery or Pickup Order
          </h2>

          <p className="text-sm sm:text-base text-zinc-600">
            Select Home Delivery to your doorstep or Takeaway Pickup from our nearest Karachi counter.
          </p>
        </div>

        {/* Order Confirmation */}
        {submittedOrder ? (
          <div className="rounded-xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:p-8 max-w-3xl">

            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2
                  className="w-6 h-6"
                  aria-hidden="true"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-emerald-700 mb-1">
                  Order Confirmed · {submittedOrder.orderReference}
                </p>

                <h3 className="font-display text-2xl font-bold text-[#141416]">
                  Thank you, {submittedOrder.customer.name}!
                </h3>

                <p className="text-sm text-zinc-600 mt-1">
                  Your order has been successfully saved.
                </p>
              </div>
            </div>

            {/* Order Receipt */}
            <div className="rounded-lg border border-zinc-200 bg-white p-5 mb-6 space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pb-4 border-b border-zinc-100">

                <div>
                  <span className="block text-xs text-zinc-500">
                    Order Type
                  </span>

                  <span className="font-semibold text-[#141416]">
                    {submittedOrder.fulfillmentMode === 'delivery'
                      ? 'Home Delivery (Cash on Delivery)'
                      : 'Takeaway / Counter Pickup'}
                  </span>
                </div>

                <div>
                  <span className="block text-xs text-zinc-500">
                    Contact Number
                  </span>

                  <span className="font-semibold text-[#141416] tabular-nums">
                    {submittedOrder.customer.phone}
                  </span>
                </div>

                {submittedOrder.fulfillmentMode === 'delivery' ? (
                  <div className="sm:col-span-2">
                    <span className="block text-xs text-zinc-500">
                      Delivery Address
                    </span>

                    <span className="font-medium text-[#141416]">
                      {submittedOrder.customer.address},{' '}
                      {submittedOrder.customer.area}
                    </span>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="block text-xs text-zinc-500">
                        Pickup Branch
                      </span>

                      <span className="font-medium text-[#141416]">
                        {submittedOrder.customer.branchName}
                      </span>
                    </div>

                    <div>
                      <span className="block text-xs text-zinc-500">
                        Pickup Time
                      </span>

                      <span className="font-medium text-[#141416]">
                        {submittedOrder.customer.pickupTime}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Ordered Items */}
              <ul className="space-y-2 text-sm">
                {submittedOrder.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-zinc-700">
                      {item.quantity}x {item.name}
                    </span>

                    <span className="font-medium text-[#141416] tabular-nums">
                      {formatPKR(item.lineTotalPkr)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Pricing */}
              <div className="pt-3 border-t border-zinc-100 space-y-1.5 text-sm">

                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>

                  <span className="tabular-nums">
                    {formatPKR(submittedOrder.pricing.subtotalPkr)}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-600">
                  <span>Delivery Fee</span>

                  <span className="tabular-nums">
                    {submittedOrder.pricing.deliveryFeePkr === 0
                      ? 'Free'
                      : formatPKR(
                          submittedOrder.pricing.deliveryFeePkr
                        )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#141416] pt-1">
                  <span>Total Payable</span>

                  <span className="tabular-nums">
                    {formatPKR(submittedOrder.pricing.totalPkr)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartNewOrder}
              className="px-5 py-3 min-h-[44px] rounded-lg text-sm font-semibold text-white bg-[#141416] hover:bg-[#EA580C] transition-colors cursor-pointer"
            >
              Start Another Order
            </button>
          </div>
        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Checkout Form */}
            <div className="lg:col-span-7 rounded-xl border border-zinc-200 bg-[#FAFAFA] p-5 sm:p-8">

              {/* Delivery / Pickup Toggle */}
              <div
                role="tablist"
                aria-label="Order Fulfillment Method"
                className="grid grid-cols-2 gap-2 p-1.5 rounded-lg bg-zinc-200/70 mb-6"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'delivery'}
                  onClick={() => handleModeSwitch('delivery')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 min-h-[44px] rounded-md text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    mode === 'delivery'
                      ? 'bg-white text-[#141416] shadow-sm'
                      : 'text-zinc-600 hover:text-[#141416]'
                  }`}
                >
                  <Truck className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>Home Delivery</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'pickup'}
                  onClick={() => handleModeSwitch('pickup')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 min-h-[44px] rounded-md text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    mode === 'pickup'
                      ? 'bg-white text-[#141416] shadow-sm'
                      : 'text-zinc-600 hover:text-[#141416]'
                  }`}
                >
                  <Store className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>Takeaway / Pickup</span>
                </button>
              </div>

              <form
                onSubmit={handleSubmitOrder}
                noValidate
                className="space-y-5"
              >

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Delivery Form */}
                {mode === 'delivery' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>
                        <label
                          htmlFor="delivery-name"
                          className="block text-sm font-medium text-[#141416] mb-1.5"
                        >
                          Full Name
                        </label>

                        <input
                          id="delivery-name"
                          type="text"
                          required
                          placeholder="e.g., Saad Ahmed"
                          value={deliveryForm.customerName}
                          onChange={(e) =>
                            setDeliveryForm((prev) => ({
                              ...prev,
                              customerName: e.target.value,
                            }))
                          }
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-[#141416] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="delivery-phone"
                          className="block text-sm font-medium text-[#141416] mb-1.5"
                        >
                          Phone Number (+92)
                        </label>

                        <input
                          id="delivery-phone"
                          type="tel"
                          required
                          placeholder="+92 300 1234567"
                          value={deliveryForm.phone}
                          onChange={(e) =>
                            setDeliveryForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-[#141416] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="delivery-area"
                        className="block text-sm font-medium text-[#141416] mb-1.5"
                      >
                        Delivery Area (Karachi)
                      </label>

                      <select
                        id="delivery-area"
                        value={deliveryForm.area}
                        onChange={(e) =>
                          setDeliveryForm((prev) => ({
                            ...prev,
                            area: e.target.value,
                          }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-[#141416] focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                      >
                        {ordering.deliveryAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="delivery-address"
                        className="block text-sm font-medium text-[#141416] mb-1.5"
                      >
                        Complete Delivery Address
                      </label>

                      <textarea
                        id="delivery-address"
                        rows={3}
                        required
                        placeholder="House/Flat No., Street/Lane, Sector or Nearest Landmark"
                        value={deliveryForm.address}
                        onChange={(e) =>
                          setDeliveryForm((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-[#141416] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="delivery-notes"
                        className="block text-sm font-medium text-[#141416] mb-1.5"
                      >
                        Rider / Spice Notes (Optional)
                      </label>

                      <input
                        id="delivery-notes"
                        type="text"
                        placeholder="e.g., Extra garlic dip, ring doorbell twice"
                        value={deliveryForm.notes}
                        onChange={(e) =>
                          setDeliveryForm((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-[#141416] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                      />
                    </div>
                  </>
                ) : (

                  /* Pickup Form */
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>
                        <label
                          htmlFor="pickup-name"
                          className="block text-sm font-medium text-[#141416] mb-1.5"
                        >
                          Full Name
                        </label>

                        <input
                          id="pickup-name"
                          type="text"
                          required
                          placeholder="e.g., Hira Mansoor"
                          value={pickupForm.customerName}
                          onChange={(e) =>
                            setPickupForm((prev) => ({
                              ...prev,
                              customerName: e.target.value,
                            }))
                          }
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-[#141416] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="pickup-phone"
                          className="block text-sm font-medium text-[#141416] mb-1.5"
                        >
                          Phone Number (+92)
                        </label>

                        <input
                          id="pickup-phone"
                          type="tel"
                          required
                          placeholder="+92 321 9876543"
                          value={pickupForm.phone}
                          onChange={(e) =>
                            setPickupForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-[#141416] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="pickup-branch"
                        className="block text-sm font-medium text-[#141416] mb-1.5"
                      >
                        Select Pickup Branch
                      </label>

                      <select
                        id="pickup-branch"
                        value={pickupForm.branchId}
                        onChange={(e) =>
                          setPickupForm((prev) => ({
                            ...prev,
                            branchId: e.target.value,
                          }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-[#141416] focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                      >
                        {ordering.pickupBranches.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.name}
                          </option>
                        ))}
                      </select>

                      {selectedBranch && (
                        <p className="mt-1.5 text-xs text-zinc-500">
                          {selectedBranch.address} · {selectedBranch.pickupEstimate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="pickup-time"
                        className="block text-sm font-medium text-[#141416] mb-1.5"
                      >
                        Preferred Pickup Time
                      </label>

                      <select
                        id="pickup-time"
                        value={pickupForm.pickupTime}
                        onChange={(e) =>
                          setPickupForm((prev) => ({
                            ...prev,
                            pickupTime: e.target.value,
                          }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-[#141416] focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                      >
                        {ordering.pickupTimeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="pickup-notes"
                        className="block text-sm font-medium text-[#141416] mb-1.5"
                      >
                        Kitchen Instructions (Optional)
                      </label>

                      <input
                        id="pickup-notes"
                        type="text"
                        placeholder="e.g., Pack sauces separately"
                        value={pickupForm.notes}
                        onChange={(e) =>
                          setPickupForm((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-[#141416] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg text-base font-semibold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141416] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>
                      {isSubmitting
                        ? 'Submitting Order...'
                        : mode === 'delivery'
                          ? `Place Delivery Order · ${formatPKR(totalAmount)}`
                          : `Place Pickup Order · ${formatPKR(totalAmount)}`}
                    </span>
                  </button>

                  <p className="mt-2.5 text-xs text-zinc-500 text-center">
                    Payment method: Cash on Delivery / Cash on Pickup.
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <aside
              aria-label="Order Summary"
              className="lg:col-span-5 rounded-xl border border-zinc-200 bg-white p-5 sm:p-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-4">
                <h3 className="font-display text-xl font-bold text-[#141416]">
                  Order Summary
                </h3>

                <span className="text-xs font-medium text-zinc-500 tabular-nums">
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>

              {items.length === 0 ? (
                <div className="py-10 text-center">
                  <ShoppingBag className="w-8 h-8 text-zinc-300 mx-auto mb-3" />

                  <p className="text-sm text-zinc-600 mb-4">
                    No food items selected yet. Add burgers or deals from the menu above.
                  </p>

                  <a
                    href="#menu"
                    className="inline-flex items-center justify-center px-4 py-2.5 min-h-[42px] rounded-lg text-sm font-semibold text-white bg-[#141416] hover:bg-[#EA580C] transition-colors"
                  >
                    Explore Menu
                  </a>
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-zinc-100 max-h-80 overflow-y-auto pr-1 mb-5">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="py-3 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#141416] truncate">
                            {item.name}
                          </p>

                          <p className="text-xs text-zinc-500 tabular-nums">
                            {formatPKR(item.price)} each
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">

                          {/* Quantity Controls */}
                          <div className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-zinc-600 hover:text-[#141416] cursor-pointer"
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>

                            <span className="w-6 text-center text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-zinc-600 hover:text-[#141416] cursor-pointer"
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="w-20 text-right text-sm font-semibold text-[#141416] tabular-nums">
                            {formatPKR(item.price * item.quantity)}
                          </span>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Price Summary */}
                  <div className="pt-4 border-t border-zinc-200 space-y-2.5 text-sm">

                    <div className="flex items-center justify-between text-zinc-600">
                      <span>Subtotal</span>

                      <span className="font-medium text-[#141416] tabular-nums">
                        {formatPKR(subtotal)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-zinc-600">
                      <span>
                        {mode === 'delivery'
                          ? 'Home Delivery Fee'
                          : 'Takeaway Counter Fee'}
                      </span>

                      <span className="font-medium text-[#141416] tabular-nums">
                        {deliveryFee === 0
                          ? 'Free'
                          : formatPKR(deliveryFee)}
                      </span>
                    </div>

                    {mode === 'delivery' &&
                      subtotal < ordering.freeDeliveryThreshold && (
                        <p className="text-xs text-zinc-500">
                          Free delivery on orders of{' '}
                          {formatPKR(ordering.freeDeliveryThreshold)} or more.
                        </p>
                      )}

                    <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                      <span className="font-display text-base font-bold text-[#141416]">
                        Total Amount
                      </span>

                      <span className="font-display text-xl font-bold text-[#EA580C] tabular-nums">
                        {formatPKR(totalAmount)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
