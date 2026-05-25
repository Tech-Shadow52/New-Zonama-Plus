using Microsoft.EntityFrameworkCore;
using ZonamaAPI.Common;
using ZonamaAPI.Data;
using ZonamaAPI.DTOs;
using ZonamaAPI.Models;
using ZonamaAPI.Services.Interfaces;

namespace ZonamaAPI.Services;

public class ProductService(ZonamaDbContext db) : IProductService
{
    public async Task<ApiResponse<PagedResult<ProductDto>>> GetAllAsync(ProductFilterRequest f)
    {
        var q = db.Products.Include(p => p.Seller).Where(p => p.IsActive).AsQueryable();

        if (!string.IsNullOrWhiteSpace(f.Search))
            q = q.Where(p => p.Title.Contains(f.Search) || (p.Brand != null && p.Brand.Contains(f.Search)));
        if (f.Category.HasValue) q = q.Where(p => p.Category == f.Category.Value);
        if (f.MinPrice.HasValue) q = q.Where(p => p.Price >= f.MinPrice.Value);
        if (f.MaxPrice.HasValue) q = q.Where(p => p.Price <= f.MaxPrice.Value);
        if (f.SellerId.HasValue) q = q.Where(p => p.SellerId == f.SellerId.Value);
        if (f.IsFeatured.HasValue) q = q.Where(p => p.IsFeatured == f.IsFeatured.Value);

        q = f.SortBy switch
        {
            "price_asc"  => q.OrderBy(p => p.Price),
            "price_desc" => q.OrderByDescending(p => p.Price),
            "rating"     => q.OrderByDescending(p => p.Rating),
            _            => q.OrderByDescending(p => p.CreatedAt)
        };

        var total = await q.CountAsync();
        var items = await q.Skip((f.Page - 1) * f.PageSize).Take(f.PageSize).Select(p => ToDto(p)).ToListAsync();

        return ApiResponse<PagedResult<ProductDto>>.Ok(new PagedResult<ProductDto>
        {
            Items = items, TotalCount = total, Page = f.Page, PageSize = f.PageSize
        });
    }

    public async Task<ApiResponse<ProductDto>> GetByIdAsync(int id)
    {
        var p = await db.Products.Include(p => p.Seller).FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
        return p is null
            ? ApiResponse<ProductDto>.Fail("Producto no encontrado.")
            : ApiResponse<ProductDto>.Ok(ToDto(p));
    }

    public async Task<ApiResponse<ProductDto>> CreateAsync(int sellerId, CreateProductRequest req)
    {
        var seller = await db.Sellers.FindAsync(sellerId);
        if (seller is null) return ApiResponse<ProductDto>.Fail("Vendedor no encontrado.");

        var product = new Product
        {
            SellerId = sellerId,
            Title = req.Title,
            Description = req.Description,
            Price = req.Price,
            OriginalPrice = req.OriginalPrice,
            Category = req.Category,
            Brand = req.Brand,
            ImageUrl = req.ImageUrl,
            ImageUrls = req.ImageUrls ?? [],
            Stock = req.Stock
        };

        db.Products.Add(product);
        await db.SaveChangesAsync();
        await db.Entry(product).Reference(p => p.Seller).LoadAsync();

        return ApiResponse<ProductDto>.Ok(ToDto(product), "Producto creado.");
    }

    public async Task<ApiResponse<ProductDto>> UpdateAsync(int id, int sellerId, UpdateProductRequest req)
    {
        var product = await db.Products.Include(p => p.Seller)
            .FirstOrDefaultAsync(p => p.Id == id && p.SellerId == sellerId);
        if (product is null) return ApiResponse<ProductDto>.Fail("Producto no encontrado.");

        if (req.Title is not null) product.Title = req.Title;
        if (req.Description is not null) product.Description = req.Description;
        if (req.Price.HasValue) product.Price = req.Price.Value;
        if (req.OriginalPrice.HasValue) product.OriginalPrice = req.OriginalPrice.Value;
        if (req.Category.HasValue) product.Category = req.Category.Value;
        if (req.Brand is not null) product.Brand = req.Brand;
        if (req.ImageUrl is not null) product.ImageUrl = req.ImageUrl;
        if (req.ImageUrls is not null) product.ImageUrls = req.ImageUrls;
        if (req.Stock.HasValue) product.Stock = req.Stock.Value;
        if (req.IsActive.HasValue) product.IsActive = req.IsActive.Value;

        await db.SaveChangesAsync();
        return ApiResponse<ProductDto>.Ok(ToDto(product));
    }

    public async Task<ApiResponse<bool>> DeleteAsync(int id, int sellerId)
    {
        var product = await db.Products.FirstOrDefaultAsync(p => p.Id == id && p.SellerId == sellerId);
        if (product is null) return ApiResponse<bool>.Fail("Producto no encontrado.");

        product.IsActive = false;
        await db.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true, "Producto eliminado.");
    }

    public async Task<ApiResponse<List<ProductDto>>> GetFeaturedAsync(int count = 8)
    {
        var items = await db.Products.Include(p => p.Seller)
            .Where(p => p.IsActive && p.IsFeatured)
            .OrderByDescending(p => p.Rating)
            .Take(count)
            .Select(p => ToDto(p))
            .ToListAsync();
        return ApiResponse<List<ProductDto>>.Ok(items);
    }

    private static ProductDto ToDto(Product p) => new(
        p.Id, p.SellerId, p.Seller?.StoreName ?? "",
        p.Title, p.Description, p.Price, p.OriginalPrice,
        p.Category.ToString(), p.Brand, p.ImageUrl,
        p.ImageUrls.ToList(), p.Stock, p.Rating, p.ReviewCount,
        p.IsFeatured, p.CreatedAt);
}
