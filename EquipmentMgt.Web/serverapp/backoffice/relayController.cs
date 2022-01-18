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
        private dbRelay _objRelay = null;
        private dbHardwareLog _objHardwareLogs = null;
        private IHostingEnvironment _hostingEnvironment;

        public RelayController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/relay/getAll
        [HttpGet("[action]")]
        public async Task<List<vmRelay>> getAll()
        {
            List<vmRelay> relays = null;
            try
            {
                _objRelay = new dbRelay();
                relays = await _objRelay.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return relays;
        }

        // GET api/relay/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmRelay> getById(int id)
        {
            vmRelay relay = null;
            try
            {
                _objRelay = new dbRelay();
                relay = await _objRelay.getById(id);
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

                _objRelay = new dbRelay();
                message = await _objRelay.create(model);
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
                _objRelay = new dbRelay();
                message = await _objRelay.updateStatus(model);
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
                _objRelay = new dbRelay();
                _objHardwareLogs = new dbHardwareLog();

                message = await _objRelay.receive(model);
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
        // DELETE api/relay/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objRelay = new dbRelay();
                message = await _objRelay.deleteById(id);
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