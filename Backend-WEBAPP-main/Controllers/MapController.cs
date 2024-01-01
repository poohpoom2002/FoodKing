using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Backend_WEBAPP.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Backend_WEBAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MapController : ControllerBase
    {
        private IConfiguration config;

        private readonly IMongoCollection<MapModel> _map;
        private readonly IMongoCollection<PostMapModel> _postmap;

        public MapController(IConfiguration iConfig)
        {
            var config = iConfig;
            var client = new MongoClient(config.GetValue<string>("DatabaseSettings:DBString"));
            var database = client.GetDatabase("foodkindb");
            _map = database.GetCollection<MapModel>("map");
            _postmap = database.GetCollection<PostMapModel>("map");
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _map.Find(new BsonDocument()).ToListAsync());
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong.");
            }
        }    

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Post([FromBody]PostMapModel map)
        {
            try
            {
                if (map == null)
                {
                    return StatusCode(StatusCodes.Status422UnprocessableEntity, "Some of body data are empty of null.");
                }
                else
                {
                    await _postmap.InsertOneAsync(map);
                    return StatusCode(StatusCodes.Status201Created, "Map was added.");
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
