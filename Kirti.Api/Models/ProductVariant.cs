using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Kirti.Api.Models
{
    public class ProductVariant
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        
        [JsonIgnore]
        public Product Product { get; set; } = null!;
        
        public string Size { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string ColorHex { get; set; } = string.Empty;
        public int Stock { get; set; }
        
        public string MainImage { get; set; } = string.Empty;
        public List<string> Images { get; set; } = new List<string>();
    }
}
