using DataFactory.backoffice;
using DataModels.EntityModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class EquipmentModelController : ControllerBase
    {
        private dbEquipmentModel _objEquipmentModel = null;

        private IHostingEnvironment _hostingEnvironment;

        public EquipmentModelController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/equipmentModel/getAll
        [HttpGet("[action]")]
        public async Task<List<vmEquipmentModel>> getAll()
        {
            List<vmEquipmentModel> equipmentModels = null;
            try
            {
                _objEquipmentModel = new dbEquipmentModel();
                equipmentModels = await _objEquipmentModel.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentModels;
        }

        // GET api/equipmentModel/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<EquipmentModel> getById(int id)
        {
            EquipmentModel equipmentModel = null;
            try
            {
                _objEquipmentModel = new dbEquipmentModel();
                equipmentModel = await _objEquipmentModel.getById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipmentModel;
        }

        // POST: api/equipmentModel/save
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
                else
                {
                    serverPath=Request.Form["fileupload"].ToString();
                }

                //Save
                EquipmentModel model = new EquipmentModel()
                {
                    Id = Convert.ToInt32(Request.Form["id"]),
                    Name = Request.Form["name"].ToString(),
                    Description = Request.Form["description"].ToString(),
                    EDocWebAddress = Request.Form["eDocWebAddress"].ToString(),
                    EDocLocalAddress = Request.Form["eDocLocalAddress"].ToString(),
                    Quantity = Convert.ToInt32(Request.Form["quantity"]),
                    DepartmanId = Convert.ToInt32(Request.Form["departmanId"]),
                    CoverImage = serverPath,
                    CreateDate = DateTime.Now,
                    LastUserId = Request.Form["LastUserId"].ToString(),
                    Status = Convert.ToByte(Request.Form["Status"]),
                    LockStatus = Convert.ToBoolean(Request.Form["LockStatus"].Contains("true")) 
                };

                _objEquipmentModel = new dbEquipmentModel();
                message = await _objEquipmentModel.create(model);
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
        [HttpPost("[action]")]
        public async Task<object> updateStatus([FromBody]EquipmentModel model)
        {
            object result = null; string message = string.Empty;
            try
            {
                    if (model == null)
                    {
                        return BadRequest();
                    }

                _objEquipmentModel = new dbEquipmentModel();
                message = await _objEquipmentModel.create(model);
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

        // DELETE api/equipmentModel/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objEquipmentModel = new dbEquipmentModel();
                message = await _objEquipmentModel.deleteById(id);
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