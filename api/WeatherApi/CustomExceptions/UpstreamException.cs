namespace WeatherApi.CustomExceptions;

/// <summary>
/// Represents an error when the upstream OpenWeather API returns a failure.
/// </summary>
public class UpstreamException : ApiException
{
    public UpstreamException(string message, int statusCode = 502)
        : base(message, statusCode) {}
}