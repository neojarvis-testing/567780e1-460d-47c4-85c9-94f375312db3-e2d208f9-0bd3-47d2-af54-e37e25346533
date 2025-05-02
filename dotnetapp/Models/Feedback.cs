using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }

        [Required(ErrorMessage = "User Id is required.")]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Feedback Text is required.")]
        [StringLength(64,ErrorMessage = "FeedbackText should not exceed 64 characters.")]
        public string FeedbackText { get; set; }

        [Required(ErrorMessage = "Feedback DateTime is Required.")]
        [DataType(DataType.Date, ErrorMessage = "Invalid Date Format.")]
        // [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Date { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}