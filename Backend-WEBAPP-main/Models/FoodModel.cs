using System.ComponentModel.DataAnnotations;

namespace Backend_WEBAPP.Models
{
    public class FoodModel
    {

        [Required]
        public required string Name { get; set; }

        public uint Quantity { get; set; } = 1;

        public uint Price { get; set; } = 0;

    }
}