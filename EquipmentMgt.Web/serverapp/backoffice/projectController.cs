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
        private dbProject _objProject = null;
        private IHostingEnvironment _hostingEnvironment;

        public ProjectController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/project/getAll
        [HttpGet("[action]")]
        public async Task<List<Project>> getAll()
        {
            List<Project> projects = null;
            try
            {
                _objProject = new dbProject();
                projects = await _objProject.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return projects;
        }

        // GET api/project/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<Project> getById(int id)
        {
            Project project = null;
            try
            {
                _objProject = new dbProject();
                project = await _objProject.getById(id);
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

                _objProject = new dbProject();
                message = await _objProject.create(model);
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
                _objProject = new dbProject();
                message = await _objProject.updateStatus(model);
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
        // DELETE api/project/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objProject = new dbProject();
                message = await _objProject.deleteById(id);
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