using dotnetapp.Data;

using dotnetapp.Models;

using Microsoft.AspNetCore.Identity;

using Microsoft.Extensions.Configuration;

using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;

using System.Text;

namespace dotnetapp.Services

{

    public class AuthService : IAuthService

    {

        private readonly UserManager<ApplicationUser> userManager;

        private readonly RoleManager<IdentityRole> roleManager;

        private readonly IConfiguration configuration;

        private readonly ApplicationDbContext context;

        public AuthService(UserManager<ApplicationUser> userManager,

            RoleManager<IdentityRole> roleManager, IConfiguration configuration,

            ApplicationDbContext context)

        {

            this.userManager = userManager;

            this.roleManager = roleManager;

            this.configuration = configuration;

            this.context = context;

        }

        public async Task<(int, string)> Registration(User model, string role)

        {

            var userExists = await userManager.FindByEmailAsync(model.Email);

            if (userExists != null)

                return (0, "User already exists");

            ApplicationUser user = new ApplicationUser()

            {

                Email = model.Email,

                SecurityStamp = Guid.NewGuid().ToString(),

                UserName = model.Email,

                Name = model.Username

            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)

                return (0, "User creation failed! Please check user details and try again");

            if (!await roleManager.RoleExistsAsync(role))

                await roleManager.CreateAsync(new IdentityRole(role));

            await userManager.AddToRoleAsync(user, role);

            context.Users.Add(model);

            await context.SaveChangesAsync();

            return (1, "User created successfully!");

        }

        public async Task<(int, string)> Login(LoginModel model)

        {

            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null)

                return (0, "Invalid email");

            if (!await userManager.CheckPasswordAsync(user, model.Password))

                return (0, "Invalid password");

            var userRoles = await userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>

            {

                new Claim(ClaimTypes.Email, user.Email),

                new Claim(ClaimTypes.Name, user.UserName),

                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())

            };

            foreach (var userRole in userRoles)

            {

                authClaims.Add(new Claim(ClaimTypes.Role, userRole));

            }

            var token = GenerateToken(authClaims);

            return (1, token);

        }

        private string GenerateToken(IEnumerable<Claim> claims)

        {

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(

                issuer: configuration["JWT:ValidIssuer"],

                audience: configuration["JWT:ValidAudience"],

                expires: DateTime.Now.AddHours(3),

                claims: claims,

                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)

                );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

    }

}