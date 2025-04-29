using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Exceptions;
 
namespace dotnetapp.Services
{
    public class MentorshipApplicationService
    {
        private readonly ApplicationDbContext _context;
 
        // Constructor to inject ApplicationDbContext
        public MentorshipApplicationService(ApplicationDbContext context)
        {
            _context = context;
        }
 
        // 1. Retrieve all mentorship applications from the database
        public async Task<IEnumerable<MentorshipApplication>> GetAllMentorshipApplications()
        {
            return await _context.MentorshipApplications.ToListAsync();
        }
 
        // 2. Retrieve all mentorship applications for a specific user by userId
        public async Task<IEnumerable<MentorshipApplication>> GetMentorshipApplicationsByUserId(int userId)
        {
            return await _context.MentorshipApplications.Where(mentorapplication => mentorapplication.UserId == userId).ToListAsync();
        }
 
        // 3. Add a new mentorship application to the database
        public async Task<bool> AddMentorshipApplication(MentorshipApplication mentorshipApplication)
        {
            var existingApplication = await _context.MentorshipApplications
                                                     .FirstOrDefaultAsync(mentorapplication => mentorapplication.UserId == mentorshipApplication.UserId && mentorapplication.MentorshipProgramId == mentorshipApplication.MentorshipProgramId);
 
            if (existingApplication != null)
            {
                throw new MentorshipProgramException("User already applied for this mentorship");
            }
 
            _context.MentorshipApplications.Add(mentorshipApplication);
            await _context.SaveChangesAsync();
            return true; // Return true for successful insertion
        }
 
        // 4. Update an existing mentorship application
        public async Task<bool> UpdateMentorshipApplication(int mentorshipApplicationId, MentorshipApplication mentorshipApplication)
        {
            var existingApplication = await _context.MentorshipApplications.FirstOrDefaultAsync(mentorapplication => mentorapplication.MentorshipApplicationId == mentorshipApplicationId);
            if (existingApplication == null)
            {
                return false; // Return false if application doesn't exist
            }
 
            existingApplication.ApplicationStatus = mentorshipApplication.ApplicationStatus;
            existingApplication.ReasonForApplying = mentorshipApplication.ReasonForApplying;
            existingApplication.CareerGoals = mentorshipApplication.CareerGoals;
            existingApplication.ProfileImage = mentorshipApplication.ProfileImage;
            existingApplication.PortfolioLink = mentorshipApplication.PortfolioLink;
 
            await _context.SaveChangesAsync();
            return true; // Return true for successful update
        }
 
        // 5. Delete a mentorship application from the database
        public async Task<bool> DeleteMentorshipApplication(int mentorshipApplicationId)
        {
            var mentorshipApplication = await _context.MentorshipApplications.FirstOrDefaultAsync(mentorapplication => mentorapplication.MentorshipApplicationId == mentorshipApplicationId);
 
            if (mentorshipApplication == null)
            {
                return false; // Return false if application doesn't exist
            }
 
            _context.MentorshipApplications.Remove(mentorshipApplication);
            await _context.SaveChangesAsync();
            return true; // Return true for successful delete
        }
    }
}