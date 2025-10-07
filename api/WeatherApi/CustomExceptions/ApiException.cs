namespace WeatherApi.CustomExceptions;
/// <summary>
/// Represents an application-level error that carries an HTTP status code.
/// </summary>
public class ApiException : Exception
{
    
    public int StatusCode { get; }
    public ApiException(string message, int statusCode = 400) : base(message)
    {
        this.StatusCode = statusCode;
    }
}