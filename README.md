# 💎 Zonama - Marketplace de El Salvador

## 🚀 Plataforma de E-commerce Accesible e Inclusiva

Zonama es un marketplace moderno que conecta a vendedores locales con compradores en todo El Salvador, con un enfoque especial en accesibilidad y experiencia de usuario.

---

## ✨ Características Principales

### 🖼️ Modal de Imagen Completa (Lightbox)
- Ver productos en detalle con imágenes a tamaño completo
- Navegación intuitiva con mouse, teclado o touch
- Animaciones suaves y profesionales
- Responsive en todos los dispositivos

### ♿ Accesibilidad
- **Navegación por teclado completa**: Tab, Enter, ESC
- **Etiquetas ARIA**: Roles y labels para tecnologías asistivas
- **Modales accesibles**: aria-modal y aria-label en todos los diálogos
- **Focus visible**: Indicadores claros en elementos interactivos
- **Texto alternativo**: Imágenes con descripciones apropiadas

### 🛒 Funcionalidades de E-commerce
- Catálogo de 27 productos en 5 categorías
- Filtros por tipo (físico/digital) y ordenamiento
- Carrito de compras interactivo
- Proceso de checkout completo
- Múltiples métodos de pago (Tarjeta, Tigo Money, Chivo Wallet, Efectivo)
- **Panel de vendedor completo**:
  - Agregar productos con imágenes (archivo o URL)
  - Editar productos existentes
  - Eliminar productos
  - Dashboard con estadísticas
- Planes para vendedores (Básico, Profesional, Empresarial)

### 🇸🇻 Enfoque Local
- Productos salvadoreños destacados
- Cálculo de envío por departamento
- Soporte en español
- Integración con métodos de pago locales

---

## 📦 Catálogo de Productos

El marketplace cuenta con **27 productos** organizados en 5 categorías:

### Electrónicos (7 productos)
Micrófono Gamer Pro, Webcam HD, Auriculares, Hub USB, Altavoces, Controller Gaming, Tapones USB-C

### Ropa y Accesorios (5 productos)
Camisa Cyberpunk, Fundas, Pulsera, Gafas de Natación

### Hogar (6 productos)
Cojín de Asiento, Almohada, Mousepad Gaming, Soporte 360°, Cubierta para Moto, Hamaca Salvadoreña Tejida

### Coleccionables (7 productos)
Figuras Fumo Reimu, Bocchi, Frieren, Ado, Llavero Gurren Lagann, Artículos especiales

### Productos Salvadoreños (2 productos)
Café Salvadoreño Premium, Artesanía de Barro Negro

**Nota:** 24 productos usan imágenes locales en formato AVIF/PNG, y 3 productos salvadoreños usan imágenes externas.

---

## 🚀 Inicio Rápido

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/zonama.git
cd zonama
```

### 2. Abrir en el Navegador
```bash
# Simplemente abre index.html en tu navegador favorito
open index.html
```

### 3. Explorar las Funcionalidades
1. Navega por los productos
2. Haz clic en "Ver Detalles" de cualquier producto
3. Haz clic en la imagen para ver en tamaño completo
4. Prueba la navegación por teclado con Tab y Enter

---

## 🎯 Funcionalidades Destacadas

### Modal de Imagen Completa (Lightbox)
```
1. Click en un producto → Modal de detalles
2. Click en la imagen → Lightbox con imagen completa
3. ESC o click fuera → Cerrar
```

### Panel de Vendedor
```
1. Registro de vendedor con planes (Básico/Profesional/Empresarial)
2. Dashboard con estadísticas de ventas
3. Agregar productos:
   - Subir imagen desde archivo
   - Usar URL de imagen externa
