using dotnetapp.Models;

using dotnetapp.Services;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace dotnetapp.Controllers

{

    [ApiController]

    [Route("api")]

    public class AuthenticationController : ControllerBase

    {

        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)

        {

            _authService = authService;

        }

        [HttpPost("login")]

        public async Task<IActionResult> Login(LoginModel model)

        {

            try

            {

                var (status, token) = await _authService.Login(model);

                if (status == 0)

                    return BadRequest(new { message = token });

                return Ok(new { token });

            }

            catch (System.Exception ex)

            {

                return StatusCode(500, new { message = ex.Message });

            }

        }

        [HttpPost("register")]

        public async Task<IActionResult> Register(User model)

        {

            try

            {

                var (status, message) = await _authService.Registration(model, model.UserRole);

                if (status == 0)

                    return BadRequest(new { message });

                return Ok(new { message });

            }

            catch (System.Exception ex)

            {

                return StatusCode(500, new { message = ex.Message });

            }

        }

    }

}