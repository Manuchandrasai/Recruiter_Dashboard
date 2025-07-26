using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RecruiterApi.Models
{
    public class Trigger
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Event { get; set; } = null!;
    public string DeliveryMethods { get; set; } = null!;
    public string Template { get; set; } = null!;
    public string Status { get; set; } = "Active";
    public DateTime? LastSent { get; set; } = DateTime.UtcNow;

}

}
