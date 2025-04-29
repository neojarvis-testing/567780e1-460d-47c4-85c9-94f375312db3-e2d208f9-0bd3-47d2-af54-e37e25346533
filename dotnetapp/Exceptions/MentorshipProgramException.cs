using System;
namespace dotnetapp.Exceptions
{
    public class MentorshipProgramException : Exception
    {
        // Constructor to accept custom error message
        public MentorshipProgramException(string message) : base(message)
        {
        }
    }
} 