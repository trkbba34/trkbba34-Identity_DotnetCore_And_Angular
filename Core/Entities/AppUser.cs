using Microsoft.AspNetCore.Identity;

namespace Core.Entities;

public class AppUser : IdentityUser
{
    public  string? FirstName { get; set; }
    public  string? LastName { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
}
