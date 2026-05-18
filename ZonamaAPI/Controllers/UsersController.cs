using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZonamaAPI.DTOs;
using ZonamaAPI.Services.Interfaces;

namespace ZonamaAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(IUserService userService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest req)
    {
        var result = await userService.RegisterAsync(req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        var result = await userService.LoginAsync(req);
        return result.Success ? Ok(result) : Unauthorized(result);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetProfile()
    {
        var userId = GetUserId();
        var result = await userService.GetByIdAsync(userId);
        return result.Success ? Ok(result) : NotFound(result);
    }

    [Authorize]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest req)
    {
        var userId = GetUserId();
        var result = await userService.UpdateProfileAsync(userId, req);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
}
