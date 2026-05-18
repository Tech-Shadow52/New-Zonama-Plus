// modal.js — All modals for Zonama (cart, product detail, login)
const Modal = (() => {
  let activeModal = null;

  function open(id) {
    closeAll();
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('modal--open');
    document.body.classList.add('body--modal-open');
    activeModal = modal;
    modal.querySelector('[data-modal-close]')?.focus();
    document.addEventListener('keydown', _handleEsc);
  }

  function close(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('modal--open');
    document.body.classList.remove('body--modal-open');
    activeModal = null;
    document.removeEventListener('keydown', _handleEsc);
  }

  function closeAll() {
    document.querySelectorAll('.modal--open').forEach(m => m.classList.remove('modal--open'));
    document.body.classList.remove('body--modal-open');
    activeModal = null;
  }

  function _handleEsc(e) { if (e.key === 'Escape') closeAll(); }

  // --- Cart Modal ---
  function openCart() {
    renderCartModal();
    open('cart-modal');
  }

  function renderCartModal() {
    const items = Store.getCartItems();
    const body = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer');
    if (!body) return;

    if (!items.length) {
      body.innerHTML = `<div class="cart-empty">
        <p class="cart-empty__icon">🛒</p>
        <p>Tu carrito está vacío</p>
        <button class="btn btn--primary" onclick="Modal.closeAll()">Seguir comprando</button>
      </div>`;
      footer.style.display = 'none';
      return;
    }

    body.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item__img">
        <div class="cart-item__info">
          <p class="cart-item__name">${item.name}</p>
          <p class="cart-item__seller">${item.sellerName}</p>
          <div class="cart-item__controls">
            <div class="qty-control">
              <button onclick="Store.updateQty('${item.id}', ${item.qty - 1}); Modal.renderCartModal()" aria-label="Disminuir">−</button>
              <span>${item.qty}</span>
              <button onclick="Store.updateQty('${item.id}', ${item.qty + 1}); Modal.renderCartModal()" aria-label="Aumentar">+</button>
            </div>
            <button class="cart-item__remove" onclick="Store.removeFromCart('${item.id}'); Modal.renderCartModal()">Eliminar</button>
          </div>
        </div>
        <p class="cart-item__price">${formatCurrency(item.price * item.qty)}</p>
      </div>
    `).join('');

    footer.style.display = 'block';
    document.getElementById('cart-total').textContent = formatCurrency(Store.getCartTotal());
  }

  // --- Product Detail Modal ---
  function openProduct(productId) {
    const product = Store.getState().products.find(p => p.id === productId);
    if (!product) return;
    const modal = document.getElementById('product-modal');
    if (!modal) return;

    const discount = product.originalPrice
      ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

    modal.querySelector('.product-modal__content').innerHTML = `
      <div class="product-modal__img-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-modal__img">
        ${discount ? `<span class="badge badge--discount badge--lg">-${discount}%</span>` : ''}
      </div>
      <div class="product-modal__info">
        <p class="product-modal__seller">${product.sellerName}</p>
        <h2 class="product-modal__name">${product.name}</h2>
        ${UI.renderStars(product.rating)}
        <p class="product-modal__reviews">${product.reviews.toLocaleString()} reseñas</p>
        <div class="product-modal__pricing">
          <span class="price-current price-current--lg">${formatCurrency(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatCurrency(product.originalPrice)}</span>` : ''}
        </div>
        <p class="product-modal__desc">${product.description}</p>
        <div class="product-modal__tags">
          ${(product.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <p class="product-modal__stock ${product.stock < 10 ? 'stock--low' : ''}">
          ${product.stock === 0 ? '❌ Sin stock' : product.stock < 10 ? `⚠️ Solo ${product.stock} disponibles` : '✅ En stock'}
        </p>
        <div class="product-modal__actions">
          <button class="btn btn--primary btn--lg ${product.stock === 0 ? 'btn--disabled' : ''}"
                  ${product.stock === 0 ? 'disabled' : ''}
                  onclick="Store.addToCart('${product.id}'); Modal.closeAll()">
            🛒 Agregar al carrito
          </button>
          <button class="btn btn--outline btn--lg" onclick="Modal.closeAll()">Seguir viendo</button>
        </div>
      </div>
    `;
    open('product-modal');
  }

  // --- Login Modal ---
  function openLogin() { open('login-modal'); }

  return { open, close, closeAll, openCart, openProduct, openLogin, renderCartModal };
})();
