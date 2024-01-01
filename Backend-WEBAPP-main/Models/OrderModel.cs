using System.ComponentModel.DataAnnotations;

namespace Backend_WEBAPP.Models
{
    public class OrderModel
    {
        public object? _id { get; set; }

        [Required]
        public required UserModel User { get; set; }

        public UserModel? Raider { get; set; }

        [Required]
        public required string UserLocation { get; set; }

        [Required]
        public required CanteenModel Canteen { get; set; }

        [Required]
        public required List<FoodModel> Food { get; set; }
    }

    public class PostOrderModel
    {
        [Required]
        public required UserModel User { get; set; }

        [Required]
        public required string UserLocation { get; set; }

        [Required]
        public required PostCanteenModel Canteen { get; set; }

        [Required]
        public required List<FoodModel> Food { get; set; }
    }

}