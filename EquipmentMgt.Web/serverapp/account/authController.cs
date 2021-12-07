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
        private AuthUsers _objusers = null;

        // POST: api/auth/regusers
        [HttpPost("[action]")]
        public async Task<object> regusers([FromBody]vmUser model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }
                //Save
                _objusers = new AuthUsers();
                message = await _objusers.regusers(model);
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
        public async Task<object> loginusers([FromBody]UserAuthentication model)
        {
            object result = null; string message = string.Empty;
            vmLoggeduser loggeduser = null;

            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objusers = new AuthUsers();
                loggeduser = await _objusers.loginusers(model);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                loggeduser
            };

            return result;
        }
    }
}