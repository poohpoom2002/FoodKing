using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Backend_WEBAPP.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Backend_WEBAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CanteenController : ControllerBase
    {
        private IConfiguration config;

        private readonly IMongoCollection<CanteenModel> _canteen;
        private readonly IMongoCollection<PostCanteenModel> _postcanteen;

        public CanteenController(IConfiguration iConfig)
        {
            var config = iConfig;
            var client = new MongoClient(config.GetValue<string>("DatabaseSettings:DBString"));
            var database = client.GetDatabase("foodkindb");
            _canteen = database.GetCollection<CanteenModel>("canteen");
            _postcanteen = database.GetCollection<PostCanteenModel>("canteen");
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _canteen.Find(new BsonDocument()).ToListAsync());
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
                var canteen = await _canteen.Find(o => o.CanteenId.ToString() == id).FirstOrDefaultAsync();
                if (canteen == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(canteen);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
            }
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Post([FromBody]PostCanteenModel canteen)
        {
            try
            {
                if (canteen == null)
                {
                    return StatusCode(StatusCodes.Status422UnprocessableEntity, "Some of bodydata are empty of null.");
                }
                else
                {
                    await _postcanteen.InsertOneAsync(canteen);
                    return StatusCode(StatusCodes.Status201Created, "Order was created.");
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
            }
        }

        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> Put([FromBody]PostCanteenModel canteen, string id)
        {
            try
            {
                if (canteen == null || uint.TryParse(id, out uint value))
                {
                    return StatusCode(StatusCodes.Status422UnprocessableEntity, "Some of bodydata are empty of null.");
                }
                else
                {
                    var data = await _postcanteen.Find(o => o.CanteenId.ToString() == id).FirstOrDefaultAsync();
                    if (data == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        await _postcanteen.ReplaceOneAsync(o => o.CanteenId.ToString() == id, canteen);
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
