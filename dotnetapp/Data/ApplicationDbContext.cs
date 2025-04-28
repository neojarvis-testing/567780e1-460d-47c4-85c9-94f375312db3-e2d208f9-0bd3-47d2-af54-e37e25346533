using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
namespace dotnetapp.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {

        }
        public DbSet<User> Users{get;set;}
        public DbSet<MentorshipProgram> MentorshipPrograms{get;set;}
        public DbSet<MentorshipApplication> MentorshipApplications{get;set;}
        public DbSet<Feedback> Feedbacks{get;set;}
    }

}