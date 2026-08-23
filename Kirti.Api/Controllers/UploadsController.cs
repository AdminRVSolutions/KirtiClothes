using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Kirti.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public UploadsController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpPost("product-images")]
        public async Task<IActionResult> UploadProductImages(
            [FromForm] string gender,
            [FromForm] string category,
            [FromForm] string product,
            [FromForm] string size,
            [FromForm] string color,
            [FromForm] List<IFormFile> images)
        {
            if (images == null || images.Count == 0)
                return BadRequest("No images uploaded.");

            var folderPath = Path.Combine(_env.ContentRootPath, "img", gender, category, product, size, color);
            
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var uploadedUrls = new List<string>();

            foreach (var file in images)
            {
                if (file.Length > 0)
                {
                    var fileName = file.FileName.Replace(" ", "-");
                    var filePath = Path.Combine(folderPath, fileName);
                    
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var url = $"/img/{gender}/{category}/{product}/{size}/{color}/{fileName}";
                    uploadedUrls.Add(url);
                }
            }

            return Ok(new { urls = uploadedUrls });
        }
    }
}
