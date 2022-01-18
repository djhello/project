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
    public class LocationController : ControllerBase
    {
        private dbLocation _objLocation = null;
        private IHostingEnvironment _hostingEnvironment;

        public LocationController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/ location/getAll
        [HttpGet("[action]")]
        public async Task<List<vmLocation>> getAll()
        {
            List<vmLocation> locations = null;
            try
            {
                _objLocation = new dbLocation();
                locations = await _objLocation.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return locations;
        }

        // GET api/ location/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<Location> getById(int id)
        {
            Location location = null;
            try
            {
                _objLocation = new dbLocation();
                location = await _objLocation.getById(id);
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
                _objLocation = new dbLocation();
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
                _objLocation = new dbLocation();
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
        // DELETE api/ location/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objLocation = new dbLocation();
                message = await _objLocation.deleteById(id);
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