using DataFactory.backoffice;
using DataModels.EntityModels;
using DataModels.ViewModels;
using DataUtilities;
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
    public class OtherController : ControllerBase
    {
        private Others _objother = null;
        private HardwareLogs _objHardwareLogs = null;
        private IHostingEnvironment _hostingEnvironment;

        public OtherController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/other/getall
        [HttpGet("[action]")]
        public async Task<List<vmOther>> getAll()
        {
            List<vmOther> others = null;
            try
            {
                _objother = new Others();
                others = await _objother.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return others;
        }

        // GET api/book/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmOther> getbyid(int id)
        {
            vmOther other = null;
            try
            {
                _objother = new Others();
                other = await _objother.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return other;
        }

        // POST: api/other/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Other model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objother = new Others();
                message = await _objother.create(model);
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
        public async Task<object> updateStatus([FromBody]Other model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objother = new Others();
                message = await _objother.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmOther model)
        {
            object result = null; string message = string.Empty;
            HardwareLog hardwarelog = null;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objother = new Others();
                _objHardwareLogs = new HardwareLogs();

                message = await _objother.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Other;
                    hardwarelog.HardwareId = model.Id;
                    hardwarelog.ReceiveQuantity = model.ReceiveQuantity;
                    hardwarelog.UserId = model.LastUserId;
                    hardwarelog.Status = model.Status;
                    hardwarelog.CreateDate = DateTime.Now;
                    hardwarelog.LockStatus = model.LockStatus;
                    message = await _objHardwareLogs.create(hardwarelog);
                }
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
        // DELETE api/other/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objother = new Others();
                message = await _objother.deletebyid(id);
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