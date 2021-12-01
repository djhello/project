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

namespace EquipmentMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class departmanController : ControllerBase
    {
        private Departmans _objdepartman = null;
        private IHostingEnvironment _hostingEnvironment;

        public departmanController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/departman/getall
        [HttpGet("[action]")]
        public async Task<List<Departman>> getall()
        {
            List<Departman> departmans = null;
            try
            {
                _objdepartman = new Departmans();
                departmans = await _objdepartman.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return departmans;
        }

        // GET api/book/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<Departman> getbyid(int id)
        {
            Departman departman = null;
            try
            {
                _objdepartman = new Departmans();
                departman = await _objdepartman.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return departman;
        }

        // POST: api/departman/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Departman model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objdepartman = new Departmans();
                message = await _objdepartman.create(model);
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

        // DELETE api/departman/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objdepartman = new Departmans();
                message = await _objdepartman.deletebyid(id);
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