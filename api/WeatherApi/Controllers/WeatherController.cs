using Microsoft.AspNetCore.Mvc;
using WeatherApi.CustomExceptions;
using WeatherApi.Services;

namespace WeatherApi.Controllers;

/// <summary>
/// Handles weather data requests by coordinates.
/// </summary>
[ApiController]
[Route("[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _svc;
    public WeatherController(IWeatherService svc) => _svc = svc;

    // GET /weather?lat={lat}&lon={lon}
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] double lat, [FromQuery] double lon)
    {
        // Validate coordinates
        if (lat is < -90 or > 90)
            throw new ApiException("Latitude must be in range [-90, 90].", 400);

        if (lon is < -180 or > 180)
            throw new ApiException("Longitude must be in range [-180, 180].", 400);

        var dto = await _svc.GetCurrentAsync(lat, lon);
        return Ok(dto);
    }
}