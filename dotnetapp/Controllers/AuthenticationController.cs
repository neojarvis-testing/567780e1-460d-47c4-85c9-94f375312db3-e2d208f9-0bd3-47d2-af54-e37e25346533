using System;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using log4net;
using System.Reflection;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private static readonly ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod()?.DeclaringType);

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            log.Info($"Login attempt initiated for user: {model.Email}"); // Logging attempt

            try
            {
                var (status, token) = await _authService.Login(model);

                if (status == 0)
                {
                    log.Warn($"Login failed for user: {model.Email}. Reason: {token}");
                    return BadRequest(new { Message = token });
                }

                log.Info($"Login successful for user: {model.Email}");
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                log.Error($"Unexpected error during login for user: {model.Email}", ex);
                return StatusCode(500, new { Message = "An unexpected error occurred. Please try again later." });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User model)
        {
            log.Info($"Registration attempt initiated for user: {model.Email}");

            try
            {
                if (!ModelState.IsValid)
                {
                    log.Warn($"Registration failed due to invalid model state for user: {model.Email}");
                    return BadRequest(ModelState);
                }

                var (status, message) = await _authService.Registration(model, model.UserRole);

                if (status == 0)
                {
                    log.Warn($"Registration failed for user: {model.Email}. Reason: {message}");
                    return BadRequest(new { Message = message });
                }

                log.Info($"Registration successful for user: {model.Email}");
                return Ok(new { Message = message });
            }
            catch (Exception ex)
            {
                log.Error($"Unexpected error during registration for user: {model.Email}", ex);
                return StatusCode(500, new { Message = "An unexpected error occurred. Please try again later." });
            }
        }
    }
}