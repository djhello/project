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
    public class locationController : ControllerBase
    {
        private Locations _objLocation = null;
        private IHostingEnvironment _hostingEnvironment;

        public locationController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/ location/getall
        [HttpGet("[action]")]
        public async Task<List<vmLocation>> getall()
        {
            List<vmLocation> locations = null;
            try
            {
                _objLocation = new Locations();
                locations = await _objLocation.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return locations;
        }

        // GET api/ location/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<Location> getbyid(int id)
        {
            Location location = null;
            try
            {
                _objLocation = new Locations();
                location = await _objLocation.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return location;
        }

        // POST: api/ location/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Location model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }
                _objLocation = new Locations();
                message = await _objLocation.create(model);
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
        public async Task<object> updateStatus([FromBody]Location model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objLocation = new Locations();
                message = await _objLocation.updateStatus(model);
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
        // DELETE api/ location/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objLocation = new Locations();
                message = await _objLocation.deletebyid(id);
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