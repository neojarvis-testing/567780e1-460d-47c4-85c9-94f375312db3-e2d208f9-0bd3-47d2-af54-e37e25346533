using System;
using System.ComponentModel.DataAnnotations; // Required for data annotations
using System.ComponentModel.DataAnnotations.Schema; 

namespace dotnetapp.Models
{
    public class MentorshipApplication
    {
        public int MentorshipApplicationId { get; set; }

        // Foreign Key: User
         [ForeignKey("User")]
        public int UserId { get; set; }
        public User? User { get; set; }

        // Foreign Key: Mentorship Program
         [ForeignKey("MentorshipProgram")]
        public int MentorshipProgramId { get; set; }
        public MentorshipProgram? MentorshipProgram { get; set; }

        public string ApplicationStatus { get; set; } // Pending, Approved, Rejected
        public DateTime ApplicationDate { get; set; }
        public string ReasonForApplying { get; set; }
        public string CareerGoals { get; set; }
        public string ProfileImage { get; set; }
        public string? PortfolioLink { get; set; } // optional
    }
}

