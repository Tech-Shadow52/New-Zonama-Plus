// E-commerce Application Logic
class ECommerceApp {
    constructor() {
        this.currentUser = null;
        this.cart = [];
        this.products = [];
        this.currentStep = 1;
        this.currentImageData = null;
        this.imageUploadConfigured = false;
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.updateCartDisplay();
        
        // Ensure all modals are hidden on page load
        this.hideAllModals();
        
        // Setup accessibility features
        this.setupImageLightbox();
        this.setupKeyboardNavigation();
        this.lastFocusedElement = null;
        
        // Setup image upload functionality
        this.currentImageData = null;
        this.setupImageUpload();
    }

    hideAllModals() {
        const modals = ['authModal', 'cartModal', 'checkoutModal', 'productModal', 'sellerModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            }
        });
        document.body.style.overflow = 'auto';
    }

    // Complete Product Catalog
    loadProducts() {
        this.products = [
            // Electronics Category
            {
                id: 1,
                title: "Micrófono Gamer Pro",
                brand: "AudioTech",
                price: 89.99,
                type: "physical",
                category: "electronics",
                available: true,
                image: "productos/microfono gamer pro.avif",
                description: "Micrófono profesional para streaming y gaming con cancelación de ruido, brazo ajustable y calidad de estudio.",
                rating: 4.7,
                specs: "USB, Cancelación de ruido, Brazo ajustable",
                warranty: "2 years",
                brand: "AudioTech"
            },
            {
                id: 2,
                title: "Webcam HD Pro",
                brand: "VisionTech",
                price: 79.99,
                type: "physical",
                category: "electronics",
                available: true,
                image: "productos/webcam.avif",
                description: "Webcam Full HD 1080p con enfoque automático, micrófono integrado y corrección de luz. Perfecta para videollamadas y streaming.",
                rating: 4.5,
                specs: "1080p, Enfoque automático, Micrófono integrado",
                warranty: "1 year",
                brand: "VisionTech"
            },
            {
                id: 3,
                title: "Auriculares Simples",
                brand: "BasicSound",
                price: 24.99,
                type: "physical",
                category: "electronics",
                available: true,
                image: "productos/auriculares simples para gente pobre (o muy pragmatica).avif",
                description: "Auriculares prácticos y económicos con buen sonido. Perfectos para uso diario, trabajo o estudio.",
                rating: 4.2,
                specs: "Cable 3.5mm, Ligeros, Cómodos",
                warranty: "6 months",
                brand: "BasicSound"
            },
            {
                id: 4,
                title: "Hub USB Multipuerto",
                brand: "ConnectPro",
                price: 34.99,
                type: "physical",
                category: "electronics",
                available: true,
                image: "productos/hub usb.avif",
                description: "Hub USB con múltiples puertos para expandir la conectividad de tu laptop o PC. Incluye puertos USB 3.0 de alta velocidad.",
                rating: 4.4,
                specs: "USB 3.0, 4 puertos, Plug & Play",
                warranty: "1 year",
                brand: "ConnectPro"
            },
            {
                id: 5,
                title: "Altavoces para Ordenador",
                brand: "SoundMax",
                price: 45.99,
                type: "physical",
                category: "electronics",
                available: true,
                image: "productos/altavoces ordenador.avif",
                description: "Altavoces estéreo para PC con sonido potente y claro. Control de volumen integrado y conexión USB.",
                rating: 4.3,
                specs: "Estéreo, USB, Control de volumen",
                warranty: "1 year",
                brand: "SoundMax"
            },
            {
                id: 6,
                title: "Controller Gaming",
                brand: "GamePro",
                price: 59.99,
                type: "physical",
                category: "electronics",
                available: true,
                image: "productos/controller.avif",
                description: "Control inalámbrico para gaming con vibración, batería recargable y compatibilidad con PC y consolas.",
                rating: 4.6,
                specs: "Inalámbrico, Vibración, Batería recargable",
                warranty: "1 year",
                brand: "GamePro"
            },
            {
                id: 7,
                title: "Tapones Antipolvo USB-C",
                brand: "ProtectTech",
                price: 8.99,
                type: "physical",
                category: "electronics",
                available: true,
                image: "productos/tapones antipolvo ubs c.avif",
                description: "Set de tapones protectores para puertos USB-C. Protege tus dispositivos del polvo y la suciedad.",
                rating: 4.1,
                specs: "Pack de 10, Silicona, Universal",
                warranty: "N/A",
                brand: "ProtectTech"
            },

            // Clothing & Accessories Category
            {
                id: 20,
                title: "Camisa Cyberpunk",
                brand: "FutureWear",
                price: 39.99,
                type: "physical",
                category: "clothing",
                available: true,
                image: "productos/camisa cyberpunk.avif",
                description: "Camisa estilo cyberpunk con diseño futurista. Perfecta para fans del género y estilo urbano moderno.",
                rating: 4.5,
                material: "Algodón y Poliéster",
                sizes: "S, M, L, XL, XXL",
                brand: "FutureWear"
            },
            {
                id: 21,
                title: "Funda Cyberpunk Edgerunners",
                brand: "AnimeTech",
                price: 19.99,
                type: "physical",
                category: "clothing",
                available: true,
                image: "productos/funda cyberpunk edgerunners.avif",
                description: "Funda para smartphone con diseño de Cyberpunk Edgerunners. Protección y estilo para tu dispositivo.",
                rating: 4.6,
                material: "TPU resistente",
                sizes: "Compatible con varios modelos",
                brand: "AnimeTech"
            },
            {
                id: 22,
                title: "Funda Universal",
                brand: "ProtectCase",
                price: 14.99,
                type: "physical",
                category: "clothing",
                available: true,
                image: "productos/funda.avif",
                description: "Funda universal para smartphone con diseño elegante. Protección completa contra golpes y rayones.",
                rating: 4.3,
                material: "Silicona premium",
                sizes: "Universal",
                brand: "ProtectCase"
            },
            {
                id: 23,
                title: "Pulsera de Moda",
                brand: "AccessStyle",
                price: 12.99,
                type: "physical",
                category: "clothing",
                available: true,
                image: "productos/pulsera.avif",
                description: "Pulsera elegante y moderna. Accesorio perfecto para cualquier ocasión.",
                rating: 4.2,
                material: "Aleación de metal",
                sizes: "Ajustable",
                brand: "AccessStyle"
            },
            {
                id: 24,
                title: "Gafas de Natación",
                brand: "AquaPro",
                price: 18.99,
                type: "physical",
                category: "clothing",
                available: true,
                image: "productos/gafas de natación.avif",
                description: "Gafas de natación profesionales con protección UV y ajuste cómodo. Perfectas para piscina y mar.",
                rating: 4.4,
                material: "Silicona y policarbonato",
                sizes: "Ajustable",
                brand: "AquaPro"
            },

            // Home Category
            {
                id: 30,
                title: "Cojín de Asiento",
                brand: "ComfortHome",
                price: 24.99,
                type: "physical",
                category: "home",
                available: true,
                image: "productos/cojin de asiento.avif",
                description: "Cojín ergonómico para silla con memoria de forma. Ideal para oficina, coche o hogar.",
                rating: 4.5,
                features: "Memoria de forma, Transpirable, Lavable",
                material: "Espuma viscoelástica",
                brand: "ComfortHome"
            },
            {
                id: 31,
                title: "Almohada para Dormir",
                brand: "DreamSoft",
                price: 29.99,
                type: "physical",
                category: "home",
                available: true,
                image: "productos/cosa para dormir.avif",
                description: "Almohada ergonómica de alta calidad para un descanso perfecto. Hipoalergénica y transpirable.",
                rating: 4.6,
                features: "Ergonómica, Hipoalergénica, Transpirable",
                material: "Fibra premium",
                brand: "DreamSoft"
            },
            {
                id: 32,
                title: "Mousepad Gaming Power",
                brand: "GameDesk",
                price: 19.99,
                type: "physical",
                category: "home",
                available: true,
                image: "productos/mousepad power.avif",
                description: "Mousepad gaming de gran tamaño con superficie antideslizante y base de goma. Perfecto para gamers.",
                rating: 4.4,
                material: "Superficie de tela, Base de goma",
                size: "80x30cm",
                brand: "GameDesk"
            },
            {
                id: 33,
                title: "Soporte 360° para Teléfono/Tablet",
                brand: "HoldTech",
                price: 16.99,
                type: "physical",
                category: "home",
                available: true,
                image: "productos/soporte 360 telefono tab.avif",
                description: "Soporte ajustable 360° para smartphone y tablet. Perfecto para escritorio, cama o cocina.",
                rating: 4.3,
                features: "Rotación 360°, Ajustable, Universal",
                material: "Aluminio y plástico",
                brand: "HoldTech"
            },
            {
                id: 34,
                title: "Cubierta para Moto",
                brand: "MotoProtect",
                price: 34.99,
                type: "physical",
                category: "home",
                available: true,
                image: "productos/cubierta de moto.avif",
                description: "Cubierta impermeable para motocicleta. Protección completa contra lluvia, sol y polvo.",
                rating: 4.2,
                features: "Impermeable, UV Protection, Resistente",
                material: "Poliéster resistente",
                brand: "MotoProtect"
            },

            // Books & Collectibles Category
            {
                id: 41,
                title: "Figura Fumo Reimu Touhou",
                brand: "AnimeCollect",
                price: 29.99,
                type: "physical",
                category: "misc",
                available: true,
                image: "productos/fumo reimu touhou gamer pro.avif",
                description: "Figura coleccionable Fumo de Reimu Hakurei de Touhou Project. Perfecta para fans y coleccionistas.",
                rating: 4.8,
                specs: "Figura de peluche, Alta calidad",
                material: "Peluche premium",
                brand: "AnimeCollect"
            },
            {
                id: 42,
                title: "Figura Bocchi",
                brand: "AnimeCollect",
                price: 34.99,
                type: "physical",
                category: "misc",
                available: true,
                image: "productos/bocchi.avif",
                description: "Figura coleccionable de Bocchi the Rock. Detallada y de alta calidad para fans del anime.",
                rating: 4.7,
                specs: "Figura PVC, Pintada a mano",
                material: "PVC de alta calidad",
                brand: "AnimeCollect"
            },
            {
                id: 43,
                title: "Figura Frieren",
                brand: "AnimeCollect",
                price: 39.99,
                type: "physical",
                category: "misc",
                available: true,
                image: "productos/frieren.avif",
                description: "Figura coleccionable de Frieren: Beyond Journey's End. Excelente calidad y detalles.",
                rating: 4.9,
                specs: "Figura PVC, Edición especial",
                material: "PVC premium",
                brand: "AnimeCollect"
            },
            {
                id: 44,
                title: "Figura Ado",
                brand: "MusicCollect",
                price: 32.99,
                type: "physical",
                category: "misc",
                available: true,
                image: "productos/ado.avif",
                description: "Figura coleccionable de Ado, la famosa cantante japonesa. Para fans de J-Pop.",
                rating: 4.6,
                specs: "Figura PVC, Edición limitada",
                material: "PVC",
                brand: "MusicCollect"
            },
            {
                id: 45,
                title: "Llavero Gurren Lagann",
                brand: "AnimeKeys",
                price: 9.99,
                type: "physical",
                category: "misc",
                available: true,
                image: "productos/llavero gurren laggan.avif",
                description: "Llavero metálico de Gurren Lagann. Accesorio perfecto para fans del anime mecha.",
                rating: 4.5,
                specs: "Metal, Resistente",
                material: "Aleación de zinc",
                brand: "AnimeKeys"
            },
            {
                id: 46,
                title: "Artículo Especial",
                brand: "SpecialItems",
                price: 19.99,
                type: "physical",
                category: "misc",
                available: true,
                image: "productos/si.avif",
                description: "Artículo especial de colección. Edición limitada para verdaderos coleccionistas.",
                rating: 4.4,
                specs: "Edición limitada",
                material: "Varios materiales",
                brand: "SpecialItems"
            },
            {
                id: 47,
                title: "Artículo Premium",
                brand: "PremiumGoods",
                price: 24.99,
                type: "physical",
                category: "misc",
                available: true,
                image: "productos/450185705f404dfc823593062d7d9ad2-goods.avif",
                description: "Artículo premium de alta calidad. Perfecto para regalo o colección personal.",
                rating: 4.3,
                specs: "Alta calidad, Diseño único",
                material: "Premium",
                brand: "PremiumGoods"
            }
        ];
        
        this.displayProducts();
    }

    setupEventListeners() {
        // Auth modal
        const loginBtn = document.getElementById('loginBtn');
        const authModal = document.getElementById('authModal');
        const cartIcon = document.querySelector('.cart-icon');
        const cartModal = document.getElementById('cartModal');
        const checkoutModal = document.getElementById('checkoutModal');

        // Modal controls
        this.setupModalControls();
        
        // Auth tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchAuthTab(e.target.dataset.tab);
            });
        });

        // Auth forms
        document.querySelectorAll('.auth-form form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAuth(form);
            });
        });

        // Search functionality
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Botón de buscar sigue funcionando
searchBtn.addEventListener('click', () => this.searchProducts());

