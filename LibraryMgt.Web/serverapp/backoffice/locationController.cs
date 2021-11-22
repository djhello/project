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
    public class locationController : ControllerBase
    {
        private Locations _objtest = null;
        private IHostingEnvironment _hostingEnvironment;

        public locationController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/book/getall
        [HttpGet("[action]")]
        public async Task<List<vmLocation>> getall()
        {
            List<vmLocation> locations = null;
            try
            {
                _objtest = new Locations();
                locations = await _objtest.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return locations;
        }

        // GET api/book/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<Location> getbyid(int id)
        {
            Location location = null;
            try
            {
                _objtest = new Locations();
                location = await _objtest.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return location;
        }

        // POST: api/book/save
        [HttpPost("[action]")]
        public async Task<object> save()
        {
            object result = null; string message = string.Empty;
            try
            {

                //Save
                Location model = new Location()
                {
                    Id = Convert.ToInt32(Request.Form["id"]),
                    Name = Request.Form["name"].ToString()

                };

                _objtest = new Locations();
                message = await _objtest.create(model);
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
                _objtest = new Locations();
                message = await _objtest.deletebyid(id);
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