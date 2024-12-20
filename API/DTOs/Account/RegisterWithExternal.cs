using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Account;

public class RegisterWithExternal
{
        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "First name must be at least {2}, and maximum {1} characters")]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "Last name must be at least {2}, and maximum {1} characters")]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string AccessToken { get; set; } = string.Empty;
        [Required]
        public string UserId { get; set; } = string.Empty;
        [Required]
        public string Provider { get; set; } = string.Empty;
}
