/* Creates the three product cards on the shop page. */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("shop-products");
  if (!container) return;

  Object.values(PRODUCTS).forEach(product => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    col.innerHTML = `
      <article class="card product-card">
        <a class="product-card-link" href="${product.id}.html">
          <img
            src="images/${product.id}.png"
            alt="${product.name}"
            class="product-image-placeholder">
          <div class="card-body">
            <h3 class="card-title">${product.name}</h3>
            <p class="card-text mb-2">${formatPrice(product.price)}</p>
            <span class="btn btn-outline-primary">View Product</span>
          </div>
        </a>
      </article>`;
    container.appendChild(col);
  });
});
