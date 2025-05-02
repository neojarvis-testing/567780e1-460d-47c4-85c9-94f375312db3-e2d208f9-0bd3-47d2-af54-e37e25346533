
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;
using Microsoft.EntityFrameworkCore;
 
 
namespace dotnetapp.Services
{
    public class MentorshipProgramService
    {
        private readonly ApplicationDbContext _context;
 
        // Constructor for dependency injection of ApplicationDbContext
        public MentorshipProgramService(ApplicationDbContext context)
        {
            _context = context;
        }
 
        // 1. Retrieve all mentorship programs from the database
        public async Task<IEnumerable<MentorshipProgram>> GetAllMentorshipPrograms()
        {
            return await _context.MentorshipPrograms.ToListAsync();
        }
 
        // 2. Retrieve a mentorship program by its ID
        public async Task<MentorshipProgram> GetMentorshipProgramById(int mentorshipProgramId)
        {
            return await _context.MentorshipPrograms.FirstOrDefaultAsync(mentorprogram => mentorprogram.MentorshipProgramId == mentorshipProgramId);
        }
 
        // 3. Add a new mentorship program to the database
        public async Task<bool> AddMentorshipProgram(MentorshipProgram mentorshipProgram)
        {
            var existingProgram = await _context.MentorshipPrograms.FirstOrDefaultAsync(mentorprogram => mentorprogram.ProgramName == mentorshipProgram.ProgramName);
            if (existingProgram != null)
            {
                throw new MentorshipProgramException("Program with the same name already exists");
            }
 
            _context.MentorshipPrograms.Add(mentorshipProgram);
            await _context.SaveChangesAsync();
            return true; // Return true for successful insertion
        }
 
        // 4. Update an existing mentorship program
        public async Task<bool> UpdateMentorshipProgram(int mentorshipProgramId, MentorshipProgram mentorshipProgram)
        {
            var existingProgram = await _context.MentorshipPrograms
                                                 .FirstOrDefaultAsync(mentorprogram => mentorprogram.MentorshipProgramId == mentorshipProgramId);
            if (existingProgram == null)
            {
                return false; // Return false if program doesn't exist
            }
 
            var existingProgramWithSameName = await _context.MentorshipPrograms.FirstOrDefaultAsync(mentorprogram => mentorprogram.ProgramName == mentorshipProgram.ProgramName);
            if (existingProgramWithSameName != null)
            {
                throw new MentorshipProgramException("Program with the same name already exists");
            }
 
            existingProgram.ProgramName = mentorshipProgram.ProgramName;
            existingProgram.Description = mentorshipProgram.Description;
            existingProgram.FieldOfMentorship = mentorshipProgram.FieldOfMentorship;
            existingProgram.DurationInMonths = mentorshipProgram.DurationInMonths;
            existingProgram.MentorName = mentorshipProgram.MentorName;
            existingProgram.ExperienceLevel = mentorshipProgram.ExperienceLevel;
            existingProgram.ModeOfMentorship = mentorshipProgram.ModeOfMentorship;
 
            await _context.SaveChangesAsync();
            return true; // Return true for successful update
        }
 
        // 5. Delete a mentorship program from the database
        public async Task<bool> DeleteMentorshipProgram(int mentorshipProgramId)
        {
            var mentorshipProgram = await _context.MentorshipPrograms.FirstOrDefaultAsync(mentorprogram => mentorprogram.MentorshipProgramId == mentorshipProgramId);
            if (mentorshipProgram == null)
            {
                return false; // Return false if program doesn't exist
            }
 
            var mentorshipApplications = await _context.MentorshipApplications.FirstOrDefaultAsync(mentorapplication => mentorapplication.MentorshipProgramId == mentorshipProgramId);
 
            if (mentorshipApplications != null)
            {
                throw new MentorshipProgramException("Mentorship cannot be deleted, it is referenced in mentorship applications.");
            }
 
            _context.MentorshipPrograms.Remove(mentorshipProgram);
            await _context.SaveChangesAsync();
            return true; // Return true for successful delete
        }
    }
}
 
 