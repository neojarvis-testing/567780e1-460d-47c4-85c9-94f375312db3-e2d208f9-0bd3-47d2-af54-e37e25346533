
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetapp.Models
{
     public class LoginModel
    {
    [Required(ErrorMessage = "Email is required.")]
    // [EmailAddress(ErrorMessage = "Email should not exceed 64 character.")]
    public string Email { get; set;}

    [Required(ErrorMessage = "Password is required.")]
    // [DataType(DataType.Password)]
    public string Password { get; set; }
    }
}

