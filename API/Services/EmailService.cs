using API.DTOs.Account;
using Mailjet.Client;
using Mailjet.Client.TransactionalEmails;

namespace Infrastructure.Services;

public class EmailService(IConfiguration config)
{
    private readonly IConfiguration _config = config;

    public async Task<bool> SendEmailAsync(EmailSendDto emailSend)
    {
        MailjetClient client = new(_config["MailJet:ApiKey"], _config["MailJet:SecretKey"]);

        var email = new TransactionalEmailBuilder()
            .WithFrom(new SendContact(_config["Email:From"], _config["Email:ApplicationName"]))
            .WithSubject(emailSend.Subject)
            .WithHtmlPart(emailSend.Body)
            .WithTo(new SendContact(emailSend.To))
            .Build();

        var response = await client.SendTransactionalEmailAsync(email);
        if (response.Messages != null)
        {
            if (response.Messages[0].Status == "success")
            {
                return true;
            }
        }

        return false;
    }
}

