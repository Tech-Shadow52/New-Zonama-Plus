using ZonamaAPI.Common;
using ZonamaAPI.DTOs;

namespace ZonamaAPI.Services.Interfaces;

public interface IOrderService
{
    Task<ApiResponse<OrderDto>> CreateAsync(int userId, CreateOrderRequest request);
    Task<ApiResponse<OrderDto>> GetByIdAsync(int id, int userId);
    Task<ApiResponse<List<OrderDto>>> GetUserOrdersAsync(int userId);
    Task<ApiResponse<OrderDto>> UpdateStatusAsync(int id, UpdateOrderStatusRequest request);
}
