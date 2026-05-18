using Microsoft.EntityFrameworkCore;
using ZonamaAPI.Models;

namespace ZonamaAPI.Data;

public class ZonamaDbContext(DbContextOptions<ZonamaDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Seller> Sellers => Set<Seller>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<WishlistItem> WishlistItems => Set<WishlistItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<User>(e =>
        {
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.Role).HasConversion<string>();
        });

        mb.Entity<Seller>(e =>
        {
            e.HasOne(s => s.User).WithOne(u => u.Seller)
             .HasForeignKey<Seller>(s => s.UserId);
            e.Property(s => s.Plan).HasConversion<string>();
        });

        mb.Entity<Product>(e =>
        {
            e.Property(p => p.Price).HasColumnType("decimal(18,2)");
            e.Property(p => p.OriginalPrice).HasColumnType("decimal(18,2)");
            e.Property(p => p.Category).HasConversion<string>();
            // Store image URLs as JSON array
            e.Property(p => p.ImageUrls)
             .HasConversion(
                 v => string.Join(',', v),
                 v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList())
             .HasColumnType("nvarchar(max)");
        });

        mb.Entity<Order>(e =>
        {
            e.Property(o => o.Total).HasColumnType("decimal(18,2)");
            e.Property(o => o.Status).HasConversion<string>();
            e.Property(o => o.PaymentMethod).HasConversion<string>();
        });

        mb.Entity<OrderItem>(e =>
        {
            e.Property(o => o.UnitPrice).HasColumnType("decimal(18,2)");
            // NoAction evita múltiples rutas de cascada en SQL Server
            e.HasOne(oi => oi.Product).WithMany(p => p.OrderItems)
             .HasForeignKey(oi => oi.ProductId).OnDelete(DeleteBehavior.Restrict);
            e.HasOne(oi => oi.Order).WithMany(o => o.Items)
             .HasForeignKey(oi => oi.OrderId).OnDelete(DeleteBehavior.Cascade);
        });

        mb.Entity<CartItem>(e =>
        {
            e.HasIndex(c => new { c.UserId, c.ProductId }).IsUnique();
            e.HasOne(c => c.User).WithMany(u => u.CartItems)
             .HasForeignKey(c => c.UserId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(c => c.Product).WithMany(p => p.CartItems)
             .HasForeignKey(c => c.ProductId).OnDelete(DeleteBehavior.Restrict);
        });

        mb.Entity<WishlistItem>(e =>
        {
            e.HasIndex(w => new { w.UserId, w.ProductId }).IsUnique();
            e.HasOne(w => w.User).WithMany(u => u.WishlistItems)
             .HasForeignKey(w => w.UserId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(w => w.Product).WithMany(p => p.WishlistItems)
             .HasForeignKey(w => w.ProductId).OnDelete(DeleteBehavior.Restrict);
        });
    }
}
