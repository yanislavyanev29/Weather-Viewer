using System.Net;
using System.Net.Http.Json;
using Microsoft.Extensions.Options;
using WeatherApi.CustomExceptions;
using WeatherApi.Dtos;
using WeatherApi.Models;
using WeatherApi.Options;

namespace WeatherApi.Services;

/// <summary>
/// Service responsible for calling the OpenWeather One Call 3.0 API
/// and mapping the response into a simplified DTO.
/// </summary>

public class WeatherService : IWeatherService
{

    private readonly HttpClient _http;
    private readonly OpenWeatherOptions _options;

    public WeatherService(IHttpClientFactory factory, IOptions<OpenWeatherOptions> options)
    {
        _http = factory.CreateClient("owm");
        _options = options.Value;
    }
    public async Task<WeatherResponseDto> GetCurrentAsync(double lat, double lon)
    {
        if (string.IsNullOrWhiteSpace(_options.ApiKey))
    throw new UpstreamException("Missing OpenWeather API key.", 500);
        // get this url address from OpenWeather One Call API 3.0
        var url = $"data/2.5/weather?lat={lat}&lon={lon}&appid={_options.ApiKey}&units=metric";
                       Console.WriteLine($"Using API key: {_options.ApiKey}");
        var response = await _http.GetAsync(url);

        if (!response.IsSuccessStatusCode)
        {
            //if there is a error (invalid data) throw our custom exception 
              throw new UpstreamException($"OpenWeather returned {(int)response.StatusCode}: {response.ReasonPhrase}", (int)HttpStatusCode.BadGateway);
        }
           var data = await response.Content.ReadFromJsonAsync<OneCallCurrent>()
                   ?? throw new UpstreamException("Invalid response from OpenWeather.");

        if (data.Current is null)
            throw new UpstreamException("Missing 'current' weather data in OpenWeather response.");

        var weather = data.Current.Weather?.FirstOrDefault();

        return new WeatherResponseDto
        {
            Temperature = data.Current.Temp,
            Description = weather?.Description ?? "Unknown",
            Icon = weather?.Icon ?? "",
            Humidity = data.Current.Humidity,
            WindSpeed = data.Current.WindSpeed,
            Timezone = data.Timezone ?? "N/A"
        };
    }
}