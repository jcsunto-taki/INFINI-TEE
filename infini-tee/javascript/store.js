/* Shared product information and cart storage for all pages. */
const PRODUCTS = {
  product1: {
    id: "product1",
    name: "Don't Be Late Tee",
    price: 499,
    colors: ["White"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    description: "A white t-shirt with a printed 'Don't Be Late' design."
  },
  product2: {
    id: "product2",
    name: "Everyday Comfort Tee",
    price: 499,
    colors: ["Blue"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    description: "A blue t-shirt with a printed INFINI-TEE's logo."
  },
  product3: {
    id: "product3",
    name: "Do Good Work Tee",
    price: 499,
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    description: "A black t-shirt with a printed 'Do Good Work' design."
  }
};

const CART_STORAGE_KEY = "infinitee-cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartCount();
}

function formatPrice(price) {
  return Number.isFinite(price)
    ? "₱" + price.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "Set price";
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = count);
}

function addToCart(productId, color, size) {
  const product = PRODUCTS[productId];
  if (!product) return false;
  const cart = getCart();
  const existing = cart.find(item =>
    item.id === productId && item.color === color && item.size === size
  );
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, color, size, quantity: 1 });
  }
  saveCart(cart);
  return true;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
