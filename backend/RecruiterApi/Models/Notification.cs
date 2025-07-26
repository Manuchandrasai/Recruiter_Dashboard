namespace RecruiterApi.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string Event { get; set; } = null!;
        public string Audience { get; set; } = null!;
        public string Channels { get; set; } = null!; // Comma-separated: "SMS,Push"
        public string Template { get; set; } = null!;
        public string Message { get; set; } = null!;
        public string Status { get; set; } = "Active";
        // public bool Active { get; set; } = true;
    }
}
