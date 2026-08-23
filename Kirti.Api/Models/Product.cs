using System.Collections.Generic;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public Category? Category { get; set; }
        public string Gender { get; set; } = string.Empty; // "Men" or "Women"
        public List<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
    }
}
