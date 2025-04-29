using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace dotnetapp.Models
{
 public class ApplicationUser : IdentityUser
    {
         [Required(ErrorMessage = "Name is required.")]
         [MaxLength(30, ErrorMessage="Name cannot exceed 30 characters.")]
         public string Name { get; set; }
    }
}
