using nude_solutions_developer_assignment.Models;
using nude_solutions_developer_assignment.Infrastructure;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace nude_solutions_developer_assignment.Services;

public class SettingsService : ServiceBase
{
    private readonly IMongoCollection<Settings> _settingsCollection;

    public SettingsService(
        IOptions<HighValueItemManagementDatabase> highValueItemManagementDatabase)
    {
        var mongoClient = new MongoClient(
            highValueItemManagementDatabase.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            highValueItemManagementDatabase.Value.DatabaseName);

        _settingsCollection = mongoDatabase.GetCollection<Settings>(
            highValueItemManagementDatabase.Value.SettingsCollectionName);
    }

    public async Task<Result<Settings>> GetAsync()
    {
        var settings = await _settingsCollection.Find(_ => true).FirstOrDefaultAsync();
        return Ok(settings);
    }
}
