using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace nude_solutions_developer_assignment.Models;

public class Settings
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement]
    public List<Category> highValuesCategories { get; set; } = null!;
}
