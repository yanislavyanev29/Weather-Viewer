using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace WeatherApi.Dtos;

public class WeatherQuery
{
    
    [Range(-90, 90)]
    public double Lat { get; set; }
      

    [Range(-180, 180)]
     public double Lon { get; set; }
}