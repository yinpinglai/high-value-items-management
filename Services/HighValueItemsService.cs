using nude_solutions_developer_assignment.Models;
using nude_solutions_developer_assignment.Infrastructure;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace nude_solutions_developer_assignment.Services;

public class HighValueItemsService : ServiceBase
{
    private readonly IMongoCollection<HighValueItem> _highValueItemsCollection;

    public HighValueItemsService(
        IOptions<HighValueItemManagementDatabase> highValueItemManagementDatabase)
    {
        var mongoClient = new MongoClient(
            highValueItemManagementDatabase.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            highValueItemManagementDatabase.Value.DatabaseName);

        _highValueItemsCollection = mongoDatabase.GetCollection<HighValueItem>(
            highValueItemManagementDatabase.Value.HighValueItemsCollectionName);
    }

    public async Task<Result<List<HighValueItem>>> GetAsync()
    {
        var highValueItemList = await _highValueItemsCollection.Find(_ => true).ToListAsync();
        return Ok(highValueItemList);
    }

    public async Task<Result> GetAsync(string id)
    {
        var highValueItem = await _highValueItemsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        if (highValueItem is null)
        {
            return Error($"Can't find record with Id = {id}.");
        }
        return Ok(highValueItem);
    }

    public async Task<Result<HighValueItem>> CreateAsync(HighValueItem newHighValueItem)
    {
        await _highValueItemsCollection.InsertOneAsync(newHighValueItem);
        return Ok(newHighValueItem);
    }

    public async Task<Result> RemoveAsync(string id)
    {
        await _highValueItemsCollection.DeleteOneAsync(x => x.Id == id);
        return Ok($"The record with Id = {id} is deleted.");
    }
}
