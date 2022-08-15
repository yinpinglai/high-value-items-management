using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace nude_solutions_developer_assignment.Models;

public class HighValueItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement]
    public string name { get; set; } = null!;

    public decimal value { get; set; }

    public string category { get; set; } = null!;
}
