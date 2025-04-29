using System;
using System.ComponentModel.DataAnnotations; // Required for data annotations
using System.ComponentModel.DataAnnotations.Schema; 
namespace dotnetapp.Models
{
    public class MentorshipProgram
    {      
        [Key]
        public int MentorshipProgramId { get; set; }

        [Required(ErrorMessage="Program Name is required")]
        [StringLength(128, ErrorMessage = "Program Name should not exceed 128 character.")]
        public string ProgramName { get; set; }

        [Required(ErrorMessage="Description is required")]
        [StringLength(1024, ErrorMessage = "Description should not exceed 1024 character.")]
        public string Description { get; set; }

        [Required(ErrorMessage="Field of Mentorship is required")]
        [StringLength(64, ErrorMessage = "Field of Mentorship should not exceed 64 character.")]
        public string FieldOfMentorship { get; set; }

        [Required(ErrorMessage="Duration is required")]
        [Range(1,int.MaxValue, ErrorMessage = "Duration must be at least one month or more.")]
        public int DurationInMonths { get; set; }

        [Required(ErrorMessage="Mentor Name is required")]
        [StringLength(128, ErrorMessage = "Mentor Name should not exceed 128 character.")]
        public string MentorName { get; set; }

        [Required(ErrorMessage="Experience Level is required")]
        [StringLength(64, ErrorMessage = "Experience Level should not exceed 64 character.")]
        public string ExperienceLevel { get; set; }

        [Required(ErrorMessage="Mode of Mentorship is required")]
        [StringLength(16, ErrorMessage = "Mode of Mentorship should not exceed 16 character.")]
        public string ModeOfMentorship { get; set; } // Online / Offline / Hybrid
        
    }
}
