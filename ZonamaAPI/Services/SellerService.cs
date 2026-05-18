using Microsoft.EntityFrameworkCore;
using ZonamaAPI.Common;
using ZonamaAPI.Data;
using ZonamaAPI.DTOs;
using ZonamaAPI.Models;
using ZonamaAPI.Services.Interfaces;

namespace ZonamaAPI.Services;

public class SellerService(ZonamaDbContext db) : ISellerService
{
    public async Task<ApiResponse<SellerDto>> GetByIdAsync(int id)
    {
        var s = await db.Sellers.Include(s => s.User).FirstOrDefaultAsync(s => s.Id == id);
        return s is null ? ApiResponse<SellerDto>.Fail("Vendedor no encontrado.") : ApiResponse<SellerDto>.Ok(ToDto(s));
    }

    public async Task<ApiResponse<SellerDto>> GetByUserIdAsync(int userId)
    {
        var s = await db.Sellers.Include(s => s.User).FirstOrDefaultAsync(s => s.UserId == userId);
        return s is null ? ApiResponse<SellerDto>.Fail("No tienes una tienda registrada.") : ApiResponse<SellerDto>.Ok(ToDto(s));
    }

    public async Task<ApiResponse<SellerDto>> RegisterAsync(int userId, RegisterSellerRequest req)
    {
        if (await db.Sellers.AnyAsync(s => s.UserId == userId))
            return ApiResponse<SellerDto>.Fail("Ya tienes una tienda registrada.");

        var seller = new Seller
        {
            UserId = userId,
            StoreName = req.StoreName,
            Description = req.Description,
            LogoUrl = req.LogoUrl,
            Location = req.Location,
            Phone = req.Phone,
            Plan = req.Plan
        };

        db.Sellers.Add(seller);

        var user = await db.Users.FindAsync(userId);
        if (user is not null) user.Role = UserRole.Seller;

        await db.SaveChangesAsync();
        await db.Entry(seller).Reference(s => s.User).LoadAsync();

        return ApiResponse<SellerDto>.Ok(ToDto(seller), "Tienda registrada exitosamente.");
    }

    public async Task<ApiResponse<SellerDto>> UpdateAsync(int id, int userId, UpdateSellerRequest req)
    {
        var seller = await db.Sellers.Include(s => s.User).FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);
        if (seller is null) return ApiResponse<SellerDto>.Fail("Tienda no encontrada.");

        if (req.StoreName is not null) seller.StoreName = req.StoreName;
        if (req.Description is not null) seller.Description = req.Description;
        if (req.LogoUrl is not null) seller.LogoUrl = req.LogoUrl;
        if (req.Location is not null) seller.Location = req.Location;
        if (req.Phone is not null) seller.Phone = req.Phone;
        if (req.Plan.HasValue) seller.Plan = req.Plan.Value;

        await db.SaveChangesAsync();
        return ApiResponse<SellerDto>.Ok(ToDto(seller));
    }

    public async Task<ApiResponse<SellerDashboardDto>> GetDashboardAsync(int userId)
    {
        var seller = await db.Sellers.Include(s => s.User).FirstOrDefaultAsync(s => s.UserId == userId);
        if (seller is null) return ApiResponse<SellerDashboardDto>.Fail("Tienda no encontrada.");

        var products = await db.Products.Where(p => p.SellerId == seller.Id).ToListAsync();
        var revenue = await db.OrderItems
            .Where(oi => oi.Product.SellerId == seller.Id)
            .SumAsync(oi => oi.UnitPrice * oi.Quantity);
        var pendingOrders = await db.Orders
            .Where(o => o.Status == OrderStatus.Pending && o.Items.Any(i => i.Product.SellerId == seller.Id))
            .CountAsync();

        var recentProducts = products.OrderByDescending(p => p.CreatedAt).Take(5)
            .Select(p => new ProductDto(p.Id, p.SellerId, seller.StoreName, p.Title, p.Description,
                p.Price, p.OriginalPrice, p.Category.ToString(), p.Brand, p.ImageUrl,
                p.ImageUrls.ToList(), p.Stock, p.Rating, p.ReviewCount, p.IsFeatured, p.CreatedAt))
            .ToList();

        return ApiResponse<SellerDashboardDto>.Ok(new SellerDashboardDto(
            ToDto(seller), products.Count, products.Count(p => p.IsActive),
            revenue, pendingOrders, recentProducts));
    }

    private static SellerDto ToDto(Seller s) =>
        new(s.Id, s.UserId, s.StoreName, s.Description, s.LogoUrl,
            s.Location, s.Phone, s.Plan.ToString(), s.Rating, s.TotalSales, s.IsVerified, s.CreatedAt);
}
