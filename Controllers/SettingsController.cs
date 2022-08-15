using nude_solutions_developer_assignment.Models;
using nude_solutions_developer_assignment.Services;
using nude_solutions_developer_assignment.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace nude_solutions_developer_assignment.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly SettingsService _settingsService;

    public SettingsController(SettingsService settingsService) =>
        _settingsService = settingsService;

    [HttpGet]
    public async Task<Result<Settings>> Get() =>
        await _settingsService.GetAsync();

}
