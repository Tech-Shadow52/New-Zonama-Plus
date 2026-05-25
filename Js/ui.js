// ui.js — Renders all dynamic UI components for Zonama

const UI = (() => {

  // --- Product Card ---
  function renderProductCard(product) {
    const isWished = Store.isWishlisted(product.id);
    const discount = product.originalPrice
      ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
    const stars = renderStars(product.rating);
    const badgeClass = {
      'Más vendido': 'badge--sold',
      'Nuevo': 'badge--new',
      'Oferta': 'badge--sale',
      'Agotado': 'badge--out',
    }[product.badge] || '';

    return `
      <article class="product-card ${product.stock === 0 ? 'product-card--out' : ''}"
               data-id="${product.id}" onclick="Modal.openProduct('${product.id}')">
        <div class="product-card__img-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy" class="product-card__img">
          ${product.badge ? `<span class="badge ${badgeClass}">${product.badge}</span>` : ''}
          ${discount ? `<span class="badge badge--discount">-${discount}%</span>` : ''}
          <button class="wishlist-btn ${isWished ? 'wishlist-btn--active' : ''}"
                  onclick="event.stopPropagation(); Store.toggleWishlist('${product.id}'); this.classList.toggle('wishlist-btn--active')"
                  aria-label="Guardar en lista de deseos">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        <div class="product-card__body">
          <p class="product-card__seller">${product.sellerName}</p>
          <h3 class="product-card__name">${product.name}</h3>
          <div class="product-card__rating">
            ${stars}
            <span class="rating-count">(${product.reviews.toLocaleString()})</span>
          </div>
          <div class="product-card__pricing">
            <span class="price-current">${formatCurrency(product.price)}</span>
            ${product.originalPrice ? `<span class="price-original">${formatCurrency(product.originalPrice)}</span>` : ''}
          </div>
          <button class="btn btn--primary btn--full ${product.stock === 0 ? 'btn--disabled' : ''}"
                  onclick="event.stopPropagation(); ${product.stock > 0 ? `Store.addToCart('${product.id}')` : ''}"
                  ${product.stock === 0 ? 'disabled' : ''}>
            ${product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
          </button>
        </div>
      </article>
    `;
  }

  function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) html += '<span class="star star--full">★</span>';
      else if (i - rating < 1) html += '<span class="star star--half">★</span>';
      else html += '<span class="star star--empty">★</span>';
    }
    return `<div class="stars" aria-label="${rating} de 5">${html}<span class="rating-num">${rating}</span></div>`;
  }

  function renderProductGrid(products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    if (!products.length) {
      grid.innerHTML = `<div class="empty-state">
        <span class="empty-state__icon">🔍</span>
        <p>No encontramos productos para tu búsqueda.</p>
        <button class="btn btn--outline" onclick="Store.setSearch(''); Store.setCategory('all')">Ver todos</button>
      </div>`;
      return;
    }
    grid.innerHTML = products.map(renderProductCard).join('');
  }

  // --- Cart Count Badge ---
  function updateCartBadge(count) {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
    badge.parentElement.classList.toggle('cart-btn--active', count > 0);
  }

  // --- Toast Notifications ---
  function showToast({ type = 'info', message }) {
    const container = document.getElementById('toast-container') || (() => {
      const el = document.createElement('div');
      el.id = 'toast-container';
      document.body.appendChild(el);
      return el;
    })();
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <span class="toast__icon">${{ success: '✓', error: '✕', info: 'ℹ' }[type]}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast--visible'));
    setTimeout(() => {
      toast.classList.remove('toast--visible');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- Category Pills ---
  function renderCategories(categories) {
    const nav = document.getElementById('category-nav');
    if (!nav) return;
    nav.innerHTML = categories.map(cat => `
      <button class="category-pill ${cat.id === 'all' ? 'category-pill--active' : ''}"
              data-cat="${cat.id}" onclick="UI.selectCategory('${cat.id}', this)">
        <span class="category-pill__icon">${cat.icon}</span>
        ${cat.label}
      </button>
    `).join('');
  }

  function selectCategory(catId, btn) {
    document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('category-pill--active'));
    btn.classList.add('category-pill--active');
    Store.setCategory(catId);
  }

  // --- Helpers ---
  function formatCurrency(amount) {
    return new Intl.NumberFormat('es-SV', { style: 'currency', currency: 'USD' }).format(amount);
  }

  return { renderProductCard, renderProductGrid, renderStars, updateCartBadge, showToast, renderCategories, selectCategory, formatCurrency };
})();

// Global helper
function formatCurrency(v) { return UI.formatCurrency(v); }
