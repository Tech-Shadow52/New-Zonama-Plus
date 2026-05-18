using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZonamaAPI.DTOs;
using ZonamaAPI.Services.Interfaces;

namespace ZonamaAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IProductService productService, ISellerService sellerService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] ProductFilterRequest filter)
    {
        var result = await productService.GetAllAsync(filter);
        return Ok(result);
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeatured([FromQuery] int count = 8)
    {
        var result = await productService.GetFeaturedAsync(count);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await productService.GetByIdAsync(id);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [Authorize(Roles = "Seller,Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductRequest req)
    {
        var seller = await sellerService.GetByUserIdAsync(GetUserId());
        if (!seller.Success) return BadRequest(seller);

        var result = await productService.CreateAsync(seller.Data!.Id, req);
        return result.Success ? CreatedAtAction(nameof(GetById), new { id = result.Data!.Id }, result) : BadRequest(result);
    }

    [Authorize(Roles = "Seller,Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductRequest req)
    {
        var seller = await sellerService.GetByUserIdAsync(GetUserId());
        if (!seller.Success) return BadRequest(seller);

        var result = await productService.UpdateAsync(id, seller.Data!.Id, req);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [Authorize(Roles = "Seller,Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var seller = await sellerService.GetByUserIdAsync(GetUserId());
        if (!seller.Success) return BadRequest(seller);

        var result = await productService.DeleteAsync(id, seller.Data!.Id);
        return result.Success ? Ok(result) : NotFound(result);
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
}
