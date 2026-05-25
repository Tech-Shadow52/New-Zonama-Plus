using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZonamaAPI.Common;

namespace ZonamaAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UploadsController : ControllerBase
{
    private static readonly string[] AllowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
    private const long MaxFileSize = 5 * 1024 * 1024; // 5MB

    [HttpPost]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file is null || file.Length == 0)
            return BadRequest(ApiResponse<string>.Fail("No se recibió ningún archivo."));

        if (file.Length > MaxFileSize)
            return BadRequest(ApiResponse<string>.Fail("El archivo excede el tamaño máximo de 5MB."));

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(ext))
            return BadRequest(ApiResponse<string>.Fail("Tipo de archivo no permitido. Solo imágenes."));

        // Crear carpeta uploads si no existe
        var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        Directory.CreateDirectory(uploadsPath);

        // Nombre único para evitar colisiones
        var fileName = $"{Guid.NewGuid()}{ext}";
        var filePath = Path.Combine(uploadsPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
            await file.CopyToAsync(stream);

        // URL pública del archivo
        var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";
        return Ok(ApiResponse<string>.Ok(fileUrl, "Imagen subida correctamente."));
    }
}
