using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ScrapingController : ControllerBase
{
    private readonly ILogger<ScrapingController> _logger;
    private ScrapingMethods _methods = new ScrapingMethods();

    public ScrapingController(ILogger<ScrapingController> logger)
    {
        _logger = logger;
    }

    [HttpPost("FindQueryIndex", Name = "FindQueryIndex")]
    public async Task<IActionResult> FindQueryIndex(string query, string phrase)
    {
        try
        {
            List<int> result = await _methods.GetQueryIndex(query, phrase);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return StatusCode(500);
        }
    }
}