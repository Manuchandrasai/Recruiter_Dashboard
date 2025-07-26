namespace RecruiterApi.Models;

public class JobPost
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Company { get; set; }
    public string LogoUrl { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public string Type { get; set; }
    public string Stipend { get; set; }
    public string Bond { get; set; }
    public string WorkMode { get; set; }
    public string Skills { get; set; }
    public string TechStack { get; set; }
    public string CGPA { get; set; }
    public string Branch { get; set; }
    public string Year { get; set; }
    public string CollegeName { get; set; }
    public string GestQualifiedYear { get; set; }

    public bool Active { get; set; } = true;
}
