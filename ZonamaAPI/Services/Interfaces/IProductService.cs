using ZonamaAPI.Common;
using ZonamaAPI.DTOs;

namespace ZonamaAPI.Services.Interfaces;

public interface IProductService
{
    Task<ApiResponse<PagedResult<ProductDto>>> GetAllAsync(ProductFilterRequest filter);
    Task<ApiResponse<ProductDto>> GetByIdAsync(int id);
    Task<ApiResponse<ProductDto>> CreateAsync(int sellerId, CreateProductRequest request);
    Task<ApiResponse<ProductDto>> UpdateAsync(int id, int sellerId, UpdateProductRequest request);
    Task<ApiResponse<bool>> DeleteAsync(int id, int sellerId);
    Task<ApiResponse<List<ProductDto>>> GetFeaturedAsync(int count = 8);
}
