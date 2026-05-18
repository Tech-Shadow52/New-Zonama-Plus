using ZonamaAPI.Models;

namespace ZonamaAPI.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ZonamaDbContext db)
    {
        if (db.Products.Any()) return; // Ya tiene datos

        // Crear usuario y vendedor sistema para los productos del catálogo
        var systemUser = new User
        {
            Name = "Zonama Catalog",
            Email = "catalog@zonama.sv",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("zonama2024"),
            Role = UserRole.Seller,
            IsActive = true
        };
        db.Users.Add(systemUser);
        await db.SaveChangesAsync();

        var systemSeller = new Seller
        {
            UserId = systemUser.Id,
            StoreName = "Zonama Official",
            Description = "Catálogo oficial de Zonama",
            Location = "El Salvador",
            Plan = SellerPlan.Premium,
            IsVerified = true,
            Rating = 5.0
        };
        db.Sellers.Add(systemSeller);
        await db.SaveChangesAsync();

        var products = new List<Product>
        {
            // Electronics
            new() { SellerId = systemSeller.Id, Title = "Micrófono Gamer Pro", Price = 89.99m, Category = ProductCategory.Electronics, Brand = "AudioTech", ImageUrl = "data/productos/microfono gamer pro.avif", Description = "Micrófono profesional para streaming y gaming con cancelación de ruido, brazo ajustable y calidad de estudio.", Stock = 20, Rating = 4.7, IsFeatured = true },
            new() { SellerId = systemSeller.Id, Title = "Webcam HD Pro", Price = 79.99m, Category = ProductCategory.Electronics, Brand = "VisionTech", ImageUrl = "data/productos/webcam.avif", Description = "Webcam Full HD 1080p con enfoque automático, micrófono integrado y corrección de luz.", Stock = 15, Rating = 4.5, IsFeatured = true },
            new() { SellerId = systemSeller.Id, Title = "Auriculares On-Ear Clásicos", Price = 24.99m, Category = ProductCategory.Electronics, Brand = "BasicSound", ImageUrl = "data/productos/auriculares simples para gente pobre (o muy pragmatica).avif", Description = "Auriculares on-ear con sonido claro y cómodo. Diseño ligero ideal para uso diario.", Stock = 30, Rating = 4.2 },
            new() { SellerId = systemSeller.Id, Title = "Hub USB Multipuerto", Price = 34.99m, Category = ProductCategory.Electronics, Brand = "ConnectPro", ImageUrl = "data/productos/hub usb.avif", Description = "Hub USB con múltiples puertos para expandir la conectividad de tu laptop o PC.", Stock = 25, Rating = 4.4 },
            new() { SellerId = systemSeller.Id, Title = "Altavoces para Ordenador", Price = 45.99m, Category = ProductCategory.Electronics, Brand = "SoundMax", ImageUrl = "data/productos/altavoces ordenador.avif", Description = "Altavoces estéreo para PC con sonido potente y claro.", Stock = 18, Rating = 4.3 },
            new() { SellerId = systemSeller.Id, Title = "Controller Gaming", Price = 59.99m, Category = ProductCategory.Electronics, Brand = "GamePro", ImageUrl = "data/productos/controller.avif", Description = "Control inalámbrico para gaming con vibración y batería recargable.", Stock = 22, Rating = 4.6, IsFeatured = true },
            new() { SellerId = systemSeller.Id, Title = "Tapones Antipolvo USB-C", Price = 8.99m, Category = ProductCategory.Electronics, Brand = "ProtectTech", ImageUrl = "data/productos/tapones antipolvo ubs c.avif", Description = "Set de tapones protectores para puertos USB-C.", Stock = 100, Rating = 4.1 },
            new() { SellerId = systemSeller.Id, Title = "PC Gaming Alienware Aurora", Price = 1899.99m, OriginalPrice = 2199.99m, Category = ProductCategory.Electronics, Brand = "Alienware", ImageUrl = "data/productos para vender/alienware-Hpaq-kBcYHk-unsplash.jpg", Description = "Setup gaming completo Alienware Aurora. Intel Core i9, RTX 4090, 32GB RAM.", Stock = 5, Rating = 4.9, IsFeatured = true },
            new() { SellerId = systemSeller.Id, Title = "Cámara Sony Alpha + Kit de Lentes", Price = 1299.99m, OriginalPrice = 1499.99m, Category = ProductCategory.Electronics, Brand = "Sony", ImageUrl = "data/productos para vender/conor-luddy-IVaKksEZmZA-unsplash.jpg", Description = "Cámara mirrorless Sony Alpha con kit de 3 lentes. Video 4K, 24.2MP.", Stock = 8, Rating = 4.8, IsFeatured = true },
            new() { SellerId = systemSeller.Id, Title = "Monitor 4K 27\" + Tablet Bundle", Price = 649.99m, OriginalPrice = 799.99m, Category = ProductCategory.Electronics, Brand = "Acer", ImageUrl = "data/productos para vender/kitai-zhvaeh-R9rA-unsplash.jpg", Description = "Bundle productividad: monitor 4K 27 pulgadas con tablet incluida.", Stock = 10, Rating = 4.7, IsFeatured = true },
            new() { SellerId = systemSeller.Id, Title = "Auriculares Premium Hi-Fi", Price = 189.99m, OriginalPrice = 229.99m, Category = ProductCategory.Electronics, Brand = "Aëdle", ImageUrl = "data/productos para vender/lee-campbell-GI6L2pkiZgQ-unsplash.jpg", Description = "Auriculares on-ear Hi-Fi con aluminio cepillado y cuero genuino.", Stock = 12, Rating = 4.8 },

            // Clothing
            new() { SellerId = systemSeller.Id, Title = "Camisa Cyberpunk", Price = 39.99m, Category = ProductCategory.Clothing, Brand = "FutureWear", ImageUrl = "data/productos/camisa cyberpunk.avif", Description = "Camisa estilo cyberpunk con diseño futurista.", Stock = 40, Rating = 4.5 },
            new() { SellerId = systemSeller.Id, Title = "Funda Cyberpunk Edgerunners", Price = 19.99m, Category = ProductCategory.Clothing, Brand = "AnimeTech", ImageUrl = "data/productos/funda cyberpunk edgerunners.avif", Description = "Funda para smartphone con diseño de Cyberpunk Edgerunners.", Stock = 50, Rating = 4.6 },
            new() { SellerId = systemSeller.Id, Title = "Funda Universal", Price = 14.99m, Category = ProductCategory.Clothing, Brand = "ProtectCase", ImageUrl = "data/productos/funda.avif", Description = "Funda universal para smartphone con diseño elegante.", Stock = 60, Rating = 4.3 },
            new() { SellerId = systemSeller.Id, Title = "Pulsera de Moda", Price = 12.99m, Category = ProductCategory.Clothing, Brand = "AccessStyle", ImageUrl = "data/productos/pulsera.avif", Description = "Pulsera elegante y moderna. Accesorio perfecto para cualquier ocasión.", Stock = 80, Rating = 4.2 },
            new() { SellerId = systemSeller.Id, Title = "Gafas de Natación", Price = 18.99m, Category = ProductCategory.Clothing, Brand = "AquaPro", ImageUrl = "data/productos/gafas de natación.avif", Description = "Gafas de natación profesionales con protección UV.", Stock = 35, Rating = 4.4 },

            // Home
            new() { SellerId = systemSeller.Id, Title = "Cojín de Asiento", Price = 24.99m, Category = ProductCategory.Home, Brand = "ComfortHome", ImageUrl = "data/productos/cojin de asiento.avif", Description = "Cojín ergonómico para silla con memoria de forma.", Stock = 28, Rating = 4.5 },
            new() { SellerId = systemSeller.Id, Title = "Almohada para Dormir", Price = 29.99m, Category = ProductCategory.Home, Brand = "DreamSoft", ImageUrl = "data/productos/cosa para dormir.avif", Description = "Almohada ergonómica hipoalergénica para un descanso perfecto.", Stock = 20, Rating = 4.6 },
            new() { SellerId = systemSeller.Id, Title = "Mousepad Gaming Power", Price = 19.99m, Category = ProductCategory.Home, Brand = "GameDesk", ImageUrl = "data/productos/mousepad power.avif", Description = "Mousepad gaming 80x30cm con base antideslizante.", Stock = 45, Rating = 4.4 },
            new() { SellerId = systemSeller.Id, Title = "Soporte 360° para Teléfono/Tablet", Price = 16.99m, Category = ProductCategory.Home, Brand = "HoldTech", ImageUrl = "data/productos/soporte 360 telefono tab.avif", Description = "Soporte ajustable 360° para smartphone y tablet.", Stock = 55, Rating = 4.3 },
            new() { SellerId = systemSeller.Id, Title = "Cubierta para Moto", Price = 34.99m, Category = ProductCategory.Home, Brand = "MotoProtect", ImageUrl = "data/productos/cubierta de moto.avif", Description = "Cubierta impermeable para motocicleta.", Stock = 18, Rating = 4.2 },

            // Books
            new() { SellerId = systemSeller.Id, Title = "Atomic Habits", Price = 16.99m, Category = ProductCategory.Books, Brand = "Penguin Random House", ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg", Description = "Un método probado para construir hábitos efectivos. James Clear.", Stock = 50, Rating = 4.9, IsFeatured = true },
            new() { SellerId = systemSeller.Id, Title = "Sapiens: A Brief History of Humankind", Price = 18.99m, Category = ProductCategory.Books, Brand = "Harper", ImageUrl = "https://internacionallibrosyregalos.com/cdn/shop/files/9788466347518_1_1024x1024@2x.jpg?v=1684190524", Description = "Un recorrido profundo sobre la evolución de la humanidad. Yuval Noah Harari.", Stock = 40, Rating = 4.9, IsFeatured = true },
            new() { SellerId = systemSeller.Id, Title = "It Ends With Us", Price = 14.99m, Category = ProductCategory.Books, Brand = "Atria Books", ImageUrl = "data/productos para vender/91CqNElQaKL._SL1500_.jpg", Description = "Novela #1 en ventas del New York Times de Colleen Hoover.", Stock = 35, Rating = 4.7 },
            new() { SellerId = systemSeller.Id, Title = "Chainsaw Man, Vol. 1", Price = 9.99m, Category = ProductCategory.Books, Brand = "VIZ Media", ImageUrl = "https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6655_albumes_big.jpeg", Description = "Primer volumen de Chainsaw Man. Tatsuki Fujimoto.", Stock = 60, Rating = 4.8 },

            // Other (misc)
            new() { SellerId = systemSeller.Id, Title = "Figura Fumo Reimu Touhou", Price = 29.99m, Category = ProductCategory.Other, Brand = "AnimeCollect", ImageUrl = "data/productos/fumo reimu touhou gamer pro.avif", Description = "Figura coleccionable Fumo de Reimu Hakurei de Touhou Project.", Stock = 10, Rating = 4.8 },
            new() { SellerId = systemSeller.Id, Title = "Figura Bocchi", Price = 34.99m, Category = ProductCategory.Other, Brand = "AnimeCollect", ImageUrl = "data/productos/bocchi.avif", Description = "Figura coleccionable de Bocchi the Rock.", Stock = 8, Rating = 4.7 },
            new() { SellerId = systemSeller.Id, Title = "Figura Frieren", Price = 39.99m, Category = ProductCategory.Other, Brand = "AnimeCollect", ImageUrl = "data/productos/frieren.avif", Description = "Figura coleccionable de Frieren: Beyond Journey's End.", Stock = 6, Rating = 4.9, IsFeatured = true },
            new() { SellerId = systemSeller.Id, Title = "Figura Ado", Price = 32.99m, Category = ProductCategory.Other, Brand = "MusicCollect", ImageUrl = "data/productos/ado.avif", Description = "Figura coleccionable de Ado, la famosa cantante japonesa.", Stock = 7, Rating = 4.6 },
            new() { SellerId = systemSeller.Id, Title = "Llavero Gurren Lagann", Price = 9.99m, Category = ProductCategory.Other, Brand = "AnimeKeys", ImageUrl = "data/productos/llavero gurren laggan.avif", Description = "Llavero metálico de Gurren Lagann.", Stock = 40, Rating = 4.5 },
        };

        db.Products.AddRange(products);
        await db.SaveChangesAsync();
    }
}
