namespace API.DTOs.Account;

public class FacebookResultDto
{
    public FacebookData Data { get; set; } = null!;
}

public class FacebookData
{
    public bool Is_Valid { get; set; }
    public string User_Id { get; set; } = string.Empty;
}
