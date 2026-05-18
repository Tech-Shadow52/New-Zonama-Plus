namespace ZonamaAPI.Models;

public class Product
{
    public int Id { get; set; }
    public int SellerId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public decimal? OriginalPrice { get; set; }
    public ProductCategory Category { get; set; }
    public string? Brand { get; set; }
    public string? ImageUrl { get; set; }
    public ICollection<string> ImageUrls { get; set; } = [];
    public int Stock { get; set; } = 0;
    public double Rating { get; set; } = 0;
    public int ReviewCount { get; set; } = 0;
    public bool IsFeatured { get; set; } = false;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Seller Seller { get; set; } = null!;
    public ICollection<OrderItem> OrderItems { get; set; } = [];
    public ICollection<CartItem> CartItems { get; set; } = [];
    public ICollection<WishlistItem> WishlistItems { get; set; } = [];
}
