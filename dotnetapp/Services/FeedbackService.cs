
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class FeedbackService
    {
        private readonly ApplicationDbContext _context;

        // Constructor to inject ApplicationDbContext
        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Retrieve all feedbacks from the database
        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            // Fetch all feedback records from the database asynchronously
            return await _context.Feedbacks.ToListAsync();
        }

        // 2. Retrieve feedbacks for a specific user by userId
        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            // Fetch feedback records for a specific user based on userId asynchronously
            return await _context.Feedbacks.Where(feed => feed.UserId == userId).ToListAsync();
        }

        // 3. Add a new feedback to the database
        public async Task<bool> AddFeedback(Feedback feedback)
        {
            // Add a new feedback record to the database
            _context.Feedbacks.Add(feedback);
            // Save changes to the database asynchronously
            await _context.SaveChangesAsync();
            // Return true to indicate successful insertion
            return true;
        }

        // 4. Delete a feedback based on feedbackId
        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            // Find the feedback record by feedbackId asynchronously
            var feedback = await _context.Feedbacks.FirstOrDefaultAsync(feed => feed.FeedbackId == feedbackId);

            // Check if the feedback record exists
            if (feedback == null)
            {
                // Return false if the feedback record does not exist
                return false;
            }

            // Remove the feedback record from the database
            _context.Feedbacks.Remove(feedback);
            // Save changes to the database asynchronously
            await _context.SaveChangesAsync();
            // Return true to indicate successful deletion
            return true;
        }
    }
}