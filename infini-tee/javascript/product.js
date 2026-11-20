/* Product page behavior: options, Add to Cart, and product-to-product links. */
document.addEventListener("DOMContentLoaded", () => {
  const match = window.location.pathname.match(/product([123])\.html$/i);
  const productId = match ? `product${match[1]}` : "product1";
  const product = PRODUCTS[productId];
  if (!product) return;

  document.title = `INFINI-TEE | ${product.name}`;
  document.getElementById("breadcrumb-product").textContent = product.name;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = formatPrice(product.price);
  document.getElementById("product-description").textContent = product.description;

  let selectedColor = product.colors[0];
  let selectedSize = product.sizes[0];

  const colorContainer = document.getElementById("color-options");
  product.colors.forEach((color, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button color-button";
    button.textContent = color.toUpperCase();
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    button.addEventListener("click", () => {
      selectedColor = color;
      colorContainer.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
    });
    colorContainer.appendChild(button);
  });

  const sizeContainer = document.getElementById("size-options");
  product.sizes.forEach((size, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = size;
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    button.addEventListener("click", () => {
      selectedSize = size;
      sizeContainer.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
    });
    sizeContainer.appendChild(button);
  });

  document.getElementById("add-to-cart").addEventListener("click", () => {
    addToCart(productId, selectedColor, selectedSize);
    document.getElementById("cart-feedback").textContent =
      `${product.name} (${selectedColor}, ${selectedSize}) added to your cart.`;
  });

  const ids = ["product1", "product2", "product3"];
  const index = ids.indexOf(productId);
  const previous = ids[(index + ids.length - 1) % ids.length];
  const next = ids[(index + 1) % ids.length];
  const previousLink = document.getElementById("previous-product");
  const nextLink = document.getElementById("next-product");
  previousLink.href = `${previous}.html`;
  previousLink.textContent = `← ${PRODUCTS[previous].name}`;
  nextLink.href = `${next}.html`;
  nextLink.textContent = `${PRODUCTS[next].name} →`;
});
