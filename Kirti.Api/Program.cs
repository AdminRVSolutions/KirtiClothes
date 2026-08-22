using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Kirti.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Entity Framework Core to use MS SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Setup CORS for the React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var provider = new FileExtensionContentTypeProvider();
provider.Mappings[".avif"] = "image/avif";

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "img")),
    RequestPath = "/img",
    ContentTypeProvider = provider
});

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // Ensure admin exists
    if (!context.Users.Any(u => u.Role == "admin"))
    {
        context.Users.Add(new Kirti.Api.Models.User
        {
            FirstName = "Admin",
            LastName = "User",
            Email = "admin@kirti.com",
            Phone = "8424814474", // Standard admin phone
            PasswordHash = "admin123", // Using plain for now as per previous simplicity
            Role = "admin",
            Gender = "Male",
            TermsAccepted = true
        });
        context.SaveChanges();
    }

    if (!context.Categories.Any())
    {
        context.Categories.Add(new Kirti.Api.Models.Category { Name = "Men", Slug = "men" });
        context.Categories.Add(new Kirti.Api.Models.Category { Name = "Women", Slug = "women" });
        context.SaveChanges();
    }

    if (!context.Products.Any())
    {
        var menCategory = context.Categories.First(c => c.Name == "Men");
        var womenCategory = context.Categories.First(c => c.Name == "Women");

        context.Products.AddRange(
            new Kirti.Api.Models.Product
            {
                Name = "Royal Ivory Silk Sherwani",
                Slug = "royal-ivory-silk-sherwani",
                Description = "A premium silk sherwani perfect for weddings.",
                Price = 35000,
                ImageUrl = "/img/Men/type1/img1.avif",
                Images = new List<string> { "/img/Men/type1/img1.avif", "/img/Men/type1/img2.avif", "/img/Men/type1/img3.avif", "/img/Men/type1/img4.avif" },
                CategoryId = menCategory.Id,
                Gender = "Men",
                Sizes = new List<string> { "M", "L", "XL" },
                Colors = new List<string> { "Ivory" },
                Fabric = "Silk",
                Stock = 12
            },
            new Kirti.Api.Models.Product
            {
                Name = "Midnight Blue Indo-Western",
                Slug = "midnight-blue-indo-western",
                Description = "Stylish indo-western suit for modern men.",
                Price = 28500,
                ImageUrl = "/img/Men/type2/img1.avif",
                Images = new List<string> { "/img/Men/type2/img1.avif", "/img/Men/type2/img2.avif", "/img/Men/type2/img3.avif", "/img/Men/type2/img4.avif" },
                CategoryId = menCategory.Id,
                Gender = "Men",
                Sizes = new List<string> { "S", "M", "L" },
                Colors = new List<string> { "Blue" },
                Fabric = "Velvet",
                Stock = 8
            },
            new Kirti.Api.Models.Product
            {
                Name = "Golden Salwar Kameez",
                Slug = "golden-salwar-kameez",
                Description = "Elegant golden salwar kameez with heavy embroidery.",
                Price = 18500,
                ImageUrl = "/img/Woman/salwarkameej/img1.avif",
                Images = new List<string> { "/img/Woman/salwarkameej/img1.avif", "/img/Woman/salwarkameej/img2.avif", "/img/Woman/salwarkameej/img3.avif", "/img/Woman/salwarkameej/img4.avif" },
                CategoryId = womenCategory.Id,
                Gender = "Women",
                Sizes = new List<string> { "M", "L" },
                Colors = new List<string> { "Gold" },
                Fabric = "Georgette",
                Stock = 5
            },
            new Kirti.Api.Models.Product
            {
                Name = "Classic Green Lehenga",
                Slug = "classic-green-lehenga",
                Description = "Traditional lehenga for festive occasions.",
                Price = 45000,
                ImageUrl = "/img/Woman/type1/img1.avif",
                Images = new List<string> { "/img/Woman/type1/img1.avif", "/img/Woman/type1/img2.avif", "/img/Woman/type1/img3.avif" },
                CategoryId = womenCategory.Id,
                Gender = "Women",
                Sizes = new List<string> { "Free Size" },
                Colors = new List<string> { "Green" },
                Fabric = "Silk",
                Stock = 2
            }
        );
        context.SaveChanges();
    }
}

app.Run();
