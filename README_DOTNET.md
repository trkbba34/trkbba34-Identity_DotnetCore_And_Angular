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
  <!--to authenticate user using JWT Bearer-->

  Microsoft.AspNetCore.Authentication.JwtBearer

- Infrastructure:
  <!--to be able to derive from IdentityDbContext inside our context.cs-->
  Microsoft.AspNetCore.Identity.EntityFrameworkCore
  <!--to be able to communicate with SQL server via EF-->
  Microsoft.EntityFrameworkCore.SqlServer
  <!--to be able to create, serialize and validate JSON web tokens-->
  System.IdentityModel.Tokens.Jwt

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
