using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Backend_WEBAPP.Models;
using MongoDB.Driver;
using MongoDB.Bson;


namespace Backend_WEBAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IConfiguration config;

        private readonly IMongoCollection<OrderModel> _order;
        private readonly IMongoCollection<PostOrderModel> _postorder;

        public OrderController(IConfiguration iConfig)
        {
            var config = iConfig;
            var client = new MongoClient(config.GetValue<string>("DatabaseSettings:DBString"));
            var database = client.GetDatabase("foodkindb");
            _order = database.GetCollection<OrderModel>("order");
            _postorder = database.GetCollection<PostOrderModel>("order");
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try {                 
                var orders = await _order.Find(o => o.Raider == null).ToListAsync();
                var serializedOrders = orders.Select(o => new
                {
                    _id = o._id.ToString(),
                    User = o.User,
                    UserLocation = o.UserLocation,
                    Canteen = o.Canteen,
                    Food = o.Food
                }).ToList();
                return Ok(serializedOrders);
                //return Ok(await _order.Find(o => o.Raider == null).ToListAsync());
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
            }
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var orders = await _order.Find(new BsonDocument()).ToListAsync();
                var serializedOrders = orders.Select(o => new
                {
                    _id = o._id.ToString(),
                    User = o.User,
                    UserLocation = o.UserLocation,
                    Canteen = o.Canteen,
                    Food = o.Food,
                    Raider = o.Raider
                }).ToList();
                return Ok(serializedOrders);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
            }
        }

        [HttpGet]
        [Route("grabbed")]
        public async Task<IActionResult> GetOnlyGrabbed()
        {
            try
            {
                var orders = await _order.Find(o => o.Raider != null).ToListAsync();
                var serializedOrders = orders.Select(o => new
                {
                    _id = o._id.ToString(),
                    User = o.User,
                    UserLocation = o.UserLocation,
                    Canteen = o.Canteen,
                    Food = o.Food,
                    Raider = o.Raider
                }).ToList();
                return Ok(serializedOrders);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetbyID(string id)
        {
            try
            {
                var order = await _order.Find(o => o._id != null && o._id.ToString() == id).FirstOrDefaultAsync();
                if (order == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(order);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
            }
        }

        [HttpPost]
        [Route("post")]
        public async Task<IActionResult> Post([FromBody]PostOrderModel order)
        {
            if (order == null)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, "Some of bodydata are empty of null.");
            }
            else
            {
                try
                {
                    await _postorder.InsertOneAsync(order);
                    return StatusCode(StatusCodes.Status201Created, "Order was created.");
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine(ex);
                    return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
                }
            }
        }

        [HttpPut]
        [Route("grab/{id}")]
        public async Task<IActionResult> Put([FromBody]UserModel raider, string id)
        {
            try
            {
                if (raider == null)
                {
                    return StatusCode(StatusCodes.Status422UnprocessableEntity, "Some of bodydata are empty of null.");
                }
                else
                {
                    var order = await _order.Find(o => o._id != null && o._id.ToString() == id).FirstOrDefaultAsync();
                    if (order == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        order.Raider = raider;
                        await _order.ReplaceOneAsync(o => o._id != null && o._id.ToString() == id, order);
                        return StatusCode(StatusCodes.Status200OK, "Order was grabbed.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
            }
        }
    }
}
