using System.ComponentModel.DataAnnotations;
using ZonamaAPI.Models;

namespace ZonamaAPI.DTOs;

public record SellerDto(
    int Id,
    int UserId,
    string StoreName,
    string? Description,
    string? LogoUrl,
    string? Location,
    string? Phone,
    string Plan,
    double Rating,
    int TotalSales,
    bool IsVerified,
    DateTime CreatedAt
);

public record RegisterSellerRequest(
    [Required, MinLength(3)] string StoreName,
    string? Description,
    string? LogoUrl,
    string? Location,
    string? Phone,
    SellerPlan Plan
);

public record UpdateSellerRequest(
    string? StoreName,
    string? Description,
    string? LogoUrl,
    string? Location,
    string? Phone,
    SellerPlan? Plan
);

public record SellerDashboardDto(
    SellerDto Seller,
    int TotalProducts,
    int ActiveProducts,
    decimal TotalRevenue,
    int PendingOrders,
    List<ProductDto> RecentProducts
);
