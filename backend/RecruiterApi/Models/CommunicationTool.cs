namespace RecruiterApi.Models
{
    public class CommunicationTool
    {
        public int Id { get; set; }
        public string ToolName { get; set; }
        public string ToolType { get; set; }
        public string ApiKey { get; set; }
        public string EndpointUrl { get; set; }
    }
}
