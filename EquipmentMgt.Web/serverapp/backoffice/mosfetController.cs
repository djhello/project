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
    public class MosfetController : ControllerBase
    {
        private dbMosfet _objMosfet = null;
        private dbHardwareLog _objHardwareLogs = null;

        private IHostingEnvironment _hostingEnvironment;

        public MosfetController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/mosfet/getAll
        [HttpGet("[action]")]
        public async Task<List<vmMosfet>> getAll()
        {
            List<vmMosfet> mosfets = null;
            try
            {
                _objMosfet = new dbMosfet();
                mosfets = await _objMosfet.getAll();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return mosfets;
        }

        // GET api/mosfet/getById/1
        [HttpGet("[action]/{id}")]
        public async Task<vmMosfet> getById(int id)
        {
            vmMosfet mosfet = null;
            try
            {
                _objMosfet = new dbMosfet();
                mosfet = await _objMosfet.getById(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return mosfet;
        }

        // POST: api/mosfet/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Mosfet model)
        {
            object result = null; string message = string.Empty;
            try
            {

                if (model == null)
                {
                    return BadRequest();
                }

                _objMosfet = new dbMosfet();
                message = await _objMosfet.create(model);
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
        public async Task<object> updateStatus([FromBody]Mosfet model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objMosfet = new dbMosfet();
                message = await _objMosfet.updateStatus(model);
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
        public async Task<object> receive([FromBody]vmMosfet model)
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
                _objMosfet = new dbMosfet();
                _objHardwareLogs = new dbHardwareLog();

                message = await _objMosfet.receive(model);
                if (message == MessageConstants.Saved)
                {
                    hardwarelog = new HardwareLog();
                    hardwarelog.HardwareClassId = (int)HardwareClass.Mosfet;
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
        // DELETE api/mosfet/deleteById/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deleteById(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objMosfet = new dbMosfet();
                message = await _objMosfet.deleteById(id);
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