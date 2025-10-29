using System.Net;
using Microsoft.Extensions.Options;
using WeatherApi.CustomExceptions;
using WeatherApi.Dtos;
using WeatherApi.Options;
using WeatherApi.Services;
using WeatherApi.Tests.Helpers;

public class WeatherService_SimpleTests
{
    [Fact]
    public async Task GetCurrentAsync_Parses_OneCall_Response()
    {
        // Минимален валиден JSON за One Call 3.0 (покрива свойствата, които чете твоят сервис)
        const string oneCallJson = @"{
          ""timezone"": ""Europe/Sofia"",
          ""current"": {
            ""temp"": 19.8,
            ""humidity"": 60,
            ""wind_speed"": 2.4,
            ""weather"": [{ ""description"": ""few clouds"", ""icon"": ""02d"" }]
          }
        }";

        var http = new HttpClient(new FakeHandler(_ => FakeHandler.Json(oneCallJson)))
        {
            BaseAddress = new Uri("https://api.openweathermap.org/")
        };

        var factory = new FakeHttpClientFactory(http);
        var opts = Options.Create(new OpenWeatherOptions { ApiKey = "test-key" });

        var svc = new WeatherService(factory, opts);
        var weatherQuery = new WeatherQuery();
        weatherQuery.Lat = 42.6977;
        weatherQuery.Lon = 23.3219;
        var dto = await svc.GetCurrentAsync(weatherQuery, CancellationToken.None);

       
        Assert.Equal(19.8, dto.Temperature, 3);
        Assert.Equal(60, dto.Humidity);
        Assert.Equal(2.4, dto.WindSpeed, 3);
        Assert.Equal("few clouds", dto.Description);
        Assert.Equal("02d", dto.Icon);
        Assert.Equal("Europe/Sofia", dto.Timezone);
    }

    [Fact]
    public async Task UpstreamException()
    {
        var http = new HttpClient(new FakeHandler(_ => new HttpResponseMessage(HttpStatusCode.BadGateway)))
        {
            BaseAddress = new Uri("https://api.openweathermap.org/")
        };

        var factory = new FakeHttpClientFactory(http);
        var opts = Options.Create(new OpenWeatherOptions { ApiKey = "test-key" });

        var svc = new WeatherService(factory, opts);
        var weatherQuery = new WeatherQuery();
        weatherQuery.Lat = 0;
        weatherQuery.Lon = 0;
        await Assert.ThrowsAsync<UpstreamException>(() =>
            svc.GetCurrentAsync(weatherQuery, CancellationToken.None));
    }
}

