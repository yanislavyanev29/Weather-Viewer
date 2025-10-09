using System.Text.Json.Serialization;
namespace WeatherApi.Models;

/// <summary>
/// Represents the "current" section of the One Call 3.0 response.
/// Contains temperature, humidity, wind speed, and weather details.
/// </summary>
public  class Current
{
   [JsonPropertyName("temp")]
    public double Temp { get; set; }

     [JsonPropertyName("humidity")]
    public int Humidity { get; set; }
     
     [JsonPropertyName("wind_speed")]
    public double WindSpeed { get; set; }
      
    [JsonPropertyName("weather")]
     public List<WeatherItem>? Weather { get; set; }
}