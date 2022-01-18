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
    public class EquipmentController : ControllerBase
    {
        private dbEquipment _objEquipment = null;
        private IHostingEnvironment _hostingEnvironment;

        public EquipmentController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/equipments/getAll
        [HttpGet("[action]")]
        public async Task<List<vmEquipment>> getAll()
        {
            List<vmEquipment> equipments = null;
            try
            {
                _objEquipment = new dbEquipment();
                equipments = await _objEquipment.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipments;
        }
        [HttpGet("[action]")]
        public async Task<List<vmAvailableEquipment>> getAvailableallEquipment()
        {
            List<vmAvailableEquipment> equipments = null;
            try
            {
                _objEquipment = new dbEquipment();
                equipments = await _objEquipment.getAvailableallEquipment();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipments;
        }
        // GET api/equipment/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmEquipment> getById(int id)
        {
            vmEquipment equipment = null;
            try
            {
                _objEquipment = new dbEquipment();
                equipment = await _objEquipment.getById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipment;
        }
        [HttpGet("[action]/{text}")]
        public async Task<List<vmEquipment>> getByText(string text)
        {

            List<vmEquipment> equipments = null;
            try
            {
                _objEquipment = new dbEquipment();
                equipments = await _objEquipment.getByText(text);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return equipments;
        }
        // POST: api/equipment/save
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
                _objEquipment = new dbEquipment();
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
                _objEquipment = new dbEquipment();
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
        // DELETE api/equipment/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objEquipment = new dbEquipment();
                message = await _objEquipment.deleteById(id);
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