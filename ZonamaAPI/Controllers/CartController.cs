using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZonamaAPI.DTOs;
using ZonamaAPI.Services.Interfaces;

namespace ZonamaAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CartController(ICartService cartService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await cartService.GetCartAsync(GetUserId());
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> AddItem([FromBody] AddToCartRequest req)
    {
        var result = await cartService.AddItemAsync(GetUserId(), req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPut("{productId:int}")]
    public async Task<IActionResult> UpdateItem(int productId, [FromBody] UpdateCartItemRequest req)
    {
        var result = await cartService.UpdateItemAsync(GetUserId(), productId, req);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpDelete("{productId:int}")]
    public async Task<IActionResult> RemoveItem(int productId)
    {
        var result = await cartService.RemoveItemAsync(GetUserId(), productId);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        var result = await cartService.ClearCartAsync(GetUserId());
        return Ok(result);
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
}
