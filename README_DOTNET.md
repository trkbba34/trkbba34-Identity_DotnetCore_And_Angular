# create project:

dotnet new sln
dotnet new webapi -o API -controllers
dotnet new classlib -o Core
dotnet new classlib -o Infrastructure
dotnet sln add API
dotnet sln add Core
dotnet sln add Infrastructure
cd API
dotnet add reference ../Infrastructure
cd ..
cd Infrastructure
dotnet add reference ../Core
cd ..
dotnet restore
dotnet build
cd API
dotnet run
dotnet watch

# install nuget packages:

- API:
  Microsoft.EntityFrameworkCore.Design

- Core:
  Microsoft.Extensions.Identity.Stores

- Infrastructure:
  Microsoft.AspNetCore.Identity.EntityFrameworkCore
  Microsoft.EntityFrameworkCore.SqlServer
  StackExchange.Redis

//Microsoft.AspNetCore.Authentication.JwtBearer
//System.IdentityModel.Tokens.Jwt
program.cs + services/JwtService.cs

# setup environment:

- API\Properties\launchSettings.json
  {"$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {"http": {"commandName": "Project","dotnetRunMessages": true,"launchBrowser": false,
  "applicationUrl": "http://localhost:5000;https://localhost:5001","environmentVariables": {"ASPNETCORE_ENVIRONMENT": "Development"}}}}

- API\appsettings.Development.json
  {"Logging": {"LogLevel": {"Default": "Information","Microsoft.AspNetCore": "Information"}},
  "ConnectionStrings": {"DefaultConnection": "Server=(localdb)\\local;Database=auth;User Id=sa;Password=aze123aze123;TrustServerCertificate=True"}}

- create migration
  dotnet ef migrations add InitialCreate -s API -p Infrastructure
  dotnet ef database update -s API -p Infrastructure

- delete migration
  dotnet ef database drop -p Infrastructure -s API
