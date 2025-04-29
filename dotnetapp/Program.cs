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

    options.AddPolicy("AllowAngularApp",

        builder => builder.WithOrigins("http://localhost:8081")

                          .AllowAnyHeader()

                          .AllowAnyMethod());

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

app.UseCors("AllowAngularApp");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();


app.Run();

