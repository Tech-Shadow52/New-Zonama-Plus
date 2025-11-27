# 📘 Documentación Técnica - Zonama Marketplace

## Índice
1. [Estructura de Clases](#estructura-de-clases)
2. [Tipos de Datos](#tipos-de-datos)
3. [Funciones Principales](#funciones-principales)
4. [Sistema de Modales](#sistema-de-modales)
5. [Gestión de Productos](#gestión-de-productos)
6. [Carrito de Compras](#carrito-de-compras)
7. [Accesibilidad](#accesibilidad)

---

## Estructura de Clases

### Clase Principal: `ECommerceApp`

**Tipo:** Clase ES6  
**Propósito:** Gestionar toda la lógica de la aplicación de e-commerce

#### Propiedades de Instancia

```javascript
{
    currentUser: null | Object,           // Usuario actual autenticado
    cart: Array,                          // Array de productos en el carrito
    products: Array,                      // Array de todos los productos disponibles
    currentStep: Number,                  // Paso actual en el proceso de checkout (1-3)
    currentImageData: null | String,      // Datos de imagen en base64 para upload
    imageUploadConfigured: Boolean,       // Estado de configuración de upload
    lastFocusedElement: null | HTMLElement // Elemento con foco antes de abrir modal
}
```

---

## Tipos de Datos

### 1. Objeto Producto (Product Object)

**Tipo:** Object  
**Estructura:**

```javascript
{
    id: Number,                    // Identificador único del producto
    title: String,                 // Nombre del producto
    brand: String,                 // Marca o fabricante
    price: Number,                 // Precio en USD (formato decimal)
    type: String,                  // "physical" o "digital"
    category: String,              // "electronics", "clothing", "home", "books"
    available: Boolean,            // Disponibilidad del producto
    image: String,                 // Ruta de la imagen (local o URL)
    description: String,           // Descripción detallada
    rating: Number,                // Calificación (0-5, formato decimal)
    specs: String,                 // Especificaciones técnicas
    warranty: String,              // Garantía del producto
    material: String,              // Material (para ropa/accesorios)
    sizes: String,                 // Tallas disponibles (para ropa)
    pages: Number,                 // Número de páginas (para libros)
    publisher: String,             // Editorial (para libros)
    genre: String,                 // Género (para libros)
    isbn: String,                  // ISBN (para libros)
    seller: String,                // Nombre del vendedor
    location: String               // Ubicación del vendedor
}
```

**Ejemplo Real:**
```javascript
{
    id: 1,
    title: "Micrófono Gamer Pro",
    brand: "AudioTech",
    price: 89.99,
    type: "physical",
    category: "electronics",
    available: true,
    image: "productos/microfono gamer pro.avif",
    description: "Micrófono profesional para streaming...",
    rating: 4.7,
    specs: "USB, Cancelación de ruido, Brazo ajustable",
    warranty: "2 years"
}
```

### 2. Objeto Usuario (User Object)

**Tipo:** Object  
**Estructura:**

```javascript
{
    email: String,                 // Email del usuario
    name: String,                  // Nombre completo
    type: String,                  // "buyer" o "seller"
    department: String,            // Departamento de El Salvador
    phone: String,                 // Teléfono (opcional)
    storeName: String,             // Nombre de tienda (solo sellers)
    storeCategory: String,         // Categoría de tienda (solo sellers)
    plan: String                   // Plan de vendedor: "basic", "professional", "enterprise"
}
```

### 3. Objeto Item del Carrito (Cart Item)

**Tipo:** Object  
**Estructura:**

```javascript
{
    product: Object,               // Objeto producto completo
    quantity: Number               // Cantidad seleccionada (1-10+)
}
```

### 4. Array de Productos

**Tipo:** Array<Object>  
**Tamaño:** 24 productos  
**Categorías:**
- Electronics: 7 productos
- Clothing & Accessories: 5 productos
- Home: 5 productos
- Collectibles: 7 productos

---

## Funciones Principales

### Funciones de Inicialización

#### `constructor()`
**Tipo:** Constructor  
**Parámetros:** Ninguno  
**Retorna:** Instancia de ECommerceApp  
**Propósito:** Inicializa las propiedades de la aplicación

```javascript
constructor() {
    this.currentUser = null;        // Tipo: null | Object
    this.cart = [];                 // Tipo: Array<CartItem>
    this.products = [];             // Tipo: Array<Product>
    this.currentStep = 1;           // Tipo: Number (1-3)
    this.currentImageData = null;   // Tipo: null | String (base64)
    this.imageUploadConfigured = false; // Tipo: Boolean
    this.init();
}
```

#### `init()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** void  
**Propósito:** Inicializa todos los componentes de la aplicación

```javascript
init() {
    this.loadProducts();              // Carga el catálogo
    this.setupEventListeners();       // Configura eventos
    this.updateCartDisplay();         // Actualiza contador del carrito
    this.hideAllModals();            // Oculta todos los modales
    this.setupImageLightbox();       // Configura lightbox
    this.setupKeyboardNavigation();  // Configura navegación por teclado
    this.setupImageUpload();         // Configura subida de imágenes
}
```

#### `hideAllModals()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** void  
**Propósito:** Oculta todos los modales al cargar la página

```javascript
hideAllModals() {
    const modals = ['authModal', 'cartModal', 'checkoutModal', 'productModal', 'sellerModal'];
    // Tipo de modals: Array<String>
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId); // Tipo: HTMLElement | null
        if (modal) {
            modal.style.display = 'none';
        }
    });
    document.body.style.overflow = 'auto';
}
```

---

### Funciones de Gestión de Productos

#### `loadProducts()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** void  
**Propósito:** Carga el array de productos y los muestra

```javascript
loadProducts() {
    this.products = [ /* Array de 24 objetos Product */ ];
    // Tipo: Array<Product>
    
    this.displayProducts();
}
```

#### `displayProducts(filteredProducts = null)`
**Tipo:** Método de instancia  
**Parámetros:**
- `filteredProducts` (Array<Product> | null): Productos filtrados o null para mostrar todos
**Retorna:** void  
**Propósito:** Renderiza los productos en el grid

```javascript
displayProducts(filteredProducts = null) {
    const productsToShow = filteredProducts || this.products;
    // Tipo: Array<Product>
    
    const grid = document.getElementById('productsGrid');
    // Tipo: HTMLElement
    
    grid.innerHTML = ''; // Limpia el grid
    
    productsToShow.forEach(product => {
        // Crea y añade card HTML para cada producto
    });
}
```

#### `filterByType(type)`
**Tipo:** Método de instancia  
**Parámetros:**
- `type` (String): "all", "physical", o "digital"
**Retorna:** void  
**Propósito:** Filtra productos por tipo

```javascript
filterByType(type) {
    // type: String ("all" | "physical" | "digital")
    
    let filtered = this.products;
    // Tipo: Array<Product>
    
    if (type !== 'all') {
        filtered = this.products.filter(p => p.type === type);
        // Tipo: Array<Product>
    }
    
    this.displayProducts(filtered);
}
```

#### `sortProducts(sortBy)`
**Tipo:** Método de instancia  
**Parámetros:**
- `sortBy` (String): "featured", "price-low", "price-high", "rating", "newest"
**Retorna:** void  
**Propósito:** Ordena los productos según criterio

```javascript
sortProducts(sortBy) {
    // sortBy: String
    
    let sorted = [...this.products];
    // Tipo: Array<Product> (copia del array)
    
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
        // ... más casos
    }
    
    this.displayProducts(sorted);
}
```

#### `searchProducts()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno (lee del input)  
**Retorna:** void  
**Propósito:** Busca productos por título o descripción

```javascript
searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    // Tipo: String
    
    const filtered = this.products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    // Tipo: Array<Product>
    
    this.displayProducts(filtered);
}
```

---

### Funciones del Carrito de Compras

#### `addToCart(productId, quantity = 1)`
**Tipo:** Método de instancia  
**Parámetros:**
- `productId` (Number): ID del producto
- `quantity` (Number): Cantidad a agregar (default: 1)
**Retorna:** void  
**Propósito:** Agrega un producto al carrito

```javascript
addToCart(productId, quantity = 1) {
    // productId: Number
    // quantity: Number
    
    const product = this.products.find(p => p.id === productId);
    // Tipo: Product | undefined
    
    if (!product) return;
    
    const existingItem = this.cart.find(item => item.product.id === productId);
    // Tipo: CartItem | undefined
    
    if (existingItem) {
        existingItem.quantity += quantity;
        // Tipo: Number
    } else {
        this.cart.push({ product, quantity });
        // Tipo: Array<CartItem>
    }
    
    this.updateCartDisplay();
    this.showNotification(`${product.title} agregado al carrito`, 'success');
}
```

#### `removeFromCart(productId)`
**Tipo:** Método de instancia  
**Parámetros:**
- `productId` (Number): ID del producto a eliminar
**Retorna:** void  
**Propósito:** Elimina un producto del carrito

```javascript
removeFromCart(productId) {
    // productId: Number
    
    this.cart = this.cart.filter(item => item.product.id !== productId);
    // Tipo: Array<CartItem>
    
    this.updateCartDisplay();
    this.displayCart();
}
```

#### `updateCartDisplay()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** void  
**Propósito:** Actualiza el contador del carrito en el header

```javascript
updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    // Tipo: HTMLElement
    
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    // Tipo: Number
    
    cartCount.textContent = totalItems;
    // Tipo: String (convertido automáticamente)
}
```

#### `calculateTotal()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** Number  
**Propósito:** Calcula el total del carrito

```javascript
calculateTotal() {
    return this.cart.reduce((total, item) => 
        total + (item.product.price * item.quantity), 0
    );
    // Retorna: Number (formato decimal)
}
```

#### `displayCart()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** void  
**Propósito:** Renderiza los items del carrito en el modal

```javascript
displayCart() {
    const cartItems = document.getElementById('cartItems');
    // Tipo: HTMLElement
    
    if (this.cart.length === 0) {
        cartItems.innerHTML = '<p>Tu carrito está vacío</p>';
        return;
    }
    
    cartItems.innerHTML = this.cart.map(item => {
        // Genera HTML para cada item
        // Retorna: String (HTML)
    }).join('');
    
    const total = this.calculateTotal();
    // Tipo: Number
    
    document.getElementById('cartTotal').textContent = total.toFixed(2);
    // Tipo: String
}
```

---

## Sistema de Modales

### Funciones de Control de Modales

#### `showModal(modalId)`
**Tipo:** Método de instancia  
**Parámetros:**
- `modalId` (String): ID del modal a mostrar
**Retorna:** void  
**Propósito:** Muestra un modal específico

```javascript
showModal(modalId) {
    // modalId: String
    
    const modal = document.getElementById(modalId);
    // Tipo: HTMLElement | null
    
    if (modal) {
        this.lastFocusedElement = document.activeElement;
        // Tipo: HTMLElement (para accesibilidad)
        
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Enfoca el primer elemento interactivo
        const firstFocusable = modal.querySelector('button, input, select, textarea');
        // Tipo: HTMLElement | null
        
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
}
```

#### `hideModal(modalId)`
**Tipo:** Método de instancia  
**Parámetros:**
- `modalId` (String): ID del modal a ocultar
**Retorna:** void  
**Propósito:** Oculta un modal específico

```javascript
hideModal(modalId) {
    // modalId: String
    
    const modal = document.getElementById(modalId);
    // Tipo: HTMLElement | null
    
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        
        // Restaura el foco al elemento anterior
        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus();
            // Tipo: void
        }
    }
}
```

#### `setupModalControls()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** void  
**Propósito:** Configura los controles de cierre de modales

```javascript
setupModalControls() {
    document.querySelectorAll('.close').forEach(closeBtn => {
        // closeBtn: HTMLElement
        
        closeBtn.addEventListener('click', (e) => {
            // e: MouseEvent
            
            const modal = e.target.closest('.modal');
            // Tipo: HTMLElement | null
            
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Click fuera del modal para cerrar
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}
```

---

## Sistema Lightbox (Imagen Completa)

### Funciones del Lightbox

#### `setupImageLightbox()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** void  
**Propósito:** Configura el sistema de lightbox para imágenes

```javascript
setupImageLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    // Tipo: HTMLElement
    
    const lightboxImage = document.getElementById('lightboxImage');
    // Tipo: HTMLImageElement
    
    const lightboxCaption = document.getElementById('lightboxCaption');
    // Tipo: HTMLElement
    
    // Event delegation para imágenes de productos
    document.addEventListener('click', (e) => {
        // e: MouseEvent
        
        if (e.target.id === 'productDetailImage') {
            const imgSrc = e.target.src;
            // Tipo: String (URL)
            
            const imgAlt = e.target.alt;
            // Tipo: String
            
            this.openLightbox(imgSrc, imgAlt);
        }
    });
}
```

#### `openLightbox(imageSrc, caption)`
**Tipo:** Método de instancia  
**Parámetros:**
- `imageSrc` (String): URL de la imagen
- `caption` (String): Texto descriptivo
**Retorna:** void  
**Propósito:** Abre el lightbox con una imagen

```javascript
openLightbox(imageSrc, caption) {
    // imageSrc: String (URL)
    // caption: String
    
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightboxImage.src = imageSrc;
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;
    
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Enfoca la imagen para accesibilidad
    setTimeout(() => lightboxImage.focus(), 100);
    // Tipo: Number (timeout ID)
}
```

#### `closeLightbox()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** void  
**Propósito:** Cierra el lightbox

```javascript
closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    // Tipo: HTMLElement
    
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}
```

---

## Accesibilidad

### Funciones de Navegación por Teclado

#### `setupKeyboardNavigation()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** void  
**Propósito:** Configura la navegación por teclado

```javascript
setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // e: KeyboardEvent
        
        // ESC para cerrar modales
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: flex"]');
            // Tipo: HTMLElement | null
            
            if (openModal) {
                openModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
        
        // Enter/Space en imágenes para abrir lightbox
        if ((e.key === 'Enter' || e.key === ' ') && 
            e.target.id === 'productDetailImage') {
            e.preventDefault();
            this.openLightbox(e.target.src, e.target.alt);
        }
    });
}
```

---

## Funciones de Autenticación

#### `handleAuth(form)`
**Tipo:** Método de instancia  
**Parámetros:**
- `form` (HTMLFormElement): Formulario de login/registro
**Retorna:** void  
**Propósito:** Procesa el login o registro

```javascript
handleAuth(form) {
    // form: HTMLFormElement
    
    const formData = new FormData(form);
    // Tipo: FormData
    
    const email = formData.get('email');
    // Tipo: String | null
    
    this.currentUser = {
        email: email,
        name: formData.get('name') || 'Usuario',
        type: 'buyer'
    };
    // Tipo: Object (User)
    
    this.hideModal('authModal');
    this.showNotification('Sesión iniciada correctamente', 'success');
}
```

#### `switchAuthTab(tab)`
**Tipo:** Método de instancia  
**Parámetros:**
- `tab` (String): "login" o "register"
**Retorna:** void  
**Propósito:** Cambia entre tabs de login y registro

```javascript
switchAuthTab(tab) {
    // tab: String ("login" | "register")
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        // Tipo: void
    });
    
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`${tab}Form`).classList.add('active');
}
```

---

## Funciones de Notificaciones

#### `showNotification(message, type = 'info')`
**Tipo:** Método de instancia  
**Parámetros:**
- `message` (String): Mensaje a mostrar
- `type` (String): "success", "error", "warning", "info"
**Retorna:** void  
**Propósito:** Muestra una notificación temporal

```javascript
showNotification(message, type = 'info') {
    // message: String
    // type: String ("success" | "error" | "warning" | "info")
    
    const notification = document.createElement('div');
    // Tipo: HTMLDivElement
    
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    // Tipo: Number (timeout ID)
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
    // Tipo: Number (timeout ID)
}
```

---

## Funciones del Panel de Vendedor

#### `openSellerRegistration()`
**Tipo:** Método de instancia  
**Parámetros:** Ninguno  
**Retorna:** void  
**Propósito:** Abre el modal de registro de vendedor

```javascript
openSellerRegistration() {
    this.hideModal('sellerModal');
    this.showModal('sellerRegistrationModal');
}
```

#### `handleSellerRegistration(formData)`
**Tipo:** Método de instancia  
**Parámetros:**
- `formData` (FormData): Datos del formulario
**Retorna:** void  
**Propósito:** Procesa el registro de vendedor

```javascript
handleSellerRegistration(formData) {
    // formData: FormData
    
    this.currentUser = {
        email: formData.get('sellerEmail'),
        name: formData.get('sellerName'),
        type: 'seller',
        storeName: formData.get('storeName'),
        storeCategory: formData.get('storeCategory'),
        plan: formData.get('sellerPlan')
    };
    // Tipo: Object (User)
    
    this.hideModal('sellerRegistrationModal');
    this.showModal('sellerDashboardModal');
    this.showNotification('¡Tienda creada exitosamente!', 'success');
}
```

---

## Resumen de Tipos de Datos Utilizados

### Tipos Primitivos
- **String**: Textos, URLs, IDs de elementos
- **Number**: Precios, IDs, cantidades, ratings
- **Boolean**: Estados (available, imageUploadConfigured)
- **null**: Valores no inicializados (currentUser, currentImageData)

### Tipos Complejos
- **Object**: Productos, usuarios, items del carrito
- **Array**: Lista de productos, carrito, modales
- **HTMLElement**: Referencias a elementos del DOM
- **FormData**: Datos de formularios
- **Event**: Eventos del navegador (MouseEvent, KeyboardEvent)

### Estructuras de Datos
- **Array<Product>**: Lista de productos (24 items)
- **Array<CartItem>**: Items en el carrito
- **Array<String>**: Lista de IDs de modales

---

## Convenciones de Código

### Nomenclatura
- **camelCase**: Funciones y variables (`addToCart`, `currentUser`)
- **PascalCase**: Clases (`ECommerceApp`)
- **kebab-case**: IDs de HTML (`product-modal`, `cart-icon`)

### Comentarios
- Comentarios en línea para lógica compleja
- Comentarios de sección para agrupar funciones relacionadas

### Manejo de Errores
- Validaciones con `if (!condition) return;`
- Notificaciones al usuario con `showNotification()`
- Verificación de existencia de elementos del DOM

---

**Última actualización:** Noviembre 2024  
**Versión:** 1.0  
**Total de funciones documentadas:** 30+  
**Total de productos:** 24
