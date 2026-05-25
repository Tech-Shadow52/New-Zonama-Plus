using ZonamaAPI.Common;
using ZonamaAPI.DTOs;

namespace ZonamaAPI.Services.Interfaces;

public interface ISellerService
{
    Task<ApiResponse<SellerDto>> GetByIdAsync(int id);
    Task<ApiResponse<SellerDto>> GetByUserIdAsync(int userId);
    Task<ApiResponse<SellerDto>> RegisterAsync(int userId, RegisterSellerRequest request);
    Task<ApiResponse<SellerDto>> UpdateAsync(int id, int userId, UpdateSellerRequest request);
    Task<ApiResponse<SellerDashboardDto>> GetDashboardAsync(int userId);
}
