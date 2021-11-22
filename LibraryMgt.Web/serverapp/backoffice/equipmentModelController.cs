using DataFactory.backoffice;
using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace LibraryMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class equipmentModelController : ControllerBase
    {
        private EquipmentModels _objequipmentModel = null;

        private IHostingEnvironment _hostingEnvironment;

        public equipmentModelController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/book/getall
        [HttpGet("[action]")]
        public async Task<List<vmEquipmentModel>> getall()
        {
            List<vmEquipmentModel> equipmentModels = null;
            try
            {
                _objequipmentModel = new EquipmentModels();
                equipmentModels = await _objequipmentModel.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentModels;
        }

        // GET api/book/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<EquipmentModel> getbyid(int id)
        {
            EquipmentModel equipmentModel = null;
            try
            {
                _objequipmentModel = new EquipmentModels();
                equipmentModel = await _objequipmentModel.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentModel;
        }

        // POST: api/book/save
        [HttpPost("[action]")]
        public async Task<object> save()
        {
            object result = null; string message = string.Empty;
            try
            {
                string serverPath = string.Empty;
                var totalfile = Request.Form.Files.Count;
                if (totalfile > 0)
                {
                    var file = Request.Form.Files[0];
                    string folderName = "uploads";
                    string webRootPath = _hostingEnvironment.WebRootPath;
                    string newPath = Path.Combine(webRootPath, folderName);

                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    if (file.Length > 0)
                    {
                        string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        string fullPath = Path.Combine(newPath, fileName);
                        serverPath = folderName + "/" + fileName;
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                }

                //Save
                EquipmentModel model = new EquipmentModel()
                {
                    Id = Convert.ToInt32(Request.Form["id"]),
                    Name = Request.Form["name"].ToString(),
                    Description = Request.Form["description"].ToString(),
                    EDocWebAddress = Request.Form["eDocWebAddress"].ToString(),
                    EDocLocalAddress = Request.Form["eDocLocalAddress"].ToString(),
                    Quantity= Convert.ToInt32(Request.Form["quantity"]),
                    CoverImage = serverPath
                };

                _objequipmentModel = new EquipmentModels();
                message = await _objequipmentModel.create(model);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                message
            };

            return result;
        }

        // DELETE api/book/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objequipmentModel = new EquipmentModels();
                message = await _objequipmentModel.deletebyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                message
            };

            return result;
        }
    }
}