<<<<<<< HEAD
using dotnetapp.Data;
 
using dotnetapp.Models;
 
using dotnetapp.Services;
 
using Microsoft.AspNetCore.Authentication.JwtBearer;
 
using Microsoft.AspNetCore.Identity;
 
using Microsoft.EntityFrameworkCore;
 
using Microsoft.IdentityModel.Tokens;
 
using Microsoft.OpenApi.Models;
 
using System.Text;
 
var builder = WebApplication.CreateBuilder(args);
 
// Add services to the container
 
builder.Services.AddDbContext<ApplicationDbContext>(options =>
 
 
  options.UseSqlServer(builder.Configuration.GetConnectionString("connectionString")));
 
 
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
 
    .AddEntityFrameworkStores<ApplicationDbContext>()
 
    .AddDefaultTokenProviders();
 
 
builder.Services.AddScoped<IAuthService, AuthService>();
 
builder.Services.AddScoped<MentorshipProgramService>();
 
builder.Services.AddScoped<MentorshipApplicationService>();
 
 
builder.Services.AddScoped<FeedbackService>();
 
 
// JWT Authentication
 
builder.Services.AddAuthentication(options =>
 
{
 
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
 
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
 
})
 
.AddJwtBearer(options =>
 
{
 
    options.SaveToken = true;
 
    options.RequireHttpsMetadata = false;
 
    options.TokenValidationParameters = new TokenValidationParameters
 
    {
 
        ValidateIssuer = true,
 
        ValidateAudience = true,
 
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
 
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
 
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
 
    };
 
});
 
// CORS for Angular
builder.Services.AddCors(options =>
{
   
        options.AddDefaultPolicy( builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
   
 
});
 
 
builder.Services.AddControllers();
 
builder.Services.AddEndpointsApiExplorer();
 
builder.Services.AddSwaggerGen(c =>
 
{
 
    // Add Authorization Header to Swagger
 
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
 
    {
 
        Description = "Enter 'Bearer' [space] and your valid token",
 
        Name = "Authorization",
 
        In = ParameterLocation.Header,
 
        Scheme = "Bearer",
 
        Type = SecuritySchemeType.ApiKey
 
    });
 
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
 
    {
 
        {
 
              new OpenApiSecurityScheme
 
              {
 
                  Reference = new OpenApiReference
 
                  {
 
                      Type = ReferenceType.SecurityScheme,
 
                      Id = "Bearer"
 
                  }
 
              },
 
             new string[] {}
 
        }
 
    });
 
});
 
var app = builder.Build();
 
// Configure the HTTP request pipeline
 
if (app.Environment.IsDevelopment())
 
{
 
    app.UseSwagger();
 
    app.UseSwaggerUI();
 
}
 
app.UseCors();
 
 
app.UseAuthentication();
 
 
 
 
app.UseAuthorization();
 
app.MapControllers();
 
 
 
 
app.Run();
 
=======
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Buffers;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Configuration;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
        .AddJsonOptions(opt=> {
            opt.JsonSerializerOptions.PropertyNamingPolicy=null;
        });

// Enables API documentation with Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    // Enable Authorization in Swagger UI
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your token."
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});
// Configures the database context with SQL Server using the connection string from appsettings.json
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("connectionString")));

builder.Services.AddCors(options=>{
    options.AddDefaultPolicy(builder=>{
        builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


// Configure Identity for authentication
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Configure authentication using JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});

// Registers application services with dependency injection for scoped lifetime
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<FeedbackService>();
builder.Services.AddScoped<MentorshipApplicationService>();
builder.Services.AddScoped<MentorshipProgramService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
// Enable authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();

// Map controllers to endpoints
app.MapControllers();

app.Run();
>>>>>>> e4cf6ae0d778aecc9c80bdf636058c7c99b15224
