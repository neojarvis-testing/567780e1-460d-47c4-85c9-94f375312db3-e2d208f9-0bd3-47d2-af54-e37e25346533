using System;
using System.ComponentModel.DataAnnotations; // Required for data annotations
 using System.ComponentModel.DataAnnotations.Schema; 
namespace dotnetapp.Models
{
    public class MentorshipProgram
    {      

        public int MentorshipProgramId { get; set; }
        [Required]
        public string ProgramName { get; set; }
          [Required]
        public string Description { get; set; }
          [Required]
        public string FieldOfMentorship { get; set; }
          [Required]
        public int DurationInMonths { get; set; }
          [Required]
        public string MentorName { get; set; }
          [Required]
        public string ExperienceLevel { get; set; }
          [Required]
        public string ModeOfMentorship { get; set; } // Online / Offline / Hybrid
        
    }
}
