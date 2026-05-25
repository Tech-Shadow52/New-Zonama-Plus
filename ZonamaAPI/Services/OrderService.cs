using Microsoft.EntityFrameworkCore;
using ZonamaAPI.Common;
using ZonamaAPI.Data;
using ZonamaAPI.DTOs;
using ZonamaAPI.Models;
using ZonamaAPI.Services.Interfaces;

namespace ZonamaAPI.Services;

public class OrderService(ZonamaDbContext db) : IOrderService
{
    public async Task<ApiResponse<OrderDto>> CreateAsync(int userId, CreateOrderRequest req)
    {
        List<(Product product, int qty)> lines;

        if (req.Items is { Count: > 0 })
        {
            lines = [];
            foreach (var line in req.Items)
            {
                var p = await db.Products.FindAsync(line.ProductId);
                if (p is null || !p.IsActive) return ApiResponse<OrderDto>.Fail($"Producto {line.ProductId} no disponible.");
                if (p.Stock < line.Quantity) return ApiResponse<OrderDto>.Fail($"Stock insuficiente para {p.Title}.");
                lines.Add((p, line.Quantity));
            }
        }
        else
        {
            var cartItems = await db.CartItems.Include(c => c.Product).Where(c => c.UserId == userId).ToListAsync();
            if (cartItems.Count == 0) return ApiResponse<OrderDto>.Fail("El carrito está vacío.");
            lines = cartItems.Select(c => (c.Product, c.Quantity)).ToList();
        }

        var order = new Order
        {
            UserId = userId,
            PaymentMethod = req.PaymentMethod,
            DeliveryAddress = req.DeliveryAddress,
            DeliveryLat = req.DeliveryLat,
            DeliveryLng = req.DeliveryLng,
            Notes = req.Notes
        };

        foreach (var (product, qty) in lines)
        {
            order.Items.Add(new OrderItem { ProductId = product.Id, Quantity = qty, UnitPrice = product.Price });
            product.Stock -= qty;
        }

        order.Total = order.Items.Sum(i => i.UnitPrice * i.Quantity);

        db.Orders.Add(order);

        // Clear cart after order
        if (req.Items is null or { Count: 0 })
        {
            var cart = await db.CartItems.Where(c => c.UserId == userId).ToListAsync();
            db.CartItems.RemoveRange(cart);
        }

        await db.SaveChangesAsync();
        return ApiResponse<OrderDto>.Ok(ToDto(order), "Orden creada exitosamente.");
    }

    public async Task<ApiResponse<OrderDto>> GetByIdAsync(int id, int userId)
    {
        var order = await db.Orders.Include(o => o.Items).ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);
        return order is null
            ? ApiResponse<OrderDto>.Fail("Orden no encontrada.")
            : ApiResponse<OrderDto>.Ok(ToDto(order));
    }

    public async Task<ApiResponse<List<OrderDto>>> GetUserOrdersAsync(int userId)
    {
        var orders = await db.Orders.Include(o => o.Items).ThenInclude(i => i.Product)
            .Where(o => o.UserId == userId).OrderByDescending(o => o.CreatedAt).ToListAsync();
        return ApiResponse<List<OrderDto>>.Ok(orders.Select(ToDto).ToList());
    }

    public async Task<ApiResponse<OrderDto>> UpdateStatusAsync(int id, UpdateOrderStatusRequest req)
    {
        var order = await db.Orders.Include(o => o.Items).ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(o => o.Id == id);
        if (order is null) return ApiResponse<OrderDto>.Fail("Orden no encontrada.");

        order.Status = req.Status;
        order.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return ApiResponse<OrderDto>.Ok(ToDto(order));
    }

    private static OrderDto ToDto(Order o) => new(
        o.Id, o.Status.ToString(), o.PaymentMethod.ToString(), o.Total,
        o.DeliveryAddress, o.DeliveryLat, o.DeliveryLng, o.Notes,
        o.Items.Select(i => new OrderItemDto(
            i.ProductId, i.Product?.Title ?? "", i.Product?.ImageUrl,
            i.Quantity, i.UnitPrice, i.UnitPrice * i.Quantity)).ToList(),
        o.CreatedAt);
}

