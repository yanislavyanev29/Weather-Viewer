using WeatherApi.Middleware;
using WeatherApi.Options;
using WeatherApi.Services;
using Microsoft.Extensions.Http.Resilience;
var builder = WebApplication.CreateBuilder(args);

// Load local overrides (for tests/dev)
builder.Configuration.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);


builder.Services.AddOptions<OpenWeatherOptions>()
    .Bind(builder.Configuration.GetSection("OpenWeather"))
    .Validate(o => !string.IsNullOrWhiteSpace(o.ApiKey), "OpenWeather:ApiKey is required")
    .ValidateOnStart();

// Named HttpClient for OpenWeather
builder.Services.AddHttpClient("owm", c =>
{
    var baseUrl = builder.Configuration["OpenWeather:BaseUrl"] ?? "https://api.openweathermap.org/";
    c.BaseAddress = new Uri(baseUrl);
    c.Timeout = TimeSpan.FromSeconds(10);
}) .AddStandardResilienceHandler();



// CORS – allow only your React app (Vite default)
var frontendOrigin = builder.Configuration["Frontend:Origin"] ?? "http://localhost:5173";
builder.Services.AddCors(p => p.AddPolicy("client",
    policy => policy.WithOrigins(frontendOrigin).AllowAnyHeader().AllowAnyMethod()));

// MVC + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DI
builder.Services.AddScoped<IWeatherService, WeatherService>();

// Ensure Kestrel listens on port 5000 (useful for VM/host access)
builder.WebHost.ConfigureKestrel(o =>
{
    o.ListenAnyIP(5000);
});

var app = builder.Build();

// Add caching
app.UseResponseCaching();
// Global error handler first
app.UseMiddleware<ErrorHandlingMiddleware>();

// CORS
app.UseCors("client");
//
// Swagger only in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Map controllers (WeatherController, HealthController)
app.MapControllers();

app.Run();
