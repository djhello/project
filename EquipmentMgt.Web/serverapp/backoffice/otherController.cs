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
        private dbOther _objOther = null;
        private dbHardwareLog _objHardwareLogs = null;
        private IHostingEnvironment _hostingEnvironment;

        public OtherController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/other/getAll
        [HttpGet("[action]")]
        public async Task<List<vmOther>> getAll()
        {
            List<vmOther> others = null;
            try
            {
                _objOther = new dbOther();
                others = await _objOther.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return others;
        }

        // GET api/book/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmOther> getById(int id)
        {
            vmOther other = null;
            try
            {
                _objOther = new dbOther();
                other = await _objOther.getById(id);
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

                _objOther = new dbOther();
                message = await _objOther.create(model);
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
                _objOther = new dbOther();
                message = await _objOther.updateStatus(model);
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
                _objOther = new dbOther();
                _objHardwareLogs = new dbHardwareLog();

                message = await _objOther.receive(model);
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
        // DELETE api/other/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objOther = new dbOther();
                message = await _objOther.deleteById(id);
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