namespace WeatherApi.Options;
/// <summary>
/// Typed configuration for OpenWeather settings (bound from appsettings / secrets).
/// </summary>
public class OpenWeatherOptions
{
    public string BaseUrl { get; set; } = "https://api.openweathermap.org/";
    public string ApiKey  { get; set; } = string.Empty;
}