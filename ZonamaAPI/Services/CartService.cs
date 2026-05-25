using Microsoft.EntityFrameworkCore;
using ZonamaAPI.Common;
using ZonamaAPI.Data;
using ZonamaAPI.DTOs;
using ZonamaAPI.Models;
using ZonamaAPI.Services.Interfaces;

namespace ZonamaAPI.Services;

public class CartService(ZonamaDbContext db) : ICartService
{
    public async Task<ApiResponse<CartDto>> GetCartAsync(int userId)
    {
        var items = await db.CartItems
            .Include(c => c.Product)
            .Where(c => c.UserId == userId)
            .ToListAsync();
        return ApiResponse<CartDto>.Ok(BuildCartDto(items));
    }

    public async Task<ApiResponse<CartDto>> AddItemAsync(int userId, AddToCartRequest req)
    {
        var product = await db.Products.FindAsync(req.ProductId);
        if (product is null || !product.IsActive)
            return ApiResponse<CartDto>.Fail("Producto no disponible.");
        if (product.Stock < req.Quantity)
            return ApiResponse<CartDto>.Fail("Stock insuficiente.");

        var existing = await db.CartItems.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == req.ProductId);
        if (existing is not null)
            existing.Quantity = Math.Min(existing.Quantity + req.Quantity, 99);
        else
            db.CartItems.Add(new CartItem { UserId = userId, ProductId = req.ProductId, Quantity = req.Quantity });

        await db.SaveChangesAsync();
        return await GetCartAsync(userId);
    }

    public async Task<ApiResponse<CartDto>> UpdateItemAsync(int userId, int productId, UpdateCartItemRequest req)
    {
        var item = await db.CartItems.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);
        if (item is null) return ApiResponse<CartDto>.Fail("Ítem no encontrado en el carrito.");

        item.Quantity = req.Quantity;
        await db.SaveChangesAsync();
        return await GetCartAsync(userId);
    }

    public async Task<ApiResponse<CartDto>> RemoveItemAsync(int userId, int productId)
    {
        var item = await db.CartItems.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);
        if (item is null) return ApiResponse<CartDto>.Fail("Ítem no encontrado.");

        db.CartItems.Remove(item);
        await db.SaveChangesAsync();
        return await GetCartAsync(userId);
    }

    public async Task<ApiResponse<bool>> ClearCartAsync(int userId)
    {
        var items = await db.CartItems.Where(c => c.UserId == userId).ToListAsync();
        db.CartItems.RemoveRange(items);
        await db.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true);
    }

    private static CartDto BuildCartDto(List<CartItem> items)
    {
        var dtos = items.Select(c => new CartItemDto(
            c.Id, c.ProductId, c.Product.Title, c.Product.ImageUrl,
            c.Product.Price, c.Quantity, c.Product.Price * c.Quantity)).ToList();
        return new CartDto(dtos, dtos.Sum(d => d.Subtotal), dtos.Sum(d => d.Quantity));
    }
}
