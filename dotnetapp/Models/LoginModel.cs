
using System.DataAnnotations;
using System.DataAnnotations.Schema;

// Models/LoginModel.cs
namespace dotnetapp.Models
{
     public class LoginModel
    {
     [Required]
     public string Email { get; set; }

     [Required]
     public string Password { get; set; }
    }
}
