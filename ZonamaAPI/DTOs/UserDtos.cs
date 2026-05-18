using System.ComponentModel.DataAnnotations;
using ZonamaAPI.Models;

namespace ZonamaAPI.DTOs;

public record RegisterRequest(
    [Required, MinLength(2)] string Name,
    [Required, EmailAddress] string Email,
    [Required, MinLength(6)] string Password,
    string? Phone
);

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password
);

public record AuthResponse(
    string Token,
    UserDto User
);

public record UserDto(
    int Id,
    string Name,
    string Email,
    string? Phone,
    string? AvatarUrl,
    UserRole Role,
    DateTime CreatedAt
);

public record UpdateProfileRequest(
    [MinLength(2)] string? Name,
    string? Phone,
    string? AvatarUrl
);
