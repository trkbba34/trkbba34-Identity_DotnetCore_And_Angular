using Microsoft.AspNetCore.Identity;

namespace Core.Entities;

public class AppUser : IdentityUser
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
}
