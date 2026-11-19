/* Shopping cart display, quantity controls, and subtotal. */
document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const container = document.getElementById("cart-items");
  const empty = document.getElementById("empty-cart");
  const cart = getCart();

  container.innerHTML = "";
  empty.hidden = cart.length > 0;

  let itemCount = 0;
  let total = 0;
  let hasUnpricedItems = false;

  cart.forEach((item, index) => {
    const product = PRODUCTS[item.id];
    if (!product) return;

    itemCount += item.quantity;
    if (Number.isFinite(product.price)) {
      total += product.price * item.quantity;
    } else {
      hasUnpricedItems = true;
    }

    const row = document.createElement("article");
    row.className = "cart-row";
    row.innerHTML = `
      <div class="cart-product">
        <img
            src="images/${item.id}.png"
            alt="${product.name}"
            class="cart-thumb">
        <div>
          <div class="cart-product-name">${product.name}</div>
          <div class="cart-product-meta">Color: ${item.color}<br>Size: ${item.size}</div>
          <button type="button" class="remove-item" data-remove="${index}">Remove</button>
        </div>
      </div>
      <div class="quantity-control" aria-label="Quantity controls for ${product.name}">
        <button type="button" data-decrease="${index}" aria-label="Decrease quantity">−</button>
        <input type="number" min="1" max="99" value="${item.quantity}" data-quantity="${index}" aria-label="Quantity">
        <button type="button" data-increase="${index}" aria-label="Increase quantity">+</button>
      </div>
      <div class="cart-row-total">${formatPrice(Number.isFinite(product.price) ? product.price * item.quantity : null)}</div>`;
    container.appendChild(row);
  });

  document.getElementById("selected-items").textContent = itemCount;
  document.getElementById("cart-total").textContent = formatPrice(total);
  document.getElementById("cart-note").textContent = hasUnpricedItems
    ? "Some product prices are still placeholders. Update them in js/store.js to calculate the complete total."
    : "";

  container.querySelectorAll("[data-increase]").forEach(button => {
    button.addEventListener("click", () => changeQuantity(Number(button.dataset.increase), 1));
  });
  container.querySelectorAll("[data-decrease]").forEach(button => {
    button.addEventListener("click", () => changeQuantity(Number(button.dataset.decrease), -1));
  });
  container.querySelectorAll("[data-quantity]").forEach(input => {
    input.addEventListener("change", () => {
      const cartNow = getCart();
      const index = Number(input.dataset.quantity);
      cartNow[index].quantity = Math.max(1, Math.min(99, Number(input.value) || 1));
      saveCart(cartNow);
      renderCart();
    });
  });
  container.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      const cartNow = getCart();
      cartNow.splice(Number(button.dataset.remove), 1);
      saveCart(cartNow);
      renderCart();
    });
  });
}

function changeQuantity(index, amount) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].quantity = Math.max(1, Math.min(99, cart[index].quantity + amount));
  saveCart(cart);
  renderCart();
}
