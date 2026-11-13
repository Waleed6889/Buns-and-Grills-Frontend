
const API_URL = import.meta.env.VITE_API_URL;

export const getMenu = async () => {
  const response = await fetch(`${API_URL}/api/menu`);

  if (!response.ok) throw new Error("Failed to fetch menu");

  const result = await response.json();
  return result.data;
};

export const getDeals = async () => {
  const response = await fetch(`${API_URL}/api/deals`);

  if (!response.ok) throw new Error("Failed to fetch deals");

  const result = await response.json();
  return result.data;
};

export const createOrder = async (orderData: {
  fulfillmentMode: "delivery" | "pickup";
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
  items: {
    id: string;
    quantity: number;
  }[];
}) => {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Order failed");
  }

  return result.data;
};

export const trackOrder = async (orderReference: string) => {
  const response = await fetch(
    `${API_URL}/api/orders/${encodeURIComponent(orderReference)}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Order not found");
  }

  return result.data;
};
