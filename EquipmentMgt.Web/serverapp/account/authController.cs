using DataFactory.account;
using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace EquipmentMgt.Web.serverapp.account
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class authController : ControllerBase
    {
        private AuthUsers _objUsers = null;

        // POST: api/auth/regusers
        [HttpPost("[action]")]
        public async Task<object> regUsers([FromBody]vmUser model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }
                //Save
                _objUsers = new AuthUsers();
                message = await _objUsers.regUsers(model);
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

        // POST: api/auth/loginusers
        [HttpPost("[action]")]
        public async Task<object> loginUsers([FromBody]UserAuthentication model)
        {
            object result = null; string message = string.Empty;
            vmLoggeduser loggedUser = null;

            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objUsers = new AuthUsers();
                loggedUser = await _objUsers.loginUsers(model);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                loggedUser
            };

            return result;
        }
        [HttpPost("[action]")]
        public async Task<object> checkPassword([FromBody]UserAuthentication model)
        {
            object result = null; string message = string.Empty;
            UserAuthentication loggedUser = null;

            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objUsers = new AuthUsers();
                loggedUser = await _objUsers.checkPassword(model);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                loggedUser
            };

            return result;
        }
    }
}