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
    public class equipmentController : ControllerBase
    {
        private Equipments _objEquipment = null;
        private IHostingEnvironment _hostingEnvironment;

        public equipmentController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/book/getall
        [HttpGet("[action]")]
        public async Task<List<vmEquipment>> getall()
        {
            List<vmEquipment> equipments = null;
            try
            {
                _objEquipment = new Equipments();
                equipments = await _objEquipment.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipments;
        }
        [HttpGet("[action]")]
        public async Task<List<vmAvailableEquipment>> getavailableallequipment()
        {
            List<vmAvailableEquipment> equipments = null;
            try
            {
                _objEquipment = new Equipments();
                equipments = await _objEquipment.getavailableallequipment();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipments;
        }
        // GET api/book/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmEquipment> getbyid(int id)
        {
            vmEquipment equipment = null;
            try
            {
                _objEquipment = new Equipments();
                equipment = await _objEquipment.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipment;
        }
        [HttpGet("[action]/{text}")]
        public async Task<List<vmEquipment>> getbytext(string text)
        {
            
            List<vmEquipment> equipments = null;
            try
            {
                _objEquipment = new Equipments();
                equipments = await _objEquipment.getbytext(text);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipments;
        }
        // POST: api/book/save
        [HttpPost("[action]")]
        public async Task<object> save()
        {
            object result = null; string message = string.Empty;
            try
            {
                //    string serverPath = string.Empty;
                //    var totalfile = Request.Form.Files.Count;
                //    if (totalfile > 0)
                //    {
                //        var file = Request.Form.Files[0];
                //        string folderName = "uploads";
                //        string webRootPath = _hostingEnvironment.WebRootPath;
                //        string newPath = Path.Combine(webRootPath, folderName);

                //        if (!Directory.Exists(newPath))
                //        {
                //            Directory.CreateDirectory(newPath);
                //        }
                //        if (file.Length > 0)
                //        {
                //            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                //            string fullPath = Path.Combine(newPath, fileName);
                //            serverPath = folderName + "/" + fileName;
                //            using (var stream = new FileStream(fullPath, FileMode.Create))
                //            {
                //                file.CopyTo(stream);
                //            }
                //        }
                //    }

                //Save
                Equipment model = new Equipment()
                {
                    Id = Convert.ToInt32(Request.Form["id"]),
                    EquipmentId= Request.Form["equipmentId"].ToString(),
                    EquipmentModelId = Convert.ToInt32(Request.Form["equipmentModelId"]),
                    CalibrationId = Convert.ToInt32(Request.Form["calibrationId"]),
                    /*CurrentLocationId = Convert.ToInt32(Request.Form["currentLocationID"]),*/
                    PermanentLocationId = Convert.ToInt32(Request.Form["permanentLocationId"]),
                    CurrentUserId = Convert.ToInt32(Request.Form["currentUserId"]),
                    Description = Request.Form["description"].ToString(),
                    EquipmentName = Request.Form["equipmentName"].ToString(),
                    SerialPortUSB = Request.Form["serialPortUSB"].ToString(),
                };

                _objEquipment = new Equipments();
                message = await _objEquipment.create(model);
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
                _objEquipment = new Equipments();
                message = await _objEquipment.deletebyid(id);
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