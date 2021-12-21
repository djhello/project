using DataFactory.backoffice;
using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.backoffice
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

        // GET: api/equipments/getall
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
        // GET api/equipment/getbyid/1
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
        public async Task<object> save([FromBody]Hardware model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }
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
        [HttpPost("[action]")]
        public async Task<object> updateStatus([FromBody]Hardware model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objEquipment = new Equipments();
                message = await _objEquipment.updateStatus(model);
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
        // DELETE api/equipment/deletebyid/1
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