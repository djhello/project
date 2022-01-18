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
        private dbOpamp _objOpamp = null;
        private dbHardwareLog _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public OpampController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/opamp/getAll
        [HttpGet("[action]")]
        public async Task<List<vmOpamp>> getAll()
        {
            List<vmOpamp> opamps = null;
            try
            {
                _objOpamp = new dbOpamp();
                opamps = await _objOpamp.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return opamps;
        }

        // GET api/opamp/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmOpamp> getById(int id)
        {
            vmOpamp opamp = null;
            try
            {
                _objOpamp = new dbOpamp();
                opamp = await _objOpamp.getById(id);
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

                _objOpamp = new dbOpamp();
                message = await _objOpamp.create(model);
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
                _objOpamp = new dbOpamp();
                message = await _objOpamp.updateStatus(model);
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
                _objOpamp = new dbOpamp();
                _objHardwareLogs = new dbHardwareLog();

                message = await _objOpamp.receive(model);
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
        // DELETE api/opamp/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objOpamp = new dbOpamp();
                message = await _objOpamp.deleteById(id);
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