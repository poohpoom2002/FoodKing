using System.ComponentModel.DataAnnotations;

namespace Backend_WEBAPP.Models
{
    public class MapModel
    {
        public object? _id { get; set; } = null;

        [Required]
        public string name { get; set; }

        [Required]
        public float x { get; set; }

        [Required]
        public float y { get; set; }
    }

    public class PostMapModel
    {
        [Required]
        public string name { get; set; }

        [Required]
        public float x { get; set; }

        [Required]
        public float y { get; set; }
    }
}