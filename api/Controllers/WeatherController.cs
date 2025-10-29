using Microsoft.AspNetCore.Mvc;
using WeatherApi.Dtos;
using WeatherApi.Services;
namespace WeatherApi.Controllers;

/// <summary>
/// Handles weather data requests by coordinates.
/// </summary>
[ApiController]
[Route("[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;
    public WeatherController(IWeatherService weatherService) => _weatherService = weatherService;

    // GET /weather?lat={lat}&lon={lon}
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery]  WeatherQuery q,CancellationToken ct )
    {
         if (!ModelState.IsValid)
        {
            var errors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .Select(x => new { field = x.Key, error = x.Value?.Errors.First().ErrorMessage });

            return BadRequest(new { message = "Invalid request", details = errors });
        }

        var dto = await _weatherService.GetCurrentAsync(q,ct);
        return Ok(dto);
    }
}