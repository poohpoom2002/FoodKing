using System.ComponentModel.DataAnnotations;
using MongoDB.Driver;

namespace Backend_WEBAPP.Models
{
    public class DatabaseSettings
    {
        public required string DBString { get; set; }
    }
}