using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ZonamaAPI.Common;
using ZonamaAPI.Data;
using ZonamaAPI.DTOs;
using ZonamaAPI.Models;
using ZonamaAPI.Services.Interfaces;

namespace ZonamaAPI.Services;

public class UserService(ZonamaDbContext db, IConfiguration config) : IUserService
{
    public async Task<ApiResponse<AuthResponse>> RegisterAsync(RegisterRequest req)
    {
        if (await db.Users.AnyAsync(u => u.Email == req.Email))
            return ApiResponse<AuthResponse>.Fail("El email ya está registrado.");

        var user = new User
        {
            Name = req.Name,
            Email = req.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
            Phone = req.Phone
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        return ApiResponse<AuthResponse>.Ok(new AuthResponse(GenerateToken(user), ToDto(user)));
    }

    public async Task<ApiResponse<AuthResponse>> LoginAsync(LoginRequest req)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == req.Email && u.IsActive);
        if (user is null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
            return ApiResponse<AuthResponse>.Fail("Credenciales incorrectas.");

        return ApiResponse<AuthResponse>.Ok(new AuthResponse(GenerateToken(user), ToDto(user)));
    }

    public async Task<ApiResponse<AuthResponse>> RefreshTokenAsync(int userId)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null) return ApiResponse<AuthResponse>.Fail("Usuario no encontrado.");
        return ApiResponse<AuthResponse>.Ok(new AuthResponse(GenerateToken(user), ToDto(user)));
    }

    public async Task<ApiResponse<UserDto>> GetByIdAsync(int id)
    {
        var user = await db.Users.FindAsync(id);
        return user is null
            ? ApiResponse<UserDto>.Fail("Usuario no encontrado.")
            : ApiResponse<UserDto>.Ok(ToDto(user));
    }

    public async Task<ApiResponse<UserDto>> UpdateProfileAsync(int id, UpdateProfileRequest req)
    {
        var user = await db.Users.FindAsync(id);
        if (user is null) return ApiResponse<UserDto>.Fail("Usuario no encontrado.");

        if (req.Name is not null) user.Name = req.Name;
        if (req.Phone is not null) user.Phone = req.Phone;
        if (req.AvatarUrl is not null) user.AvatarUrl = req.AvatarUrl;

        await db.SaveChangesAsync();
        return ApiResponse<UserDto>.Ok(ToDto(user));
    }

    private string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };
        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static UserDto ToDto(User u) =>
        new(u.Id, u.Name, u.Email, u.Phone, u.AvatarUrl, u.Role, u.CreatedAt);
}
