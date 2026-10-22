


document.addEventListener('DOMContentLoaded', () => {

  
  const PRODUCTS = [
    { id: 'p01', name: 'Oversize Void Hoodie',      category: 'hoodies',     price: 189, oldPrice: null,  badge: 'Neu',      icon: 'hoodie' },
    { id: 'p02', name: 'Structured Bomber',         category: 'jackets',     price: 425, oldPrice: 520, badge: 'Sale',     icon: 'jacket' },
    { id: 'p03', name: 'Tapered Cargo Pants',       category: 'pants',       price: 249, oldPrice: null,  badge: null,       icon: 'pants' },
    { id: 'p04', name: 'Monolith Runner Sneaker',   category: 'sneakers',    price: 319, oldPrice: null,  badge: 'Neu',      icon: 'sneaker' },
    { id: 'p05', name: 'Sterling Chain Necklace',   category: 'accessories',price: 98,  oldPrice: null,  badge: null,       icon: 'accessory' },
    { id: 'p06', name: 'Raw Edge Zip Hoodie',       category: 'hoodies',     price: 212, oldPrice: null,  badge: null,       icon: 'hoodie' },
    { id: 'p07', name: 'Long Trench Coat',          category: 'jackets',     price: 589, oldPrice: null,  badge: 'Limitiert',  icon: 'jacket' },
    { id: 'p08', name: 'Wide Leg Wool Trousers',    category: 'pants',       price: 276, oldPrice: 330, badge: 'Sale',     icon: 'pants' },
    { id: 'p09', name: 'Nightform High-Top',        category: 'sneakers',    price: 294, oldPrice: null,  badge: null,       icon: 'sneaker' },
    { id: 'p10', name: 'Structured Leather Belt',   category: 'accessories',price: 123, oldPrice: null,  badge: null,       icon: 'accessory' },
    { id: 'p11', name: 'Double Layer Hoodie',       category: 'hoodies',     price: 238, oldPrice: null,  badge: 'Limitiert',  icon: 'hoodie' },
    { id: 'p12', name: 'Minimal Puffer Jacket',     category: 'jackets',     price: 367, oldPrice: null,  badge: 'Neu',      icon: 'jacket' },
    { id: 'p13', name: 'Straight Fit Denim',        category: 'pants',       price: 199, oldPrice: null,  badge: null,       icon: 'pants' },
    { id: 'p14', name: 'Low Profile Sneaker',       category: 'sneakers',    price: 265, oldPrice: 309, badge: 'Sale',     icon: 'sneaker' },
  ];

  
  const CATEGORY_ICONS = {
    hoodie: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M40 22c4-6 12-10 20-10s16 4 20 10l14 10-8 12-10-6v56a4 4 0 0 1-4 4H48a4 4 0 0 1-4-4V38l-10 6-8-12 14-10Z"/><path d="M50 24c2 6 6 10 10 10s8-4 10-10"/><circle cx="60" cy="52" r="3" fill="currentColor" stroke="none"/></svg>`,
    jacket: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M46 16 34 26l-16 8 6 16 10-4v56h52V46l10 4 6-16-16-8-12-10"/><path d="M46 16c2 8 7 13 14 13s12-5 14-13"/><path d="M60 44v58"/></svg>`,
    pants: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M34 16h52l4 30-6 58h-16l-6-52-6 52H40l-6-58 4-30Z"/><path d="M34 16h52" /></svg>`,
    sneaker: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 78c0-10 8-14 18-16l20-6 20-16c6-4 12-4 16 0l10 10c8 2 18 6 20 16v10a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6v-4Z"/><path d="M40 60v14M58 54v18M76 46v22" /></svg>`,
    accessory: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="60" cy="60" r="30"/><circle cx="60" cy="60" r="6" fill="currentColor" stroke="none"/><path d="M60 30v8M60 82v8M30 60h8M82 60h8"/></svg>`,
  };

  const CATEGORY_LABELS = {
    hoodies: 'Hoodies', jackets: 'Jacken', pants: 'Hosen',
    sneakers: 'Sneaker', accessories: 'Accessoires',
  };

  const money = (n) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(n);

  
  let cart = loadFromStorage('noir_cart', []);
  let favorites = loadFromStorage('noir_favs', []);

  let currentCategory = 'all';
  let currentSearch = '';
  let currentMaxPrice = 600;
  let currentSort = 'default';

  function loadFromStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveCart() { localStorage.setItem('noir_cart', JSON.stringify(cart)); }
  function saveFavs() { localStorage.setItem('noir_favs', JSON.stringify(favorites)); }

  
  const productGrid   = document.getElementById('product-grid');
  const emptyState     = document.getElementById('empty-state');
  const searchInput    = document.getElementById('search-input');
  const searchWrap      = document.getElementById('search-wrap');
  const searchToggle    = document.getElementById('search-toggle');
  const priceRange      = document.getElementById('price-range');
  const priceRangeValue = document.getElementById('price-range-value');
  const sortSelect       = document.getElementById('sort-select');
  const catButtons       = document.querySelectorAll('.cat-card');
  const resetFiltersBtn  = document.getElementById('reset-filters-btn');

  const cartToggle = document.getElementById('cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close');
  const cartItemsEl = document.getElementById('cart-items');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartFooterEl = document.getElementById('cart-footer');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCountEl = document.getElementById('cart-count');
  const checkoutBtn = document.getElementById('checkout-btn');

  const favToggle = document.getElementById('fav-toggle');
  const favDrawer = document.getElementById('fav-drawer');
  const favClose = document.getElementById('fav-close');
  const favItemsEl = document.getElementById('fav-items');
  const favEmptyEl = document.getElementById('fav-empty');
  const favCountEl = document.getElementById('fav-count');

  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const toastEl = document.getElementById('toast');

  const header = document.getElementById('site-header');
  const burger = document.getElementById('burger-toggle');
  const mainNav = document.getElementById('main-nav');
  const toTopBtn = document.getElementById('to-top');

  
  function getFilteredProducts() {
    let list = PRODUCTS.filter((p) => {
      const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
      const matchesSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
      const matchesPrice = p.price <= currentMaxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });

    if (currentSort === 'price-asc') list = list.slice().sort((a, b) => a.price - b.price);
    if (currentSort === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price);
    if (currentSort === 'name-asc') list = list.slice().sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }

  function renderProducts() {
    const list = getFilteredProducts();

    if (list.length === 0) {
      productGrid.innerHTML = '';
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;
    productGrid.innerHTML = list.map((p) => {
      const isFav = favorites.includes(p.id);
      return `
        <article class="product-card" data-id="${p.id}">
          <div class="product-media">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            <button class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${p.id}" aria-label="Zu Favoriten hinzufügen">
              <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
            </button>
            ${CATEGORY_ICONS[p.icon]}
          </div>
          <div class="product-info">
            <span class="product-cat">${CATEGORY_LABELS[p.category]}</span>
            <h3 class="product-name">${p.name}</h3>
            <div class="product-price-row">
              <span>
                ${p.oldPrice ? `<span class="product-price-old">${money(p.oldPrice)}</span>` : ''}
                <span class="product-price">${money(p.price)}</span>
              </span>
            </div>
            <div class="product-actions">
              <button class="btn btn-ghost" data-buy-id="${p.id}">Direkt kaufen</button>
              <button class="btn btn-primary" data-add-id="${p.id}">In den Warenkorb</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function updateCategoryCounts() {
    document.querySelectorAll('[data-count-for]').forEach((el) => {
      const cat = el.getAttribute('data-count-for');
      const count = cat === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat).length;
      el.textContent = count;
    });
  }

  
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim();
    renderProducts();
  });

  searchToggle.addEventListener('click', () => {
    searchWrap.classList.toggle('open');
    if (searchWrap.classList.contains('open')) searchInput.focus();
  });

  priceRange.addEventListener('input', (e) => {
    currentMaxPrice = Number(e.target.value);
    priceRangeValue.textContent = money(currentMaxPrice);
    renderProducts();
  });

  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  catButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentCategory = btn.getAttribute('data-category');
      catButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts();
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  resetFiltersBtn.addEventListener('click', () => {
    currentCategory = 'all';
    currentSearch = '';
    currentMaxPrice = 600;
    currentSort = 'default';
    searchInput.value = '';
    priceRange.value = 600;
    priceRangeValue.textContent = money(600);
    sortSelect.value = 'default';
    catButtons.forEach((b) => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
    renderProducts();
  });

  
  function addToCart(id) {
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, qty: 1 });
    }
    saveCart();
    renderCart();
    showToast('Artikel wurde in den Warenkorb gelegt.');
    bounceBadge(cartCountEl);
  }

  function changeQty(id, delta) {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((i) => i.id !== id);
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter((i) => i.id !== id);
    saveCart();
    renderCart();
  }

  function renderCart() {
    const hasItems = cart.length > 0;
    cartEmptyEl.style.display = hasItems ? 'none' : 'flex';
    cartFooterEl.style.display = hasItems ? 'block' : 'none';

    let total = 0;

    cartItemsEl.innerHTML = cart.map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) return '';
      const lineTotal = product.price * item.qty;
      total += lineTotal;
      return `
        <div class="cart-item">
          <div class="cart-item-media">${CATEGORY_ICONS[product.icon]}</div>
          <div>
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-cat">${CATEGORY_LABELS[product.category]}</div>
            <div class="qty-control">
              <button class="qty-btn" data-qty-minus="${product.id}">−</button>
              <span>${item.qty}</span>
              <button class="qty-btn" data-qty-plus="${product.id}">+</button>
            </div>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-price">${money(lineTotal)}</span>
            <button class="remove-btn" data-remove-id="${product.id}">Entfernen</button>
          </div>
        </div>
      `;
    }).join('');

    cartTotalEl.textContent = money(total);

    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    cartCountEl.textContent = count;
    cartCountEl.classList.toggle('show', count > 0);
  }

  cartToggle.addEventListener('click', () => openDrawer(cartDrawer));
  cartClose.addEventListener('click', () => closeDrawers());
  checkoutBtn.addEventListener('click', () => {
    showToast('Vielen Dank! Die Bestellung wurde im Demo-Modus simuliert.');
    cart = [];
    saveCart();
    renderCart();
    closeDrawers();
  });

  
  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter((f) => f !== id);
    } else {
      favorites.push(id);
      showToast('Zu den Favoriten hinzugefügt.');
    }
    saveFavs();
    renderProducts();
    renderFavorites();
    bounceBadge(favCountEl);
  }

  function renderFavorites() {
    const hasItems = favorites.length > 0;
    favEmptyEl.style.display = hasItems ? 'none' : 'flex';

    favItemsEl.innerHTML = favorites.map((id) => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return '';
      return `
        <div class="fav-item">
          <div class="fav-item-media">${CATEGORY_ICONS[product.icon]}</div>
          <div>
            <div class="fav-item-name">${product.name}</div>
            <div class="fav-item-cat">${CATEGORY_LABELS[product.category]}</div>
            <div class="cart-item-price">${money(product.price)}</div>
          </div>
          <div class="fav-item-actions">
            <button class="btn btn-primary btn-small" data-add-id="${product.id}">In den Warenkorb</button>
            <button class="fav-remove-btn" data-fav-remove="${product.id}">Aus Favoriten entfernen</button>
          </div>
        </div>
      `;
    }).join('');

    favCountEl.textContent = favorites.length;
    favCountEl.classList.toggle('show', favorites.length > 0);
  }

  favToggle.addEventListener('click', () => openDrawer(favDrawer));
  favClose.addEventListener('click', () => closeDrawers());

  
  function openDrawer(drawerEl) {
    closeDrawers();
    drawerEl.classList.add('open');
    drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawers() {
    cartDrawer.classList.remove('open');
    favDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  drawerBackdrop.addEventListener('click', closeDrawers);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawers(); });

  
  productGrid.addEventListener('click', (e) => {
    const favBtn = e.target.closest('[data-fav-id]');
    const addBtn = e.target.closest('[data-add-id]');
    const buyBtn = e.target.closest('[data-buy-id]');

    if (favBtn) toggleFavorite(favBtn.getAttribute('data-fav-id'));
    if (addBtn) addToCart(addBtn.getAttribute('data-add-id'));
    if (buyBtn) {
      addToCart(buyBtn.getAttribute('data-buy-id'));
      openDrawer(cartDrawer);
    }
  });

  cartItemsEl.addEventListener('click', (e) => {
    const plus = e.target.closest('[data-qty-plus]');
    const minus = e.target.closest('[data-qty-minus]');
    const remove = e.target.closest('[data-remove-id]');
    if (plus) changeQty(plus.getAttribute('data-qty-plus'), 1);
    if (minus) changeQty(minus.getAttribute('data-qty-minus'), -1);
    if (remove) removeFromCart(remove.getAttribute('data-remove-id'));
  });

  favItemsEl.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add-id]');
    const removeBtn = e.target.closest('[data-fav-remove]');
    if (addBtn) addToCart(addBtn.getAttribute('data-add-id'));
    if (removeBtn) toggleFavorite(removeBtn.getAttribute('data-fav-remove'));
  });

  
  let toastTimer = null;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  function bounceBadge(el) {
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
  }

  
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    toTopBtn.classList.toggle('show', window.scrollY > 700);
  }, { passive: true });

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mainNav.classList.toggle('mobile-open');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mainNav.classList.remove('mobile-open');
    });
  });

  toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-reveal-child]').forEach((el) => revealObserver.observe(el));

  
  const heroPhoto = document.getElementById('hero-photo');
  const heroFallback = document.getElementById('hero-fallback');
  heroPhoto.addEventListener('load', () => {
    heroPhoto.classList.add('loaded');
    heroFallback.style.display = 'none';
  });
  heroPhoto.addEventListener('error', () => {
    heroPhoto.style.display = 'none';
  });

  
  document.querySelectorAll('[data-demo-link]').forEach((link) => link.addEventListener('click', (e) => { e.preventDefault(); showToast('Diese Information wird im Demo-Shop noch ergänzt.'); }));

  document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Vielen Dank für deine Anmeldung!');
    e.target.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 900);
  });
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 2500);

  
  updateCategoryCounts();
  renderProducts();
  renderCart();
  renderFavorites();

  
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  let width, height, dpr;
  let particles = [];
  let mode = 'float';
  let modeTimer = 0;
  let targets = [];
  let silhouetteIndex = 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmallScreen = window.innerWidth < 700;
  const PARTICLE_COUNT = prefersReducedMotion ? 0 : (isSmallScreen ? 260 : 620);
  const CONNECT_DIST = isSmallScreen ? 70 : 95;

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildSilhouettePoints();
  }

  
  class Particle {
    constructor() {
      this.reset();
      this.targetX = null;
      this.targetY = null;
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.6 + 0.6;
      this.baseAlpha = Math.random() * 0.5 + 0.25;
      this.twinklePhase = Math.random() * Math.PI * 2;
    }
    update(time) {
      if ((mode === 'forming' || mode === 'holding') && this.targetX !== null) {
        this.x += (this.targetX - this.x) * 0.045;
        this.y += (this.targetY - this.y) * 0.045;
      } else {
        this.x += this.vx + Math.sin(time * 0.0006 + this.twinklePhase) * 0.08;
        this.y += this.vy + Math.cos(time * 0.0005 + this.twinklePhase) * 0.08;
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }
    }
    draw(time) {
      const twinkle = 0.6 + 0.4 * Math.sin(time * 0.002 + this.twinklePhase);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 238, 232, ${this.baseAlpha * twinkle})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  
  function buildSilhouettePoints() {
    targets = { human: [], garment: [] };
    if (PARTICLE_COUNT === 0) return;

    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height) * 0.62;
    const humanSegments = [
      [0, -0.62, 0, -0.42],
      [-0.22, -0.28, 0.22, -0.28],
      [-0.22, -0.28, -0.30, 0.05],
      [-0.30, 0.05, -0.26, 0.34],
      [0.22, -0.28, 0.30, 0.05],
      [0.30, 0.05, 0.26, 0.34],
      [-0.16, -0.26, -0.14, 0.30],
      [0.16, -0.26, 0.14, 0.30],
      [-0.14, 0.30, -0.16, 0.75],
      [0.14, 0.30, 0.16, 0.75],
    ];
    humanSegments.forEach(([x1, y1, x2, y2]) => addSegmentPoints(targets.human, cx, cy, scale, x1, y1, x2, y2, 14));
    addCirclePoints(targets.human, cx + 0, cy - 0.74 * scale, scale * 0.09, 16);
    const garmentSegments = [
      [-0.10, -0.55, 0.10, -0.55],
      [-0.10, -0.55, -0.20, -0.40],
      [0.10, -0.55, 0.20, -0.40],
      [-0.20, -0.40, -0.34, -0.30],
      [0.20, -0.40, 0.34, -0.30],
      [-0.34, -0.30, -0.40, 0.10],
      [0.34, -0.30, 0.40, 0.10],
      [-0.34, -0.30, -0.22, 0.45],
      [0.34, -0.30, 0.22, 0.45],
      [-0.22, 0.45, 0.22, 0.45],
      [-0.10, -0.15, 0.10, -0.15],
      [-0.10, -0.15, -0.12, 0.10],
      [0.10, -0.15, 0.12, 0.10],
      [-0.12, 0.10, 0.12, 0.10],
    ];
    garmentSegments.forEach(([x1, y1, x2, y2]) => addSegmentPoints(targets.garment, cx, cy, scale, x1, y1, x2, y2, 14));
  }

  function addSegmentPoints(arr, cx, cy, scale, x1, y1, x2, y2, count) {
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      arr.push({ x: cx + (x1 + (x2 - x1) * t) * scale, y: cy + (y1 + (y2 - y1) * t) * scale });
    }
  }

  function addCirclePoints(arr, cx, cy, r, count) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
    }
  }

  
  function assignTargets(shapeName) {
    const points = targets[shapeName];
    if (!points || points.length === 0) return;
    particles.forEach((p, i) => {
      const point = points[i % points.length];
      p.targetX = point.x + (Math.random() - 0.5) * 6;
      p.targetY = point.y + (Math.random() - 0.5) * 6;
    });
  }

  function clearTargets() {
    particles.forEach((p) => { p.targetX = null; p.targetY = null; });
  }

  
  function updateModeCycle(dt) {
    if (PARTICLE_COUNT === 0) return;
    modeTimer += dt;

    const FLOAT_DURATION = 7000;
    const FORM_DURATION = 3200;
    const HOLD_DURATION = 3400;

    if (mode === 'float' && modeTimer > FLOAT_DURATION) {
      mode = 'forming';
      modeTimer = 0;
      const shape = silhouetteIndex % 2 === 0 ? 'human' : 'garment';
      assignTargets(shape);
    } else if (mode === 'forming' && modeTimer > FORM_DURATION) {
      mode = 'holding';
      modeTimer = 0;
    } else if (mode === 'holding' && modeTimer > HOLD_DURATION) {
      mode = 'float';
      modeTimer = 0;
      silhouetteIndex += 1;
      clearTargets();
      particles.forEach((p) => {
        p.vx = (Math.random() - 0.5) * 0.6;
        p.vy = (Math.random() - 0.5) * 0.6;
      });
    }
  }

  
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * (mode === 'float' ? 0.10 : 0.16);
          ctx.strokeStyle = `rgba(230, 226, 216, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  let lastTime = performance.now();
  function animate(time) {
    const dt = time - lastTime;
    lastTime = time;

    ctx.clearRect(0, 0, width, height);

    updateModeCycle(dt);
    particles.forEach((p) => p.update(time));
    drawConnections();
    particles.forEach((p) => p.draw(time));

    requestAnimationFrame(animate);
  }

  resizeCanvas();
  initParticles();
  requestAnimationFrame(animate);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 200);
  });

  
  const heroFrame = document.querySelector('.hero-frame');
  if (heroFrame && window.innerWidth > 880 && !prefersReducedMotion) {
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
      const relX = (e.clientX / window.innerWidth - 0.5) * 2;
      const relY = (e.clientY / window.innerHeight - 0.5) * 2;
      heroFrame.style.transform = `rotateY(${relX * 4}deg) rotateX(${-relY * 4}deg)`;
    });
    document.querySelector('.hero').addEventListener('mouseleave', () => {
      heroFrame.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
    heroFrame.style.transition = 'transform 0.4s ease-out';
    heroFrame.style.transformStyle = 'preserve-3d';
  }

});
