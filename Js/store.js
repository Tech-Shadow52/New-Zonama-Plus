// store.js — Global state for Zonama marketplace
const Store = (() => {
  let state = {
    products: [],
    filteredProducts: [],
    cart: JSON.parse(localStorage.getItem('zonama_cart') || '[]'),
    user: null,
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'relevance',
    wishlist: JSON.parse(localStorage.getItem('zonama_wishlist') || '[]'),
  };

  const listeners = {};

  function on(event, cb) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(cb);
  }

  function emit(event, data) {
    (listeners[event] || []).forEach(cb => cb(data));
  }

  function getState() { return { ...state }; }

  // --- Cart ---
  function addToCart(productId, qty = 1) {
    const product = state.products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;
    const existing = state.cart.find(i => i.id === productId);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, product.stock);
    } else {
      state.cart.push({ id: productId, qty });
    }
    _saveCart();
    emit('cartUpdated', state.cart);
    emit('toast', { type: 'success', message: `"${product.name}" agregado al carrito` });
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(i => i.id !== productId);
    _saveCart();
    emit('cartUpdated', state.cart);
  }

  function updateQty(productId, qty) {
    const item = state.cart.find(i => i.id === productId);
    if (item) { item.qty = qty <= 0 ? (removeFromCart(productId), 0) : qty; }
    _saveCart();
    emit('cartUpdated', state.cart);
  }

  function getCartItems() {
    return state.cart.map(i => ({
      ...state.products.find(p => p.id === i.id),
      qty: i.qty,
    })).filter(Boolean);
  }

  function getCartTotal() {
    return getCartItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getCartCount() {
    return state.cart.reduce((sum, i) => sum + i.qty, 0);
  }

  function _saveCart() {
    localStorage.setItem('zonama_cart', JSON.stringify(state.cart));
  }

  // --- Wishlist ---
  function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx > -1) { state.wishlist.splice(idx, 1); }
    else { state.wishlist.push(productId); }
    localStorage.setItem('zonama_wishlist', JSON.stringify(state.wishlist));
    emit('wishlistUpdated', state.wishlist);
  }

  function isWishlisted(productId) { return state.wishlist.includes(productId); }

  // --- Products & Filters ---
  function setProducts(products) {
    state.products = products;
    applyFilters();
  }

  function setCategory(cat) {
    state.activeCategory = cat;
    applyFilters();
  }

  function setSearch(q) {
    state.searchQuery = q.toLowerCase().trim();
    applyFilters();
  }

  function setSort(sort) {
    state.sortBy = sort;
    applyFilters();
  }

  function applyFilters() {
    let result = [...state.products];
    if (state.activeCategory !== 'all') {
      result = result.filter(p => p.category === state.activeCategory);
    }
    if (state.searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(state.searchQuery) ||
        p.description.toLowerCase().includes(state.searchQuery) ||
        (p.tags || []).some(t => t.includes(state.searchQuery))
      );
    }
    const sorts = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'rating': (a, b) => b.rating - a.rating,
      'relevance': (a, b) => b.reviews - a.reviews,
    };
    if (sorts[state.sortBy]) result.sort(sorts[state.sortBy]);
    state.filteredProducts = result;
    emit('productsUpdated', result);
  }

  return {
    on, emit, getState,
    addToCart, removeFromCart, updateQty, getCartItems, getCartTotal, getCartCount,
    toggleWishlist, isWishlisted,
    setProducts, setCategory, setSearch, setSort, applyFilters,
  };
})();
