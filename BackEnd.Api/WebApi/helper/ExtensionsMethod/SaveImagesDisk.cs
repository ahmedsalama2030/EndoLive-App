using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace WebApi.helper.ExtensionsMethod
{
    public static class SaveImagesDisk
    {
        
    
    public static async Task<string> SaveImageOnDisk(this IFormFile photo, IWebHostEnvironment _ihostingEnvironment, string folder)
    {
         string newPath = null;

        if (photo != null && photo.Length > 0)
        {
            var newPathResult = _ihostingEnvironment.WebRootPath + "\\imageUpload\\" + folder;
            if (!(Directory.Exists(newPathResult)))
                Directory.CreateDirectory(newPathResult);
            var name = Path.GetRandomFileName() + Path.GetExtension(photo.FileName);
            var path =      
             
             
                Path.Combine(newPathResult, name).ToLower();
            var stream = new FileStream(path, FileMode.Create);
           await photo.CopyToAsync(stream);
           await stream.DisposeAsync();
            newPath = "imageUpload/" + folder + "/" + name ;

        }
            return  await Task.FromResult(newPath);
    }
    }

      
}

 
  