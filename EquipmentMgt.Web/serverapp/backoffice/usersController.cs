using DataFactory.backoffice;
using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private dbUser _objUsers = null;

        // GET: api/users/getAll
        [HttpGet("[action]")]
        public async Task<List<vmUserDepartman>> getAll()
        {
            List<vmUserDepartman> users = null;
            try
            {
                _objUsers = new dbUser();
                users = await _objUsers.getAll();
               // users = _objUsers.getAllUser();
                
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return users;
        }

        // GET api/users/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmUserDepartman> getById(int id)
        {
            vmUserDepartman user = null;
            try
            {
                _objUsers = new dbUser();
                user = await _objUsers.getById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return user;
        }

        // POST: api/users/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]vmUser model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objUsers = new dbUser();
                message = await _objUsers.create(model);
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
        // POST: api/users/updateUserInfos
        [HttpPost("[action]")]
        public async Task<object> updateUserInfos([FromBody]vmUser model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objUsers = new dbUser();
                message = await _objUsers.updateUserInfos(model);
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
        public async Task<object> updateStatus([FromBody]vmUser model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objUsers = new dbUser();
                message = await _objUsers.updateStatus(model);
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
        public async Task<object> updatePasswordUrl([FromBody]vmUser model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objUsers = new dbUser();
                message = await _objUsers.updatePasswordUrl(model);
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


        // DELETE api/users/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objUsers = new dbUser();
                message = await _objUsers.deleteById(id);
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