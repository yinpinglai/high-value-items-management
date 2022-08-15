namespace nude_solutions_developer_assignment.Models;

public class HighValueItemManagementDatabase
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string HighValueItemsCollectionName { get; set; } = null!;

    public string SettingsCollectionName { get; set; } = null!;
}
