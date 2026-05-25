using System.ComponentModel.DataAnnotations;

namespace ZonamaAPI.DTOs;

public record CartItemDto(
    int Id,
    int ProductId,
    string ProductTitle,
    string? ProductImage,
    decimal UnitPrice,
    int Quantity,
    decimal Subtotal
);

public record CartDto(
    List<CartItemDto> Items,
    decimal Total,
    int ItemCount
);

public record AddToCartRequest(
    [Required] int ProductId,
    [Range(1, 99)] int Quantity = 1
);

public record UpdateCartItemRequest(
    [Required, Range(1, 99)] int Quantity
);
