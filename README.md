# Zonama — Marketplace de El Salvador

El marketplace que conecta a vendedores locales con compradores en todo El Salvador. Compra y vende productos auténticos: artesanías, tecnología, ropa, comida y más.

---

## Propósito

El Salvador cuenta con miles de emprendedores, artesanos y pequeños negocios que no tienen acceso a una plataforma digital accesible, local y en español para vender sus productos. Las opciones existentes son internacionales, costosas o no están adaptadas a la realidad del mercado salvadoreño.

**Zonama nace para resolver ese problema.**

Es un marketplace 100% salvadoreño diseñado para:

- **Empoderar a vendedores locales** — cualquier persona puede crear su tienda en minutos, sin conocimientos técnicos y sin costos iniciales, y llegar a compradores en los 14 departamentos del país.
- **Facilitar la compra local** — los compradores encuentran productos auténticos salvadoreños en un solo lugar, con métodos de pago adaptados al contexto local como pago contra entrega, transferencia y billeteras digitales.
- **Digitalizar el comercio informal** — artesanos, emprendedores de comida, modistas y pequeños negocios que hoy venden solo por WhatsApp o redes sociales tienen una plataforma profesional para crecer.
- **Fortalecer la economía local** — al conectar oferta y demanda dentro del mismo país, el dinero circula en la economía salvadoreña y apoya a productores nacionales.

Zonama no es solo una tienda en línea — es una herramienta de desarrollo económico para El Salvador.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | ASP.NET Core (.NET 10) |
| Base de datos | SQL Server (LocalDB) |
| Autenticación | JWT Bearer Tokens |
| ORM | Entity Framework Core 9 |
| Documentación API | Swagger / OpenAPI |

---

## Estructura del proyecto

```
New-Zonama-Plus/
├── index.html              # Página principal
├── products.html           # Catálogo completo
├── seller.html             # Página de vendedores
├── css/
│   ├── styles.css
│   └── animations.css
├── Js/
│   └── script.js           # Lógica del frontend + conexión al API
├── data/                   # Imágenes y assets
└── ZonamaAPI/              # Backend ASP.NET Core
    ├── Controllers/
    │   ├── UsersController.cs
    │   ├── SellersController.cs
    │   ├── ProductsController.cs
    │   ├── CartController.cs
    │   ├── OrdersController.cs
    │   └── UploadsController.cs
    ├── Services/
    ├── Models/
    ├── DTOs/
    ├── Data/
    ├── Migrations/
    ├── Program.cs
    └── appsettings.json
```

---

## Requisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- SQL Server Express o LocalDB (Windows)
- Live Server (extensión de VS Code) o cualquier servidor HTTP estático

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Tech-Shadow52/New-Zonama-Plus.git
cd New-Zonama-Plus
```

### 2. Levantar el API

```bash
cd ZonamaAPI
dotnet run
```

La primera vez crea la base de datos y ejecuta las migraciones automáticamente.

El API queda corriendo en:
```
http://localhost:5000
```

### 3. Levantar el frontend

Abre `index.html` con Live Server en VS Code → queda en:
```
http://127.0.0.1:5500
```

---

## Documentación del API

Con el servidor corriendo, accede a Swagger en:
```
http://localhost:5000/swagger
```

### Endpoints disponibles

#### Usuarios — `/api/users`
| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| POST | `/api/users/register` | No | Registrar nuevo usuario |
| POST | `/api/users/login` | No | Iniciar sesión, devuelve token JWT |
| POST | `/api/users/refresh-token` | Sí | Renovar token (actualiza el rol) |
| GET | `/api/users/me` | Sí | Ver mi perfil |
| PUT | `/api/users/me` | Sí | Actualizar mi perfil |

#### Tiendas — `/api/sellers`
| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| GET | `/api/sellers/{id}` | No | Ver una tienda por ID |
| POST | `/api/sellers/register` | Sí | Registrar mi tienda |
| PUT | `/api/sellers/{id}` | Seller | Actualizar mi tienda |
| GET | `/api/sellers/dashboard` | Seller | Ver estadísticas y productos de mi tienda |

#### Productos — `/api/products`
| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| GET | `/api/products` | No | Listar todos los productos |
| GET | `/api/products/featured` | No | Productos destacados |
| GET | `/api/products/{id}` | No | Detalle de un producto |
| POST | `/api/products` | Seller | Crear producto |
| PUT | `/api/products/{id}` | Seller | Editar producto |
| DELETE | `/api/products/{id}` | Seller | Eliminar producto |

**Filtros disponibles para `GET /api/products`:**
```
?search=laptop
?category=Electronics
?minPrice=100&maxPrice=500
?sellerId=3
?isFeatured=true
?sortBy=newest | price_asc | price_desc | rating
?page=1&pageSize=20
```

#### Carrito — `/api/cart`
| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| GET | `/api/cart` | Sí | Ver mi carrito |
| POST | `/api/cart` | Sí | Agregar producto al carrito |
| PUT | `/api/cart/{productId}` | Sí | Cambiar cantidad |
| DELETE | `/api/cart/{productId}` | Sí | Quitar producto |
| DELETE | `/api/cart` | Sí | Vaciar carrito |

#### Órdenes — `/api/orders`
| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| GET | `/api/orders` | Sí | Ver mis órdenes |
| GET | `/api/orders/{id}` | Sí | Detalle de una orden |
| POST | `/api/orders` | Sí | Crear orden (checkout) |
| PUT | `/api/orders/{id}/status` | Seller | Actualizar estado de orden |

**Estados de una orden:** `Pending → Confirmed → Shipped → Delivered → Cancelled`

#### Imágenes — `/api/uploads`
| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| POST | `/api/uploads` | Sí | Subir imagen de producto (max 5MB) |

---

## Autenticación

El API usa **JWT Bearer Tokens**. Para endpoints protegidos incluir en el header:

```
Authorization: Bearer <token>
```

### En Swagger
1. Ejecutar `POST /api/users/login`
2. Copiar el `token` de la respuesta
3. Clic en **Authorize 🔒**
4. Escribir `Bearer <token>` y confirmar

---

## Roles y permisos

| Acción | Sin cuenta | Buyer | Seller | Admin |
|---|:---:|:---:|:---:|:---:|
| Ver productos y tiendas | ✅ | ✅ | ✅ | ✅ |
| Registrarse / Login | ✅ | ✅ | ✅ | ✅ |
| Carrito y órdenes | ❌ | ✅ | ✅ | ✅ |
| Crear tienda | ❌ | ✅ | ❌ | ✅ |
| Agregar / editar productos | ❌ | ❌ | ✅ | ✅ |
| Dashboard vendedor | ❌ | ❌ | ✅ | ✅ |
| Cambiar estado de orden | ❌ | ❌ | ✅ | ✅ |

---

## Flujo principal

```
1. Usuario se registra          → rol: Buyer
2. Usuario crea su tienda       → rol cambia a Seller
3. Token se renueva automáticamente con el nuevo rol
4. Seller agrega productos      → guardados en base de datos
5. Compradores los ven en la tienda
6. Comprador agrega al carrito  → sincronizado con el API
7. Comprador hace checkout      → se crea la orden
8. Seller gestiona el estado    → Confirmed → Shipped → Delivered
```

---

## Categorías de productos disponibles

`Electronics` · `Books` · `Clothing` · `Sports` · `Home` · `Beauty` · `Toys` · `Automotive` · `Other`

---

## Planes de vendedor

| Plan | Precio |
|---|---|
| Basic | Gratis |
| Pro | $15/mes |
| Premium | $40/mes |

---

## Páginas del frontend

| Página | Descripción |
|---|---|
| `index.html` | Inicio con productos destacados, categorías y hero |
| `products.html` | Catálogo completo con filtros |
| `seller.html` | Información y registro de vendedores |

---

Hecho con orgullo en El Salvador 🇸🇻
