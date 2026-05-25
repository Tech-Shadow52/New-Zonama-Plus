using System.ComponentModel.DataAnnotations;
using ZonamaAPI.Models;

namespace ZonamaAPI.DTOs;

public record ProductDto(
    int Id,
    int SellerId,
    string SellerName,
    string Title,
    string? Description,
    decimal Price,
    decimal? OriginalPrice,
    string Category,
    string? Brand,
    string? ImageUrl,
    List<string> ImageUrls,
    int Stock,
    double Rating,
    int ReviewCount,
    bool IsFeatured,
    DateTime CreatedAt
);

public record CreateProductRequest(
    [Required, MinLength(3)] string Title,
    string? Description,
    [Required, Range(0.01, double.MaxValue)] decimal Price,
    decimal? OriginalPrice,
    [Required] ProductCategory Category,
    string? Brand,
    string? ImageUrl,
    List<string>? ImageUrls,
    [Range(0, int.MaxValue)] int Stock
);

public record UpdateProductRequest(
    string? Title,
    string? Description,
    [Range(0.01, double.MaxValue)] decimal? Price,
    decimal? OriginalPrice,
    ProductCategory? Category,
    string? Brand,
    string? ImageUrl,
    List<string>? ImageUrls,
    [Range(0, int.MaxValue)] int? Stock,
    bool? IsActive
);

public record ProductFilterRequest
{
    public string? Search { get; init; }
    public ProductCategory? Category { get; init; }
    public decimal? MinPrice { get; init; }
    public decimal? MaxPrice { get; init; }
    public int? SellerId { get; init; }
    public bool? IsFeatured { get; init; }
    public string SortBy { get; init; } = "newest";
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 20;
}
