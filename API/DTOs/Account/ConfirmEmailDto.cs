using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Account;

public class ConfirmEmailDto
{
        [Required]
        public string Token { get; set; } = string.Empty;

        [Required]
        [RegularExpression("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$", ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = string.Empty;

}
