using System.DataAnnotations;
using System.DataAnnotations.Schema;

namespace dotnetapp.Models
{
 public class ApplicationUser : IdentityUser
    {
         [Required]
         public string Name { get; set; }
    }
}
