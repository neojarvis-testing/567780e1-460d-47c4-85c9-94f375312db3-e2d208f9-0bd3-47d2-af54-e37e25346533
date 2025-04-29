using dotnetapp.Models; // Importing the Models namespace
using dotnetapp.Services; // Importing the Services namespace
using Microsoft.AspNetCore.Mvc; // Importing ASP.NET Core MVC functionalities
using Microsoft.Extensions.Logging; // Importing logging functionalities
using System; // Importing base class library functionalities
using System.Collections.Generic; // Importing generic collection functionalities
using System.Threading.Tasks; // Importing task-based asynchronous pattern functionalities

namespace dotnetapp.Controllers
{
    [Route("api/[controller]")] // Defining the route for the controller
    [ApiController] // Indicating that this is an API controller
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService; // Declaring a private readonly field for FeedbackService
        private readonly ILogger<FeedbackController> _logger; // Declaring a private readonly field for ILogger
        // Constructor to inject FeedbackService and ILogger
        public FeedbackController(FeedbackService feedbackService, ILogger<FeedbackController> logger)
        {
            _feedbackService = feedbackService; // Initializing the FeedbackService field
            _logger = logger; // Initializing the ILogger field
        }

        // GET: api/Feedback
        [HttpGet] // Defining an HTTP GET method
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            _logger.LogInformation("Executing GetAllFeedbacks method"); // Logging information
            try
            {
                var feedbacks = await _feedbackService.GetAllFeedbacks(); // Awaiting the asynchronous call to get all feedbacks
                _logger.LogInformation("Successfully retrieved feedbacks."); // Logging success information
                return Ok(feedbacks); // Returning the feedbacks with an OK status
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching feedbacks: {ex.Message}"); // Logging error information
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Returning a 500 status code with error message
            }
        }

        // GET: api/Feedback/user/{userId}
        [HttpGet("user/{userId}")] // Defining an HTTP GET method with a route parameter
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            _logger.LogInformation($"Fetching feedbacks for user ID: {userId}"); // Logging information
            try
            {
                var feedbacks = await _feedbackService.GetFeedbacksByUserId(userId); // Awaiting the asynchronous call to get feedbacks by user ID
                if (feedbacks != null)
                {
                    _logger.LogInformation("Successfully retrieved feedbacks."); // Logging success information
                    return Ok(feedbacks); // Returning the feedbacks with an OK status
                }

                _logger.LogWarning($"No feedback found for user ID: {userId}"); // Logging warning information
                return NotFound("No feedback found for the given user ID."); // Returning a 404 status code with a not found message
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching feedbacks: {ex.Message}"); // Logging error information
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Returning a 500 status code with error message
            }
        }

        // POST: api/Feedback
        [HttpPost] // Defining an HTTP POST method
        public async Task<ActionResult> AddFeedback(Feedback feedback)
        {
            _logger.LogInformation("Attempting to add feedback."); // Logging information
            try
            {
                if (feedback == null)
                {
                    _logger.LogWarning("Received null feedback data."); // Logging warning information
                    return BadRequest("Feedback data is required."); // Returning a 400 status code with a bad request message
                }

                var result = await _feedbackService.AddFeedback(feedback); // Awaiting the asynchronous call to add feedback
                if (result)
                {
                    _logger.LogInformation("Feedback added successfully."); // Logging success information
                    return Ok("Feedback added successfully"); // Returning an OK status with a success message
                }

                _logger.LogWarning("Failed to add feedback."); // Logging warning information
                return BadRequest("Failed to add feedback."); // Returning a 400 status code with a bad request message
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error adding feedback: {ex.Message}"); // Logging error information
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Returning a 500 status code with error message
            }
        }

        // DELETE: api/Feedback/{id}
        [HttpDelete("{id}")] // Defining an HTTP DELETE method with a route parameter
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            _logger.LogInformation($"Attempting to delete feedback ID: {feedbackId}"); // Logging information
            try
            {
                var result = await _feedbackService.DeleteFeedback(feedbackId); // Awaiting the asynchronous call to delete feedback
                if (result)
                {
                    _logger.LogInformation("Feedback deleted successfully."); // Logging success information
                    return Ok("Feedback deleted successfully"); // Returning an OK status with a success message
                }

                _logger.LogWarning($"No feedback found with ID {feedbackId}"); // Logging warning information
                return NotFound($"Cannot find any feedback with ID {feedbackId}"); // Returning a 404 status code with a not found message
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting feedback: {ex.Message}"); // Logging error information
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Returning a 500 status code with error message
            }
        }
    }
}
