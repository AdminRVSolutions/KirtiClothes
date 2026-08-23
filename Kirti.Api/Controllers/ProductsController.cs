using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kirti.Api.Data;
using Kirti.Api.Models;

namespace Kirti.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.Include(p => p.Category).Include(p => p.Variants).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.Include(p => p.Category).Include(p => p.Variants).FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            // Ensure we have a default category if none is provided
            if (product.CategoryId == 0)
            {
                var category = await _context.Categories.FirstOrDefaultAsync();
                if (category == null)
                {
                    category = new Category { Name = "General", Slug = "general" };
                    _context.Categories.Add(category);
                    await _context.SaveChangesAsync();
                }
                product.CategoryId = category.Id;
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPost("{id}/variants")]
        public async Task<ActionResult<ProductVariant>> PostProductVariant(int id, ProductVariant variant)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            variant.ProductId = id;
            _context.ProductVariants.Add(variant);
            await _context.SaveChangesAsync();

            return Ok(variant);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
