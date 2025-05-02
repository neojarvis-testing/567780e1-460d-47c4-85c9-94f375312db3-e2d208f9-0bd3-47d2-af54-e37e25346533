using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging.Log4Net.AspNetCore;

 
 
namespace dotnetapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MentorshipApplicationController : ControllerBase
    {
        private readonly MentorshipApplicationService _mentorshipApplicationService;
        private readonly ILogger<MentorshipApplicationController> _logger;
 
        // Constructor to inject MentorshipApplicationService and ILogger
        public MentorshipApplicationController(MentorshipApplicationService mentorshipApplicationService, ILogger<MentorshipApplicationController> logger)
        {
            _mentorshipApplicationService = mentorshipApplicationService;
            _logger = logger;
        }
 
        // GET: api/MentorshipApplication
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MentorshipApplication>>> GetAllMentorshipApplications()
        {
            _logger.LogInformation("Executing GetAllMentorshipApplications method.");
            try
            {
                var applications = await _mentorshipApplicationService.GetAllMentorshipApplications();
                _logger.LogInformation("Successfully retrieved mentorship applications.");
                return Ok(applications);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching mentorship applications: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
 
        // GET: api/MentorshipApplication/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<MentorshipApplication>>> GetMentorshipApplicationsByUserId(int userId)
        {
            _logger.LogInformation($"Fetching mentorship applications for user ID: {userId}");
            try
            {
                var applications = await _mentorshipApplicationService.GetMentorshipApplicationsByUserId(userId);
                if (applications == null)
                {
                    _logger.LogWarning($"No mentorship applications found for user ID: {userId}");
                    return NotFound($"Cannot find any mentorship applications for user with ID {userId}");
                }
 
                _logger.LogInformation("Successfully retrieved mentorship applications.");
                return Ok(applications);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching mentorship applications: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
 
        // POST: api/MentorshipApplication
        [HttpPost]
        public async Task<ActionResult> AddMentorshipApplication([FromBody] MentorshipApplication mentorshipApplication)
        {
            _logger.LogInformation("Attempting to add mentorship application.");
            try
            {
                if (mentorshipApplication == null)
                {
                    _logger.LogWarning("Received null mentorship application data.");
                    return BadRequest("Mentorship application data is required.");
                }
 
                var result = await _mentorshipApplicationService.AddMentorshipApplication(mentorshipApplication);
                if (result)
                {
                    _logger.LogInformation("Mentorship application added successfully.");
                    return Ok("Mentorship application added successfully");
                }
 
                _logger.LogWarning("Failed to add mentorship application.");
                return StatusCode(500, "Failed to add mentorship application");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error adding mentorship application: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
 
        // PUT: api/MentorshipApplication/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMentorshipApplication(int mentorshipApplicationId, [FromBody] MentorshipApplication mentorshipApplication)
        {
            _logger.LogInformation($"Attempting to update mentorship application ID: {mentorshipApplicationId}");
            try
            {
                if (mentorshipApplication == null)
                {
                    _logger.LogWarning("Received null mentorship application data for update.");
                    return BadRequest("Updated mentorship application data is required.");
                }
 
                var result = await _mentorshipApplicationService.UpdateMentorshipApplication(mentorshipApplicationId, mentorshipApplication);
                if (result)
                {
                    _logger.LogInformation("Mentorship application updated successfully.");
                    return Ok("Mentorship application updated successfully");
                }
 
                _logger.LogWarning($"No mentorship application found with ID {mentorshipApplicationId}");
                return NotFound($"Cannot find any mentorship application with ID {mentorshipApplicationId}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating mentorship application: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
 
        // DELETE: api/MentorshipApplication/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMentorshipApplication(int mentorshipApplicationId)
        {
            _logger.LogInformation($"Attempting to delete mentorship application ID: {mentorshipApplicationId}");
            try
            {
                var result = await _mentorshipApplicationService.DeleteMentorshipApplication(mentorshipApplicationId);
                if (result)
                {
                    _logger.LogInformation("Mentorship application deleted successfully.");
                    return Ok("Mentorship application deleted successfully");
                }
 
                _logger.LogWarning($"No mentorship application found with ID {mentorshipApplicationId}");
                return NotFound($"Cannot find any mentorship application with ID {mentorshipApplicationId}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting mentorship application: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}