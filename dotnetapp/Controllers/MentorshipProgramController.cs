using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Exceptions;
using System.Threading.Tasks;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/mentorship-program")]
    public class MentorshipProgramController : ControllerBase
    {
        private readonly MentorshipProgramService _service;
        private readonly ILogger<MentorshipProgramController> _logger;

        public MentorshipProgramController(MentorshipProgramService service, ILogger<MentorshipProgramController> logger)
        {
            _service = service;
            _logger = logger;
        }

        // 1. Get all mentorship programs (User & Admin)
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var programs = await _service.GetAllMentorshipPrograms();
            return Ok(programs);
        }

        // 2. Get mentorship program by ID (User & Admin)
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var program = await _service.GetMentorshipProgramById(id);
            if (program == null)
                return NotFound(new { message = "Program not found" });

            return Ok(program);
        }

        // 3. Add a new mentorship program (Admin only)
        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> Add([FromBody] MentorshipProgram program)
        {
            try
            {
                await _service.AddMentorshipProgram(program);
                return Ok(new { message = "Program added successfully" });
            }
            catch (MentorshipProgramException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // 4. Update an existing program (Admin only)
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] MentorshipProgram program)
        {
            try
            {
                var updated = await _service.UpdateMentorshipProgram(id, program);
                if (!updated)
                    return NotFound(new { message = "Program not found" });

                return Ok(new { message = "Program updated successfully" });
            }
            catch (MentorshipProgramException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // 5. Delete a mentorship program (Admin only)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _service.DeleteMentorshipProgram(id);
                if (!deleted)
                    return NotFound(new { message = "Program not found" });

                return Ok(new { message = "Program deleted successfully" });
            }
            catch (MentorshipProgramException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
