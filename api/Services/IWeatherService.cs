
using WeatherApi.Dtos;

namespace WeatherApi.Services;


/// <summary>
/// Defines operations for retrieving current weather data.
/// </summary>
public interface IWeatherService
{
    Task<WeatherResponseDto> GetCurrentAsync(WeatherQuery q,CancellationToken ct);
}