4. Editar productos existentes (mantiene imagen si no se cambia)
5. Eliminar productos con confirmación
6. Almacenamiento local (localStorage)
```

### Navegación por Teclado
```
Tab           → Siguiente elemento
Shift + Tab   → Elemento anterior
Enter/Espacio → Activar elemento
ESC           → Cerrar modal
```

---

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica con ARIA
- **CSS3**: Estilos modernos con animaciones
- **JavaScript (Vanilla)**: Sin dependencias externas
- **Font Awesome**: Iconos
- **Responsive Design**: Mobile-first

---

## ♿ Accesibilidad

### Características de Accesibilidad Implementadas
- ✅ **Navegación por teclado**: Todos los elementos interactivos son accesibles con Tab, Enter y ESC
- ✅ **ARIA Labels**: Roles y etiquetas descriptivas en modales, botones y formularios
- ✅ **Modales accesibles**: Implementación con aria-modal="true" y aria-label
- ✅ **Texto alternativo**: Imágenes con atributos alt descriptivos
- ✅ **Focus visible**: Indicadores visuales claros para navegación por teclado
- ✅ **Etiquetas de formulario**: Labels asociados correctamente con inputs

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📱 Responsive Design

### Desktop (1920x1080)
- Grid de 5 columnas de productos
- Lightbox optimizado para pantallas grandes
- Navegación completa visible

### Tablet (768x1024)
- Grid de 3 columnas de productos
- Lightbox adaptado
- Menú compacto

### Mobile (375x667)
- Grid de 1 columna
- Lightbox optimizado para touch
- Navegación móvil

---

## 📊 Estructura del Proyecto

```
zonama/
├── index.html                       # Página principal con estructura HTML
├── script.js                        # Lógica de la aplicación (raíz)
├── styles.css                       # Estilos CSS (raíz)
├── css/                             # Carpeta de estilos (alternativa)
│   └── styles.css                  # Estilos CSS y animaciones
├── js/                              # Carpeta de scripts (alternativa)
│   └── script.js                   # Lógica de la aplicación y funcionalidades
├── productos/                       # Imágenes de productos locales (24 archivos)
│   ├── *.avif                      # Imágenes en formato AVIF
│   └── *.png                       # Imágenes en formato PNG
├── 134bf13be1fc1dbdc16360a9ff567cca.jpg  # Imagen hero
├── 1381057802d468a6de12e50123a57b47.jpg  # Imagen adicional
├── README.md                        # Documentación principal
├── DOCUMENTACION-TECNICA.md        # Documentación técnica detallada
└── PRODUCTOS-ACTUALIZADOS.md       # Lista detallada de productos
```

**Nota:** Los archivos CSS y JS están disponibles tanto en la raíz como en carpetas organizadas.

---

## 🤝 Contribuir

¿Quieres contribuir a Zonama? ¡Genial!

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 📞 Contacto

- 📧 Email: soporte@zonama.sv
- 💬 Website: [www.zonama.sv](https://www.zonama.sv)
- 📱 WhatsApp: +503 XXXX-XXXX

---

## 🙏 Agradecimientos

- A la comunidad de El Salvador por su apoyo
- A los usuarios que proporcionaron feedback
- A todos los contribuidores del proyecto

---

## 🔧 Mejoras Recientes

### Versión Actual
- ✅ **Panel de vendedor mejorado**: Corrección del botón de editar producto
- ✅ **Gestión de imágenes**: Soporte para archivos locales y URLs externas
- ✅ **Preservación de datos**: Al editar, mantiene la imagen si no se cambia
- ✅ **Validaciones mejoradas**: Mejor manejo de errores en formularios
- ✅ **Documentación técnica**: Archivo completo con tipos de datos y funciones

---

## 🎯 Roadmap

### Próximas Mejoras
- [ ] Búsqueda con autocompletado
- [ ] Filtros avanzados por categoría y precio
- [ ] Sistema de reseñas y calificaciones
- [ ] Galería de imágenes múltiples por producto
- [ ] Modo oscuro
- [ ] Chat en vivo con vendedores
- [ ] App móvil nativa
- [ ] Integración con pasarelas de pago reales

---

## 📚 Documentación Adicional

- **[DOCUMENTACION-TECNICA.md](DOCUMENTACION-TECNICA.md)**: Documentación completa de funciones, tipos de datos y estructuras
- **[PRODUCTOS-ACTUALIZADOS.md](PRODUCTOS-ACTUALIZADOS.md)**: Lista detallada de todos los productos del catálogo

---

**Hecho con ❤️ en El Salvador 🇸🇻**

*Última actualización: Noviembre 2024*
