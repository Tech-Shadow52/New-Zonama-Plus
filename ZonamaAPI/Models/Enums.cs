namespace ZonamaAPI.Models;

public enum UserRole { Buyer, Seller, Admin }

public enum OrderStatus { Pending, Confirmed, Shipped, Delivered, Cancelled }

public enum PaymentMethod { Cash, Card, Transfer }

public enum SellerPlan { Basic, Pro, Premium }

public enum ProductCategory
{
    Electronics,
    Books,
    Clothing,
    Sports,
    Home,
    Beauty,
    Toys,
    Automotive,
    Other
}
