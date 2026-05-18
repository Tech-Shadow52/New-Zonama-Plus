using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZonamaAPI.DTOs;
using ZonamaAPI.Services.Interfaces;

namespace ZonamaAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SellersController(ISellerService sellerService) : ControllerBase
{
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await sellerService.GetByIdAsync(id);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [Authorize]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterSellerRequest req)
    {
        var result = await sellerService.RegisterAsync(GetUserId(), req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = "Seller,Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateSellerRequest req)
    {
        var result = await sellerService.UpdateAsync(id, GetUserId(), req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = "Seller,Admin")]
    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var result = await sellerService.GetDashboardAsync(GetUserId());
        return result.Success ? Ok(result) : NotFound(result);
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
}
