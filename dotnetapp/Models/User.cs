
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
namespace dotnetapp.Models
{
    public class User
    {
        [Key]
      
        public int UserId{get;set;}

        [Required(ErrorMessage="Email is required.")]
        [EmailAddress(ErrorMessage="Invalid Email Address Format.")]
       
        public string Email{get;set;}

        [Required(ErrorMessage="Password is required.")]
        [DataType(DataType.Password)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")]
        [StringLength(16, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 16 characters.")]
        public string Password{get;set;}

        [Required(ErrorMessage="Username is required.")]
        [StringLength(50, ErrorMessage = "Username cannot exceed 50 characters.")]        
        public string Username{get;set;}

        [Required(ErrorMessage="Phone Number is required.")]
        [Phone(ErrorMessage="Mobile Number must be 10 digits.")]
        [StringLength(10,ErrorMessage="Mobile Number cannot exceed 10 characters.")]
        public string MobileNumber{get;set;}

        [Required(ErrorMessage="User Role is required.")]
        [StringLength(10,ErrorMessage="User Role cannot exceed 10 characters.")]
        public string UserRole{get;set;}

        [StringLength(16,ErrorMessage="Secret Key cannot exceed 16 characters.")]
        [JsonIgnore]
        public string? SecretKey{get;set;}
    }
}