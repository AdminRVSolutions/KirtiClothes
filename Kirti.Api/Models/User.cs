namespace Kirti.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime? Dob { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "user"; // "user" or "admin"
        public bool TermsAccepted { get; set; }
        public bool NewsletterSubscribed { get; set; }
    }
}
