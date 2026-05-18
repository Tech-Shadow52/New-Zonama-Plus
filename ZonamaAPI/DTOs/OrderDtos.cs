using System.ComponentModel.DataAnnotations;
using ZonamaAPI.Models;

namespace ZonamaAPI.DTOs;

public record OrderItemDto(
    int ProductId,
    string ProductTitle,
    string? ProductImage,
    int Quantity,
    decimal UnitPrice,
    decimal Subtotal
);

public record OrderDto(
    int Id,
    string Status,
    string PaymentMethod,
    decimal Total,
    string? DeliveryAddress,
    double? DeliveryLat,
    double? DeliveryLng,
    string? Notes,
    List<OrderItemDto> Items,
    DateTime CreatedAt
);

public record CreateOrderRequest(
    [Required] PaymentMethod PaymentMethod,
    string? DeliveryAddress,
    double? DeliveryLat,
    double? DeliveryLng,
    string? Notes,
    List<OrderLineRequest>? Items  // null = use current cart
);

public record OrderLineRequest(
    [Required] int ProductId,
    [Required, Range(1, 99)] int Quantity
);

public record UpdateOrderStatusRequest(
    [Required] OrderStatus Status
);
