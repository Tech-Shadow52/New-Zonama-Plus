namespace ZonamaAPI.Models;

public class CartItem
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; } = 1;
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public Product Product { get; set; } = null!;
}
