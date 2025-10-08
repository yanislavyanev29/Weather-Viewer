
using System.Text.Json.Serialization;
namespace WeatherApi.Models;
/// <summary>
/// Represents an item in the "weather" array inside the "current" section.
/// Each item includes a textual description and an icon code.
/// </summary>
public  class WeatherItem
{

    [JsonPropertyName("description")]
    public string? Description { get; set; }

     [JsonPropertyName("icon")]
    public string? Icon { get; set; }
    
}