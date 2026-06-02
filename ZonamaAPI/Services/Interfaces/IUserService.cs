using ZonamaAPI.Common;
using ZonamaAPI.DTOs;

namespace ZonamaAPI.Services.Interfaces;

public interface IUserService
{
    Task<ApiResponse<AuthResponse>> RegisterAsync(RegisterRequest request);
    Task<ApiResponse<AuthResponse>> LoginAsync(LoginRequest request);
    Task<ApiResponse<AuthResponse>> RefreshTokenAsync(int userId);
    Task<ApiResponse<UserDto>> GetByIdAsync(int id);
    Task<ApiResponse<UserDto>> UpdateProfileAsync(int id, UpdateProfileRequest request);
}
