namespace ZonamaAPI.Models;

public class Seller
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string StoreName { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? LogoUrl { get; set; }
    public string? Location { get; set; }
    public string? Phone { get; set; }
    public SellerPlan Plan { get; set; } = SellerPlan.Basic;
    public double Rating { get; set; } = 0;
    public int TotalSales { get; set; } = 0;
    public bool IsVerified { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public ICollection<Product> Products { get; set; } = [];
}
