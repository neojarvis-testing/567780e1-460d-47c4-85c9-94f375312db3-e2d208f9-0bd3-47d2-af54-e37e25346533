using System.DataAnnotations;
using System.DataAnnotations.Schema;

namespace dotnetapp.Models
{
 public class ApplicationUser : IdentityUser
    {
         [Required]
         [MaxLength(30)]
         public string Name { get; set; }
    }
}
