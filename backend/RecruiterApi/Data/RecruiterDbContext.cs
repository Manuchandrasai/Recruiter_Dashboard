using Microsoft.EntityFrameworkCore;
using RecruiterApi.Models;

namespace RecruiterApi.Data
{
    public class RecruiterDbContext : DbContext
    {
        public RecruiterDbContext(DbContextOptions<RecruiterDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<JobPost> JobPosts { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<Trigger> Triggers { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<CommunicationTool> CommunicationTools { get; set; }
    }
}
