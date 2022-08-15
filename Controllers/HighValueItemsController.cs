using nude_solutions_developer_assignment.Models;
using nude_solutions_developer_assignment.Services;
using nude_solutions_developer_assignment.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace nude_solutions_developer_assignment.Controllers;

[ApiController]
[Route("api/[controller]")]
public class highValueItemsController : ControllerBase
{
    private readonly HighValueItemsService _highValueItemsService;

    public highValueItemsController(HighValueItemsService highValueItemsService) =>
        _highValueItemsService = highValueItemsService;

    [HttpGet]
    public async Task<Result<List<HighValueItem>>> Get() =>
        await _highValueItemsService.GetAsync();

    [HttpPost]
    public async Task<IActionResult> Post(HighValueItem newHighValueItem)
    {
        var result = await _highValueItemsService.CreateAsync(newHighValueItem);

        return CreatedAtAction(nameof(Get), new { id = newHighValueItem.Id }, result);
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var highValueItem = await _highValueItemsService.GetAsync(id);

        if (highValueItem is null)
        {
            return NotFound();
        }

        await _highValueItemsService.RemoveAsync(id);

        return NoContent();
    }
}
