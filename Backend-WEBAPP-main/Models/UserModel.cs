using System.ComponentModel.DataAnnotations;

namespace Backend_WEBAPP.Models
{
    public class UserModel
    {
        //public object? _id { get; set; }

        [Required]
        public required string Name { get; set; }

        public required string LastName { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }
    }
}