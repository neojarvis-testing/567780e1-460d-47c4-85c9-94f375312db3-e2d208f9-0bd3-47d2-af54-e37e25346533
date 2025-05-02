using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Models
{

    [Index(nameof(CareerGoals), Name = "Idx_MentorshipApplication_CareerGoals")] // Apply index directly on CareerGoals
    public class MentorshipApplication
    {
        [Key]
        public int MentorshipApplicationId{get; set;}

        [Required(ErrorMessage = "User Id is required.")]
        [ForeignKey("User")]
        public int UserId{get; set;}

        [Required(ErrorMessage = "Mentorship Program Id is required.")]
        [ForeignKey("MentorshipProgram")]
        public int MentorshipProgramId{get; set;}

        [Required(ErrorMessage = "Application Status is required.")]
        [StringLength(24, ErrorMessage = "Application Status cannot exceed 24 characters.")]
        public string ApplicationStatus{get; set;}

        [Required(ErrorMessage = "Application Date is required.")]
        [DataType(DataType.Date, ErrorMessage = "Invalid Date Format")]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime ApplicationDate{get; set;}

        [Required(ErrorMessage = "Reason for applying is required")]
        [StringLength(128, ErrorMessage = "Reason for applying cannot exceed 128 characters.")]
        public string ReasonForApplying {get; set;}

        [Required(ErrorMessage = "Career Goals are required.")]
        [StringLength(128, ErrorMessage = "Career Goals cannot exceed 128 characters.")]
        public string CareerGoals{get; set;}

        [Required(ErrorMessage = "Profile Image is required.")]
        [StringLength(128, ErrorMessage = "Profile Image cannot exceed 128 characters.")]
        public string ProfileImage{get; set;}

        [StringLength(128, ErrorMessage = "Port folio link cannot exceed 128 characters.")]
        public string? PortfolioLink{get; set;}

        [JsonIgnore]
        public User? User {get; set;}

        [JsonIgnore]
        public MentorshipProgram? MentorshipProgram {get; set;}


    }
}