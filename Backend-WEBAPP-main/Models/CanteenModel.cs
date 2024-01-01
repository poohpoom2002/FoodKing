using System.ComponentModel.DataAnnotations;

namespace Backend_WEBAPP.Models
{
    public class CanteenModel
    {
        public object? _id { get; set; } = null;

        [Required]
        public uint CanteenId { get; set; }

        [Required]
        public required string CanteenName { get; set;}
    }

    public class PostCanteenModel
    {
        [Required]
        public uint CanteenId { get; set; }

        [Required]
        public required string CanteenName { get; set;}
    }
}