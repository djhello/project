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
    public class RelayController : ControllerBase
    {
        private Relays _objrelay = null;
        private HardwareLogs _objHardwareLogs = null;
        private IHostingEnvironment _hostingEnvironment;

        public RelayController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/relay/getall
        [HttpGet("[action]")]
        public async Task<List<vmRelay>> getAll()
        {
            List<vmRelay> relays = null;
            try
            {
                _objrelay = new Relays();
                relays = await _objrelay.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return relays;
        }

        // GET api/relay/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmRelay> getbyid(int id)
        {
            vmRelay relay = null;
            try
            {
                _objrelay = new Relays();
                relay = await _objrelay.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return relay;
        }

        // POST: api/relay/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Relay model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objrelay = new Relays();
                message = await _objrelay.create(model);
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
        public async Task<object> updateStatus([FromBody]Relay model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objrelay = new Relays();
                message = await _objrelay.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmRelay model)
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
                _objrelay = new Relays();
                _objHardwareLogs = new HardwareLogs();

                message = await _objrelay.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Relay;
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
        // DELETE api/relay/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objrelay = new Relays();
                message = await _objrelay.deletebyid(id);
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