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
    [Route("api/mentorship-application")]
    public class MentorshipApplicationController : ControllerBase
    {
        private readonly MentorshipApplicationService _service;
        private readonly ILogger<MentorshipApplicationController> _logger;

        public MentorshipApplicationController(MentorshipApplicationService service, ILogger<MentorshipApplicationController> logger)
        {
            _service = service;
            _logger = logger;
        }

        // 1. Get all applications (Admin only)
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var applications = await _service.GetAllMentorshipApplications();
            return Ok(applications);
        }

        // 2. Get applications by user ID (User only)
        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var applications = await _service.GetMentorshipApplicationsByUserId(userId);
            return Ok(applications);
        }

        // 3. Submit new mentorship application (User only)
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Add([FromBody] MentorshipApplication application)
        {
            try
            {
                await _service.AddMentorshipApplication(application);
                return Ok(new { message = "Application submitted successfully" });
            }
            catch (MentorshipProgramException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // 4. Update mentorship application (User only)
        [HttpPut("{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Update(int id, [FromBody] MentorshipApplication application)
        {
            var updated = await _service.UpdateMentorshipApplication(id, application);
            if (!updated)
                return NotFound(new { message = "Application not found" });

            return Ok(new { message = "Application updated successfully" });
        }

        // 5. Delete mentorship application (User only)
        [HttpDelete("{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteMentorshipApplication(id);
            if (!deleted)
                return NotFound(new { message = "Application not found" });

            return Ok(new { message = "Application deleted successfully" });
        }
    }
}
