
// can be struct
using System.Diagnostics.Eventing.Reader;
namespace WeatherApi.Dtos;
/// <summary>
/// Simplified DTO returned to the frontend application.
/// Contains only the essential weather information.
/// </summary>
public  readonly  record struct WeatheResponseDto
(
    double Temperature,
    string Description,
    string Icon,
    int Humidity,
    double WindSpeed,
    string Timezone

);