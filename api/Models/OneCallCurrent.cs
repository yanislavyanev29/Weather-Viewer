
using System.Text.Json.Serialization;
namespace WeatherApi.Models;
/// <summary>
/// Root object for the OpenWeather One Call 3.0 (Current) API response.
/// Contains only the fields that we actually use.
/// </summary>
public  class OneCallCurrent
{

    [JsonPropertyName("timezone")]
    public string? Timezone { get; set; }
    
    [JsonPropertyName("current")]
    public Current? Current { get; set; }

   
}