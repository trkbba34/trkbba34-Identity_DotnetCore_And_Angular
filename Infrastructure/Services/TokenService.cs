using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Core.Entities;
using Microsoft.Extensions.Configuration;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class TokenService(IConfiguration config, UserManager<AppUser> userManager) : ITokenService
    {
        private readonly SymmetricSecurityKey _key = new(Encoding.UTF8.GetBytes(config["JWT:TokenKey"]!));
        private readonly UserManager<AppUser> _userManager = userManager;

        public async Task<string> CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                //new(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                //new(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new(ClaimTypes.NameIdentifier, user.Id),
                new(ClaimTypes.Email, user.UserName!),
                new(ClaimTypes.GivenName, user.FirstName),
                new(ClaimTypes.Surname, user.LastName)
            };

            //var roles = await _userManager.GetRolesAsync(user);

            //claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(int.Parse(config["JWT:ExpiresInMinutes"]!)),
                SigningCredentials = creds,
                Issuer = config["JWT:Issuer"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}