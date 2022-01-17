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
    public class ProjectController : ControllerBase
    {
        private Projects _objproject = null;
        private IHostingEnvironment _hostingEnvironment;

        public ProjectController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/project/getall
        [HttpGet("[action]")]
        public async Task<List<Project>> getAll()
        {
            List<Project> projects = null;
            try
            {
                _objproject = new Projects();
                projects = await _objproject.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return projects;
        }

        // GET api/project/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<Project> getbyid(int id)
        {
            Project project = null;
            try
            {
                _objproject = new Projects();
                project = await _objproject.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return project;
        }

        // POST: api/project/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Project model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objproject = new Projects();
                message = await _objproject.create(model);
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
        public async Task<object> updateStatus([FromBody]Project model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objproject = new Projects();
                message = await _objproject.updateStatus(model);
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
        // DELETE api/project/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objproject = new Projects();
                message = await _objproject.deletebyid(id);
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