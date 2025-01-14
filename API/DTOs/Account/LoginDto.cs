using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Account;

public class LoginDto
{
    [Required(ErrorMessage = "Username is required")]
    public string UserName { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = null!;
}
