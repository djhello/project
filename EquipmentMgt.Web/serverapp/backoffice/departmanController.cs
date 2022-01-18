using DataFactory.backoffice;
using DataModels.EntityModels;
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
    public class DepartmanController : ControllerBase
    {
        private dbDepartman _objDepartman = null;
        private IHostingEnvironment _hostingEnvironment;

        public DepartmanController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/departman/getAll
        [HttpGet("[action]")]
        public async Task<List<Departman>> getAll()
        {
            List<Departman> departmans = null;
            try
            {
                _objDepartman = new dbDepartman();
                departmans = await _objDepartman.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return departmans;
        }

        // GET api/departman/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<Departman> getById(int id)
        {
            Departman departman = null;
            try
            {
                _objDepartman = new dbDepartman();
                departman = await _objDepartman.getById(id);
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

                _objDepartman = new dbDepartman();
                message = await _objDepartman.create(model);
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
        // POST: api/users/updateStatus
        [HttpPost("[action]")]
        public async Task<object> updateStatus([FromBody]Departman model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objDepartman = new dbDepartman();
                message = await _objDepartman.updateStatus(model);
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
        // DELETE api/departman/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objDepartman = new dbDepartman();
                message = await _objDepartman.deleteById(id);
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