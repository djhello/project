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
    public class OpampController : ControllerBase
    {
        private Opamps _objopamp = null;
        private HardwareLogs _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public OpampController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/opamp/getall
        [HttpGet("[action]")]
        public async Task<List<vmOpamp>> getAll()
        {
            List<vmOpamp> opamps = null;
            try
            {
                _objopamp = new Opamps();
                opamps = await _objopamp.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return opamps;
        }

        // GET api/opamp/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmOpamp> getbyid(int id)
        {
            vmOpamp opamp = null;
            try
            {
                _objopamp = new Opamps();
                opamp = await _objopamp.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return opamp;
        }

        // POST: api/opamp/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Opamp model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objopamp = new Opamps();
                message = await _objopamp.create(model);
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
        public async Task<object> updateStatus([FromBody]Opamp model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objopamp = new Opamps();
                message = await _objopamp.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmOpamp model)
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
                _objopamp = new Opamps();
                _objHardwareLogs = new HardwareLogs();

                message = await _objopamp.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Opamp;
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
        // DELETE api/opamp/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objopamp = new Opamps();
                message = await _objopamp.deletebyid(id);
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