
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dotnetapp.Models;
using dotnetapp.Services;
using System.Threading.Tasks;
using dotnetapp.Services;
 
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MentorshipProgramController : ControllerBase
    {
        private readonly MentorshipProgramService _service;
        private readonly ILogger<MentorshipProgramController> _logger;
 
        public MentorshipProgramController(MentorshipProgramService service, ILogger<MentorshipProgramController> logger)
        {
            _service = service;
            _logger = logger;
        }
 
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all mentorship programs.");
 
            var programs = await _service.GetAllMentorshipPrograms();
            return Ok(programs);
        }
 
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetMentorshipProgramById(int id)
        {
            _logger.LogInformation("Fetching mentorship program with ID: {ProgramId}", id);
 
            var program = await _service.GetMentorshipProgramById(id);
            if (program == null)
            {
                _logger.LogWarning("Mentorship program with ID {ProgramId} not found.", id);
                return NotFound(new { message = "Program not found" });
            }
 
            return Ok(program);
        }
 
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddMentorshipProgram([FromBody] MentorshipProgram program)
        {
            _logger.LogInformation("Admin attempting to add a mentorship program: {ProgramName}", program.ProgramName);
 
            var result = await _service.AddMentorshipProgram(program);
 
            _logger.LogInformation("Mentorship program added successfully: {ProgramName}", program.ProgramName);
            return Ok(result);
        }
 
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateMentorshipProgram(int id, [FromBody] MentorshipProgram program)
        {
            _logger.LogInformation("Admin attempting to update mentorship program with ID: {ProgramId}", id);
 
            var result = await _service.UpdateMentorshipProgram(id, program);
            if (result == null)
            {
                _logger.LogWarning("Mentorship program with ID {ProgramId} not found.", id);
                return NotFound(new { message = "Program not found" });
            }
 
            _logger.LogInformation("Mentorship program updated successfully: {ProgramName}", program.ProgramName);
            return Ok(result);
        }
 
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteMentorshipProgram(int id)
        {
            _logger.LogInformation("Admin attempting to delete mentorship program with ID: {ProgramId}", id);
 
            var deleted = await _service.DeleteMentorshipProgram(id);
            if (!deleted)
            {
                _logger.LogWarning("Mentorship program with ID {ProgramId} not found.", id);
                return NotFound(new { message = "Program not found" });
            }
 
            _logger.LogInformation("Mentorship program deleted successfully with ID: {ProgramId}", id);
            return Ok(new { message = "Deleted successfully" });
        }
    }
}


