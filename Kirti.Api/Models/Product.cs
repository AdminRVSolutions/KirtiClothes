using System.Collections.Generic;

namespace Kirti.Api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public List<string> Images { get; set; } = new List<string>();
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public string Gender { get; set; } = string.Empty; // "Men" or "Women"
        public List<string> Sizes { get; set; } = new List<string>();
        public List<string> Colors { get; set; } = new List<string>();
        public string Fabric { get; set; } = string.Empty;
        public int Stock { get; set; }
    }
}