// Búsqueda en tiempo real mientras se escribe
searchInput.addEventListener('input', () => {
    this.searchProducts();
});

// Enter también dispara la búsqueda (pero ya no es necesario)
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        this.searchProducts();
    }
});

    // Filtros por tipo de producto (Todos / Físicos / Digitales)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.filter;   // "all", "physical", "digital"
            this.filterByType(type);
        });
    });

    // Ordenar productos (select "Ordenar por")
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            this.sortProducts(e.target.value);
        });
    }

    // Tarjetas de categorías (Comida Local, Artesanías, Ropa, etc.)
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;  // "food", "crafts", "electronics", etc.
            this.filterByCategory(category);
        });
    });

    // Botón "Mostrar Todos los Productos"
    const showAllBtn = document.getElementById('showAllProducts');
    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            // Limpia el buscador y muestra todo
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = '';
            this.displayProducts();
        });
    }



        // Cart functionality
        cartIcon.addEventListener('click', () => {
            this.showModal('cartModal');
        });

        // Checkout process
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            if (this.cart.length === 0) {
                this.showNotification('Tu carrito está vacío', 'warning');
                return;
            }
            
            if (!this.currentUser) {
                this.showNotification('Debes iniciar sesión para continuar', 'warning');
                this.showModal('authModal');
                return;
            }
            
            this.hideModal('cartModal');
            this.showModal('checkoutModal');
            this.currentStep = 1;
            this.showCheckoutStep(1);
        });

        // Checkout steps
        document.querySelector('.next-step').addEventListener('click', () => {
            this.nextCheckoutStep();
        });

        document.getElementById('processPayment').addEventListener('click', () => {
            this.processPayment();
        });

        // Login button
        loginBtn.addEventListener('click', () => {
            if (this.currentUser) {
                this.logout();
            } else {
                this.showModal('authModal');
            }
        });

        // Seller buttons
        const sellerBtn = document.getElementById('sellerBtn');
        const heroSellerBtn = document.getElementById('heroSellerBtn');
        const footerSellerLink = document.getElementById('footerSellerLink');
        
        if (sellerBtn) {
            sellerBtn.addEventListener('click', () => {
                // If seller is logged in, go to dashboard, otherwise show seller modal
                if (this.currentSeller) {
                    this.openSellerDashboard();
                } else {
                    this.showModal('sellerModal');
                }
            });
        }
        if (heroSellerBtn) {
            heroSellerBtn.addEventListener('click', () => {
                if (this.currentSeller) {
                    this.openSellerDashboard();
                } else {
                    this.showModal('sellerModal');
                }
            });
        }
        if (footerSellerLink) {
            footerSellerLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.currentSeller) {
                    this.openSellerDashboard();
                } else {
                    this.showModal('sellerModal');
                }
            });
        }

        // Plan buttons
        document.querySelectorAll('.btn-plan').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const planName = e.target.closest('.plan-card').querySelector('h3').textContent;
                this.handlePlanSelection(planName, e.target);
            });
        });
    }

    setupModalControls() {
        // Close modal functionality
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal.id);
            });
            
            // Keyboard accessibility for close button
            closeBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const modal = e.target.closest('.modal');
                    this.hideModal(modal.id);
                }
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                }
            });
            
            // Keyboard accessibility - ESC key to close
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hideModal(modal.id);
                }
            });
        });
        
        // Setup image lightbox functionality
        this.setupImageLightbox();
    }
    
    setupImageLightbox() {
        // Add click handler to product detail image
        document.addEventListener('click', (e) => {
            if (e.target.id === 'productDetailImage' && e.target.src) {
                this.openLightbox(e.target.src, e.target.alt);
            }
        });
        
        // Keyboard accessibility for product detail image
        document.addEventListener('keydown', (e) => {
            const target = e.target;
            if (target.id === 'productDetailImage' && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                if (target.src) {
                    this.openLightbox(target.src, target.alt);
                }
            }
        });
        
        // Close lightbox when clicking on image or outside
        const lightbox = document.getElementById('imageLightbox');
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target.id === 'lightboxImage') {
                    this.closeLightbox();
                }
            });
        }
    }
    
    openLightbox(imageSrc, imageAlt) {
        const lightbox = document.getElementById('imageLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');
        
        if (lightbox && lightboxImage) {
            lightboxImage.src = imageSrc;
            lightboxImage.alt = imageAlt || 'Imagen del producto';
            lightboxCaption.textContent = imageAlt || 'Imagen del producto';
            
            this.showModal('imageLightbox');
            
            // Focus on the image for accessibility
            setTimeout(() => {
                lightboxImage.focus();
            }, 100);
        }
    }
    
    closeLightbox() {
        this.hideModal('imageLightbox');
        // Return focus to the product detail image
        const productImage = document.getElementById('productDetailImage');
        if (productImage) {
            productImage.focus();
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Trap focus within modal
            this.trapFocus(modal);
            
            // Store the element that opened the modal for focus return
            this.lastFocusedElement = document.activeElement;
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
            
            // Return focus to the element that opened the modal
            if (this.lastFocusedElement) {
                this.lastFocusedElement.focus();
            }
        }
    }
    
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
        
        // Focus first element
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }

    setupKeyboardNavigation() {
        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModals = document.querySelectorAll('.modal[style*="display: block"]');
                openModals.forEach(modal => {
                    this.hideModal(modal.id);
                });
            }
        });
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }

    switchAuthTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${tab}Form`).classList.add('active');
    }

    handleAuth(form) {
        const formData = new FormData(form);
        const isLogin = form.closest('#loginForm');
        
        if (isLogin) {
            // Simulate login
            this.currentUser = {
                name: "Usuario Demo",
                email: form.querySelector('input[type="email"]').value
            };
            this.showNotification('Sesión iniciada correctamente', 'success');
        } else {
            // Simulate registration
            this.currentUser = {
                name: form.querySelector('input[type="text"]').value,
                email: form.querySelector('input[type="email"]').value
            };
            this.showNotification('Cuenta creada correctamente', 'success');
        }
        
        this.updateLoginButton();
        this.hideModal('authModal');
    }

    updateLoginButton() {
        const loginBtn = document.getElementById('loginBtn');
        if (this.currentUser) {
            loginBtn.textContent = `Hola, ${this.currentUser.name.split(' ')[0]}`;
            loginBtn.style.background = 'linear-gradient(135deg, #4caf50, #388e3c)';
        } else {
            loginBtn.textContent = 'Iniciar Sesión';
            loginBtn.style.background = 'linear-gradient(135deg, #9c27b0, #673ab7)';
        }
    }

    logout() {
        this.currentUser = null;
        this.cart = [];
        this.updateLoginButton();
        this.updateCartDisplay();
        this.showNotification('Sesión cerrada', 'success');
    }

    displayProducts(productsToShow = this.products) {
        const grid = document.getElementById('productsGrid');
        
        if (productsToShow.length === 0) {
            grid.innerHTML = '<div class="no-products">No se encontraron productos</div>';
            return;
        }

        grid.innerHTML = productsToShow.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image loading" onclick="showProductDetail(${product.id})" style="cursor: pointer;">
                    <img src="${product.image}" alt="${product.title}" loading="lazy" onload="this.classList.add('loaded'); this.parentElement.classList.remove('loading')" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:3rem;color:#dee2e6\\'>📷</div>'">
                </div>
                <div class="product-info">
                    <h3 class="product-title" onclick="showProductDetail(${product.id})" style="cursor: pointer;">${product.title}</h3>
                    ${product.author ? `<p class="product-author">by ${product.author}</p>` : ''}
                    ${product.brand ? `<p class="product-brand">${product.brand}</p>` : ''}
                    ${product.seller ? `<p class="product-seller">Vendido por: ${product.seller}</p>` : ''}
                    ${product.location && product.type === 'physical' ? `<p class="product-location"><i class="fas fa-map-marker-alt"></i> ${product.location}</p>` : ''}
                    <div class="product-rating">
                        <div class="stars">${this.generateStars(product.rating)}</div>
                        <span>${product.rating}</span>
                    </div>
                    <div class="product-price">$${product.price}</div>
                    <span class="product-type ${product.type}">${product.type === 'physical' ? 'Físico' : 'Digital'}</span>
                    <div class="product-availability ${product.available ? 'available' : 'unavailable'}">
                        ${product.available ? '✓ Disponible' : '✗ No disponible'}
                    </div>
                    <button class="add-to-cart" ${!product.available ? 'disabled' : ''} 
                            onclick="app.addToCart(${product.id})">
                        ${product.available ? 'Agregar al Carrito' : 'No Disponible'}
                    </button>
                    <button class="view-details" onclick="showProductDetail(${product.id})">
                        Ver Detalles
                    </button>
                </div>
            </div>
        `).join('');
        
        // Update filter counts
        this.updateFilterCounts();
    }

searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();

    const heroSection = document.querySelector('.hero');
    const benefitsSection = document.querySelector('.benefits');
    const productsSection = document.querySelector('.products');

    // ¿Debemos hacer scroll? Solo la primera vez que se empieza a buscar,
    // cuando el hero todavía está visible.
    let shouldScroll = heroSection && heroSection.style.display !== 'none';

    // Si NO hay texto en el buscador: mostrar todo y reactivar secciones
    if (!query) {
        this.displayProducts();

        if (heroSection) heroSection.style.display = '';
        if (benefitsSection) benefitsSection.style.display = '';

        return;
    }

    // Si hay texto: ocultar hero + beneficios
    if (heroSection) heroSection.style.display = 'none';
    if (benefitsSection) benefitsSection.style.display = 'none';

    // Filtrar productos
    const filtered = this.products.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.seller && product.seller.toLowerCase().includes(query))
    );

    this.displayProducts(filtered);

    // Hacer scroll a productos solo la primera vez
    if (shouldScroll && productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}



    filterByType(type) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${type}"]`).classList.add('active');

        // Filter products
        if (type === 'all') {
            this.displayProducts();
        } else {
            const filtered = this.products.filter(product => product.type === type);
            this.displayProducts(filtered);
        }

        // Update counts
        this.updateFilterCounts();
    }

    sortProducts(sortBy) {
        let sorted = [...this.products];

        switch(sortBy) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                sorted.sort((a, b) => {
                    const dateA = new Date(a.createdAt || 0);
                    const dateB = new Date(b.createdAt || 0);
                    return dateB - dateA;
                });
                break;
            default: // featured
                // Keep original order
                break;
        }

        this.displayProducts(sorted);
    }

    updateFilterCounts() {
        const allCount = this.products.length;
        const physicalCount = this.products.filter(p => p.type === 'physical').length;
        const digitalCount = this.products.filter(p => p.type === 'digital').length;

        document.getElementById('countAll').textContent = allCount;
        document.getElementById('countPhysical').textContent = physicalCount;
        document.getElementById('countDigital').textContent = digitalCount;
    }

    filterByCategory(category) {
        const filtered = this.products.filter(product => product.category === category);
        this.displayProducts(filtered);
        
        // Scroll to products section
        document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
    }

    getCategoryName(category) {
        const categoryNames = {
            'electronics': 'Electrónicos',
            'clothing': 'Ropa',
            'home': 'Hogar',
            'misc': 'Miscelánea', //Nueva categoría
            'books': 'Libros', //Aún existe para libros
            'food': 'Comida Local',
            'crafts': 'Artesanías'
        };
        return categoryNames[category] || category;
    }

    addToCart(productId) {
        if (!this.currentUser) {
            this.showNotification('Debes iniciar sesión para agregar productos', 'warning');
            this.showModal('authModal');
            return;
        }

        const product = this.products.find(p => p.id === productId);
        if (!product || !product.available) {
            this.showNotification('Producto no disponible', 'error');
            return;
        }

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.showNotification('Producto agregado al carrito', 'success');
    }

    buyNow(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product || !product.available) {
        this.showNotification('Producto no disponible', 'error');
        return;
    }

    // Si no hay sesión, cerramos detalles y abrimos login
    if (!this.currentUser) {
        this.hideModal('productModal');  // <- cierre del modal de producto
        this.showNotification('Debes iniciar sesión para continuar con la compra', 'warning');
        this.showModal('authModal');
        return;
    }

    // Usuario con sesión: agregar al carrito (igual que addToCart)
    const existingItem = this.cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        this.cart.push({
            ...product,
            quantity: 1
        });
    }
    this.updateCartDisplay();

    // Cerrar detalles y abrir directamente el checkout
    this.hideModal('productModal');
    this.showModal('checkoutModal');
    this.currentStep = 1;
    this.showCheckoutStep(1);
}

    

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartDisplay();
        this.updateCartModal();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.updateCartDisplay();
                this.updateCartModal();
            }
        }

        
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        this.updateCartModal();
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
            cartTotal.textContent = '0.00';
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="remove-item" onclick="app.removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `).join('');
    }

    showCheckoutStep(step) {
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        document.querySelector(`[data-step="${step}"]`).classList.add('active');
        this.currentStep = step;
    }

    nextCheckoutStep() {
        if (this.currentStep < 3) {
            this.showCheckoutStep(this.currentStep + 1);
        }
    }

    processPayment() {
        // Simulate payment processing
        this.showNotification('Procesando pago...', 'warning');
        
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80% success rate
            
            if (success) {
                this.showOrderConfirmation();
                this.showCheckoutStep(3);
            } else {
                this.showPaymentError();
            }
        }, 2000);
    }

    showOrderConfirmation() {
        const orderNumber = Math.floor(Math.random() * 1000000);
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const hasPhysical = this.cart.some(item => item.type === 'physical');
        
        document.getElementById('orderConfirmation').innerHTML = `
            <div class="order-success">
                <i class="fas fa-check-circle"></i>
                <h3>¡Pago exitoso!</h3>
                <div class="order-details">
                    <p><strong>Número de orden:</strong> #${orderNumber}</p>
                    <p><strong>Total:</strong> $${total.toFixed(2)}</p>
                    <p><strong>Estado:</strong> ${hasPhysical ? 'Procesando envío' : 'Entrega digital en proceso'}</p>
                    <p><strong>Tiempo estimado:</strong> ${hasPhysical ? '3-5 días hábiles' : 'Inmediato'}</p>
                </div>
                <button class="btn-primary" onclick="app.completeOrder()">Finalizar</button>
            </div>
        `;
    }

    showPaymentError() {
        this.showNotification('Error en el pago. ¿Desea reintentar?', 'error');
        
        // Show retry option
        const retryBtn = document.createElement('button');
        retryBtn.textContent = 'Reintentar Pago';
        retryBtn.className = 'btn-primary';
        retryBtn.style.marginTop = '1rem';
        retryBtn.onclick = () => this.processPayment();
        
        const paymentSection = document.querySelector('[data-step="2"]');
        paymentSection.appendChild(retryBtn);
    }

    completeOrder() {
        this.cart = [];
        this.updateCartDisplay();
        this.hideModal('checkoutModal');
        this.showNotification('¡Gracias por tu compra!', 'success');
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star">★</span>';
        }
        if (hasHalfStar) {
            stars += '<span class="star">☆</span>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star empty">☆</span>';
        }
        return stars;
    }

    showProductDetail(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Populate modal with product details
            document.getElementById('productDetailImage').src = product.image;
            document.getElementById('productDetailImage').alt = product.title;
            document.getElementById('productDetailTitle').textContent = product.title;
            const authorText = product.author || product.brand || product.seller || '';
            document.getElementById('productDetailAuthor').textContent = authorText ? `por ${authorText}` : '';
            document.getElementById('productDetailStars').innerHTML = this.generateStars(product.rating);
            document.getElementById('productDetailRating').textContent = `${product.rating} de 5 estrellas`;
            document.getElementById('productDetailPrice').textContent = `$${product.price}`;
            
            // Show/hide shipping info based on product type
            const priceShippingInfo = document.getElementById('priceShippingInfo');
            const deliveryInfo = document.getElementById('deliveryInfo');
            const digitalDeliveryInfo = document.getElementById('digitalDeliveryInfo');
            const shipFromLine = document.getElementById('shipFromLine');
            const returnPolicy = document.getElementById('returnPolicy');
            const digitalPolicy = document.getElementById('digitalPolicy');
            
            if (product.type === 'digital') {
                // Hide physical shipping info
                if (priceShippingInfo) priceShippingInfo.style.display = 'none';
                if (deliveryInfo) deliveryInfo.style.display = 'none';
                if (digitalDeliveryInfo) digitalDeliveryInfo.style.display = 'block';
                if (shipFromLine) shipFromLine.style.display = 'none';
                if (returnPolicy) returnPolicy.style.display = 'none';
                if (digitalPolicy) digitalPolicy.style.display = 'block';
            } else {
                // Show physical shipping info
                if (priceShippingInfo) priceShippingInfo.style.display = 'block';
                if (deliveryInfo) deliveryInfo.style.display = 'block';
                if (digitalDeliveryInfo) digitalDeliveryInfo.style.display = 'none';
                if (shipFromLine) shipFromLine.style.display = 'flex';
                if (returnPolicy) returnPolicy.style.display = 'flex';
                if (digitalPolicy) digitalPolicy.style.display = 'none';
            }
            
// Handle different product categories with better localization

// Miscelánea (figuras / coleccionables)
if (product.category === 'misc') {
    document.getElementById('productDetailPages').textContent =
        product.specs || product.material || 'Artículo misceláneo';
    document.getElementById('productDetailPublisher').textContent =
        product.brand || 'Miscelánea';
    document.getElementById('productDetailGenre').textContent = 'Miscelánea';
    document.getElementById('productDetailISBN').textContent =
        product.seller || 'Vendedor';
    document.getElementById('productDetailType').textContent =
        product.type === 'physical' ? 'Producto físico' : 'Producto digital';

// Libros
} else if (product.category === 'books') {
    document.getElementById('productDetailPages').textContent =
        product.pages ? `${product.pages} páginas` : 'Libro';
    document.getElementById('productDetailPublisher').textContent =
        product.publisher || product.brand || 'Editorial';
    document.getElementById('productDetailGenre').textContent =
        product.genre || 'Libro';
    document.getElementById('productDetailISBN').textContent =
        product.isbn || product.seller || 'Editorial';
    document.getElementById('productDetailType').textContent =
        product.type === 'physical' ? 'Libro físico' : 'Libro digital';

// Comida local
} else if (product.category === 'food') {
    document.getElementById('productDetailPages').textContent =
        product.specs || 'Producto alimenticio';
    document.getElementById('productDetailPublisher').textContent = product.brand;
    document.getElementById('productDetailGenre').textContent = 'Comida Local';
    document.getElementById('productDetailISBN').textContent = product.seller;
    document.getElementById('productDetailType').textContent =
        product.type === 'physical' ? 'Producto físico' : 'Producto digital';

// Artesanías
} else if (product.category === 'crafts') {
    document.getElementById('productDetailPages').textContent = 'Artesanía tradicional';
    document.getElementById('productDetailPublisher').textContent = product.brand;
    document.getElementById('productDetailGenre').textContent = 'Artesanías';
    document.getElementById('productDetailISBN').textContent = product.seller;
    document.getElementById('productDetailType').textContent = 'Hecho a mano';

// Resto de categorías (electrónica, hogar, ropa, etc.)
} else {
    document.getElementById('productDetailPages').textContent =
        product.specs || product.material || product.features || 'Ver descripción';
    document.getElementById('productDetailPublisher').textContent =
        product.brand || 'N/A';
    document.getElementById('productDetailGenre').textContent =
        this.getCategoryName(product.category);
    document.getElementById('productDetailISBN').textContent =
        product.seller || 'Vendedor verificado';
    document.getElementById('productDetailType').textContent =
        product.type === 'physical' ? 'Producto físico' : 'Producto digital';
}
            
            document.getElementById('productDetailDescription').textContent = product.description;

            // Set up add to cart button
            const addToCartBtn = document.getElementById('productDetailAddToCart');
            addToCartBtn.disabled = !product.available;
            addToCartBtn.textContent = product.available ? 'Agregar al Carrito' : 'No Disponible';
            addToCartBtn.onclick = () => {
                this.addToCart(productId);
                this.hideModal('productModal');
            };


               // Botón "Comprar ahora"
    const buyNowBtn = document.querySelector('.btn-buy-now');
    if (buyNowBtn) {
        buyNowBtn.disabled = !product.available;
        buyNowBtn.onclick = () => {
            this.buyNow(product.id);
        };
    } 

        this.showModal('productModal');
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        
        document.body.appendChild(notification);
        
        // Announce to screen readers
        this.announceToScreenReader(message);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }

    // Seller functionality
    handlePlanSelection(planName, button) {
        if (button.textContent === 'Comenzar Gratis') {
            this.showNotification('¡Bienvenido a Zonama! Tu cuenta de vendedor gratuita está lista.', 'success');
            this.hideModal('sellerModal');
        } else if (button.textContent === 'Contactar Ventas') {
            this.showNotification('Te contactaremos pronto para el Plan Empresarial', 'success');
            this.hideModal('sellerModal');
        } else {
            this.showNotification(`Has seleccionado el ${planName}. Redirigiendo al pago...`, 'success');
            setTimeout(() => {
                this.hideModal('sellerModal');
            }, 2000);
        }
    }

    // Enhanced product loading with local Salvador products
    loadSalvadorProducts() {
        const salvadorProducts = [
            {
                id: 100,
                title: "Café Salvadoreño Premium",
                brand: "Finca El Volcán",
                price: 12.99,
                type: "physical",
                category: "food",
                available: true,
                image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&auto=format",
                description: "Café 100% arábica cultivado en las montañas de El Salvador. Tostado artesanal con notas de chocolate y caramelo.",
                rating: 4.8,
                seller: "Cooperativa Cafetalera San Salvador",
                location: "Santa Ana, El Salvador"
            },

            {
                id: 102,
                title: "Artesanía de Barro Negro",
                brand: "Artesanos de Ilobasco",
                price: 25.00,
                type: "physical",
                category: "crafts",
                available: true,
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format",
                description: "Hermosa pieza de cerámica tradicional salvadoreña hecha a mano en Ilobasco. Perfecta para decoración.",
                rating: 4.9,
                seller: "Cooperativa de Artesanos",
                location: "Ilobasco, Cabañas"
            },
            {
                id: 103,
                title: "Hamaca Salvadoreña Tejida",
                brand: "Textiles Tradicionales SV",
                price: 45.00,
                type: "physical",
                category: "home",
                available: true,
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format",
                description: "Hamaca tradicional tejida a mano por artesanos salvadoreños. Colores vibrantes y máxima comodidad.",
                rating: 4.7,
                seller: "Textiles Tradicionales SV",
                location: "La Palma, Chalatenango"
            }
        ];

        // Add Salvador products to the main products array
        this.products = [...this.products, ...salvadorProducts];
    }

    // Department delivery calculator
    calculateDeliveryFee(department) {
        const deliveryFees = {
            'san-salvador': 2.50,
            'la-libertad': 3.00,
            'santa-ana': 4.00,
            'san-miguel': 5.00,
            'usulutan': 5.50,
            'la-paz': 3.50,
            'sonsonate': 4.50,
            'chalatenango': 6.00,
            'la-union': 6.50,
            'ahuachapan': 5.00,
            'cabanas': 5.50,
            'cuscatlan': 3.00,
            'morazan': 6.00,
            'san-vicente': 4.00
        };

        return deliveryFees[department] || 7.00; // Default fee for remote areas
    }

    // Enhanced checkout with delivery calculation
    updateCheckoutTotal() {
        const cartTotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const departmentSelect = document.querySelector('#addressForm select');
        
        if (departmentSelect && departmentSelect.value) {
            const deliveryFee = this.calculateDeliveryFee(departmentSelect.value);
            const total = cartTotal + deliveryFee;
            
            // Update display
            const totalElement = document.getElementById('cartTotal');
            if (totalElement) {
                totalElement.innerHTML = `
                    <div>Subtotal: $${cartTotal.toFixed(2)}</div>
                    <div>Envío: $${deliveryFee.toFixed(2)}</div>
                    <div style="font-weight: bold; border-top: 1px solid #ddd; padding-top: 0.5rem; margin-top: 0.5rem;">
                        Total: $${total.toFixed(2)}
                    </div>
                `;
            }
        }
    }

    // Initialize Salvador-specific features
    initSalvadorFeatures() {
        this.loadSalvadorProducts();
        
        // Add delivery fee calculation to address form
        const addressForm = document.getElementById('addressForm');
        if (addressForm) {
            const departmentSelect = addressForm.querySelector('select');
            if (departmentSelect) {
                departmentSelect.addEventListener('change', () => {
                    this.updateCheckoutTotal();
                });
            }
        }
        
        // Initialize seller system
        this.initSellerSystem();
    }

    // ===== SELLER SYSTEM =====
    
    initSellerSystem() {
        this.currentSeller = null;
        this.sellerProducts = [];
        this.editingProductId = null;
        
        // Load seller data from localStorage
        const savedSeller = localStorage.getItem('zonama_seller');
        if (savedSeller) {
            this.currentSeller = JSON.parse(savedSeller);
        }
        
        const savedProducts = localStorage.getItem('zonama_seller_products');
        if (savedProducts) {
            this.sellerProducts = JSON.parse(savedProducts);
            // Add seller products to main products array
            this.products = [...this.products, ...this.sellerProducts];
        }
        
        // Setup form handlers
        this.setupSellerForms();
    }

    setupSellerForms() {
        // Seller Registration Form
        const regForm = document.getElementById('sellerRegistrationForm');
        if (regForm) {
            regForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSellerRegistration();
            });
        }

        // Add Product Form
        const productForm = document.getElementById('addProductForm');
        if (productForm) {
            productForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddProduct();
            });
        }
    }

    openSellerRegistration() {
        this.hideModal('sellerModal');
        this.showModal('sellerRegistrationModal');
    }

    handleSellerRegistration() {
        const seller = {
            name: document.getElementById('sellerName').value,
            email: document.getElementById('sellerEmail').value,
            phone: document.getElementById('sellerPhone').value,
            storeName: document.getElementById('storeName').value,
            category: document.getElementById('storeCategory').value,
            department: document.getElementById('storeDepartment').value,
            description: document.getElementById('storeDescription').value,
            plan: document.querySelector('input[name="sellerPlan"]:checked').value,
            createdAt: new Date().toISOString(),
            totalSales: 0,
            totalRevenue: 0
        };

        // Save seller data
        this.currentSeller = seller;
        localStorage.setItem('zonama_seller', JSON.stringify(seller));

        // Show success message
        this.showNotification('¡Tienda creada exitosamente! Bienvenido a Zonama', 'success');

        // Close registration and open dashboard
        this.hideModal('sellerRegistrationModal');
        setTimeout(() => {
            this.openSellerDashboard();
        }, 500);
    }

    openSellerDashboard() {
        if (!this.currentSeller) {
            this.showNotification('Debes registrarte como vendedor primero', 'warning');
            this.openSellerRegistration();
            return;
        }

        // Update dashboard stats
        document.getElementById('totalProducts').textContent = this.sellerProducts.length;
        document.getElementById('totalSales').textContent = this.currentSeller.totalSales || 0;
        document.getElementById('totalRevenue').textContent = `$${(this.currentSeller.totalRevenue || 0).toFixed(2)}`;

        // Display products
        this.displaySellerProducts();

        this.showModal('sellerDashboardModal');
    }

    displaySellerProducts() {
        const container = document.getElementById('sellerProductsList');
        
        if (this.sellerProducts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <p>Aún no tienes productos</p>
                    <button class="btn-add-first" onclick="app.openAddProduct()">Agregar mi primer producto</button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.sellerProducts.map(product => `
            <div class="product-item">
                <img src="${product.image}" alt="${product.title}" class="product-item-image">
                <div class="product-item-info">
                    <div class="product-item-title">${product.title}</div>
                    <div class="product-item-price">$${product.price}</div>
                    <div class="product-item-stock">Stock: ${product.stock} unidades</div>
                </div>
                <div class="product-item-actions">
                    <button class="btn-edit-product" onclick="app.editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete-product" onclick="app.deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `).join('');
    }

    openAddProduct() {
        if (!this.currentSeller) {
            this.showNotification('Debes registrarte como vendedor primero', 'warning');
            return;
        }
        this.showModal('addProductModal');
        
        // Setup image upload after modal is shown
        setTimeout(() => {
            this.setupImageUpload();
        }, 100);
    }

    closeAddProduct() {
        this.hideModal('addProductModal');
        document.getElementById('addProductForm').reset();
        
        // Reset editing mode
        this.editingProductId = null;
        
        // Reset form title and button text
        document.querySelector('.add-product-container h2').textContent = 'Agregar Nuevo Producto';
        document.querySelector('.btn-submit-product').textContent = 'Publicar Producto';
        
        // Clear image data and previews
        this.currentImageData = null;
        this.removeImage();
        
        // Clear URL preview
        const urlPreview = document.getElementById('urlImagePreview');
        const urlInput = document.getElementById('productImageUrl');
        if (urlPreview) urlPreview.style.display = 'none';
        if (urlInput) urlInput.value = '';
        
        // Reset to file upload tab
        this.switchImageTab('file');
    }

    handleAddProduct() {
        // Get image data from either file upload or URL
        const imageData = this.getProductImageData();
        
        if (!imageData) {
            // Error message already shown in getProductImageData()
            return;
        }

        // Check if we're editing or adding
        if (this.editingProductId) {
            // EDIT MODE
            const productData = {
                title: document.getElementById('productTitle').value,
                price: parseFloat(document.getElementById('productPrice').value),
                category: document.getElementById('productCategory').value,
                type: document.getElementById('productType').value,
                stock: parseInt(document.getElementById('productStock').value),
                description: document.getElementById('productDescription').value,
                image: imageData,
                specs: document.getElementById('productSpecs').value || 'Ver descripción'
            };

            // Update in seller products
            const sellerIndex = this.sellerProducts.findIndex(p => p.id === this.editingProductId);
            if (sellerIndex !== -1) {
                this.sellerProducts[sellerIndex] = {
                    ...this.sellerProducts[sellerIndex],
                    ...productData
                };
            }

            // Update in main products
            const mainIndex = this.products.findIndex(p => p.id === this.editingProductId);
            if (mainIndex !== -1) {
                this.products[mainIndex] = {
                    ...this.products[mainIndex],
                    ...productData
                };
            }

            // Save to localStorage
            localStorage.setItem('zonama_seller_products', JSON.stringify(this.sellerProducts));

            // Show success message
            this.showNotification('Producto actualizado exitosamente', 'success');

            // Reset editing mode
            this.editingProductId = null;
        } else {
            // ADD MODE
            const newProduct = {
                id: Date.now(),
                title: document.getElementById('productTitle').value,
                price: parseFloat(document.getElementById('productPrice').value),
                category: document.getElementById('productCategory').value,
                type: document.getElementById('productType').value,
                stock: parseInt(document.getElementById('productStock').value),
                description: document.getElementById('productDescription').value,
                image: imageData,
                specs: document.getElementById('productSpecs').value || 'Ver descripción',
                seller: this.currentSeller.storeName,
                location: this.getDepartmentName(this.currentSeller.department),
                brand: this.currentSeller.storeName,
                available: true,
                rating: 5.0,
                createdAt: new Date().toISOString()
            };

            // Add to seller products
            this.sellerProducts.push(newProduct);
            
            // Add to main products array
            this.products.push(newProduct);

            // Save to localStorage
            localStorage.setItem('zonama_seller_products', JSON.stringify(this.sellerProducts));

            // Show success message
            this.showNotification('Producto agregado exitosamente', 'success');

            // Update stats
            document.getElementById('totalProducts').textContent = this.sellerProducts.length;
        }

        // Close modal and refresh displays
        this.closeAddProduct();
        this.displaySellerProducts();
        this.displayProducts(); // Refresh main products display
    }

    editProduct(productId) {
        // Find the product
        const product = this.sellerProducts.find(p => p.id === productId);
        if (!product) {
            this.showNotification('Producto no encontrado', 'error');
            return;
        }

        // Store the product being edited
        this.editingProductId = productId;

        // Fill the form with current product data
        document.getElementById('productTitle').value = product.title;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productType').value = product.type;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productSpecs').value = product.specs || '';

        // Handle image - if it's a URL, show it in the URL tab
        if (product.image) {
            if (product.image.startsWith('http')) {
                // Switch to URL tab
                this.switchImageTab('url');
                document.getElementById('productImageUrl').value = product.image;
                
                // Show preview
                const urlPreview = document.getElementById('urlImagePreview');
                const urlPreviewImg = document.getElementById('urlPreviewImg');
                if (urlPreviewImg && urlPreview) {
                    urlPreviewImg.src = product.image;
                    urlPreview.style.display = 'block';
                }
            } else {
                // It's a local file path or base64 - preserve it
                this.currentImageData = product.image;
                
                // Try to show preview if it's a valid image
                const imagePreview = document.getElementById('imagePreview');
                const previewImg = document.getElementById('previewImg');
                if (imagePreview && previewImg) {
                    previewImg.src = product.image;
                    imagePreview.style.display = 'block';
                    
                    // Hide the upload placeholder
                    const uploadPlaceholder = document.querySelector('.upload-placeholder');
                    if (uploadPlaceholder) {
                        uploadPlaceholder.style.display = 'none';
                    }
                }
            }
        }

        // Change form title and button text
        const formTitle = document.querySelector('.add-product-container h2');
        const submitBtn = document.querySelector('.btn-submit-product');
        if (formTitle) formTitle.textContent = 'Editar Producto';
        if (submitBtn) submitBtn.textContent = 'Guardar Cambios';

        // Open the modal
        this.showModal('addProductModal');
    }

    deleteProduct(productId) {
        if (!confirm('¿Estás seguro de eliminar este producto?')) {
            return;
        }

        // Remove from seller products
        this.sellerProducts = this.sellerProducts.filter(p => p.id !== productId);
        
        // Remove from main products
        this.products = this.products.filter(p => p.id !== productId);

        // Save to localStorage
        localStorage.setItem('zonama_seller_products', JSON.stringify(this.sellerProducts));

        // Show success message
        this.showNotification('Producto eliminado', 'success');

        // Refresh displays
        this.displaySellerProducts();
        this.displayProducts();

        // Update stats
        document.getElementById('totalProducts').textContent = this.sellerProducts.length;
    }

    logoutSeller() {
        if (!confirm('¿Estás seguro de cerrar sesión?')) {
            return;
        }

        this.currentSeller = null;
        localStorage.removeItem('zonama_seller');
        
        this.hideModal('sellerDashboardModal');
        this.showNotification('Sesión cerrada', 'success');
    }

    getDepartmentName(code) {
        const departments = {
            'san-salvador': 'San Salvador',
            'la-libertad': 'La Libertad',
            'santa-ana': 'Santa Ana',
            'san-miguel': 'San Miguel',
            'usulutan': 'Usulután',
            'la-paz': 'La Paz',
            'sonsonate': 'Sonsonate',
            'chalatenango': 'Chalatenango',
            'la-union': 'La Unión',
            'ahuachapan': 'Ahuachapán',
            'cabanas': 'Cabañas',
            'cuscatlan': 'Cuscatlán',
            'morazan': 'Morazán',
            'san-vicente': 'San Vicente'
        };
        return departments[code] || 'El Salvador';
    }

    // ===== IMAGE UPLOAD FUNCTIONS =====
    
    switchImageTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.upload-tab').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.upload-tab[data-tab="${tab}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.upload-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        if (tab === 'file') {
            document.getElementById('fileUploadTab').classList.add('active');
        } else {
            document.getElementById('urlUploadTab').classList.add('active');
        }
    }

    setupImageUpload() {
        const fileInput = document.getElementById('productImageFile');
        const fileUploadArea = document.getElementById('fileUploadArea');
        
        if (!fileInput || !fileUploadArea) return;
        
        // Avoid adding multiple listeners
        if (this.imageUploadConfigured) return;
        this.imageUploadConfigured = true;

        // Handle file selection
        fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        // Handle drag and drop
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('drag-over');
        });

        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('drag-over');
        });

        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('drag-over');
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleFileSelect(file);
            } else {
                this.showNotification('Por favor selecciona un archivo de imagen válido', 'error');
            }
        });
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showNotification('Por favor selecciona un archivo de imagen', 'error');
            return;
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            this.showNotification('La imagen es muy grande. Máximo 5MB', 'error');
            return;
        }

        // Read and preview the file
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            this.currentImageData = imageData;
            this.showImagePreview(imageData);
        };
        reader.readAsDataURL(file);
    }

    showImagePreview(imageData) {
        const preview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');
        const placeholder = document.querySelector('.upload-placeholder');

        if (preview && previewImg && placeholder) {
            previewImg.src = imageData;
            placeholder.style.display = 'none';
            preview.style.display = 'block';
        }
    }

    removeImage() {
        const preview = document.getElementById('imagePreview');
        const placeholder = document.querySelector('.upload-placeholder');
        const fileInput = document.getElementById('productImageFile');

        if (preview && placeholder && fileInput) {
            preview.style.display = 'none';
            placeholder.style.display = 'flex';
            fileInput.value = '';
            this.currentImageData = null;
        }
    }

    previewUrlImage() {
        const urlInput = document.getElementById('productImageUrl');
        const urlPreview = document.getElementById('urlImagePreview');
        const urlPreviewImg = document.getElementById('urlPreviewImg');

        if (!urlInput || !urlPreview || !urlPreviewImg) return;

        const imageUrl = urlInput.value.trim();
        
        if (!imageUrl) {
            this.showNotification('Por favor ingresa una URL', 'warning');
            return;
        }

        // Validate URL format
        try {
            new URL(imageUrl);
        } catch (e) {
            this.showNotification('URL inválida', 'error');
            return;
        }

        // Try to load the image
        urlPreviewImg.onload = () => {
            urlPreview.style.display = 'block';
            this.showNotification('Vista previa cargada', 'success');
        };

        urlPreviewImg.onerror = () => {
            urlPreview.style.display = 'none';
            this.showNotification('No se pudo cargar la imagen desde esta URL', 'error');
        };

        urlPreviewImg.src = imageUrl;
    }

    getProductImageData() {
        // Check which tab is active
        const fileTab = document.getElementById('fileUploadTab');
        const urlTab = document.getElementById('urlUploadTab');

        if (fileTab && fileTab.classList.contains('active')) {
            // File upload is active
            if (this.currentImageData) {
                return this.currentImageData;
            } else if (this.editingProductId) {
                // If editing and no new image selected, keep the old one
                const product = this.sellerProducts.find(p => p.id === this.editingProductId);
                if (product && product.image) {
                    return product.image;
                }
            }
            
            this.showNotification('Por favor selecciona una imagen', 'warning');
            return null;
        } else if (urlTab && urlTab.classList.contains('active')) {
            // URL input is active
            const urlInput = document.getElementById('productImageUrl');
            const imageUrl = urlInput ? urlInput.value.trim() : '';
            
            if (!imageUrl) {
                // If editing and no URL provided, keep the old image
                if (this.editingProductId) {
                    const product = this.sellerProducts.find(p => p.id === this.editingProductId);
                    if (product && product.image) {
                        return product.image;
                    }
                }
                this.showNotification('Por favor ingresa una URL de imagen', 'warning');
                return null;
            }

            // Validate URL
            try {
                new URL(imageUrl);
                return imageUrl;
            } catch (e) {
                this.showNotification('URL inválida', 'error');
                return null;
            }
        }

        return null;
    }
}

// Global function for product details (must be defined before app initialization)
window.showProductDetail = function(productId) {
    if (window.app && window.app.showProductDetail) {
        window.app.showProductDetail(productId);
    }
};

// Initialize the application
let app;

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function() {
    // Create app instance after DOM is ready
    app = new ECommerceApp();
    window.app = app; // Make app globally accessible
    
    // Initialize Salvador-specific features
    if (app) {
        app.initSalvadorFeatures();
    }

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.benefit-card, .category-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
