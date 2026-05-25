using ZonamaAPI.Common;
using ZonamaAPI.DTOs;

namespace ZonamaAPI.Services.Interfaces;

public interface ICartService
{
    Task<ApiResponse<CartDto>> GetCartAsync(int userId);
    Task<ApiResponse<CartDto>> AddItemAsync(int userId, AddToCartRequest request);
    Task<ApiResponse<CartDto>> UpdateItemAsync(int userId, int productId, UpdateCartItemRequest request);
    Task<ApiResponse<CartDto>> RemoveItemAsync(int userId, int productId);
    Task<ApiResponse<bool>> ClearCartAsync(int userId);
}
