
using System.Net;
using System.Text.Json;


/// <summary>
/// Centralized middleware for handling all exceptions and returning
/// consistent JSON responses to the client.
/// </summary>
namespace WeatherApi.Middleware;

public class ErrorHandlingMiddleware
{


    private readonly RequestDelegate _next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {

        try
        {
            await _next(context);
        }
        catch (ApiException ex)
        {
            await Write(context, ex.StatusCode, ex.Message);
        }
        catch (Exception)
        {
            await Write(context, (int)HttpStatusCode.InternalServerError, "An unexpected error occurred. Please try again later.");
        }
    }

    private static Task Write(HttpContext ctx, int status, string message)
    {
        ctx.Response.StatusCode = status;
        ctx.Response.ContentType = "application/json";
        var json = JsonSerializer.Serialize(new { error = new { status, message } },
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        return ctx.Response.WriteAsync(json);
    }

}